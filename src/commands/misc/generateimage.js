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

    // Fetch the user's avatar
    const user = interaction.user;
    const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });

    // Get the URL of the background image from the command options
    const backgroundImageURL = interaction.options.get('background-url').value;

    // Load the background image
    const background = await loadImage(backgroundImageURL);

    // Create a canvas
    const canvas = createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');

    // Draw the background image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw the user's avatar
    const avatar = await loadImage(avatarURL);
    const avatarSize = 128; // Adjust the size as needed
    const avatarX = (canvas.width - avatarSize) / 2;
    const avatarY = (canvas.height - avatarSize) / 2;
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'generateimage',
  description: 'Generates an image with user avatar.',
  options: [
    {
      name: 'background-url',
      description: 'URL of the background image',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};
