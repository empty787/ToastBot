const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'shop',
  description: 'Displays the items available in the shop for users to purchase.',

  callback: async (client, interaction) => {
    try {
      // Define the shop items with their names, prices, and tags
    const shopItems = [
      { name: 'Super Sword', price: 500, tag: 'Weapons' },
      { name: 'Magic Potion', price: 200, tag: 'Consumables' },
      { name: 'Legendary Shield', price: 1000, tag: 'Armor' },
      { name: 'Coffee Plushie', price: 1000, tag: 'Merchandise' },
      { name: 'Tesla', price: 1000, tag: 'Vehicles' },
      { name: 'Iphone 14 pro max', price: 9000, tag: 'Electronics' },
      { name: 'twitter', price: 1000, tag: 'Social Media' },
      { name: 'big floppa', price: 1000, tag: 'Memes' },
      { name: 'mr beasts channel', price: 1000, tag: 'Entertainment' },
      { name: 'computer', price: 1000, tag: 'Electronics' },
      { name: '9 terabytes of storage', price: 1000, tag: 'Electronics' },
      { name: 'gold', price: 100000, tag: 'Precious Metals' },
      { name: 'time machine', price: 1000, tag: 'Sci-Fi' },
      { name: 'Jordans', price: 90000, tag: 'Fashion' },
      { name: 'Rolex', price: 1000000, tag: 'Luxury' },
      { name: 'GUCCI Xbox', price: 4000000, tag: 'Luxury' },
      { name: 'Minecraft dirt block', price: 69, tag: 'Gaming' },
      { name: 'Ps5', price: 5000, tag: 'Gaming' },
      { name: 'YouTube 100k play button', price: 10000, tag: 'Entertainment' },
      { name: 'YouTube 1M play button', price: 100000, tag: 'Entertainment' },
      { name: 'YouTube 10M play button', price: 1000000, tag: 'Entertainment' },
      { name: 'YouTube 100M play button', price: 10000000, tag: 'Entertainment' },
    ];

    const uniqueTags = [...new Set(shopItems.map((item) => item.tag))];

      const selectOptions = uniqueTags.map((tag) => {
        return {
          label: tag,
          value: tag,
        };
      });

      // If "All" is selected, show all items
      selectOptions.unshift({
        label: 'All',
        value: 'All',
      });

      const shopEmbed = {
        title: 'Welcome to the Coffees Shop!',
        description: 'Here are the items available for purchase:',
        color: 0x964B00,
        fields: [],
      };

      shopItems.forEach((item) => {
        shopEmbed.fields.push({
          name: item.name,
          value: `Price: ${item.price} coins\nTag: ${item.tag}`,
          inline: true,
        });
      });

      const initialMessage = await interaction.reply({
        embeds: [shopEmbed],
        components: [
          {
            type: 1,
            components: [
              {
                type: 3,
                custom_id: 'tag_select',
                options: selectOptions,
                placeholder: 'Select tag(s)',
                min_values: 1,
                max_values: uniqueTags.length + 1, // +1 for "All" option
              },
            ],
          },
        ],
      });

      const filter = (selectInteraction) =>
        selectInteraction.customId === 'tag_select' && selectInteraction.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: null, // No time limit (interaction open indefinitely)
      });

      collector.on('collect', async (selectInteraction) => {
        const selectedTags = selectInteraction.values;

        // Ensure that at least one tag is selected
        if (selectedTags.length === 0) {
          return selectInteraction.reply({
            content: 'You must select at least one tag.',
            ephemeral: true, // Visible only to the user
          });
        }

        // Get items that match the selected tags
        const filteredItems = selectedTags.includes('All')
          ? shopItems
          : shopItems.filter((item) => selectedTags.includes(item.tag));

        const filteredEmbed = {
          title: 'Welcome to the Coffees Shop!',
          description: `Here are the items available for purchase with selected tags: ${selectedTags.join(', ')}`,
          color: 0x964B00,
          fields: [],
        };

        filteredItems.forEach((item) => {
          filteredEmbed.fields.push({
            name: item.name,
            value: `Price: ${item.price} coins\nTag: ${item.tag}`,
            inline: true,
          });
        });

        // Update the Select Menu options to mark selected tags as selected
        const updatedSelectOptions = selectOptions.map((option) => {
          return {
            ...option,
            default: selectedTags.includes(option.value),
          };
        });

        // Update the initial message with the filtered embed and the updated Select Menu options
        await initialMessage.edit({
          embeds: [filteredEmbed],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 3,
                  custom_id: 'tag_select',
                  options: updatedSelectOptions,
                  placeholder: 'Select tag(s)',
                  min_values: 1,
                  max_values: uniqueTags.length + 1, // +1 for "All" option
                },
              ],
            },
          ],
        });

        // Acknowledge the interaction
        selectInteraction.deferUpdate();
      });

      collector.on('end', () => {
        // Collector ended
      });
    } catch (error) {
      console.error('Error in shop command:', error);
      interaction.reply('An error occurred while fetching the shop items.');
    }
  },
};