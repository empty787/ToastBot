const { Client, Interaction } = require('discord.js');

const prompts = {
  'Generate an AI landscape image.': 'AI_LANDSCAPE_IMAGE',
  'Generate an AI animal image.': 'AI_ANIMAL_IMAGE',
  'Generate an AI abstract art image.': 'AI_ABSTRACT_ART_IMAGE',
  'Generate an AI food image.': 'AI_FOOD_IMAGE',
  'Generate an AI technology image.': 'AI_TECHNOLOGY_IMAGE',
  'Generate an AI fashion image.': 'AI_FASHION_IMAGE',
  'Generate an AI music image.': 'AI_MUSIC_IMAGE',
  'Generate an AI sports image.': 'AI_SPORTS_IMAGE',
  'Generate an AI space image.': 'AI_SPACE_IMAGE',
  'Generate an AI underwater image.': 'AI_UNDERWATER_IMAGE',
  'Generate an AI cityscape image.': 'AI_CITYSCAPE_IMAGE',
  // Add more prompts as needed...
};

module.exports = {
  name: 'gptimage',
  description: 'Generate a random AI image using GPT-3.',
  options: [
    {
      name: 'prompt',
      description: 'Choose a prompt:',
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

      const image = generateGPT3Response(prompts[selectedPrompt]);

      // Create an embed with the generated AI image
      const embed = {
        title: `Generated AI Image: ${selectedPrompt}`,
        image: {
          url: image,
        },
      };

      // Create a message with buttons for generating another image
      const responseMessage = `**Generated AI Image: ${selectedPrompt}**\n\nTo generate another image, click the button below:`;

      const buttonRow = {
        type: 1,
        components: [
          {
            type: 2,
            style: 1,
            label: '🤓 Generate Another Random AI Image🤓',
            customId: 'generate_another',
          },
        ],
      };

      await interaction.editReply({
        content: responseMessage,
        components: [buttonRow],
        embeds: [embed],
      });

      const filter = (buttonInteraction) => buttonInteraction.isButton() && buttonInteraction.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (buttonInteraction) => {
        const customId = buttonInteraction.customId;

        try {
          if (customId === 'generate_another') {
            // Choose another random prompt key
            const randomPromptKey = getRandomPromptKey();
            const newImage = generateGPT3Response(prompts[randomPromptKey]);

            // Update the embed with the new AI image and prompt
            embed.title = `Generated AI Image: ${randomPromptKey}`;
            embed.image.url = newImage;

            await buttonInteraction.update({ content: responseMessage, embeds: [embed] });
          } else {
            await buttonInteraction.update({ content: 'Unknown button.' });
          }
        } catch (error) {
          console.error('Error running button command:', error);
          await interaction.editReply('An error occurred while running the command.');
        }
      });
    } catch (error) {
      console.error('Error with /gptimage:', error);
      interaction.editReply('An error occurred while processing the AI image.');
    }
  },
};

/**
 * Generate an AI image URL using the provided prompt.
 * @param {string} promptKey - The key of the prompt for GPT-3.
 * @returns {string} - The URL of the generated AI image.
 */
function generateGPT3Response(promptKey) {
  // Replace this with your GPT-3 generation logic
  // For demonstration purposes, we are returning the provided image URLs.

  switch (promptKey) {
    case 'AI_LANDSCAPE_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_featured_image/84ff36ac-710f-4dbc-831f-3f8cb108c3d4/1mrNnh8.png';

    case 'AI_ANIMAL_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_featured_image/ed366d80-2ded-47aa-95ae-8fee99b278cf/future-llama-70b-chat.png';

    case 'AI_ABSTRACT_ART_IMAGE':
      return 'https://tjzk.replicate.delivery/models_collections_cover_image/diffusion-models-cover.jpg';

    case 'AI_FOOD_IMAGE':
      return 'https://tjzk.replicate.delivery/models_collections_cover_image/image-to-text.png';

    case 'AI_TECHNOLOGY_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_cover_image/4228bfbc-bcb7-404d-8586-726c31f7073c/kqm9ddydl8_1689082483825.png';

    case 'AI_FASHION_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_cover_image/d63d3c3b-4d73-4d27-b5b0-6b6fb4def277/anime-girl-pink.gif';

    case 'AI_MUSIC_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_cover_image/310be09b-0cfd-41a3-851f-50ec8f899fb7/Screenshot_2023-07-12_at_10.43.34.png';

    case 'AI_SPORTS_IMAGE':
      return 'https://www.sify.com/wp-content/uploads/2022/12/artificial_intelligence_football-1024x491.jpg';

    case 'AI_SPACE_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_featured_image/37667092-b5c7-4bfa-b475-3bd94410f9e5/out-0_2.png';

    case 'AI_UNDERWATER_IMAGE':
      return 'https://cdn.openart.ai/stable_diffusion/b00d5203c949b42cdf4c3f69524e8f9ab74cb587_2000x2000.webp';

    case 'AI_CITYSCAPE_IMAGE':
      return 'https://tjzk.replicate.delivery/models_models_featured_image/84ff36ac-710f-4dbc-831f-3f8cb108c3d4/1mrNnh8.png';

    // Add more prompts and corresponding image URLs here...

    default:
      return `This is the generated response for the prompt: "${promptKey}"`;
  }
}

/**
 * Get a random prompt key from the prompts object.
 * @returns {string} - A random prompt key.
 */
function getRandomPromptKey() {
  const promptKeys = Object.keys(prompts);
  return promptKeys[Math.floor(Math.random() * promptKeys.length)];
}
