const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/User');

const restaurantMenu = [
    { name: 'Pizza', price: 9 },
    { name: 'Burger', price: 8 },
    { name: 'Happy Meal', price: 10 },
    { name: 'Hot Dog', price: 4 },
    { name: 'Soda', price: 3 },
    { name: 'Water', price: 0 },
    { name: 'Popcorn', price: 2 },
    { name: 'Floppa Steak', price: 50000 },
    { name: 'Airplane Wi-Fi’s Special (rice)', price: 420 },
    { name: "Bingus’s Cookies", price: 20 },
    { name: 'Smoked Salmon', price: 1000 },
    { name: "IceCream Man Rod’s IceCream", price: 69 },
    { name: "Granny’s Blueberry Pie", price: 30 },
    { name: "Waygu A5 Beef", price: 20000 },
];

module.exports = {
  name: 'order',
  description: 'Allows the user to order food from the restaurant menu using ToastBucks!',
  options: [
    {
      name: 'item',
      description: 'The food item you want to order from the restaurant menu!',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: restaurantMenu.map((item) => ({
        name: item.name,
        value: item.name,
      })),
    },
  ],

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

      const itemToOrder = interaction.options.getString('item');

      const selectedFoodItem = restaurantMenu.find((item) => item.name.toLowerCase() === itemToOrder.toLowerCase());

      if (!selectedFoodItem) {
        const embed = {
          title: 'Invalid Item',
          description: 'Please select a valid food item from the restaurant menu.',
          color: 0xFF0000, // Red color
        };

        interaction.editReply({ embeds: [embed] });
        return;
      }

      if (user.balance < selectedFoodItem.price) {
        const embed = {
          title: 'Insufficient Balance',
          description: "L, you don't have enough ToastBucks to order this food item. Better luck next time!",
          color: 0xFF0000, // Red color
        };

        interaction.editReply({ embeds: [embed] });
        return;
      }

      user.balance -= selectedFoodItem.price;

      // Save the updated user data to the database
      await user.save();

      const embed = {
        title: 'Order Successful',
        description: `You have successfully ordered ${selectedFoodItem.name}. Enjoy your meal! 🍔`,
        color: 0x00FF00, // Green color
      };

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.log(`Error with /order: ${error}`);
      const embed = {
        title: 'Error',
        description: 'An error occurred while processing your order.',
        color: 0xFF0000, // Red color
      };

      interaction.editReply({ embeds: [embed] });
    }
  },
};
