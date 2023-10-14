const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Shows info about the server',

  callback: (client, interaction) => {
    const embed = {
      title: 'Server Info',
      description: 'AHAHAHAHAHAHAHAHA',
      fields: [
        {
          name: 'Server Count',
          value: client.guilds.cache.size.toString(),
          inline: true,
        },
        {
          name: 'Bot Uptime',
          value: formatUptime(client.uptime),
          inline: true,
        },
        {
            name: 'Boost Tier',
            value: interaction.guild.premiumTier.toString(),
            inline: true,
        },
        {
            name: 'Large Server',
            value: interaction.guild.large ? 'Yes' : 'No',
            inline: true,
        },
        {
            name: 'Server Created At',
            value: interaction.guild.createdAt.toUTCString(),
            inline: true,
        },
      ],
      color: 0x964B00,
      thumbnail: {
        url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      footer: {
        text: 'CoffeeBot - Created by Coffee',
        icon_url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      timestamp: new Date(),
    };

    interaction.reply({ embeds: [embed] });
  },
};

// Helper function to format uptime in HH:MM:SS format
function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}
