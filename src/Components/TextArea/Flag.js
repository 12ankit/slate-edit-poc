import React, { Component } from "react"

export default class TextArea extends Component {
    render() {
        let style = this.props.status === "OPEN" ? 'red' : ''
        return (
            <div className='flag' style={{ background: style }}>
                <img src='https://images.vexels.com/media/users/3/130335/isolated/preview/8895fce21acb5e4046753456aa05328f-flat-flag-icon-by-vexels.png'
                    className='element-icon' alt='flag' width='19px' height='19px' />
            </div>
        )
    }
}