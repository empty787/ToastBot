const { Client, Interaction } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const User = require('../../models/User'); // Import the User model

module.exports = {
  name: 'profile',
  description: 'Shows your DolphWorld economy profile or account! :)',

  callback: async (client, interaction) => {
    const targetUser = interaction.user;
    const avatarURL = targetUser.displayAvatarURL({ dynamic: true });

    try {
      // Fetch level data from database
      const fetchedLevel = await Level.findOne({
        userId: targetUser.id,
        guildId: interaction.guild.id,
      });

      if (!fetchedLevel) {
        interaction.reply(`You don't have a level yet.`);
        return;
      }

      // Fetch user data from the database
      const fetchedUser = await User.findOne({ userId: targetUser.id, guildId: interaction.guild.id });

      const level = fetchedLevel.level;
      const xp = fetchedLevel.xp;
      const requiredXp = calculateLevelXp(level);
      const balance = fetchedUser ? fetchedUser.balance : 0;

      const embed = {
        title: `Profile of ${targetUser.username}`,
        description: `Level: ${level}\nXP: ${xp}/${requiredXp}\nBalance: ${balance}`, // Add the balance information
        color: 0x964B00,
        image: {
          url: avatarURL,
        },
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      interaction.reply('An error occurred while fetching your profile.');
    }
  },
};
