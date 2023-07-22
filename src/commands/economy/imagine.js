const { Client, Interaction } = require('discord.js');

const prompts = {
  'Imagine a world without technology.': {
    prompt: 'Imagine a world without technology.',
    image: 'https://siteimages.simplified.com/blog/Can-You-Sell-AI-Generated-Art.png?auto=compress&fm=png'
  },
  'Imagine you could travel back in time.': {
    prompt: 'Imagine you could travel back in time.',
    image: 'https://siteimages.simplified.com/blog/Can-You-Sell-AI-Generated-Art.png?auto=compress&fm=png',
  },
  'Imagine you woke up with superpowers.': {
    prompt: 'Imagine you woke up with superpowers.',
    image: 'https://siteimages.simplified.com/blog/Can-You-Sell-AI-Generated-Art.png?auto=compress&fm=png',
  },
  'Imagine you won a million dollars in the lottery.': {
    prompt: 'Imagine you won a million dollars in the lottery.',
    image: 'https://siteimages.simplified.com/blog/Can-You-Sell-AI-Generated-Art.png?auto=compress&fm=png',
  },
  // Add more prompts with their corresponding image URLs here...
};

module.exports = {
  name: 'imagine',
  description: 'Use your imagination and get a response with an image!',
  options: [
    {
      name: 'prompt',
      description: 'Choose an imagination prompt:',
      type: 3,
      required: true,
      choices: Object.keys(prompts).map((key) => ({
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

      const selectedPrompt = interaction.options.getString('prompt');

      // Check if the selected prompt exists in the prompts object
      if (!prompts[selectedPrompt]) {
        interaction.editReply('Invalid prompt selected.');
        return;
      }

      const { prompt, image } = prompts[selectedPrompt];

      // Create the response manually without using MessageEmbed
      const embed = {
        color: 0x00FF00, // Green color
        title: 'Imagination Prompt',
        description: prompt,
        image: { url: image },
      };

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error with /imagine:', error);
      interaction.editReply('An error occurred while processing your imagination.');
    }
  },
};
