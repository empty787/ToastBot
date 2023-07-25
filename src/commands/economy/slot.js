module.exports = {
  name: 'slot',
  description: 'Play a slot machine game.',

  callback: (client, interaction) => {
    const emojis = ['🍇', '🍊', '🍒', '🍓', '🍉']; // Add more emojis if desired

    // Generate random results
    const result1 = emojis[Math.floor(Math.random() * emojis.length)];
    const result2 = emojis[Math.floor(Math.random() * emojis.length)];
    const result3 = emojis[Math.floor(Math.random() * emojis.length)];

    // Check if all results are the same
    const isWin = result1 === result2 && result2 === result3;

    // Build the slot machine display manually
    const response = `**Slot Machine**\n[ ${result1} | ${result2} | ${result3} ]\n\n${isWin ? 'You win!' : 'You lose!'}`;

    // Create a brown-colored embed
    const embed = {
      color: parseInt('8C6A43', 16), // Brown color (convert hexadecimal to integer)
      title: 'Slot Machine',
      description: `${result1} | ${result2} | ${result3}\n\n${isWin ? 'You win!' : 'You lose!'}`,
    };

    // Send the embed as a reply
    interaction.reply({ embeds: [embed] });
  },
};
