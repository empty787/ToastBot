module.exports = {
  name: 'clock',
  description: 'Display the current time⏰⏰⏰',
  callback: (client, interaction) => {
    const currentTime = new Date().toLocaleTimeString();
    interaction.reply(`The current time is: ${currentTime}`);
  },
};
  