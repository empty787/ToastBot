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
      const userId = interaction.member.user.id;

      const user = await User.findOne({ id: userId });

      if (!user) {
        interaction.editReply("You don't have an account.");
        return;
      }

      const amount = interaction.options.getInteger('amount');

      if (!amount || amount <= 0) {
        interaction.editReply('Please provide a valid amount to deposit.');
        return;
      }

      if (user.currency < amount) {
        interaction.editReply("You don't have enough currency to deposit.");
        return;
      }

      user.currency -= amount;
      user.bankBalance += amount;
      await user.save();

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
