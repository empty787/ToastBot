module.exports = {
    name: 'embed',
    description: 'this is just an embed haha',
  
    callback: (client, interaction) => {
      const embed = {
        title: '-_-',
        description: 'QWERTYYYYYY',
        color: 0x00ff00, // You can customize the color as desired
      };
  
      interaction.reply({ embeds: [embed] });
    },
  };