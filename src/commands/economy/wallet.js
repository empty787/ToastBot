const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const User = require('../../models/User');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'You can only run this command inside a server.',
        ephemeral: true,
      });
      return;
    }

    const targetUserId = interaction.options.get('user')?.value || interaction.member.id;

    await interaction.deferReply();

    const user = await User.findOne({ userId: targetUserId, guildId: interaction.guild.id });

    if (!user) {
      interaction.editReply(`<@${targetUserId}> doesn't have a profile yet.`);
      return;
    }

    // Set the canvas size to 800 pixels wide and 200 pixels tall
    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext('2d');

    // Load the background image for the wallet command (I'm using a placeholder rank card image URL, replace it with your desired background)
    const backgroundImage = await loadImage('https://i.imgur.com/Rx35qid.gif');

    // Draw the background image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw the transparent brown overlay to cover all information
    ctx.fillStyle = 'rgba(56, 35, 17, 0.7)'; // Brown color with 70% opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the font style for text elements
    const fontSize = 40;
    const fontColor = '#FFFFFF';
    const fontFamily = 'Arial';
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;

    // Draw the user's username at the top with increased font size
    const usernameText = interaction.user.username;
    const usernameTextWidth = ctx.measureText(usernameText).width;
    const usernameX = (canvas.width - usernameTextWidth) / 2;
    const usernameY = 50;
    ctx.fillText(usernameText, usernameX, usernameY);

    // Draw user balance in the middle with increased font size
    const balanceText = `Balance: ${user.balance}`;
    const balanceTextWidth = ctx.measureText(balanceText).width;
    const balanceX = (canvas.width - balanceTextWidth) / 2;
    const balanceY = (canvas.height - fontSize) / 2 + fontSize; // Centered vertically
    ctx.fillText(balanceText, balanceX, balanceY);

    // Draw the user's avatar as a circle in the center with increased size
    const avatarSize = 120; // Increased size for the avatar
    const avatarX = 50;
    const avatarY = (canvas.height - avatarSize) / 2; // Centered vertically
    const avatarImage = await loadImage(interaction.user.displayAvatarURL({ extension: 'png', size: 512 }));
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Draw the progress bar in the middle
    const progressBarWidth = 600;
    const progressBarHeight = 30;
    const progressBarX = (canvas.width - progressBarWidth) / 2;
    const progressBarY = canvas.height - 50;
    const progress = Math.min(user.balance / 1000, 1);
    const progressBarFillWidth = progressBarWidth * progress;
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(progressBarX, progressBarY, progressBarFillWidth, progressBarHeight);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(progressBarX + progressBarFillWidth, progressBarY, progressBarWidth - progressBarFillWidth, progressBarHeight);

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated wallet image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'wallet',
  description: "See your/someone else's wallet balance",
  options: [
    {
      name: 'user',
      description: 'The user whose wallet balance you want to get.',
      type: ApplicationCommandOptionType.User,
    },
  ],
};