import React, {Component} from 'react';

import MessageList from "./MessageList.jsx";

class Message extends Component {
  render() {
    return (
        <main className="messages">
          {this.props.messages}
          {/*<div className="message system">
            Anonymous1 changed their name to nomnom.
          </div>*/}
        </main>
    );
  }
}

export default Message;