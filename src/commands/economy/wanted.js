const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();

    // Load the "wanted" poster template
    const posterTemplate = await loadImage('https://i.imgflip.com/6edevi.png?a468816');

    // Create a canvas
    const canvas = createCanvas(posterTemplate.width, posterTemplate.height);
    const ctx = canvas.getContext('2d');

    // Draw the "wanted" poster template on the canvas
    ctx.drawImage(posterTemplate, 0, 0, canvas.width, canvas.height);

    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    }

    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    const rgbColor = hexToRgb(randomColor);

    // Set the font style and size
    ctx.font = '36px Arial'; // Adjust the font size and family as needed
    ctx.fillStyle = 'rgbColor';
    ctx.textAlign = 'center';

    // Draw the text on the poster
    const text = `bruh, this user has been wanted`;
    const textX = canvas.width / 2;
    const textY = canvas.height - 50;
    ctx.fillText(text, textX, textY);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated "wanted" poster as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'wanted',
  description: 'Generate a "wanted" poster with a custom image.',
  options: [
    {
      name: 'target-name',
      description: 'Name of the target',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
