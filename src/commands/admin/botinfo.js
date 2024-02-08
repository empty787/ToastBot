const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'botinfo',
  description: 'Shows info about void',

  callback: (client, interaction) => {
    const embed = {
      title: 'void Info',
      description: 'A friendly and goofy ahh bot created by ragingtoast813',
      fields: [
        {
          name: 'Creator',
          value: 'ragingtoast813',
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
        text: 'void - Created by ragingtoast813',
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