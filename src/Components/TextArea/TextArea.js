import React, { Component } from "react"
import Flag from './Flag.js'
import CommentButton from './CommentButton.js'
import AddElement from "../AddElement.js";
import RemoveElement from "../RemoveElements.js"

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
                        type: "SHOW_HIDE_ADD_COMMENT_BOX",
                        data: this.props.elementId
                    })
                break
            case "FLAG":
                this.props.dispatch(
                    {
                        type: "SHOW_HIDE_SIDEBAR",
                        data: this.props.elementId
                    })
                break
            default :
                return null
        }
    }
    onFocus = (e) => {
        this.props.dispatch({
            type:"FOCUS_ACTION",
            data: this.props.elementId
        })
    }
    render() {
        return (
            <div className='element'>
                <textarea onFocus={this.onFocus} value={this.state.textarea} onChange={this.onChange} rows="5" cols="100" placeholder="Enter Text Here" />
                <div className='elements-right-sidebar' onMouseEnter={()=>{this.setState({addOptions :true})}} >
                    <RemoveElement elementId={this.props.elementId}/>
                    <CommentButton onClick={this.onClick} onMouseLeave={()=>{this.setState({addOptions:false})}}/>
                    <Flag status={this.props.flagStatus} onClick={this.onClick} />
                </div>
                <AddElement elementId={this.props.elementId}/>
            </div>
        )
    }
}