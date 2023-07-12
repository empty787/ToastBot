module.exports = {
    name: 'scam',
    description: 'Use this cmd for 1000 DolphinBuckz (this is just a test)',
  
    callback: (client, interaction) => {
      const embed = {
        title: 'scammed! no more Dolphinbucks! the bank got robbed by the smiler',
        description: 'no',
        color: 0x0FFFF, // You can customize the color as desired
      };
  
      interaction.reply({ embeds: [embed] });
    },
  };