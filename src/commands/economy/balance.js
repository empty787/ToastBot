const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/User');

// Function to generate a progress bar based on the user's balance
function generateProgressBar(balance) {
  const maxBalance = 90000000000000;
  const progressBarLength = 20; // Length of the progress bar
  const progress = Math.min(balance / maxBalance, 1);
  const progressBarFilled = Math.round(progress * progressBarLength);
  const progressBarEmpty = progressBarLength - progressBarFilled;
  const percentage = (progress * 100).toFixed(2); // Calculate the percentage to two decimal places
  return `[${'■'.repeat(progressBarFilled)}${'□'.repeat(progressBarEmpty)}] ${percentage}%`;
}

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

    await interaction.deferReply();

    try {
      const targetUserId = interaction.options.get('user')?.value || interaction.member.id;
      const user = await User.findOne({ userId: targetUserId, guildId: interaction.guild.id });

      if (!user) {
        interaction.editReply(`<@${targetUserId}> doesn't have a profile yet.`);
        return;
      }

      const targetUser = await client.users.fetch(targetUserId);

      const balanceEmbed = {
        color: 0x0099ff,
        title: `${targetUser.username} Balance and Progress`,
        description: `Here's the balance, progress, and deposited amount in the bank of ${
          targetUserId === interaction.member.id ? 'your' : `<@${targetUserId}>`
        } account:`,
        thumbnail: {
          url: targetUser.displayAvatarURL({ dynamic: true }),
        },
        fields: [
          { name: '`- Balance`', value: `\`${user.balance} OMG\``, inline: true },
          { name: '`- Bank Deposit`', value: `\`${user.bankBalance || 0} OMG\``, inline: true },
          { name: '`- Progress`', value: generateProgressBar(user.balance), inline: true },
        ],
        footer: {
          text: 'void - Created by ragingtoast813',
          icon_url: 'https://i.imgur.com/CQiKstK.jpg', // Bot's avatar or any other icon
        },
        timestamp: new Date(),
      };

      await interaction.editReply({ embeds: [balanceEmbed] });
    } catch (error) {
      console.error('Error running balance command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'balance',
  description: "See yours/someone else's balance :)",
  options: [
    {
      name: 'user',
      description: 'The user whose balance you want to get.',
      type: ApplicationCommandOptionType.User,
    },
  ],
};
