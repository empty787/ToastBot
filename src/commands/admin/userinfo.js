const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Shows information about a user',

  callback: (client, interaction) => {
    const user = interaction.options.getUser('user') || interaction.user;

    const embed = {
      title: 'User Information',
      description: `Here is the information for user: ${user.tag}`,
      color: 0x964B00,
      thumbnail: {
        url: user.displayAvatarURL({ dynamic: true }),
      },
      fields: [
        {
          name: 'Username',
          value: user.username,
          inline: true,
        },
        {
          name: 'User ID',
          value: user.id,
          inline: true,
        },
        {
          name: 'Account Created At',
          value: user.createdAt.toUTCString(),
          inline: true,
        },
        {
          name: 'Joined Server At',
          value: interaction.member.joinedAt.toUTCString(),
          inline: true,
        },
        {
          name: 'Nickname',
          value: interaction.member.nickname || 'None',
          inline: true,
        },
        {
          name: 'Highest Role',
          value: interaction.member.roles.highest.name,
          inline: true,
        },
        {
          name: 'Bot',
          value: user.bot ? 'Yes' : 'No',
          inline: true,
        },
      ],
      footer: {
        text: 'void - Created by ragingtoast813',
        icon_url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      timestamp: new Date(),
    };

    interaction.reply({ embeds: [embed] });
  },
};
