module.exports = {
  name: 'welcome',
  description: 'This command is broken rn so dont use this ',

  callback: (client, interaction) => {

    const messageContent = 'This command isnt working';

    interaction.reply({
      content: messageContent,
      ephemeral: true 
    });
  },
};
