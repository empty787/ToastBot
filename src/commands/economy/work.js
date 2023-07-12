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
      const userId = interaction.member.id;
      const guildId = interaction.guild.id;

      const userLevel = await Level.findOne({ userId, guildId });

      if (!userLevel) {
        interaction.editReply("You don't have a level entry.");
        return;
      }

      const lastWorkedAt = userLevel.lastWorkedAt || 0;
      const cooldown = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

      const currentTime = Date.now();
      const timeSinceLastWork = currentTime - lastWorkedAt;

      if (timeSinceLastWork < cooldown) {
        const timeRemaining = cooldown - timeSinceLastWork;
        const hoursRemaining = Math.ceil(timeRemaining / (60 * 60 * 1000));

        interaction.editReply(`You can work again in ${hoursRemaining} hours.`);
        return;
      }

      // Define available jobs or work options with corresponding coin rewards
      const workOptions = [
        { job: 'Discord Mod', reward: 50 },
        { job: 'Computer Scientist', reward: 100 },
        { job: 'YouTuber', reward: 150 },
      ];

      // Randomly select a job from the available options
      const randomIndex = Math.floor(Math.random() * workOptions.length);
      const selectedJob = workOptions[randomIndex];

      // Calculate the new balance after earning the reward
      const newBalance = userLevel.xp + selectedJob.reward;

      // Update the user's balance and last worked timestamp in the database
      userLevel.xp = newBalance;
      userLevel.lastWorkedAt = currentTime;
      await userLevel.save();

      interaction.editReply(`You worked as ${selectedJob.job} and earned ${selectedJob.reward} DolphinBucks. Your new balance is ${newBalance} DolphinBucks. <:Dolphin:978832169474605086>`);
    } catch (error) {
      console.error('Error running work command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'work',
  description: 'Work and earn DolphCoins and DolphBucks based on your job or role!',
};
