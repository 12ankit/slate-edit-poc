import React, { Component } from 'react'

class CommentButton extends Component {
    render() {
        return (
            <div>
                <button type='button' className='comment-button' onClick={() =>{this.props.onClick("BUTTON")}}>
                    <img src="https://cdn2.iconfinder.com/data/icons/business-and-internet/512/Note-512.png"
                        alt='add comment' width='15px' height='15px' />
                </button>
            </div>
        )
    }
}

export default CommentButton