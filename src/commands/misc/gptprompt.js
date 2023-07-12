const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { OpenAI } = require('openai');

// Replace 'YOUR_GPT_API_KEY' with your OpenAI GPT API key
const gptApiKey = process.env.OPENAI_KEY;

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const prompt = interaction.options.get('prompt').value;

      const response = await generateText(prompt);

      interaction.editReply(response);
    } catch (error) {
      console.error('Error generating text:', error);
      interaction.editReply('An error occurred while generating text.');
    }
  },

  name: 'gptprompt',
  description: 'Generate text based on a prompt.',
  options: [
    {
      name: 'prompt',
      description: 'The prompt for generating text.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

// Function to generate text using GPT
async function generateText(prompt) {
  try {
    const gpt = new OpenAI({ apiKey: gptApiKey });

    const gptResponse = await gpt.complete({
      engine: 'davinci', // Replace with the GPT model name you have access to (e.g., 'davinci', 'curie', 'babbage')
      prompt: prompt,
      maxTokens: 100, // Maximum number of tokens in the generated response
    });

    return gptResponse.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}
