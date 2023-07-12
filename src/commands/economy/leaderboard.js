const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply('You can only run this command inside a server.');
      return;
    }

    await interaction.deferReply();

    try {
      const allLevels = await Level.find({ guildId: interaction.guild.id })
        .select('userId level xp')
        .sort({ level: -1, xp: -1 })
        .limit(10);

      if (allLevels.length === 0) {
        interaction.editReply('No leaderboard data available.');
        return;
      }

      let leaderboard = 'Leaderboard:\n';

      for (let i = 0; i < allLevels.length; i++) {
        const levelData = allLevels[i];
        const user = await interaction.guild.members.fetch(levelData.userId);

        leaderboard += `> ${i + 1}. ${user.user.tag} - Level: ${levelData.level} - XP: ${levelData.xp}\n`;
      }

      interaction.editReply(leaderboard);
    } catch (error) {
      console.error('Error retrieving leaderboard:', error);
      interaction.editReply('An error occurred while retrieving the leaderboard.');
    }
  },

  name: 'leaderboard',
  description: 'Shows the leaderboard based on levels.',
};