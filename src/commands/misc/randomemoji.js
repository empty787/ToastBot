module.exports = {
  name: 'randomemoji',
  description: 'Get a random emoji🔥',

  callback: (client, interaction) => {
    const emojis = ['😄', '🎉', '🔥', '🐢', '🌟', '🍕', '🎶', '🌈'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    interaction.reply(`Random Emoji: ${randomEmoji}`);
  },
};

  