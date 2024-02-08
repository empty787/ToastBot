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
        interaction.editReply("Please provide a valid amount to invest within your balance.");
        return;
      }

      const returnRate = 0.1; // 10% return on investment
      const earnings = Math.floor(amount * returnRate);

      userLevel.xp -= amount;
      userLevel.xp += earnings;
      await userLevel.save();

      interaction.editReply(`You invested ${amount} ragingtoast813Bucks and earned ${earnings} ragingtoast813Bucks as return. <:ragingtoast813Coin:1127314299665264760><:ragingtoast813Token:1127314332317929503><:ragingtoast813Bucks:1127314182648373291>`);
    } catch (error) {
      console.error('Error running invest command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'invest',
  description: 'Invest your coins and earn a return on investment.',
  options: [
    {
      name: 'amount',
      description: 'The amount of coins you want to invest.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
