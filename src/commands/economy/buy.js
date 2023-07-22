const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');
const Item = require('../../models/Item');

const shopItems = [
  { name: 'Super Sword', price: 500 },
  { name: 'Magic Potion', price: 200 },
  { name: 'Legendary Shield', price: 1000 },
  { name: 'DolphinNotFound Plushie', price: 1000 },
  { name: 'Tesla', price: 1000 },
  { name: 'Iphone 14 pro max', price: 9000 },
  { name: 'twitter', price: 1000 },
  { name: 'big floppa', price: 1000 },
  { name: 'mr beasts channel', price: 1000 },
  { name: 'computer', price: 1000 },
  { name: '9 terabytes of storage', price: 1000 },
  { name: 'gold', price: 100000 },
  { name: 'time machine', price: 1000 },
  { name: 'Jordans', price: 90000 },
  { name: 'Rolex', price: 1000000 },
  { name: 'GUCCI Xbox', price: 4000000 },
  { name: 'Minecraft dirt block', price: 69 },
  { name: 'Ps5', price: 5000 },
  { name: 'YouTube 100k play button', price: 10000 },
  { name: 'YouTube 1M play button', price: 100000 },
  { name: 'YouTube 10M play button', price: 1000000 },
  { name: 'YouTube 100M play button', price: 10000000 },
];

module.exports = {
  name: 'buy',
  description: 'Allows the user to buy an item from the shop using their daily DolphCoins and DolphinBucks!',
  options: [
    {
      name: 'item',
      description: 'The item you want to buy at DolphStore!',
      type: 3,
      required: true,
      choices: shopItems.map((item) => ({
        name: item.name,
        value: item.name,
      })),
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const query = {
        userId: interaction.user.id,
        guildId: interaction.inGuild() ? interaction.guild.id : null,
      };

      // Fetch the user from the database or create a new user if it doesn't exist
      let user = await User.findOne(query);

      if (!user) {
        console.log('Creating new user:', query);
        // Create a new user document if it doesn't exist
        user = await User.findOneAndUpdate(query, {}, { upsert: true, new: true });
      }

      const itemToBuy = interaction.options.getString('item');

      // Ensure user.inventory is initialized as an empty array if it doesn't exist
      if (!user.inventory) {
        user.inventory = [];
      }

      // Check if the user already owns the item
      if (user.inventory.includes(itemToBuy)) {
        const embed = {
          title: 'Item Already Owned',
          description: `Hey ${interaction.user}, you already have the item "${itemToBuy}"!`,
          color: 0xFF0000, // Red color
        };

        interaction.editReply({ embeds: [embed] });
        return;
      }

      // Fetch the selected item from the database or create a new item if it doesn't exist
      let selectedItem = await Item.findOne({ name: itemToBuy, userId: null });

      if (!selectedItem) {
        // If the item is not found in the database, check in the shopItems array
        const fallbackItem = shopItems.find((item) => item.name.toLowerCase() === itemToBuy.toLowerCase());

        if (fallbackItem) {
          console.log('Creating new item:', fallbackItem);
          // Create a new item in the database using the fallback item data and set the userId field
          selectedItem = new Item({ ...fallbackItem, userId: interaction.user.id });
        } else {
          // If the item is not found in both the database and the shopItems array, inform the user that the item is not available in the shop.
          const embed = {
            title: 'Item Not Available',
            description: `Item "${itemToBuy}" is not available in the shop.`,
            color: 0xFF0000, // Red color
          };

          interaction.editReply({ embeds: [embed] });
          return;
        }
      } else {
        // If the item is found in the database but has no owner, set the userId field
        selectedItem.userId = interaction.user.id;
      }

      if (user.balance < selectedItem.price) {
        const embed = {
          title: 'Insufficient Balance',
          description: 'Insufficient DolphCoins and DolphinBucks to make the purchase.',
          color: 0xFF0000, // Red color
        };

        interaction.editReply({ embeds: [embed] });
        return;
      }

      user.balance -= selectedItem.price;
      user.inventory.push(selectedItem.name);

      // Save the user and item data to the database
      await user.save();
      await selectedItem.save();

      const embed = {
        title: 'Purchase Successful',
        description: `You have successfully purchased ${selectedItem.name}.`,
        color: 0x00FF00, // Green color
      };

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error with /buy: ${error}`);
      const embed = {
        title: 'Error',
        description: 'An error occurred while processing the purchase.',
        color: 0xFF0000, // Red color
      };

      interaction.editReply({ embeds: [embed] });
    }
  },
};
