const { Client, Message, DiscordAPIError } = require('discord.js');
const Achievement = require('../../models/Achievement'); // Import your Achievement model

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;

  const userId = message.author.id;

  try {
    let userAchievement = await Achievement.findOne({
      userId,
    });

    if (!userAchievement) {
      userAchievement = new Achievement({
        userId,
        achievements: [],
      });
    }

    const userMessages = await message.channel.messages.fetch({ limit: 100 });
    const messageCount = userMessages.filter((msg) => msg.author.id === userId).size;

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

    const unlockedAchievements = [];

    for (const achievement of achievements) {
      const foundAchievement = userAchievement.achievements.find((a) => a.name === achievement.name);
      if (!foundAchievement && messageCount >= achievement.messagesRequired) {
        userAchievement.achievements.push({ name: achievement.name, unlocked: true });
        unlockedAchievements.push(achievement.name);
      }
    }

    const nerdEmoji = '🤓';
    const consecutiveNerdEmojis = `${nerdEmoji} ${nerdEmoji} ${nerdEmoji} ${nerdEmoji} ${nerdEmoji}`;
    if (
      !userAchievement.achievements.some((a) => a.name === 'I speak Emoji haha') &&
      message.content.includes(consecutiveNerdEmojis)
    ) {
      userAchievement.achievements.push({ name: 'I speak Emoji haha', unlocked: true });
      unlockedAchievements.push('I speak Emoji haha');
    }

    const sneakyCode = 'bruh';
    if (!userAchievement.achievements.some((a) => a.name === 'the goofy ahh sneaky code') && message.content.toLowerCase().includes(sneakyCode)) {
      console.log('Sneaky code achievement unlocked!');
      userAchievement.achievements.push({ name: 'the goofy ahh sneaky code', unlocked: true });
      unlockedAchievements.push('the goofy ahh sneaky code');
    }

    if (unlockedAchievements.length > 0) {
      await userAchievement.save();
      const achievementMessage = `GG <@${userId}>, you just unlocked the achievement${
        unlockedAchievements.length > 1 ? 's' : ''
      }: "${unlockedAchievements.join('", "')}"!! 🥳`;
      try {
        await message.channel.send(achievementMessage);
      } catch (error) {
        if (error instanceof DiscordAPIError) {
          console.error(`Discord API error: ${error.message}`);
        } else {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(`Error giving advancement: ${error}`);
    if (error instanceof DiscordAPIError) {
      console.error(`Discord API error: ${error.message}`);
    }
  }
};
