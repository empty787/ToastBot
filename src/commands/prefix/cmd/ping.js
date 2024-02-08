module.exports = {
    name: 'ping', // The name of the command
    description: 'Check the bot\'s ping.', // The description of the command (optional)
  
    // The main function that gets executed when the command is run
    execute(message, args) {
      const startTime = Date.now();
      message.channel.send('🏓 Pinging...').then(sentMessage => {
        const endTime = Date.now();
        const ping = endTime - startTime;
        sentMessage.edit(`🏓 Pong! Client ${ping}ms | Websocket: ${message.client.ws.ping}ms OMG WTF`);
      });
    },
  };
  