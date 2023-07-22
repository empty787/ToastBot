const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'shop',
  description: 'Displays the items available in the shop for users to purchase.',

  callback: (client, interaction) => {
    // Define the shop items with their names and prices
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

    // Manually create the shop embed
    const shopEmbed = {
      title: 'Welcome to the Dolphins Shop!',
      description: 'Here are the items available for purchase:',
      color: 0x964B00,
      fields: [],
    };

    // Add each shop item as a field in the embed
    shopItems.forEach((item) => {
      shopEmbed.fields.push({
        name: item.name,
        value: `Price: ${item.price} coins`,
        inline: true,
      });
    });

    // Send the shop embed as a reply
    interaction.reply({ embeds: [shopEmbed] });
  },
};
