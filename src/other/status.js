const { ActivityType } = require('discord.js');

const status = [
  {
    name: '🌐 </> 💻',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=DolphinNotFound',
  },
  {
    name: '🤖<🐙 >:)',
    type: ActivityType.Watching,
  },
  {
    name: '/ping | /level | /work',
    type: ActivityType.Playing,
  },
  {
    name: '🐇>🐸>🦆',
    type: ActivityType.Playing,
  },
  {
    name: 'give me cookie pwease?',
    type: ActivityType.Playing,
  },
  {
    name: 'to DolphinTunes 🐸',
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
];

module.exports = status;