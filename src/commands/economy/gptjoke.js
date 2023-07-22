const { Client, Interaction } = require('discord.js');

const jokes = {
  'Tell me a joke!': 'Tell me a joke!',
  'Why don’t scientists trust atoms?': 'Why don’t scientists trust atoms?',
  'Did you hear about the mathematician who’s afraid of negative numbers?': 'Did you hear about the mathematician who’s afraid of negative numbers?',
  'Why did the scarecrow win an award?': 'Why did the scarecrow win an award?',
  'What do you call fake spaghetti?': 'What do you call fake spaghetti?',
  'What do you get when you cross a snowman and a vampire?': 'What do you get when you cross a snowman and a vampire?',
  'Why did the tomato turn red?': 'Why did the tomato turn red?',
  'What did the ocean say to the beach?': 'What did the ocean say to the beach?',
  'What did one plate say to the other plate?': 'What did one plate say to the other plate?',
  // Add more jokes as needed...
};

module.exports = {
  name: 'gptjoke',
  description: 'Generate a random joke using GPT-3.',
  options: [
    {
      name: 'joke',
      description: 'Choose a joke:',
      type: 3,
      required: true,
      choices: Object.keys(jokes).map((key) => ({
        name: key,
        value: key,
      })),
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const selectedJoke = interaction.options.getString('joke');

      // Check if the selected joke exists in the jokes object
      if (!jokes[selectedJoke]) {
        interaction.editReply('Invalid joke selected.');
        return;
      }

      const joke = generateGPT3Response(selectedJoke);

      // Send the joke as a response
      const codeBlockResponse = `\`\`\`${joke}\`\`\``;
      interaction.editReply(codeBlockResponse);
    } catch (error) {
      console.error('Error with /gptjoke:', error);
      interaction.editReply('An error occurred while processing the joke.');
    }
  },
};

/**
 * Generate a joke from GPT-3 using the provided prompt.
 * @param {string} jokeKey - The key of the joke for GPT-3.
 * @returns {string} - The generated joke from GPT-3.
 */
function generateGPT3Response(jokeKey) {
  // Replace this with your GPT-3 generation logic
  // For demonstration purposes, we are returning placeholder responses.

  switch (jokeKey) {
    case 'Tell me a joke!':
      return `Why did the chicken cross the road? To get to the other side!`;

    case 'Why don’t scientists trust atoms?':
      return `Because they make up everything!`;

    case 'Did you hear about the mathematician who’s afraid of negative numbers?':
      return `He'll stop at nothing to avoid them!`;

    case 'Why did the scarecrow win an award?':
      return `Because he was outstanding in his field!`;

    case 'What do you call fake spaghetti?':
      return `An impasta!`;

    case 'What do you get when you cross a snowman and a vampire?':
      return `Frostbite!`;

    case 'Why did the tomato turn red?':
      return `Because it saw the salad dressing!`;

    case 'What did the ocean say to the beach?':
      return `Nothing, it just waved!`;

    case 'What did one plate say to the other plate?':
      return `Dinner's on me!`;

    // Add more jokes and responses here...

    default:
      return `This is the generated response for the joke: "${jokeKey}"`;
  }
}
