import React, { Component } from "react"
import Flag from './Flag.js'
import CommentButton from './CommentButton.js'

export default class TextArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textarea: ""
        }
    }
    onChange = (e) => {
        this.setState({ textarea: e.target.value })
    }
    onClick = (element) => {
        switch (element) {
            case "BUTTON":
                this.props.dispatch(
                    {
                        type: "SHOW_ADD_COMMENT_BOX",
                        data: this.props.elementId
                    })
                break
            case "FLAG":
                this.props.dispatch(
                    {
                        type: "SHOW_SIDEBAR",
                        data: this.props.elementId
                    })
                break
            default :
                return null
        }
    }
    render() {
        return (
            <div className='element'>
                <textarea value={this.state.textarea} onChange={this.onChange} rows="5" cols="100" placeholder="Enter Text Here" />
                <div className='elements-right-sidebar'>
                    <CommentButton onClick={this.onClick} />
                    <Flag status={this.props.flagStatus} onClick={this.onClick} />
                </div>
            </div>
        )
    }
}