module.exports = {
  name: 'date',
  description: 'Display the current date',
  callback: (client, interaction) => {
    const currentDate = new Date().toLocaleDateString();
    interaction.reply(`The current date is: ${currentDate}`);
  },
};