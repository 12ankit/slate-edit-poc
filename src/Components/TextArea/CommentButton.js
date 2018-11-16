import React, { Component } from 'react'

export default class CommentButton extends Component {
    onClick = (e) => {
        this.props.onClick(
            e,
            { 
                type: "SHOW_ADD_COMMENT_BOX",
                data: this.props.elementId })
    }
    render() {
        return (
            <div className="comment-button">
                <button type='button' className='comment-button' onClick={this.onClick}>
                    <img src="https://cdn2.iconfinder.com/data/icons/business-and-internet/512/Note-512.png"
                        alt='add comment' width='10px' height='10px' />
                </button>
            </div>
        )
    }
}