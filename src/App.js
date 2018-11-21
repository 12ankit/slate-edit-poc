import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css';
import TextArea from './Components/TextArea/TextArea.js'
import SideBar from './Components/SideBar/SideBar.js'
import CommentPopup from './Components/TextArea/CommentPopup.js'

class App extends Component {
  findElement = (elementId) => {
    let elements = this.props.elements
    let index = elements.findIndex(element => element.elementId === elementId)
    if(elements[index].comments.length){
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
            filteredComments={this.props.filteredComments}/>
        </div>
        <CommentPopup display={this.props.commentPopup} elementId={this.props.tempSelectedElementId} />
        <div className="App-header">
          <TextArea elementName="TextArea" elementId='textarea0' flagStatus={this.findElement("textarea0")} dispatch={this.props.dispatch}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea1' flagStatus={this.findElement("textarea1")} dispatch={this.props.dispatch}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea2' flagStatus={this.findElement("textarea2")} dispatch={this.props.dispatch}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea3' flagStatus={this.findElement("textarea3")} dispatch={this.props.dispatch}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea4' flagStatus={this.findElement("textarea4")} dispatch={this.props.dispatch}/>
          <br />
        </div>
      </div>
    );
  }
}

export default connect(function (state,ownProps){
  return{
    ...state
  }
})(App);
