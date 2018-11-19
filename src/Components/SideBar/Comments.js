import React, { Component } from 'react'
import CommentResponse from "./CommentResponse.js"
import {connect} from 'react-redux'

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onClick = (e) => {
        if(window.confirm()){
            return null
        }
        this.onChange(e)
    }

    onChange = (e) => {
        this.setState({ [e.target.id+"-Select"]: e.target.value })
        this.props.dispatch({
            type:"ACTION_ON_COMMENT",
            data:{
                elementId:e.target.id,
                responseAction:e.target.value
            }
        })
    }

    createLi = (comment) => {
        return <li key={comment.elementId} id={comment.elementId}>
                        {comment.elementName}<br />
                        {comment.text}<br />
                        {comment.status}<br/>
                        {comment.response !== "" ? "Reply : "+comment.response :""}
                        <div className="sidebar-comment-buttons">
                            <select id={comment.elementId} value={this.state[comment.elementId+"-Select"]} onChange={this.onChange} onSelect={this.onClick}>
                                <option value="">Action</option>
                                <option value="REPLY">Reply</option>
                                <option value="RESOLVE">Resolve</option>
                                <option value="EDIT">Edit</option>
                                <option value="DELETE">Delete</option>
                            </select>
                        </div>
                        {comment.responseAction ==="EDIT" || comment.responseAction === "REPLY" ? <CommentResponse comment={comment} dispatch={this.props.dispatch} /> : null}
                    </li>
    }

    render() {
        let comments 
        if(this.props.filter === "ALL"){
            comments = <ul>
            {this.props.comments.map((comment, index) => {
                if (comment.status !== "UNTOUCHED" && comment.text.search(this.props.searchedComment)!=-1) {
                    return this.createLi(comment)
                }
            })}
        </ul>
        }
        else {
            comments = <ul>
            {this.props.fileteredComments.map((comment, index) => {
                if (comment.status !== "UNTOUCHED" && comment.text.search(this.props.searchedComment)!=-1) {
                    return this.createLi(comment)
                }
            })}
        </ul>
        }
        return (
            <div className="comments">
                {comments}
            </div>
        )
    }
}

export default connect(state => ({fileteredComments : state.fileteredComments}))(Comments)