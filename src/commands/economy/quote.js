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

    // Get the quote text from the command options
    const quote = interaction.options.get('quote').value;

    // Load the background image
    const backgroundImage = await loadImage('https://i.imgur.com/CQiKstK.jpg'); // Replace with your desired background image URL

    // Create a canvas
    const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the background image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set the font style and size
    ctx.font = '150px Arial'; // Adjust the font size and family as needed
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';

    // Draw the quote text on the canvas
    ctx.fillText(quote, canvas.width / 2, canvas.height / 2);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated quote image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'quote',
  description: 'Generate an image with a custom quote! This is a super powerful command!',
  options: [
    {
      name: 'quote',
      description: 'The custom quote text.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
