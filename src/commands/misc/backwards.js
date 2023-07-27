const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'backwards',
  description: 'Reverses the text entered in the options.',
  options: [
    {
      name: 'text',
      description: 'Enter the text you want to reverse.',
      type: 3, // Type 3 is for string input
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      const textToReverse = interaction.options.getString('text');

      // Reverse the text
      const reversedText = textToReverse.split('').reverse().join('');

      // Create the embed manually
      const embed = {
        title: 'Text Reversal',
        description: `Original text: ${textToReverse}\nReversed text: ${reversedText}`,
        color: 0xFF0000, // Red color
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error with /backwards: ${error}`);
      // Create the error embed manually
      const embed = {
        title: 'Error',
        description: 'An error occurred while reversing the text.',
        color: 0xFF0000, // Red color
      };

      interaction.reply({ embeds: [embed] });
    }
  },
};
