const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'slot',
    description: 'Play a slot machine game.',
  },
  async execute(interaction) {
    const emojis = ['🍇', '🍊', '🍒', '🍓', '🍉']; // Add more emojis if desired

    // Generate random results
    const result1 = emojis[Math.floor(Math.random() * emojis.length)];
    const result2 = emojis[Math.floor(Math.random() * emojis.length)];
    const result3 = emojis[Math.floor(Math.random() * emojis.length)];

    // Check if all results are the same
    const isWin = result1 === result2 && result2 === result3;

    // Build the slot machine display
    const embed = new MessageEmbed()
      .setTitle('Slot Machine')
      .setDescription(`[ ${result1} | ${result2} | ${result3} ]\n\n${isWin ? 'You win!' : 'You lose!'}`)
      .setColor(isWin ? 'GREEN' : 'RED');

    await interaction.reply({ embeds: [embed] });
  },
};
