const { Client, Interaction } = require('discord.js');
const Item = require('../../models/Item');

module.exports = {
  name: 'inventory',
  description: "Shows the user's inventory with the items they own.",

  callback: async (client, interaction) => {
    try {
      // Fetch the user's data from the database using the user's ID
      const userItems = await Item.find({ userId: interaction.user.id });

      // Get only the names of the items the user owns
      const userOwnedItems = userItems.map((item) => item.name);

      // Format the user's inventory data for displaying in the message
      const inventoryList = userOwnedItems.length > 0 ? userOwnedItems.join('\n') : 'Your inventory is empty.';

      // Create the brown-colored embed
      const inventoryEmbed = {
        title: `Inventory of ${interaction.user.username}`,
        description: inventoryList,
        fields: [
          {
            name: 'Hey! thanks for shopping at DolphStore!!!',
            value: 'EEEEEEEEĘEË',
          },
        ],
        color: 0x964B00, // Brown color in hexadecimal
        thumbnail: {
          url: 'https://i.imgur.com/CQiKstK.jpg',
        },
        footer: {
          text: 'CoffeeBot - Created by Coffee',
          icon_url: 'https://i.imgur.com/CQiKstK.jpg',
        },
        timestamp: new Date(),
      };

      // Send the embed as a message in Discord
      interaction.reply({ embeds: [inventoryEmbed] });
    } catch (error) {
      console.error('Error fetching user inventory:', error);
      interaction.reply('An error occurred while fetching your inventory.');
    }
  },
};


function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}