const { WebhookClient } = require('discord.js');

async function logJoin(client, guild) {
  try {
    const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

    const embed = {
      title: 'Bot Joined a New Server',
      description: `Server Name: ${guild.name}\nServer ID: ${guild.id}`,
      color: 0x00ff00, // Green color
      timestamp: new Date(),
      thumbnail: {
        url: guild.iconURL({ format: 'png', dynamic: true, size: 1024 }), // Get the server's icon/avatar
      },
      footer: {
        text: `Currently in ${client.guilds.cache.size} servers`, // Show the number of servers the bot is currently in
        icon_url: client.user.displayAvatarURL({ format: 'png', size: 1024 }), // Use the bot's avatar as the footer icon
      },
    };

    await webhook.send({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send log message:', error);
  }
}

async function logLeave(client, guild) {
  try {
    const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

    const embed = {
      title: 'Bot Left a Server',
      description: `Server Name: ${guild.name}\nServer ID: ${guild.id}`,
      color: 0xff0000, // Red color
      timestamp: new Date(),
      thumbnail: {
        url: guild.iconURL({ format: 'png', dynamic: true, size: 1024 }), // Get the server's icon/avatar
      },
      footer: {
        text: `Currently in ${client.guilds.cache.size} servers`, // Show the number of servers the bot is currently in
        icon_url: client.user.displayAvatarURL({ format: 'png', size: 1024 }), // Use the bot's avatar as the footer icon
      },
    };

    await webhook.send({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send log message:', error);
  }
}

module.exports = { logJoin, logLeave };
