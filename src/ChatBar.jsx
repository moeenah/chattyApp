import React, {Component} from 'react';

class ChatBar extends Component {
  // onKeyDown(event){
  //   if(event.key === 'Enter'){

  //     if (this.content.value === '') {
  //       //alerts user if no message  is entered after hitting enter
  //       alert('Please enter a message');
  //     } else if (this.username.value === '') {
  //       //creates obj with username and content and passes it to add message
  //       let messageObj = {};
  //       messageObj.username = 'Anonymous';
  //       messageObj.content = this.content.value;
  //       this.props.addMessage(messageObj);
  //     } else {
  //       //creates obj with username and content and passes it to add message
  //       let messageObj = {};
  //       messageObj.username = this.username.value;
  //       messageObj.content = this.content.value;
  //       this.props.addMessage(messageObj);
  //     }
  //     this.content.value = "";
  //   }
  // }

  newMessage(event) {
    if(event.key === 'Enter'){

      if (this.content.value === '') {
        //alerts user if no message  is entered after hitting enter
        alert('Please enter a message');
      } else if (this.username.value === '') {
        //creates obj with username and content and passes it to add message
        let messageObj = {};
        messageObj.type = 'postMessage';
        messageObj.username = 'Anonymous';
        messageObj.content = this.content.value;
        this.props.addMessage(messageObj);
      } else {
        //creates obj with username and content and passes it to add message
        let messageObj = {};
        messageObj.type = 'postMessage';
        messageObj.username = this.username.value;
        messageObj.content = this.content.value;
        this.props.addMessage(messageObj);
      }
      this.content.value = "";
    }
  }

  newUser(event) {
    if(event.key === 'Enter'){
      let messageObj = {};
      messageObj.type = 'postNotification';
      messageObj.username = this.username.value;
      //messageObj.content = this.content.value;
      this.props.newUser(messageObj);

    }
  }

  render() {
    return (
      <footer className="chatbar" >
        <input className="chatbar-username" ref={username => this.username = username} defaultValue={this.props.defaultValue} placeholder="Your Name (Optional)" onKeyDown={this.newUser.bind(this)} />
        <input className="chatbar-message" ref={content => this.content = content} placeholder="Type a message and hit ENTER" onKeyDown={this.newMessage.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;


