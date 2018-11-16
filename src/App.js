import React, { Component } from 'react';
import './App.css';
import TextArea from './Components/TextArea/TextArea.js'
import SideBar from './Components/SideBar/SideBar.js'
import CommentPopup from './Components/CommentPopup.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebar: false,
      commentPopup: false,
      tempSelectedElementId: "",
      comments: [{
        elementId: "textarea0",
        text: "",
        status: "UNTOUCHED"
      },
      {
        elementId: "textarea1",
        text: "",
        status: "UNTOUCHED"
      },
      {
        elementId: "textarea2",
        text: "",
        status: "UNTOUCHED"
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
        comments.push(action.data)
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
        {this.state.sidebar ? <SideBar comments={this.state.comments} /> : ""}
        {this.state.commentPopup ? <CommentPopup elementId={this.state.tempSelectedElementId} onClick={this.onClick} /> : ""}
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
