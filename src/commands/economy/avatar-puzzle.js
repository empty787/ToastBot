const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

// Define the number of rows and columns for the puzzle grid
const numRows = 3;
const numColumns = 3;

module.exports = {
  callback: async (client, interaction) => {
    await interaction.deferReply();

    // Get the user's avatar URL
    const user = interaction.user;
    const avatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });

    // Load the user's avatar as an image
    const avatarImage = await loadImage(avatarURL);

    // Calculate the width and height of each puzzle piece
    const pieceWidth = avatarImage.width / numColumns;
    const pieceHeight = avatarImage.height / numRows;

    // Create an array to store the puzzle pieces
    const puzzlePieces = [];

    // Split the user's avatar into puzzle pieces and store them in the array
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const piece = createCanvas(pieceWidth, pieceHeight);
        const ctx = piece.getContext('2d');
        ctx.drawImage(
          avatarImage,
          col * pieceWidth,
          row * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          pieceWidth,
          pieceHeight
        );
        puzzlePieces.push(piece);
      }
    }

    // Shuffle the puzzle pieces
    shuffleArray(puzzlePieces);

    // Create a canvas to display the puzzle grid
    const canvas = createCanvas(avatarImage.width, avatarImage.height);
    const ctx = canvas.getContext('2d');

    // Display the shuffled puzzle pieces as an interactive grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col;
        const piece = puzzlePieces[index];
        ctx.drawImage(piece, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight);
      }
    }

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the generated puzzle image as a reply
    await interaction.editReply({ files: [buffer] });
  },

  name: 'avatar-puzzle',
  description: 'Create a puzzle with your avatar!',
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
