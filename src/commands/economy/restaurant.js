const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  name: 'restaurant',
  description: 'Displays the menu and prices of the restaurant.',

  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      // Fetch the user from the database
      const user = await User.findOne({ userId: interaction.user.id });

      if (!user) {
        interaction.editReply('You need to have an account to order from the restaurant.');
        return;
      }

      // Define the menu items and their prices
      const menu = [
        { name: 'Pizza', price: 9 },
        { name: 'Burger', price: 8 },
        { name: 'Happy Meal', price: 10 },
        { name: 'Hot Dog', price: 4 },
        { name: 'Soda', price: 3 },
        { name: 'Water', price: 0 },
        { name: 'Popcorn', price: 2 },
        { name: 'Floppa Steak', price: 50000 },
        { name: 'Pepper Corn', price: 10000 },
        { name: 'Airplane Wi-Fi’s Special (rice)', price: 420 },
        { name: "Bingus's Cookies", price: 20 },
        { name: 'Smoked Salmon', price: 1000 },
        { name: "IceCream Man Rod's IceCream", price: 69 },
        { name: "Granny's Blueberry Pie", price: 30 },
        { name: 'Waygu A5 Beef', price: 20000 },
      ];

      // Create the embed manually to display the menu
      const embed = {
        color: 0xFF5733,
        title: 'Restaurant Menu',
        description: 'Here is our delicious menu with prices:',
        fields: menu.map(item => ({ name: item.name, value: `${item.price} ragingtoast813Bucks`, inline: true })),
        footer: { text: 'ragingtoast813s goofy ahh restarant' },
      };

      if (user.money < 0) {
        interaction.editReply('You do not have enough ragingtoast813Bucks to order from the restaurant.');
        return;
      }

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error running restaurant command:', error);
      interaction.editReply('An error occurred while processing the command.');
    }
  },
};
