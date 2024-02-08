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

      const amount = interaction.options.get('amount')?.value;

      if (!amount || amount < 1 || amount > userLevel.xp) {
        interaction.editReply("Please provide a valid amount to gamble within your balance.");
        return;
      }

      const chance = Math.random(); // Generate a random chance to win

      if (chance < 0.5) {
        // Failed to win
        userLevel.xp -= amount;
        await userLevel.save();
        interaction.editReply(`You gambled ${amount} coins and lost!`);
      } else {
        // Won the gamble
        const winnings = Math.floor(amount * 2); // Double the amount gambled
        userLevel.xp += winnings;
        await userLevel.save();
        interaction.editReply(`You gambled ${amount} ragingtoast813Bucks and won ${winnings} ragingtoast813Bucks!<:ragingtoast813Coin:1127314299665264760><:ragingtoast813Token:1127314332317929503><:ragingtoast813Bucks:1127314182648373291>`);
      }
    } catch (error) {
      console.error('Error running gamble command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'gamble',
  description: 'Gamble your coins for a chance to win more.',
  options: [
    {
      name: 'amount',
      description: 'The amount of coins you want to gamble.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
