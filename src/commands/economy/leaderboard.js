const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'You can only run this command inside a server.',
        ephemeral: true,
      });
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

      const leaderboardEmbed = {
        color: 0x8C6A43, // Brown color
        title: '🔹`Leaderboard`🔹:',
        fields: [],
      };

      for (let i = 0; i < allLevels.length; i++) {
        const levelData = allLevels[i];
        let userTag = 'Unknown User';

        try {
          const user = await interaction.guild.members.fetch(levelData.userId);
          if (user) {
            userTag = user.user.tag;
          }
        } catch (error) {
          if (error.code === 10007) {
            // Error code 10007 means "Unknown Member," handle it gracefully
            console.error(`Error fetching member for user ID ${levelData.userId}:`, error.message);
          } else {
            // Handle other errors accordingly
            console.error('Error fetching member:', error);
          }
        }

        leaderboardEmbed.fields.push({
          name: `${i + 1}. ${userTag}`,
          value: `Level: ${levelData.level} - XP: ${levelData.xp}`,
        });
      }

      interaction.editReply({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.error('Error retrieving leaderboard:', error);
      interaction.editReply('An error occurred while retrieving the leaderboard.');
    }
  },

  name: 'leaderboard',
  description: 'Shows the leaderboard based on levels.',
};
