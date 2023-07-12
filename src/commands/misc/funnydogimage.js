module.exports = {
  name: 'funnydog',
  description: 'This is just an embed with an image.',
  callback: (client, interaction) => {
    const embed = {
      title: 'Funny Dog',
      description: 'Let me do it for you',
      color: 0x00ff00, // You can customize the color as desired
      image: {
        url: `https://i.imgur.com/9FY3cDA.png`,
      },
    };

    interaction.reply({ embeds: [embed] });
  },
};