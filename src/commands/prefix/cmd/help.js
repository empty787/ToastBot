const { prefix } = require('../../../../config.json');

module.exports = {
    name: 'help',
    description: 'Get a list of available commands.',
    execute(message, args) {
      const helpEmbed = {
        color: 0x0099ff,
        title: 'Available Commands',
        fields: [
          {
            name: `${prefix}ping`,
            value: 'Get a Pong response.',
          },
          {
            name: `${prefix}lenny`,
            value: 'Receive a lenny face.',
          },
          {
            name: `${prefix}clock`,
            value: 'Get the current time.',
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Your bot name',
        },
      };
  
      message.reply({ embeds: [helpEmbed] });
    },
  };
  