import React, {Component} from 'react';

import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    // // this is the *only* time you should assign directly to state:
    this.state = {
                    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [
                      {
                        username: "Bob",
                        content: "Has anyone seen my marbles?",
                        id: 1
                      },
                      {
                        username: "Anonymous",
                        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                        id: 2
                      }
                    ]
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

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  //adds message to state
  addMessage(message) {
    const oldMessages = this.state.messages;
    //assign random id
    message.id = this.randomKeyGen();
    let newMessage = message;
    const addNewMessage = [...oldMessages, newMessage];
    this.setState({ messages: addNewMessage});
  }

  render() {

    //sends default user name to ChatBar
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage.bind(this)} defaultValue={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;