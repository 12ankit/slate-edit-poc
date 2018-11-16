import React, { Component } from "react"

export default class CommentPopup extends Component {
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
        if (e.target.id === "save") {
            this.props.onClick(
                e, {
                    type: "SAVE_Comment",
                    data: {
                        elementId: this.props.elementInfo.elementId,
                        elementName: this.props.elementInfo.elementName ,
                        text: this.state.comment,
                        status: "OPEN"
                    }
                })
        } else {
            this.props.onClick(e, { type: "CANCEL_COMMENT" })
        }
    }
    render() {
        return (
            <div className="comment-popup" style={{ display: "inline", position: "fixed", margin: "350px 0px 0px 0px" }}>
                <textarea value={this.state.comment} onChange={this.onChange} rows="5" cols="80" />
                <br />
                <button id="save" onClick={this.onClick}>Save</button>
                <button id="cancel" onClick={this.onClick}>Cancel</button>
            </div>
        )
    }
}