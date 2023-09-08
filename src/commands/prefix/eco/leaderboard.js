const Level = require('../../../models/Level');

module.exports = {
  name: 'leaderboard',
  description: 'Shows the leaderboard based on levels.',
  async execute(message, args) {
    if (!message.guild) {
      return message.reply('You can only run this command inside a server.');
    }

    try {
      const allLevels = await Level.find({ guildId: message.guild.id })
        .select('userId level xp')
        .sort({ level: -1, xp: -1 })
        .limit(10);

      if (allLevels.length === 0) {
        return message.reply('No leaderboard data available.');
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
          const user = await message.guild.members.fetch(levelData.userId);
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

      message.channel.send({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.error('Error retrieving leaderboard:', error);
      message.reply('An error occurred while retrieving the leaderboard.');
    }
  },
};
