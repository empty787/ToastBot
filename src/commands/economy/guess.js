const { CommandInteraction, MessageEmbed } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  name: 'guess',
  description: 'Guess the correct number to earn Dolphinbucks and Dolphcoins! or else...',

  /**
   * Execute the number guessing game command.
   * @param {CommandInteraction} interaction - The interaction object.
   */
  async execute(interaction) {
    const numberToGuess = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100

    const filter = (message) => {
      // Only consider messages sent by the command invoker
      return message.author.id === interaction.user.id;
    };

    await interaction.reply('I have chosen a number between 1 and 100. Take a guess!');

    try {
      const collected = await interaction.channel.awaitMessages({
        filter,
        max: 1,
        time: 10000, // Set a time limit of 10 seconds for guessing
        errors: ['time'],
      });

      const guess = parseInt(collected.first().content);

      if (guess === numberToGuess) {
        // Guess is correct
        await interaction.reply('Congratulations! You guessed the correct number and earned XP!');

        // Increase the user's XP by a certain amount
        const userId = interaction.user.id;
        const xpToEarn = 100; // The amount of XP to earn for a correct guess

        const fetchedLevel = await Level.findOne({
          userId,
          guildId: interaction.guild.id,
        });

        if (fetchedLevel) {
          fetchedLevel.xp += xpToEarn;
          await fetchedLevel.save();
        }

        // You can customize the reward or XP system based on your requirements
      } else {
        // Guess is incorrect
        await interaction.reply(`Sorry, that's not the correct number. The number I chose was ${numberToGuess}.`);
      }
    } catch (error) {
      console.error(`Error in the number guessing game: ${error}`);
      await interaction.reply('It seems like there was an error while playing the game. Please try again later.');
    }
  },
};
