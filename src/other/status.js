const { ActivityType } = require('discord.js');

const status = [
  {
    name: '🌐 </> 💻',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=Coffee',
  },
  {
    name: 'Bot coded my Coffee ;)💻',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=Coffee',
  },
  {
    name: '🤖<🐙 >:)',
    type: ActivityType.Watching,
  },
  {
    name: '/ping | /rank | /work',
    type: ActivityType.Playing,
  },
  {
    name: '🐇>🐸>🦆',
    type: ActivityType.Playing,
  },
  {
    name: '🐇 versus FROG HA',
    type: ActivityType.Playing,
  },
  {
    name: 'give me cookie pwease?',
    type: ActivityType.Playing,
  },
  {
    name: 'to CoffeeTunes 🐸',
    type: ActivityType.Listening,
  },
  {
    name: 'anteaters > 🐜 hha',
    type: ActivityType.Competing,
  },
  {
    name: '🐦 + 🐊 + 🕷️ = 🦖',
    type: ActivityType.Custom,
  },
  {
    name: 'with yarn🧶 meowww',
    type: ActivityType.Custom,
  },
];

module.exports = status;