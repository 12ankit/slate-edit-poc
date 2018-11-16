import React, { Component } from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select : ""
        }
    }
    responses = (response) =>{
        switch(response){
            case "edit" :
                return <textarea rows="5" cols="50"></textarea>
        }
    }

    onChange = (e) => {
        this.setState({ select: e.target.value })
        this.props.commentActionHandler(e,{type:"ACTION_ON_COMMENT"})
    }
    render() {
        return (
            <div className="comments">
                <ul>
                    {this.props.comments.map((comment, index) => {
                        if (comment.status !== "UNTOUCHED") {
                            return <li key={comment.elementId} id={comment.elementId}>
                                {comment.elementName}<br />
                                {comment.text}<br />
                                {comment.status}
                                <div className="sidebar-comment-buttons">
                                    <select id={comment.elementId} value={this.state.selectCommentAction} onChange={this.onChange}>
                                        <option value="reply">Reply</option>
                                        <option value="resolve">Resolve</option>
                                        <option value="edit">Edit</option>
                                        <option value="delete">delete</option>
                                    </select>
                                </div>
                                {this.responses(comment.response)}
                            </li>
                        }
                    })}
                </ul>
            </div>
        )
    }
}