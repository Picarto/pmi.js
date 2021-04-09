# pmi.js
Picarto Message Interface

## Install

### Node

``` npm install pmi.js ```

```
const pmi = require('pmi.js');

/* Define configuration options */
const opts = {
  identity: {
    username: "<BOT_USERNAME>",
    password: "<OAUTH_TOKEN>"
  }
};

/* Create a client with our options */
const client = new pmi.client(opts);

/* Register our event handlers */
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

/* Connect to Picarto: */
client.connect();

/* Called every time a message comes in*/
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } /* Ignore messages from the bot */

  const commandName = msg;

  /* If the command is known, let's execute it */
  if (commandName === '!hello') {
    client.say(target, sayHello());
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

/* Function called when the "hello" command is issued */
function sayHello () {
  return 'Greetings from ChatBot';
}

/* Called every time the bot connects to Picarto chat */
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}`);
}
```
