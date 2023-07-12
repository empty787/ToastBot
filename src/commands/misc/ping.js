module.exports = {
  name: 'ping',
  description: 'Pong!',

  callback: (client, interaction) => {
    interaction.reply(`Pong! 🏓🏓🏓 My ping is ${client.ws.ping}ms`);
  },
};
