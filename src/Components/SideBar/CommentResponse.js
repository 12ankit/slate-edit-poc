import React, { Component } from "react"

class CommentResponse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textarea: ""
        }
    }
    onChange = (e) => {
        this.setState({ textarea: e.target.value })
    }
    onClick = (e) => {
        let response = this.props.comment.responseAction
        switch (response) {
            case "EDIT":
                if (e.target.className === "save") {
                    this.props.dispatch(
                        {
                            type: "EDIT_COMMENT",
                            data: {
                                elementId: this.props.comment.elementId,
                                text: this.state.textarea,
                                responseAction: "NONE",
                                response: "EDITED"
                            }
                        })
                }
                break
            case "REPLY":
                if (e.target.className === "save") {
                    this.props.dispatch(
                        {
                            type: "EDIT_COMMENT",
                            data: {
                                ...this.props.comment,
                                elementId: this.props.comment.elementId,
                                responseAction: "NONE",
                                response: this.state.textarea
                            }
                        })
                }
                break
            default:
                this.props.dispatch(
                    {
                        type: "EDIT_COMMENT",
                        data: {
                            ...this.props.comment,
                            responseAction: "NONE"
                        }
                    })
        }
    }
    render() {
        return (
            <div className="commentResponse">
                <textarea value={this.state.comment} onChange={this.onChange} rows="5" cols="50" placeholder="Enter Comment" />
                <br />
                <button className="save" onClick={this.onClick}>Save</button>
                <button className="cancel" onClick={this.onClick}>Cancel</button>
            </div>
        )
    }
}

export default CommentResponse