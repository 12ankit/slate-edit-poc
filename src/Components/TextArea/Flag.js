import React, { Component } from "react"

export default class Flag extends Component {
    render() {
        let style = this.props.status ? 'inline-block' : 'none'
        return (
            <div className='flag' style={{ background: "#ff3333",display:style }}>
                <img style={{filter: "invert(100%)"}} src='https://images.vexels.com/media/users/3/130335/isolated/preview/8895fce21acb5e4046753456aa05328f-flat-flag-icon-by-vexels.png'
                    className='element-icon' alt='flag' width='19px' height='19px' onClick={() =>{this.props.onClick("FLAG")}} />
            </div>
        )
    }
}