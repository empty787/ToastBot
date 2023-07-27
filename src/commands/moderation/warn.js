const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const mentionable = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason')?.value || 'No reason provided';

    // Your code to warn the user goes here

    const warnEmbed = {
      color: 0xFF0000, // Red color for a hot embed
      title: 'User Warned',
      description: `<@${mentionable}> has been warned!`,
      fields: [
        {
          name: 'Reason',
          value: reason,
        },
      ],
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [warnEmbed] });
  },

  name: 'warn',
  description: 'Warn a user.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to warn.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the warning.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers], // You can customize the required permissions for this command
  botPermissions: [PermissionFlagsBits.TimeoutMembers], // Use TimeoutMembers to allow the bot to timeout members
};
