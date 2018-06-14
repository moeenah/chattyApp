import React, {Component} from 'react';

class Message extends Component {
  render() {

    const populate = (this.props.type === 'incomingNotification') ? (
      <span className="notification-content">{this.props.content}</span>
    ) : (
      <div>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );


    return (
      <div className="message">
        {populate}
      </div>
    );
  }
}

export default Message;