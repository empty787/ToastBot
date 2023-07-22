const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');
const Item = require('../../models/Item');

module.exports = {
  name: 'trade',
  description: 'Trade coins and items with another user.',
  options: [
    {
      name: 'target-user',
      description: 'The user to trade with.',
      type: 6, // User type
      required: true,
    },
    {
      name: 'sender-coins',
      description: 'The amount of coins to trade from your side.',
      type: 4, // Integer type
      required: true,
    },
    {
      name: 'target-coins',
      description: 'The amount of coins to trade from the target user.',
      type: 4, // Integer type
      required: true,
    },
    {
      name: 'sender-items',
      description: 'The items to trade from your side (separate multiple items with commas).',
      type: 3, // String type
    },
    {
      name: 'target-items',
      description: 'The items to trade from the target user (separate multiple items with commas).',
      type: 3, // String type
    },
  ],

  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const userId = interaction.user.id;
      const guildId = interaction.guild.id;

      // Fetch the sender's user data from the database or create a new user if it doesn't exist
      let senderUser = await User.findOne({ userId, guildId });

      if (!senderUser) {
        senderUser = await User.create({ userId, guildId });
      }

      const targetUserId = interaction.options.get('target-user').value;

      // Fetch the target user's data from the database or create a new user if it doesn't exist
      let targetUser = await User.findOne({ userId: targetUserId, guildId });

      if (!targetUser) {
        targetUser = await User.create({ userId: targetUserId, guildId });
      }

      const senderCoins = interaction.options.getInteger('sender-coins');
      const targetCoins = interaction.options.getInteger('target-coins');
      const senderItems = interaction.options.getString('sender-items')?.split(',').map(item => item.trim());
      const targetItems = interaction.options.getString('target-items')?.split(',').map(item => item.trim());

      if (senderCoins <= 0 || targetCoins <= 0) {
        interaction.editReply('Please provide a valid number of coins to trade.');
        return;
      }

      if (senderUser.balance < senderCoins) {
        interaction.editReply("You don't have enough coins to trade.");
        return;
      }

      if (targetUser.balance < targetCoins) {
        interaction.editReply("The target user doesn't have enough coins to trade.");
        return;
      }

      senderUser.balance -= senderCoins;
      targetUser.balance -= targetCoins;

      senderUser.balance += targetCoins;
      targetUser.balance += senderCoins;

      // Save the updated user data to the database
      await senderUser.save();
      await targetUser.save();

      if (senderItems && senderItems.length > 0) {
        for (const itemName of senderItems) {
          if (senderUser.inventory.includes(itemName)) {
            senderUser.inventory = senderUser.inventory.filter(item => item !== itemName);
            targetUser.inventory.push(itemName);
          }
        }
      }

      if (targetItems && targetItems.length > 0) {
        for (const itemName of targetItems) {
          if (targetUser.inventory.includes(itemName)) {
            targetUser.inventory = targetUser.inventory.filter(item => item !== itemName);
            senderUser.inventory.push(itemName);
          }
        }
      }

      // Save the updated user data to the database
      await senderUser.save();
      await targetUser.save();

      interaction.editReply(`Trade successful. You traded ${senderCoins} coins for ${targetCoins} coins with the target user.`);
    } catch (error) {
      console.error('Error running trade command:', error);
      interaction.editReply('An error occurred while running the command.');
    }
  },
};
