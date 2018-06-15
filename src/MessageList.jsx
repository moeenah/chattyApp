import React, {Component} from 'react';

import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
   // console.log(this.props.messages)

    // Messages() {
    //  //  let finalMarkup;
    //  //  (this.props.messages).forEach(function(message) {
    //  //    console.log(message);
    //     var content = message.content
    //     var lastThree = content.substr(content.length - 3);
    //  //    if (message.type === "incomingMessage" && ( lastThree === 'jpg' || lastThree === 'png' || lastThree === 'gif')) {
    //  //      console.log('sending images working')
    //  //      finalMarkup = <img src={message.content} />;
    //  //    } if (message.type === "incomingMessage") {
    //  //      console.log('sending text working')
    //  //      finalMarkup = (<Message key={message.id} username={message.username} content={message.content} colour={message.colour} />);
    //  //    } if (message.type === "incomingNotification") {
    //  //      console.log('changin username working')
    //  //      finalMarkup = (<Notification key={message.id} content={message.content} />);
    //  //    }
    //  //  });
    //  // return finalMarkup;
    //   const Messagess = this.props.messages.map(message => (
    //     var content = message.content
    //     var lastThree = content.substr(content.length - 3);
    //     if (message.type === "incomingMessage" && ( lastThree === 'jpg' || lastThree === 'png' || lastThree === 'gif')) {
    //       console.log('sending images working')
    //       <img src={message.content} />;
    //     } if (message.type === "incomingMessage") {
    //       console.log('sending text working')
    //       <Message key={message.id} username={message.username} content={message.content} colour={message.colour} />
    //     } if (message.type === "incomingNotification") {
    //       console.log('changin username working')
    //       <Notification key={message.id} content={message.content} />
    //     }
    //   ));
    //   return Messagess;
    // }

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