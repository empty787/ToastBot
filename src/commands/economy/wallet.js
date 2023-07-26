const { Client, Interaction } = require('discord.js');
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

    const targetUserId = interaction.user.id; // Now, always target the user who invoked the command

    await interaction.deferReply();

    const user = await User.findOne({ userId: targetUserId, guildId: interaction.guild.id });

    if (!user) {
      interaction.editReply('You do not have a profile yet.');
      return;
    }

    // Create a cool looking embed
    const embed = {
      color: 0xFFA500, // Orange color
      title: `${interaction.user.username}'s Wallet`,
      description: `Here's your wallet balance and progress:`,
      fields: [
        { name: '`Balance`', value: `${user.balance} credits`, inline: true },
        { name: '`Progress`', value: generateProgressBar(user.balance), inline: true }
      ],
      thumbnail: {
        url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      footer: {
        text: 'DolphinNotBot - Created by DolphinNotFound',
        icon_url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      timestamp: new Date(),
    };

    // Function to generate the progress bar as a string
    function generateProgressBar(balance) {
      const progressBarLength = 15;
      const progress = Math.min(balance / 1000, 1);
      const progressBarFilled = Math.round(progress * progressBarLength);
      const progressBarEmpty = progressBarLength - progressBarFilled;
      const progressBarString = `[${'■'.repeat(progressBarFilled)}${'□'.repeat(progressBarEmpty)}] ${(
        progress * 100
      ).toFixed(2)}%`;
      return progressBarString;
    }

    // Send the generated wallet information as a reply with the embed
    await interaction.editReply({ embeds: [embed] });
  },

  name: 'wallet',
  description: "See your wallet balance",
};
