import React, {Component} from 'react';

import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    //iterates over messages array
     const Messages = this.props.messages.map(message => (
      <Message key={message.id} username={message.username} content={message.content} type={message.type} />

    ));
    {/*const Messages = (this.props.messages.length !== undefined) && (this.props.messages.map(message => (
      <Message key={message.id} username={message.username} content={message.content} />
    )) );*/}

    return (
      <main className="messages">
        {Messages}
        {/*<div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>*/}
      </main>
    );
  }
}

export default MessageList;