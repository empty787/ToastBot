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

      // Generate a random number between 1 and 3 to represent the opponent's choice
      const opponentChoice = Math.floor(Math.random() * 3) + 1;
      const userChoice = interaction.options.get('choice').value;

      let result;
      let earnings = 0;

      // Determine the result based on the user's choice and the opponent's choice
      if (userChoice === 'rock') {
        if (opponentChoice === 1) result = 'tie';
        else if (opponentChoice === 2) result = 'lose';
        else if (opponentChoice === 3) result = 'win';
      } else if (userChoice === 'paper') {
        if (opponentChoice === 1) result = 'win';
        else if (opponentChoice === 2) result = 'tie';
        else if (opponentChoice === 3) result = 'lose';
      } else if (userChoice === 'scissors') {
        if (opponentChoice === 1) result = 'lose';
        else if (opponentChoice === 2) result = 'win';
        else if (opponentChoice === 3) result = 'tie';
      }

      // Calculate the earnings and XP based on the result
      if (result === 'win') {
        earnings = amount;
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;

        // Check if the user already has a level entry in the database
        let userLevel = await Level.findOne({ userId, guildId });

        // If user level entry doesn't exist, create a new one
        if (!userLevel) {
          userLevel = new Level({ userId, guildId });
        }

        userLevel.xp += 5; // Earn 5 XP for winning

        await userLevel.save();
      }

      let botChoiceText;
      if (opponentChoice === 1) botChoiceText = 'Rock';
      else if (opponentChoice === 2) botChoiceText = 'Paper';
      else if (opponentChoice === 3) botChoiceText = 'Scissors';

      if (result === 'win') {
        interaction.editReply(`You chose ${userChoice}. I chose ${botChoiceText}.\nCongratulations! You won against the opponent and gained ${earnings} credits. You earned 5 XP.`);
      } else if (result === 'lose') {
        interaction.editReply(`You chose ${userChoice}. I chose ${botChoiceText}.\nSorry, you lost against the opponent. Better luck next time!`);
      } else {
        interaction.editReply(`You chose ${userChoice}. I chose ${botChoiceText}.\nIt's a tie! Please choose another.`);
      }
    } catch (error) {
      console.error('Error running rps command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'rps',
  description: 'Play Rock, Paper, Scissors and win credits.',
  options: [
    {
      name: 'amount',
      description: 'The bet amount.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'choice',
      description: 'Your choice: rock, paper, or scissors.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: 'Rock', value: 'rock' },
        { name: 'Paper', value: 'paper' },
        { name: 'Scissors', value: 'scissors' },
      ],
    },
  ],
};
