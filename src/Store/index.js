import { createStore } from 'redux'

var defaultStore = {
    sidebar: false,
    commentPopup: false,
    tempSelectedElementId: null,
    filteredComments: [],
    elements: [{
        elementId: "textarea0",
        elementName: "",
        comments: [],
    },
    {
        elementId: "textarea1",
        elementName: "",
        comments: []
    },
    {
        elementId: "textarea2",
        elementName: "",
        comments: []
    },
    {
        elementId: "textarea3",
        elementName: "",
        comments: []
    },
    {
        elementId: "textarea4",
        elementName: "",
        comments: []
    }]
}

function comment(state = defaultStore, action) {
    let elements = []
    let filteredComments = []
    for (let i = 0; i < state.filteredComments.length; i++) {
        filteredComments[i] = state.filteredComments[i]
    }
    for (let i = 0; i < state.elements.length; i++) {
        elements[i] = state.elements[i]
    }
    let index, comments
    switch (action.type) {
        case "SHOW_ADD_COMMENT_BOX":
            return {
                ...state,
                tempSelectedElementId: action.data,
                commentPopup: !state.commentPopup
            }
        case "CLEAR_COMMENTS":
            let tempState
            if (state.sidebar === true) {
                tempState = {
                    ...state,
                    filteredComments: [],
                    sidebar:false
                }
            } else {
                tempState = {
                    ...state,
                    sidebar:false
                }
            }
            return tempState
        case "SIDEBAR":
            return {
                ...state,
                sidebar: !state.sidebar
            }
        case "SHOW_SIDEBAR":
            filteredComments = []
            index = elements.findIndex((element) => (element.elementId === action.data))
            if (index !== -1) {
                elements[index].comments.map((comment) => {
                    filteredComments.push(comment)
                    return null
                })
            }
            return {
                ...state,
                filteredComments: filteredComments,
                tempSelectedElementId: action.data,
                sidebar: !state.sidebar
            }
        case "FOCUS_ACTION":
            filteredComments = []
            index = elements.findIndex((element) => (element.elementId === action.data))
            if (index !== -1) {
                elements[index].comments.map((comment) => {
                    filteredComments.push(comment)
                    return null
                })
            }
            return {
                ...state,
                filteredComments: filteredComments,
                tempSelectedElementId: action.data,
            }
        case "SAVE_Comment":
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
        case "CANCEL_COMMENT":
            return {
                ...state,
                commentPopup: !state.commentPopup
            }
        case "ACTION_ON_COMMENT":
            return commentAction(state, action, elements, filteredComments)
        case "FILTER_BY_STATUS":
            filteredComments = []
            index = elements.findIndex((element) => (element.elementId === action.data.elementId))
            comments = elements[index].comments
            if (action.data.status === "ALL") {
                comments.map((comment) => {
                    filteredComments.push(comment)
                    return null
                })
            } else {
                comments.map((comment) => {
                    if (comment.status === action.data.status) {
                        filteredComments.push(comment)
                    }
                    return null
                })
            }
            return {
                ...state,
                filteredComments: filteredComments,
            }
        default:
            return {
                ...state
            }
    }
}

function commentAction(state, action, elements, filteredComments) {
    let fileteredIndex = filteredComments.findIndex((comment) => (comment.commentId === action.data.commentId))
    let index = elements.findIndex((element) => (element.elementId === action.data.elementId))
    let comments = elements[index].comments
    let commentIndex = comments.findIndex((comment) => (comment.commentId === action.data.commentId))
    switch (action.data.responseAction) {
        case "REPLYED":
            comments[commentIndex].responseAction = "ACTION"
            comments[commentIndex].replys.push(action.data.text)
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "EDITED":
            comments[commentIndex].text = action.data.text
            comments[commentIndex].status = "OPEN"
            comments[commentIndex].responseAction = "ACTION"
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "CANCELED":
            comments[commentIndex].responseAction = "ACTION"
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }

        case "REPLY":
            comments[commentIndex].responseAction = "REPLY"
            // comments[commentIndex].replys.push(action.data.text)
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "EDIT":
            // comments[commentIndex].text = action.data.text
            // comments[commentIndex].status = "OPEN"
            comments[commentIndex].responseAction = "EDIT"
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "RESOLVE":
            comments[commentIndex].status = "RESOLVED"
            comments[commentIndex].responseAction = "ACTION"
            filteredComments[fileteredIndex].status = "RESOLVED"
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "DELETE":
            comments.splice(commentIndex, 1)
            filteredComments.splice(fileteredIndex, 1)
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        default:
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
    }

}

export default createStore(comment)