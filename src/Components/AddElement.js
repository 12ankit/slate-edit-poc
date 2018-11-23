import React, { Component } from 'react'
import {connect} from 'react-redux'

class AddElement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: false,
            show:false
        }
    }
    onClick = (e) => {
        this.setState({options:!this.state.options})
        this.props.dispatch({ type: "ADD_ELEMENT", data: {
            elementToAdd : e.target.id,
            elementId : this.props.elementId
        }})
    }
    onMouseEnter = () => {
        this.setState({show:true})
    }
    onMouseLeave = () => {
        this.setState({show:false ,options:false})
    }
    render() {
        return (
            <div className="addElements" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <img className={this.state.show ? "" : "visibility"} src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/30-512.png" alt="Add Elements"
                    onClick={() => { this.setState({ options: !this.state.options }) }} />
                <ul className={this.state.options ? "" : "hide"}>
                    <li id="textarea" onClick={this.onClick}>TextArea</li>
                </ul>
            </div>
        )
    }
}

export default connect()(AddElement)