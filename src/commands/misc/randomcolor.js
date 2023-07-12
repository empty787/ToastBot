const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'random-color',
  description: 'Generates a random color and sets the embed color to the same color',
  callback: (client, interaction) => {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Create a random color code
    const color = (red << 16) | (green << 8) | blue;

    const colorName = getRandomColorName();
    const hexCode = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

    const embed = {
      title: 'Random Color',
      description: `Here is a randomly generated color: ${colorName} (${hexCode})`,
      color: color,
    };

    interaction.reply({ content: `Color: ${colorName} (${hexCode})`, embeds: [embed] });
  },
};

// Helper function to get a random color name (replace with your own logic)
function getRandomColorName() {
  const colorNames = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink'];
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
}
