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

    // Check if the user executing the command has the necessary permissions
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      interaction.reply('You do not have the required permissions to use this command.');
      return;
    }

    await interaction.deferReply();

    try {
      const mentionedUserId = interaction.options.get('target-user')?.value;
      const targetUserId = mentionedUserId || interaction.member.id;

      const xpToAdd = interaction.options.get('amount')?.value || 0;

      const guildId = interaction.guild.id;

      // Check if the user already has a level entry in the database
      let userLevel = await Level.findOne({ userId: targetUserId, guildId });

      // If user level entry doesn't exist, create a new one
      if (!userLevel) {
        userLevel = new Level({ userId: targetUserId, guildId });
      }

      userLevel.xp += xpToAdd;

      await userLevel.save();

      interaction.editReply(`Added ${xpToAdd} XP to the user's level.`);
    } catch (error) {
      console.error('Error running add command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'add',
  description: 'Add XP to a user\'s level.',
  options: [
    {
      name: 'target-user',
      description: 'The user to add XP to.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'amount',
      description: 'The amount of XP to add.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
