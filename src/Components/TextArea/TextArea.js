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
    render() {
        return (
            <div className='element'>
                <textarea value={this.state.textarea} onChange={this.onChange} rows="5" cols="100" placeholder="Enter Text Here" />
                <div className='elements-right-sidebar'>
                    <CommentButton elementName="TextArea" elementId={this.props.elementId} />
                    <Flag status={this.props.flagStatus} />
                </div>
            </div>
        )
    }
}