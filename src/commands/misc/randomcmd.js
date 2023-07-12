module.exports = {
    name: 'randomcommands',
    description: 'help',
  
    callback: (client, interaction) => {
      const embed = {
        title: 'random generators',
        description: 'generators',
        fields: [
          {
            name: '/random-color',
            value: 'generates a random color, includes the color name and hex code in the response message, and sets the embed color to the same color',
          },
          {
            name: '/randomemoji',
            value: 'Sends a random emoji',
          },
          {
            name: '/randomprompt',
            value: 'sends random prompts',
          },
        ],
        color: 0x964B00, // You can customize the color as desired
        image: {
          url: 'https://i.imgur.com/CQiKstK.jpg',
      },
    };
  
      interaction.reply({ embeds: [embed] });
    },
  };