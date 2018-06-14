import React, {Component} from 'react';

import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
                    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: []
                  };
  }

 //sends message to server
  sendText(message) {
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
      const oldMessages = _this.state.messages;
      let newMessage = JSON.parse(event.data);
      const addNewMessage = [...oldMessages, newMessage];
      _this.setState({ messages: addNewMessage});
    };
  }

  //function to generate random key
  randomKeyGen() {
    let key = "";
    let random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      let chosen = random.charAt(Math.floor(Math.random() * random.length));
      key += chosen;
    }
    return key;
  }

  render() {

    return (
      <div>
        <NavBar />
         <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.sendText.bind(this)} defaultValue={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;