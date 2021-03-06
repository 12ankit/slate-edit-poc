import React, { Component } from "react"
import { connect } from 'react-redux'

class CommentPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }
    onChange = (e) => {
        this.setState({ comment: e.target.value })
    }
    onClick = (e) => {
        if (e.target.className === "save") {
            this.props.dispatch(
                {
                    type: "SAVE_Comment",
                    data: {
                        elementId: this.props.elementId,
                        commentText: this.state.comment,
                    }
                })
            this.setState({ comment: "" })
        } else {
            this.props.dispatch({ type: "SHOW_HIDE_ADD_COMMENT_BOX" , data : null })
        }
    }
    render() {
        return (
            <div className="comment-popup" style={{ display: this.props.display ? "inline" : "none", color: "white", background: "gray", position: "fixed", margin: "300px 0px 0px 500px", padding: "10px" }}>
                Please enter a note<br />

                <textarea value={this.state.comment} onChange={this.onChange} rows="5" cols="80" placeholder="Type..." />
                <br />
                <button className="save" onClick={this.onClick}>Save</button>{" "}
                <button className="cancel" onClick={this.onClick}>Cancel</button>
            </div>
        )
    }
} export default connect()(CommentPopup)