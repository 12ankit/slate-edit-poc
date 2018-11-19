import { createStore } from 'redux'

var defaultStore = {
    sidebar: false,
    commentPopup: false,
    tempSelectedElementId: "",
    fileteredComments:[],
    comments: [{
        elementId: "textarea0",
        elementName: "",
        text: "",
        status: "UNTOUCHED",
        responseAction: "",
        response: ""
    },
    {
        elementId: "textarea1",
        elementName: "",
        text: "",
        status: "UNTOUCHED",
        responseAction: "",
        response: ""
    },
    {
        elementId: "textarea2",
        elementName: "",
        text: "",
        status: "UNTOUCHED",
        responseAction: "",
        response: ""
    }],
}

function comment(state = defaultStore, action) {
    let index
    let comments = []
    for (let i = 0; i < state.comments.length; i++) {
        comments[i] = state.comments[i]
    }
    switch (action.type) {
        case "SHOW_ADD_COMMENT_BOX":
            return {
                ...state,
                tempSelectedElementId: action.data,
                commentPopup: !state.commentPopup
            }

        case "SAVE_Comment":
            index = comments.findIndex(comment => comment.elementId === action.data.elementId)
            if (index || index==0) {
                comments[index].elementName = action.data.elementName
                comments[index].text = action.data.text
                comments[index].status = action.data.status
                comments[index].responseAction = action.data.responseAction
                comments[index].response = action.data.response
            } else {
                comments.push(action.data)
            }
            return {
                ...state,
                comments: comments,
                commentPopup: !state.commentPopup
            }

        case "CANCEL_COMMENT":
            return {
                ...state,
                commentPopup: !state.commentPopup
            }

        case "SHOW_SIDEBAR":
            return {
                ...state,
                sidebar: !state.sidebar
            }

        case "ACTION_ON_COMMENT":
            index = comments.findIndex(comment => comment.elementId === action.data.elementId)
            let responseAction = action.data.responseAction
            comments[index].responseAction = responseAction
            if(responseAction==="DELETE"){
                comments[index].text = ""
                comments[index].status = "UNTOUCHED"
                comments[index].responseAction = ""
                comments[index].response = "DELETED"
            } else if(responseAction==="RESOLVE"){
                comments[index].status = responseAction
            }
            return {
                ...state,
                comments: comments
            }
        case "EDIT_COMMENT" :
            index = comments.findIndex(comment => comment.elementId === action.data.elementId)  
            comments[index].text = action.data.text
            comments[index].responseAction = action.data.responseAction
            comments[index].response = action.data.response
            return {
                ...state ,
                comments : comments
            }
        case "FILTER_BY_STATUS" :
            let fileteredComments = []
            comments.map((comment,index)=>{
                if(comment.status === action.data){
                    fileteredComments.push(comment)
                }
            })
            return{
                ...state,
                fileteredComments,
            }
        default:
            return {
                ...state
            }
    }
}

export default createStore(comment)