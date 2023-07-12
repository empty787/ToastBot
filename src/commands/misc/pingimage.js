const { Client, Interaction, createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'pingimage',
  description: 'Bot ping but with an image!',

  callback: async (client, interaction) => {
    const start = Date.now();

    // Send an initial response
    await interaction.reply('Pinging...');

    // Calculate the bot ping
    const ping = Date.now() - start;

    // Create a canvas
    const canvas = createCanvas(200, 100);
    const ctx = canvas.getContext('2d');

    // Set the font style and size
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    // Draw the ping text on the canvas
    ctx.fillText(`Ping: ${ping}ms`, canvas.width / 2, canvas.height / 2);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the ping image as a reply
    await interaction.editReply({ files: [{ attachment: buffer, name: 'ping.png' }] });
  },
};
