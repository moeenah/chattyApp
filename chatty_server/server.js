const express     = require('express');
const WebSocket   = require('ws');
const uuidv4      = require('uuid/v4');
const randomColour = require('randomcolor');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');
  //gets number of clients connected
  let clientNum = wss.clients.size;
   // Broadcast to all.
  wss.clients.forEach(function each(client) {
    let userColour = randomColour();
    if (client.readyState === WebSocket.OPEN) {
      //sends updated user count to client
      let userNumObj = {};
      userNumObj.colour = userColour;
      userNumObj.numOfClients = clientNum;
      client.send(JSON.stringify(userNumObj));
    }
  });

  ws.on('message', function incoming(data) {
    //sends message to corresponding user
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        let dataObj = JSON.parse(data);
        console.log(dataObj);
        //sends notification to client
        if (dataObj.type === "postNotification") {
          let finalObj;
          newUserObj = JSON.parse(data);
          newUserObj.type = "incomingNotification";
          newUserObj.id = uuidv4();
          finalObj = newUserObj;
          console.log(newUserObj);
          client.send(JSON.stringify(finalObj));
        //sends message to client
        } else if (dataObj.type === "postMessage") {
          let finalObj;
          addTextObj = JSON.parse(data);
          addTextObj.type = "incomingMessage";
          addTextObj.id = uuidv4();
          finalObj = addTextObj;
          console.log(addTextObj);
          client.send(JSON.stringify(finalObj));
        }
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let clientNum = wss.clients.size;
    // Broadcast to all.
     wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        //sends updater user count to client
        let userNumObj = {};
        userNumObj.numOfClients = clientNum;
        client.send(JSON.stringify(userNumObj));
      }
    });
  });
});