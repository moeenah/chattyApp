import React, {Component} from 'react';

class Message extends Component {
  render() {
    const colour = {color: this.props.colour};
    let content = this.props.content
    //gets last three characters of string to check for image or gif
    let lastThree = content.substr(content.length - 3);
    //splits message and img source
    let index = content.lastIndexOf(" ");
    let message = content.substr(0, index);
    let img_src = content.substr(index + 1);
    console.log(lastThree);
    const Messages = (lastThree === "jpg" || lastThree === "png" || lastThree === "gif") ? (
      <div className="picture">
        <span className="message-content">{message}</span>
        <img className="message-picture" src={img_src} />
      </div>
      ) : (
        <span className="message-content">{this.props.content}</span>
      )

    return (
      <div className="message">
        <span className="message-username" style={colour}>{this.props.username}</span>
        {Messages}
      </div>
    );
  }
}

export default Message;