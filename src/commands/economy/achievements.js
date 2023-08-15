const { Client, Interaction, DiscordAPIError } = require('discord.js');
const Achievement = require('../../models/Achievement'); // Import your Achievement model

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      try {
        await interaction.reply({
          content: 'You can only run this command inside a server.',
          ephemeral: true,
        });
      } catch (error) {
        if (error instanceof DiscordAPIError) {
          console.error(`Discord API error: ${error.message}`);
        } else {
          console.error(error);
        }
      }
      return;
    }

    const userId = interaction.user.id;

    try {
      let userAchievement = await Achievement.findOne({ userId });

      if (!userAchievement) {
        userAchievement = new Achievement({
          userId,
          achievements: [],
        });
      }

      const userMessages = await interaction.channel.messages.fetch({ limit: 100 });
      const totalMessages = userMessages.filter((message) => message.author.id === userId).size;

      const achievements = [
        { name: 'First Achievement', messagesRequired: 1 },
        { name: 'Second Achievement', messagesRequired: 20 },
        { name: 'Third Achievement', messagesRequired: 60 },
        { name: 'Fourth Achievement', messagesRequired: 99 },
        { name: 'Thread be like', threadsRequired: 1 },
        { name: 'tenthreadzzzz', threadsRequired: 10 },
        { name: 'I speak Emoji haha', emojiRequired: 5 },
        { name: 'the goofy ahh sneaky code' },
        // ... Add more achievements
      ];

      const embed = {
        title: `${interaction.user.username}'s Achievements`,
        description: `@${interaction.user.username} has completed ${userAchievement.achievements.filter((a) => a.unlocked).length}/${achievements.length} achievements!\n`,
        color: 0x00ff00,
        fields: [],
      };

      for (const achievement of achievements) {
        const userHasAchievement = userAchievement.achievements.some((a) => a.name === achievement.name);

        const requiredAmount = achievement.threadsRequired
          ? achievement.threadsRequired
          : achievement.messagesRequired || achievement.emojiRequired;
        const userCount = achievement.threadsRequired
          ? userMessages.filter((message) => message.author.id === userId && message.type === 'THREAD_CREATED').size
          : achievement.emojiRequired
          ? userMessages.some((message) => message.author.id === userId && new RegExp(`(${achievement.emojiRequired} ){${achievement.emojiRequired - 1}}${achievement.emojiRequired}`).test(message.content))
          : achievement.name === 'the goofy ahh sneaky code' && userMessages.some((message) => message.author.id === userId && message.content.toLowerCase().includes('bruh'))
          ? 1
          : totalMessages;
        const progress = userHasAchievement ? 100 : Math.min(100, (userCount / requiredAmount) * 100);

        const progressBar = userHasAchievement
          ? ':white_check_mark:'
          : progress === 100
          ? ':white_check_mark:'
          : `[\`${'■'.repeat(Math.floor(progress / 10))}${' '.repeat(10 - Math.floor(progress / 10))}\`]`;
        const progressValue = `${progress.toFixed(2)}%`;

        embed.fields.push({
          name: achievement.name,
          value: `${progressBar} ${progressValue}\n\n`,
          inline: false,
        });
      }

      // Check for the sneaky code achievement
      const sneakyCode = 'bruh';
      if (!userAchievement.achievements.some((a) => a.name === 'the goofy ahh sneaky code') && userMessages.some((message) => message.author.id === userId && message.content.toLowerCase().includes(sneakyCode))) {
        userAchievement.achievements.push({ name: 'the goofy ahh sneaky code', unlocked: true });
        await userAchievement.save();
      }

      try {
        embed.description += `\nTotal Messages Sent: ${totalMessages}`;

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        if (error instanceof DiscordAPIError) {
          console.error(`Discord API error: ${error.message}`);
        } else {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(`Error retrieving achievements: ${error}`);
      if (error instanceof DiscordAPIError) {
        console.error(`Discord API error: ${error.message}`);
      }
    }
  },

  name: 'achievements',
  description: 'Shows your achievements.',
};
