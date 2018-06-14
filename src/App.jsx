import React, {Component} from 'react';

import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [],
                    numOfClients: {}
                  };
  }

  //updates user in state
  newUser(message) {
    const oldUser = this.state.currentUser;
    const newUserName = message.username;
    if (newUserName !== oldUser.name) {
      if (oldUser.name !== undefined) {
        message.content = `${oldUser.name} has changed their name to ${newUserName}`;
      } else if (oldUser.name === undefined || oldUser.name === 'Anonymous') {
        message.content = `You are logged in as ${newUserName}`;
      }
      this.chatty_server.send(JSON.stringify(message));
    }
    //console.log(message)
  }

 //sends message to server
  sendText(message) {
      //console.log(message);
      this.chatty_server.send(JSON.stringify(message));
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
      // console.log(JSON.parse(event.data));
      // handle incoming message
      const oldMessages = _this.state.messages;
      let newMessage = (JSON.parse(event.data));
      const addNewMessage = [...oldMessages, newMessage];
      _this.setState({ messages: addNewMessage });
      // handle incoming notification
      if (newMessage.type === "incomingNotification") {
        let newUser = {};
        const oldUser = _this.state.currentUser;
        newUser.name = newMessage.username;
        const addNewUser = {...oldUser, ...newUser};
        _this.setState({ currentUser: addNewUser});
      };
      //handles incoming info about num of users
      // if (event.data.numOfClients !== undefined) {
      if (JSON.parse(event.data).numOfClients !== undefined) {
        let newNum = {};
        const oldNum = _this.state.numOfClients;
        newNum.num = JSON.parse(event.data).numOfClients;
        const updateNum = {...oldNum, ...newNum};
        _this.setState({ numOfClients: updateNum});
      }
      //}
      // console.log(_this.state.numOfClients)
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