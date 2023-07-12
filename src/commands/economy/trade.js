const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply('You can only run this command inside a server.');
      return;
    }

    await interaction.deferReply();

    try {
      const userId = interaction.member.id;
      const guildId = interaction.guild.id;

      const userLevel = await Level.findOne({ userId, guildId });

      const mentionedUserId = interaction.options.get('target-user')?.value;
      const targetUserId = mentionedUserId || interaction.member.id;

      const targetLevel = await Level.findOne({ userId: targetUserId, guildId });

      if (!targetLevel) {
        interaction.editReply("The target user doesn't have a level entry.");
        return;
      }

      const senderCoins = interaction.options.get('sender-coins')?.value || 0;
      const targetCoins = interaction.options.get('target-coins')?.value || 0;

      if (userLevel.xp < senderCoins) {
        interaction.editReply("You don't have enough coins to trade.");
        return;
      }

      userLevel.xp -= senderCoins;
      targetLevel.xp += senderCoins;

      if (targetLevel.xp < targetCoins) {
        interaction.editReply("The target user doesn't have enough coins to trade.");
        return;
      }

      userLevel.xp += targetCoins;
      targetLevel.xp -= targetCoins;

      await Promise.all([userLevel.save(), targetLevel.save()]);

      interaction.editReply(`Trade successful. You traded ${senderCoins} coins for ${targetCoins} coins with the target user.`);
    } catch (error) {
      console.error('Error running trade command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },

  name: 'trade',
  description: 'Trade coins with another user.',
  options: [
    {
      name: 'target-user',
      description: 'The user to trade with.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'sender-coins',
      description: 'The amount of coins to trade from your side.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'target-coins',
      description: 'The amount of coins to trade from the target user.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
};
