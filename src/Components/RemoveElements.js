import React,{Component} from 'react'
import {connect} from 'react-redux'

class RemoveElement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false
        }
    }
    onClick = (e) => {
        this.props.dispatch({type:"REMOVE_ELEMENTS", data: this.props.elementId})
    }
    onMouseEnter = () => {
        this.setState({show:true})
    }
    onMouseLeave = () => {
        this.setState({show:false})
    }
    render(){
        return (
            <div className="removeElement" onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <img className={this.state.show ? "" : "visibility"} src="https://cdn1.iconfinder.com/data/icons/basic-ui-7/100/Artboard_16-512.png" alt="Remove Element" width="30px" height="30px" />
            </div>
        )
    }
}
export default connect()(RemoveElement)