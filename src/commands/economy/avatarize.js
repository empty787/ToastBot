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

    // Get the quote text from the command options
    const quote = interaction.options.get('quote').value;

    // Get additional canvas command options
    const fontSize = interaction.options.get('font-size')?.value || '150px';
    const fontColor = interaction.options.get('font-color')?.value || '#000000';
    const fontFamily = interaction.options.get('font-family')?.value || 'Arial';
    const shape = interaction.options.get('shape')?.value || 'rectangle';
    const gradientColor1 = interaction.options.get('gradient-color-1')?.value || '#FF0000';
    const gradientColor2 = interaction.options.get('gradient-color-2')?.value || '#00FF00';
    const lineWidth = interaction.options.get('line-width')?.value || 5;
    const userOption = interaction.options.get('user');
    const user = userOption ? userOption.user : interaction.user;

    // Get the user's avatar URL
    const avatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });

    // Load the user's avatar as the background image
    const backgroundImage = await loadImage(avatarURL);

    // Create a canvas
    const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the user's avatar as the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set the font style and size
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';

    // Apply a gradient effect
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, gradientColor1);
    gradient.addColorStop(1, gradientColor2);
    ctx.fillStyle = gradient;

    // Draw the shape based on the selected option
    switch (shape) {
      case 'rectangle':
        ctx.fillRect(50, 50, 300, 200);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.fill();
        break;
      default:
        break;
    }

    // Draw a line
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = fontColor;
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(350, 300);
    ctx.stroke();

    // Draw the quote text on the canvas
    ctx.fillText(quote, canvas.width / 2, canvas.height / 2);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated quote image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'avatarize',
  description: 'Generate an image with a custom quote, insert shape, put gradient color, and display user avatar!',
  options: [
    {
      name: 'quote',
      description: 'The quote text to be displayed on the image',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'font-size',
      description: 'The font size of the quote text',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'font-color',
      description: 'The font color of the quote text',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'font-family',
      description: 'The font family of the quote text',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'shape',
      description: 'The shape to be drawn on the image',
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'Rectangle',
          value: 'rectangle',
        },
        {
          name: 'Circle',
          value: 'circle',
        },
      ],
      required: false,
    },
    {
      name: 'gradient-color-1',
      description: 'The first color of the gradient effect',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'gradient-color-2',
      description: 'The second color of the gradient effect',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'line-width',
      description: 'The width of the line to be drawn',
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
    {
      name: 'user',
      description: 'The user for whom to display the avatar',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
};
