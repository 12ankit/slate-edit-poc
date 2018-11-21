import React, { Component } from 'react'
import CommentResponse from "./CommentResponse.js"

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: "ACTION",
            responseAction: "ACTION",
        }
    }

    onClick = (e, comment, response) => {
        if (e.target.className === "save") {
            // if (!window.confirm()) {
            //     return null
            // }
            this.props.dispatch(
                {
                    type: "ACTION_ON_COMMENT",
                    data: {
                        elementId: this.props.elementId,
                        commentId: comment.commentId,
                        text: response,
                        responseAction: this.state.responseAction
                    }
                })
        }
        this.setState({ responseAction: "ACTION" })
    }

    onChange = (e) => {
        let responseAction = e.target.value
        if (responseAction === "RESOLVE" || responseAction === "DELETE") {
            this.props.dispatch({
                type: "ACTION_ON_COMMENT",
                data: {
                    elementId: this.props.elementId,
                    commentId: e.target.id,
                    responseAction: e.target.value
                }
            })
        } else {
            this.setState({ responseAction: responseAction })
        }
    }

    render() {
        let filteredComments = this.props.filteredComments
        if (this.props.sort === "NEWESTFIRST") {
            filteredComments.sort((a, b) => { return b.timeSign.getTime() - a.timeSign.getTime() })
        } else {
            filteredComments.sort((a, b) => { return a.timeSign.getTime() - b.timeSign.getTime() })
        }
        return (<div className="comments">
            {filteredComments.map((comment, index) => {
                if (comment.text.search(this.props.searchedComment) !== -1) {
                    return (<div className="comment" key={index} id={"comment" + index}>
                        <header className="comment-header">
                            <img src="https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png" alt="user" width="60px" height="60px" style={{ float: "left" }} />
                            <p className="date"><span style={{ fontWeight: "bold", fontSize: "14px" }}>c5c5</span><br />{comment.timeSign.toString()}</p>
                            <div className="sidebar-comment-buttons">
                                <select className="comment-select" id={comment.commentId} value={this.state.select} onChange={this.onChange}>
                                    <option value="ACTION">Action</option>
                                    <option value="REPLY">Reply</option>
                                    <option value="RESOLVE">Resolve</option>
                                    <option value="EDIT">Edit</option>
                                    <option value="DELETE">Delete</option>
                                </select>
                            </div>
                        </header><hr />
                        <table>
                            <tbody>
                                <tr><td> {
                                    this.state.responseAction === "EDIT" ? <CommentResponse elementId={this.props.elementId}
                                        commentText={comment.text} comment={comment}
                                        dispatch={this.props.dispatch}
                                        onClick={this.onClick} /> : comment.text}</td></tr>
                                <tr><td><b>Status : </b></td><td> {comment.status}</td></tr>
                                <tr><td><b>Replys : </b></td><td> {comment.replys.length}</td></tr>
                            </tbody>
                        </table>
                        {comment.replys.map((reply, index) => {
                            return <div className="replys">
                                <h1>Reply #{index} :</h1>
                                <p>{reply}</p>
                            </div>
                        })}
                        {this.state.responseAction === "REPLY" ? <CommentResponse elementId={this.props.elementId} commentText={null} comment={comment} dispatch={this.props.dispatch} onClick={this.onClick} /> : null}
                    </div>)
                }
                return null
            })}
            <br />
            <br />
        </div>)
    }
}

export default Comments