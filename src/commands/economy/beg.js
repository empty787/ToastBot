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

      const coinsEarned = Math.floor(Math.random() * 100) + 1; // Randomly generate coins earned (1 to 100)

      // Calculate the new balance after earning coins
      const newBalance = userLevel.xp + coinsEarned;

      // Update the user's balance in the database
      userLevel.xp = newBalance;
      await userLevel.save();

      interaction.editReply(`You begged and earned ${coinsEarned} CoffeeBucks. Your new balance is ${newBalance} DolphCoins<:DolphCoin:1127314299665264760><:DolphToken:1127314332317929503><:CoffeeBucks:1127314182648373291>.`);
    } catch (error) {
      console.error('Error running beg command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'beg',
  description: 'Beg for coins and earn a random amount.',
};
