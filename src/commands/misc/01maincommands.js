module.exports = {
    name: 'maincommands',
    description: 'list of the main commands!',
  
    callback: (client, interaction) => {
      const embed = {
        title: 'main comands',
        description: 'e',
        fields: [
          {
            name: '/avatar',
            value: 'send the avatar of the user who used this command',
          },
          {
            name: '/clock',
            value: 'Sends you the current time',
          },
          {
            name: '/clockimage',
            value: 'the image version of /clock!',
          },
          {
            name: '/date',
            value: 'gives you todays date',
          },
          {
            name: '/embed',
            value: 'sends an embed',
          },
          {
            name: '/fun',
            value: 'goofy ahh command',
          },
          {
            name: '/google',
            value: 'google search command (currently not working because i have to fix the codes)',
          },
          {
            name: '/greet',
            value: 'greets you',
          },
          {
            name: '/hey',
            value: 'replys with hey in an embed',
          },
          {
            name: '/invite',
            value: 'gives you the invite to DolphWorld Discord server!',
          },
          {
            name: '/lenny',
            value: 'sends you lenny face',
          },
          {
            name: '/moderationcmd',
            value: 'command for moderators',
          },
          {
            name: '/ping',
            value: 'replies with pong and the bots ping!',
          },
          {
            name: '/pingimage',
            value: 'image version of /ping!',
          },
          {
            name: '/randomemoji',
            value: 'sends random emoji',
          },
          {
            name: '/randomprompt',
            value: 'sends random prompt',
          },
          {
            name: '/rickroll',
            value: 'rick rolls you',
          },
          {
            name: '/rolldice',
            value: 'rolls a dice',
          },
          {
            name: '/sus',
            value: 'among us sus',
          },
          {
            name: '/test',
            value: 'testing slash command',
          },
          {
            name: '/uptime',
            value: 'shows how long the bot has been online for!',
          },
          {
            name: '/userinfo',
            value: 'user about the info who used this command',
          },
          {
            name: '/random-color',
            value: 'generates a random color, includes the color name and hex code in the response message, and sets the embed color to the same color',
          },
          {
            name: '/funnydog',
            value: 'goofy ahh dog stuck in an embed',
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