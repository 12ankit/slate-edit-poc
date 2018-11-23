function getElements(state) {
    let elements = []
    for (let i = 0; i < state.elements.length; i++) {
        elements[i] = state.elements[i]
    }
    return elements
}

function getFilteredComments(state) {
    let filteredComments = []
    for (let i = 0; i < state.filteredComments.length; i++) {
        filteredComments[i] = state.filteredComments[i]
    }
    return filteredComments
}
function showHideSideBar(state, action) {
    let filteredComments = []
    let elements = getElements(state)
    let index, tempSelectedElementId , comments
    index = elements.findIndex((element) => (element.elementId === action.data))
    comments = elements[index].comments
    if (index !== -1) {
        for(let n in comments){
            filteredComments[n] = comments[n]
        }
        tempSelectedElementId = action.data
        return {
            tempSelectedElementId: tempSelectedElementId,
            filteredComments: filteredComments
        }
    }
    return {
        tempSelectedElementId: "NOTHING RETURNED IN METHOD : showHideSideBar",
        filteredComments: "NOTHING RETURNED IN METHOD : showHideSideBar"
    }
}

function commentAction(state, action) {
    let elements = getElements(state)
    let filteredComments = getFilteredComments(state)
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
            return {
                ...state,
                elements: elements,
                filteredComments: filteredComments
            }
        case "EDIT":
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

export {getElements, showHideSideBar, commentAction}