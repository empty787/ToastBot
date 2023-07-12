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

      const chance = Math.random(); // Generate a random chance to succeed

      if (chance < 0.5) {
        // Failed to rob
        interaction.editReply('You attempted to rob someone but got caught. You lose!');
      } else {
        // Succeeded in robbing
        const amountStolen = Math.floor(Math.random() * 100) + 1; // Randomly generate amount stolen (1 to 100)
        const targetUserId = interaction.options.get('target-user')?.value;

        // Deduct the stolen amount from the target's balance
        const targetLevel = await Level.findOne({ userId: targetUserId, guildId });
        if (!targetLevel) {
          interaction.editReply("The target user doesn't have a level entry.");
          return;
        }

        targetLevel.xp -= amountStolen;
        await targetLevel.save();

        // Add the stolen amount to the user's balance
        userLevel.xp += amountStolen;
        await userLevel.save();

        interaction.editReply(`You successfully robbed ${amountStolen} DolphinBucks from the target. <:DolphinBucks:1127314182648373291>`);
      }
    } catch (error) {
      console.error('Error running rob command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'rob',
  description: 'Attempt to rob someone and steal their coins.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to rob.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
};
