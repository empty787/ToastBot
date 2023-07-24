const { Client, Interaction } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Get the user who triggered the command or mentioned user, if provided
    const user = interaction.options.getUser('user') || interaction.user;

    // Load the user's avatar and fire image
    const avatarURL = user.displayAvatarURL({ extension: 'png', size: 512 });
    const fireURL =
      'https://png.pngtree.com/png-clipart/20211018/ourmid/pngtree-fire-burning-realistic-red-flame-png-image_3977689.png';

    try {
      // Load the images using canvas
      const avatar = await loadImage(avatarURL);
      const fire = await loadImage(fireURL);

      // Create a canvas with the same dimensions as the avatar
      const canvas = createCanvas(avatar.width, avatar.height);
      const ctx = canvas.getContext('2d');

      // Draw the user's avatar on the canvas
      ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height);

      // Draw the fire image on top of the avatar
      ctx.drawImage(fire, 0, 0, avatar.width, avatar.height);

      // Convert the canvas to a buffer
      const buffer = canvas.toBuffer();

      // Reply with the custom image containing the user's avatar with the fire overlay
      await interaction.reply({
        files: [{
          name: 'custom_avatar.png',
          attachment: buffer,
        }],
      });
    } catch (error) {
      console.error('Error creating custom avatar:', error);
      interaction.reply('An error occurred while creating the custom avatar.');
    }
  },

  name: 'customavatar',
  description: 'Display the user avatar with a fire overlay.',
  options: [
    {
      name: 'user',
      description: 'The user whose avatar you want to overlay with the fire.',
      type: 3,
      required: false,
    },
  ],
};
