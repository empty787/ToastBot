module.exports = {
    name: 'say',
    description: 'Make the bot say a message!',
    options: [
      {
        name: 'message',
        description: 'The message to be said',
        type: 3, // Updated type value for string option
        required: true,
      },
    ],
  
    callback: (client, interaction) => {
      const message = interaction.options.getString('message');
  
      const embed = {
        title: `Said by ${interaction.user.username}`,
        description: message,
        color: 0x964B00,
        thumbnail: {
            url: 'https://i.imgur.com/CQiKstK.jpg',
          },
          footer: {
            text: 'CoffeeBot - Created by Coffee',
            icon_url: 'https://i.imgur.com/CQiKstK.jpg',
          },
          timestamp: new Date(),
      };
  
      // Sending the embed as a reply
      interaction.reply({ embeds: [embed] });
    },
  };


  function formatUptime(uptime) {
    const totalSeconds = Math.floor(uptime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }