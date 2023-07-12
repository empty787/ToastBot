const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas, registerFont, loadImage } = require('canvas');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();

    // Get the meme text from the command options
    const topText = interaction.options.get('top-text').value;
    const bottomText = interaction.options.get('bottom-text').value;

    // Load the background image
    const backgroundImage = await loadImage('https://i.imgur.com/CQiKstK.jpg'); // Replace with your desired background image URL

    // Create a canvas
    const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the background image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set the font style and size
    ctx.font = '90px Arial'; // Adjust the font size and family as needed
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';

    // Draw the top text on the canvas
    ctx.fillText(topText, canvas.width / 2, 60);

    // Draw the bottom text on the canvas
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 40);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated meme image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'meme',
  description: 'Generate a meme with custom top and bottom text.',
  options: [
    {
      name: 'top-text',
      description: 'The text for the top of the meme.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'bottom-text',
      description: 'The text for the bottom of the meme.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
