const { Client, Interaction } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');

module.exports = {
  name: 'profile',
  description: 'Shows your DolphWorld economy profile or account! :)',

  callback: async (client, interaction) => {
    const targetUser = interaction.user;
    const avatarURL = targetUser.displayAvatarURL({ dynamic: true });

    // Fetch level data from database
    const fetchedLevel = await Level.findOne({
      userId: targetUser.id,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.reply(`You don't have a level yet.`);
      return;
    }

    const level = fetchedLevel.level;
    const xp = fetchedLevel.xp;
    const requiredXp = calculateLevelXp(level);

    const embed = {
      title: `Profile of ${targetUser.username}`,
      description: `Level: ${level}\nXP: ${xp}/${requiredXp}`,
      color: 0x964B00,
      image: {
        url: avatarURL,
      },
    };

    interaction.reply({ embeds: [embed] });
  },
};
