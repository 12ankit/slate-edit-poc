var defaultStore ={
    "commentPopup": false,
}

function popup(state = defaultStore, action) {
    switch (action.type) {
        case "SHOW_HIDE_ADD_COMMENT_BOX":
            return {
                ...state,
                commentPopup: !state.commentPopup
            }
        case "SAVE_Comment":
            return {
                ...state,
                commentPopup: false,
            }

        default:
            return {
                ...state
            }
    }
}



export default popup