import { createStore } from 'redux'
import { getElements, showHideSideBar, commentAction } from './HelperFunctions.js'

var defaultStore ={
    "sidebar": false,
    "commentPopup": false,
    "tempSelectedElementId": null,
    "filteredComments": [],
    "elements": [{
        "elementId": "textarea0",
        "elementName": "textarea",
        "comments": []
    }]
}

var store = createStore(comment)

function comment(state = defaultStore, action) {
    let tempSelectedElementId = null
    let filteredComments = []
    let index, comments, elements, result, elementToAdd
    switch (action.type) {
        case "SHOW_HIDE_ADD_COMMENT_BOX":
            return {
                ...state,
                tempSelectedElementId: action.data,
                commentPopup: !state.commentPopup
            }
        case "CLEAR_SIDEBAR_COMMENTS":
            return {
                ...state,
                filteredComments: [],
                sidebar: false
            }

        case "SHOW_HIDE_SIDEBAR":
            if (!state.sidebar && state.tempSelectedElementId !== null) {
                action.data = state.tempSelectedElementId
                result = showHideSideBar(state, action)
                filteredComments = result.filteredComments
                tempSelectedElementId = result.tempSelectedElementId
            }
            return {
                ...state,
                filteredComments: filteredComments,
                tempSelectedElementId: tempSelectedElementId,
                sidebar: !state.sidebar
            }

        case "FOCUS_ACTION":
            result = showHideSideBar(state, action)
            filteredComments = result.filteredComments
            tempSelectedElementId = result.tempSelectedElementId
            return {
                ...state,
                filteredComments: filteredComments,
                tempSelectedElementId: action.data
            }
        case "SAVE_Comment":
            elements = getElements(state)
            index = elements.findIndex((element) => (element.elementId === action.data.elementId))
            elements[index].comments.push({
                commentId: "comment#" + elements[index].comments.length,
                status: "OPEN",
                responseAction: "ACTION",
                timeSign: new Date(),
                text: action.data.commentText,
                replys: []
            })
            return {
                ...state,
                elements: elements,
                commentPopup: !state.commentPopup,
                sidebar: false
            }

        case "ACTION_ON_COMMENT":
            result = commentAction(state, action)
            elements = result.elements
            filteredComments = result.filteredComments
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }

        case "FILTER_BY_STATUS":
            elements = getElements(state)
            filteredComments = []
            index = elements.findIndex((element) => (element.elementId === action.data.elementId))
            comments = elements[index].comments
            if (action.data.status === "ALL") {
                for (let n in comments) {
                    filteredComments.push(comments[n])
                }
            } else {
                for (let n in comments) {
                    if (comment.status === action.data.status) {
                        filteredComments.push(comments[n])
                    }
                }
            }
            return {
                ...state,
                filteredComments: filteredComments,
            }
        case "ADD_ELEMENT":
            elements = getElements(state)
            index = elements.findIndex((element) => (element.elementId === action.data.elementId))
            elementToAdd = {
                elementId: action.data.elementToAdd + (elements.length + 1),
                elementName: action.data.elementToAdd,
                comments: [],
            }
            elements.splice(index, 0, elementToAdd)
            return {
                ...state,
                elements: elements
            }
        case "REMOVE_ELEMENTS":
            elements = getElements(state)
            if (elements.length !== 1) {
                index = elements.findIndex((element) => (element.elementId === action.data.elementId)) + 1
                elements.splice(index, 1)
            }
            return {
                ...state,
                elements: elements,
                filteredComments: []
            }
        default:
            return {
                ...state
            }
    }
}



export default store