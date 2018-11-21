import React, { Component } from "react"

class CommentResponse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textarea: ""
        }
    }
    onClick = (e) =>{
        let comment = this.props.comment
        let response = this.state.textarea
        let responseAction = comment.responseAction === "EDIT" ? "EDITED" : "REPLYED"
        this.props.onClick(e,comment,response, responseAction)
    }
    onChange = (e) => {
        this.setState({ textarea: e.target.value })
    }
    render() {
        let commentText = this.props.commentText !== null ? this.props.commentText : false
        return (
            <div className="commentResponse">
                <textarea value={this.state.comment} onChange={this.onChange} rows="5" cols="35" placeholder="Enter Comment" >
                {commentText ? commentText : ""}
                </textarea>
                <br />
                <button className="save" onClick={this.onClick}>Save</button>{" "}
                <button className="cancel" onClick={this.onClick}>Cancel</button>
            </div>
        )
    }
}

export default CommentResponse