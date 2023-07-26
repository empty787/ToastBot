const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/User');

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
      const targetUserId = interaction.user.id;
      const amount = interaction.options.getInteger('amount');

      if (!amount || amount <= 0) {
        interaction.editReply('Please provide a valid amount to deposit.');
        return;
      }

      const user = await User.findOneAndUpdate(
        { userId: targetUserId, guildId: interaction.guild.id },
        { $inc: { balance: -amount, bankBalance: amount } },
        { new: true }
      );

      if (!user) {
        interaction.editReply("You don't have an account.");
        return;
      }

      interaction.editReply(`Successfully deposited ${amount} currency to your bank account.`);
    } catch (error) {
      console.error('Error running deposit command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'deposit',
  description: 'Deposit currency to your bank account.',
  options: [
    {
      name: 'amount',
      description: 'The amount of currency to deposit.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
