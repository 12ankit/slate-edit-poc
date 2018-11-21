import { createStore } from 'redux'

var defaultStore = {
    sidebar: false,
    commentPopup: false,
    tempSelectedElementId: "textarea0",
    filteredComments: [],
    elements: [{
        elementId: "textarea0",
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
        case "SAVE_Comment":
            index = elements.findIndex((element) => (element.elementId === action.data.elementId))
            elements[index].comments.push({
                commentId: "comment#" + elements[index].comments.length,
                status: "OPEN",
                timeSign: new Date(),
                text: action.data.commentText,
                replys: []
            })
            return {
                ...state,
                elements: elements,
                commentPopup: !state.commentPopup,
                sidebar : false
            }
        case "CANCEL_COMMENT":
            return {
                ...state,
                commentPopup: !state.commentPopup
            }
        case "ACTION_ON_COMMENT":
            return commentAction(state,action,elements,filteredComments)
        case "FILTER_BY_STATUS":
            filteredComments=[]
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

function commentAction(state, action, elements,filteredComments ) {
    let fileteredIndex = filteredComments.findIndex((comment) => (comment.commentId === action.data.commentId))
    let index = elements.findIndex((element) => (element.elementId === action.data.elementId))
    let comments = elements[index].comments
    let commentIndex = comments.findIndex((comment) => (comment.commentId === action.data.commentId))
    switch (action.data.responseAction) {
        case "REPLY":
            comments[commentIndex].replys.push(action.data.text)
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "EDIT":            
            comments[commentIndex].text = action.data.text
            comments[commentIndex].status = "OPEN"
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "RESOLVE":
            comments[commentIndex].status = "RESOLVED"
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
        default :
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
    }

}

export default createStore(comment)