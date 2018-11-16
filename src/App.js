import React, { Component } from 'react';
import './App.css';
import TextArea from './Components/TextArea/TextArea.js'
import SideBar from './Components/SideBar/SideBar.js'
import CommentPopup from './Components/TextArea/CommentPopup.js'

//TODO : Write response of author on comments in responses function in Comments.js file

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebar: false,
      commentPopup: false,
      tempSelectedElementId: "",
      comments: [{
        elementId: "textarea0",
        elementName : "",
        text: "",
        status: "UNTOUCHED",
        response: ""
      },
      {
        elementId: "textarea1",
        elementName : "",
        text: "",
        status: "UNTOUCHED",
        response: ""
      },
      {
        elementId: "textarea2",
        elementName : "",
        text: "",
        status: "UNTOUCHED",
        response: ""
      }]
    }
  }

  onClick = (e, action) => {
    switch (action.type) {
      case "SHOW_ADD_COMMENT_BOX":
        this.setState({
          tempSelectedElementId: action.data,
          commentPopup: !this.state.commentPopup
        })
        break;
      case "SAVE_Comment":
        let comments = this.state.comments
        let isCommentPresent = false
        comments.map((comment,index) => {
          if(comment.elementId === action.data.elementId){
            comment.elementName = action.data.elementName
            comment.text = action.data.text
            comment.status = action.data.status
            comment.response = action.data.response
            isCommentPresent = true
          }
        })
        if(!isCommentPresent){
          comments.push(action.data)
        }
        this.setState({
          comments: comments,
          commentPopup: !this.state.commentPopup
        })
        break;
      case "CANCEL_COMMENT":
        this.setState({
          commentPopup: !this.state.commentPopup
        })
        break;
    }
  }

  commentActionHandler = (e,action) => {
    switch(action.type){
      case "ACTION_ON_COMMENT" :
        let comments = this.state.comments
        comments.map((comment,index)=>{
          if(comment.elementId===e.target.id){
            comment.response = e.target.value
          }
        })
        this.setState({comments:comments})
        break
    }
  }

  editComment(){
    
  }

  findElement = (elementId) => {
    let comments = this.state.comments
    let status
    comments.map((comment, index) => {
      if (comment.elementId === elementId) {
        status = comment.status
      }
      return null
    })
    return status
  }

  render() {
    return (
      <div className="App">
        {this.state.sidebar ? <SideBar commentActionHandler={this.commentActionHandler} comments={this.state.comments} /> : ""}
        {this.state.commentPopup ? <CommentPopup elementInfo={this.state.tempSelectedElementId} onClick={this.onClick} /> : ""}
        <button type="button" style={{ display: "inline", float: "left" }} onClick={() => { this.setState({ sidebar: !this.state.sidebar }) }}>
          Nav
        </button>
        <div className="App-header">
          <TextArea elementName="TextArea" elementId='textarea0' flagStatus={this.findElement("textarea0")} onClick={this.onClick} />
          <br />
          <TextArea elementName="TextArea" elementId='textarea1' flagStatus={this.findElement("textarea1")} onClick={this.onClick} />
          <br />
          <TextArea elementName="TextArea" elementId='textarea2' flagStatus={this.findElement("textarea2")} onClick={this.onClick} />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
