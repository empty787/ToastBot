module.exports = {
  name: 'uptime',
  description: 'Display the bot\'s uptime!1!1!1',
  callback: (client, interaction) => {
    const uptimeInSeconds = Math.floor(process.uptime());

    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
    
    interaction.reply(`Bot uptime: ${uptimeString}`);
  },
};
