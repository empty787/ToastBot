const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'botinfo',
  description: 'Shows info about DolphinNotBot',

  callback: (client, interaction) => {
    const embed = {
      title: 'DolphinNotBot Info',
      description: 'A friendly and goofy ahh bot created by DolphinNotFound',
      fields: [
        {
          name: 'Creator',
          value: 'DolphinNotFound',
          inline: true,
        },
        {
          name: 'Version',
          value: 'v14',
          inline: true,
        },
        {
          name: 'Library',
          value: 'discord.js',
          inline: true,
        },
        {
          name: 'Date created',
          value: `July 3, 2023`,
          inline: true,
        },
        {
          name: 'Uptime',
          value: formatUptime(client.uptime),
          inline: true,
        },
      ],
      color: 0x964B00,
      thumbnail: {
        url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      footer: {
        text: 'DolphinNotBot - Created by DolphinNotFound',
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