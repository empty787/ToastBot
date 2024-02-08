module.exports = {
    name: 'ecohelp',
    description: 'economy help',
  
    callback: (client, interaction) => {
      const embed = {
        title: 'Economy Commands Help For void',
        description: 'Here are the available economy commands:',
        fields: [
          {
            name: '/level',
            value: 'Get your current level',
          },
          {
            name: '/leaderboard',
            value: 'The top 10 members with the most level XP!',
          },
          {
            name: '/balance',
            value: 'Check your current balance of currency',
          },
          {
            name: '/add',
            value: 'adds xp to a users level',
          },
          {
            name: '/beg',
            value: 'beg for more ragingtoast813bucks!',
          },
          {
            name: '/blackjack',
            value: 'Play game of blackjack! /hit to hit and /stand to countinue!',
          },
          {
            name: '/daily',
            value: 'Get your ragingtoast813bucks and ragingtoast813Coins each day!',
          },
          {
            name: '/deposit',
            value: 'deposits your ragingtoast813bucks to the bank',
          },
          {
            name: '/gamble',
            value: 'Gamble for more money!',
          },
          {
            name: '/invest',
            value: 'invest your ragingtoast813Bucks!',
          },
          {
            name: '/rob',
            value: 'Robs a user for money',
          },
          {
            name: '/scam',
            value: 'This command is just a test! This is not a scam command to steal your ragingtoast813Bucks!',
          },
          {
            name: '/trade',
            value: 'Trade money with other users!',
          },
          {
            name: '/work',
            value: 'Use this slash command for more ragingtoast813Bucks!',
          },
          {
            name: '/buy',
            value: 'Want to spend your ragingtoast813Bucks on something cool? Do /buy to get something!',
          },
          {
            name: '/shop',
            value: 'Shows all availible products in stock at ragingtoast813Shop!',
          },
          {
            name: '/inventory',
            value: 'Shows every thing you brought/own from the shop!',
          },
          {
            name: '/restaurant',
            value: 'Shows all availible products in stock at `ragingtoast813s Goofy Ahh Restarant!`',
          },
          {
            name: '/order',
            value: 'Are you starving rn? well, use this command to get food at `ragingtoast813s Goofy Ahh Restarant!`',
          },
        ],
        color: 0x964B00, // You can customize the color as desired
        image: {
          url: 'https://i.imgur.com/D41ELWH.png',
      },
    };
  
      interaction.reply({ embeds: [embed] });
    },
  };