import React, { Component } from 'react'
import {connect} from 'react-redux'

class CommentButton extends Component {
    onClick = () => {
        this.props.dispatch(
            { 
                type: "SHOW_ADD_COMMENT_BOX",
                data: {
                    elementId : this.props.elementId,
                    elementName : this.props.elementName
                }})
    }
    render() {
        return (
            <div>
                <button type='button' className='comment-button' onClick={this.onClick}>
                    <img src="https://cdn2.iconfinder.com/data/icons/business-and-internet/512/Note-512.png"
                        alt='add comment' width='15px' height='15px' />
                </button>
            </div>
        )
    }
}

export default connect()(CommentButton)