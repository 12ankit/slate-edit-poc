import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import TextArea from './Components/TextArea/TextArea.js'
import SideBar from './Components/SideBar/SideBar.js'
import CommentPopup from './Components/CommentPopup.js'

class App extends Component {
  findElement = (elementId) => {
    let elements = this.props.elements
    let index = elements.findIndex(element => element.elementId === elementId)
    if (elements[index].comments.length) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className="App" /*style={{filter:this.state.commentPopup ? "blur(5px)" :""}}*/>
        <div className="">
          <SideBar tempSelectedElementId={this.props.tempSelectedElementId}
            display={this.props.sidebar}
            dispatch={this.props.dispatch}
            filteredComments={this.props.filteredComments} />
        </div>
        <CommentPopup display={this.props.commentPopup} elementId={this.props.tempSelectedElementId} />
        <div className="App-header">
          {this.props.elements.map((element, index) => {
            let elementToAdd
            if (element.elementName === "textarea") {
              elementToAdd = <TextArea key={index} elementName={element.elementName}
                elementId={element.elementId} flagStatus={this.findElement(element.elementId)} dispatch={this.props.dispatch} />
            }
            return elementToAdd
          })}
        </div>
      </div>
    );
  }
}

export default connect(function (state, ownProps) {
  return {
    ...state
  }
})(App);
