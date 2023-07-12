const { Client, Interaction } = require('discord.js');

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
      // Implement your logic for the `/hit` command here
      
      // Example response
      interaction.editReply('You chose to hit!'); 
    } catch (error) {
      console.error('Error running hit command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'hit',
  description: 'Draw another card.',
};
