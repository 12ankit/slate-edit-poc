import React, { Component } from "react"
import {connect} from 'react-redux'

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
                        elementId: this.props.elementInfo.elementId,
                        elementName: this.props.elementInfo.elementName ,
                        text: this.state.comment,
                        status: "OPEN",
                        responseAction: "",
                        response:""
                    }
                })
        } else {
            this.props.dispatch({ type: "CANCEL_COMMENT" })
        }
    }
    render() {
        return (
            <div className="comment-popup" style={{ display: this.props.display ? "inline" : "none", position: "fixed", margin: "350px 0px 0px -300px"}}>
                <textarea value={this.state.comment} onChange={this.onChange} rows="5" cols="80" placeholder="Enter Your Comment"/>
                <br />
                <button className="save" onClick={this.onClick}>Save</button>{" "}
                <button className="cancel" onClick={this.onClick}>Cancel</button>
            </div>
        )
    }
}export default connect()(CommentPopup)