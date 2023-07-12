module.exports = {
  name: 'hey',
  description: 'Greets you!',

  callback: (client, interaction) => {
    const embed = {
      title: 'Hey!',
      description: 'I am Dolphin\'s Discord bot! qwerty',
      color: 0x00ff00, // You can customize the color as desired
    };

    interaction.reply({ embeds: [embed] });
  },
};
