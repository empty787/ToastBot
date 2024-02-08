module.exports = {
    name: 'invisible',
    description: 'Sends a private message',
  
    callback: (client, interaction) => {
      // Define the content of the public message
      const messageContent = 'SHHHHHHHHHHHHHHHHHHHH i am invisible rn Sub to ragingtoast813: https://www.youtube.com/channel/UCGb0e9ewlGy6wCKFD6KZ2Eg';
  
      // Send the public message in the channel where the command was used
      interaction.reply({
        content: messageContent,
        ephemeral: true // Set ephemeral to true to make the reply visible only to the command user
      });
    },
  };
  