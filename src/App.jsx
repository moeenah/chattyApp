import React, {Component} from 'react';

import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [],
                    numOfClients: {},
                    clientColour: {}
                  };
  }

  //updates user in state
  newUser(message) {
    const oldUserName = this.state.currentUser.name;
    const newUserName = message.username;
    if (newUserName !== oldUserName) {
      if (oldUserName !== undefined) {
        message.content = `${oldUserName} has changed their name to ${newUserName}`;
      } else if (oldUserName === undefined || oldUserName === 'Anonymous') {
        message.content = `Anonymous has logged in as ${newUserName}`;
      }
      //assign corresponding user's current user name
      let newUser = {};
      const oldUser = this.state.currentUser;
      newUser.name = message.username;
      const addNewUser = {...oldUser, ...newUser};
      this.setState({ currentUser: addNewUser});
      //assign corresponding user's current user name
      this.chatty_server.send(JSON.stringify(message));
    }
  }

 //sends message to server
  sendText(message) {
    //checks if username is changed while entering message
    const oldUserName = this.state.currentUser.name;
    const newUserName = message.username;
    const originalContent = message.content;
    if (newUserName !== oldUserName) {
      if (oldUserName !== undefined) {
        message.content = `${oldUserName} has changed their name to ${newUserName}`;
      } else if (oldUserName === undefined || oldUserName === 'Anonymous') {
        message.content = `Anonymous has logged in as ${newUserName}`;
      }
      //assign corresponding user's current user name
      let newUser = {};
      const oldUser = this.state.currentUser;
      newUser.name = message.username;
      const addNewUser = {...oldUser, ...newUser};
      this.setState({ currentUser: addNewUser});
      //assign corresponding user's current user name
      message.colour = this.state.clientColour.colour;
      message.type = "postNotification";
      this.chatty_server.send(JSON.stringify(message));
      //displays message after username change
      message.type = "postMessage";
      message.content = `${originalContent}`;
      this.chatty_server.send(JSON.stringify(message));
      //checks if username is changed while entering message
    } else {
      //assigns corresponding user's unique colour to state
      message.colour = this.state.clientColour.colour;
      message.conent = originalContent;
      this.chatty_server.send(JSON.stringify(message));
    }
  }

  componentDidMount() {
    //connects to websocket server
    this.chatty_server = new WebSocket("ws://localhost:3001/");
    this.chatty_server.onopen = function (event) {
      console.log("Connected to SERVER");
    };
    //adds message recieved from server (with id) to state
    var _this = this;
    this.chatty_server.onmessage = function (event) {
      const oldMessages = _this.state.messages;
      let newMessage = (JSON.parse(event.data));
      // handle incoming message
      if (newMessage.type === "incomingMessage") {
        const addNewMessage = [...oldMessages, newMessage];
        _this.setState({ messages: addNewMessage });
      }
      // handle incoming notification
      if (newMessage.type === "incomingNotification") {
        const addNewMessage = [...oldMessages, newMessage];
        _this.setState({ messages: addNewMessage });
      };
      //handles incoming info about num of users
      if (newMessage.numOfClients !== undefined) {
        //assigns number of users to state
        let newNum = {};
        const oldNum = _this.state.numOfClients;
        newNum.num = JSON.parse(event.data).numOfClients;
        const updateNum = {...oldNum, ...newNum};
        _this.setState({ numOfClients: updateNum});
        // //assigns client colour to state
        let newColour = {};
        const oldColour = _this.state.clientColour;
        newColour.colour = JSON.parse(event.data).colour;
        const updateColour = {...oldColour, ...newColour};
        _this.setState({ clientColour: updateColour});
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar numOfClients={this.state.numOfClients.num} />
         <MessageList messages={this.state.messages} />
        <ChatBar newUser={this.newUser.bind(this)} addMessage={this.sendText.bind(this)} defaultValue={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;