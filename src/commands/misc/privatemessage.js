module.exports = {
    name: 'privatemessage',
    description: 'Sends a private message',
  
    callback: (client, interaction) => {
      const messageContent = 'Sub to Toast: https://www.youtube.com/channel/UCGb0e9ewlGy6wCKFD6KZ2Eg'; // Message content
  
      // Reply in the public channel with a private message notification
      interaction.reply({
        content: 'I sent you a private message!',
        ephemeral: true // Set ephemeral to true to make the reply visible only to the command user
      });
  
      // Send the private message
      interaction.user.send(messageContent)
        .catch(error => {
          console.error(`Failed to send a private message: ${error}`);
        });
    },
  };
  