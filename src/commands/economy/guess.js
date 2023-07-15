const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const amount = interaction.options.get('amount').value;
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
      let attempts = 5;
      let earnings = 0;

      while (attempts > 0) {
        const guess = Math.floor(Math.random() * 100) + 1; // Generate a random guess

        if (guess === randomNumber) {
          earnings = amount * (11 - attempts); // Calculate earnings based on attempts

          const userId = interaction.user.id;
          const guildId = interaction.guild.id;

          // Check if the user already has a level entry in the database
          let userLevel = await Level.findOne({ userId, guildId });

          // If user level entry doesn't exist, create a new one
          if (!userLevel) {
            userLevel = new Level({ userId, guildId });
          }

          userLevel.xp += earnings;

          await userLevel.save();

          break;
        }

        attempts--;
      }

      if (earnings > 0) {
        interaction.editReply(`Congratulations! You guessed the number and won ${earnings} credits. You gained ${earnings} XP.`);
      } else {
        interaction.editReply(`Sorry, you couldn't guess the number. Better luck next time! OOPS NO XP :(`);
      }
    } catch (error) {
      console.error('Error running guess command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'guess',
  description: 'Guess the random number and win credits.',
  options: [
    {
      name: 'amount',
      description: 'The bet amount.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
