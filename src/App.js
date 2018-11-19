import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css';
import TextArea from './Components/TextArea/TextArea.js'
import SideBar from './Components/SideBar/SideBar.js'
import CommentPopup from './Components/TextArea/CommentPopup.js'

//TODO : Write response of author on comments in responses function in Comments.js file

class App extends Component {
  findElement = (elementId) => {
    let comments = this.props.comments
    let index = comments.findIndex(comment => comment.elementId === elementId)
    return comments[index]
  }

  render() {
    return (
      <div className="App" /*style={{filter:this.state.commentPopup ? "blur(5px)" :""}}*/>
        <SideBar display={this.props.sidebar} comments={this.props.comments} dispatch={this.props.dispatch}/>
        <CommentPopup display={this.props.commentPopup} elementInfo={this.props.tempSelectedElementId} />
        <button type="button" style={{ display: "inline", float: "left" }} onClick={() => { this.props.dispatch({type:"SHOW_SIDEBAR"}) }}>
        ☰ 
        </button>
        <div className="App-header" style={{filter:this.props.commentPopup ? "blur(20px)" :""}}>
          <TextArea elementName="TextArea" elementId='textarea0' flagStatus={this.findElement("textarea0").status}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea1' flagStatus={this.findElement("textarea1").status}/>
          <br />
          <TextArea elementName="TextArea" elementId='textarea2' flagStatus={this.findElement("textarea2").status}/>
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
