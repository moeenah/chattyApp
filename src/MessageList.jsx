import React, {Component} from 'react';

import App from "./App.jsx";

class MessageList extends Component {
  render() {
    return (
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
    );
  }
}

export default MessageList;