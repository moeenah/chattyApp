import React, {Component} from 'react';

import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
     const Messages = this.props.messages.map(message => ( (message.type === "incomingMessage") ? (
      <Message key={message.id} username={message.username} content={message.content} colour={message.colour} />
      ) : (
        <Notification key={message.id} content={message.content} />
      )
    ));
    return (
      <main className="messages">
        {Messages}
      </main>
    );
  }
}

export default MessageList;