const { Client, Interaction, createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'clockimage',
  description: 'Display a clock image',

  callback: async (client, interaction) => {
    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Create a canvas
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // Load the clock background image
    const backgroundImage = await loadImage('https://i.imgur.com/CQiKstK.jpg');

    // Draw the background image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Calculate the radius for the clock circle
    const radius = Math.min(canvas.width, canvas.height) / 2;

    // Set the center coordinates for the clock circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Apply effects
    // 1. Grayscale effect
    ctx.filter = 'grayscale(100%)';

    // 2. Sepia effect
    ctx.filter = 'sepia(100%)';

    // 3. Blur effect
    ctx.filter = 'blur(5px)';

    // Reset filter
    ctx.filter = 'none';

    // Set the font style and size
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    // Draw the clock circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    // Draw the clock time on the canvas
    ctx.fillText(`${hours}:${minutes}:${seconds}`, centerX, centerY);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the clock image as a reply
    await interaction.reply({ files: [{ attachment: buffer, name: 'clock.png' }] });
  },
};
