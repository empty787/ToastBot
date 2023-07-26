const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { OpenAIApi, Configuration } = require('openai');

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

// Function to handle the AI chat functionality
async function handleChatGpt(prompt, message, client) {
  message.channel.sendTyping();

  let messages = Array.from(
    await message.channel.messages.fetch({
      limit: 5,
      before: message.id,
    })
  );
  messages = messages.map((m) => m[1]);
  messages.unshift(message);

  let users = [
    ...new Set([...messages.map((m) => m.member.displayName), client.user.username]),
  ];
  let lastUser = users.pop();

  let conversationPrompt = `The following is a conversation between ${users.join(', ')}, and ${lastUser}. \n\n`;

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    conversationPrompt += `${m.member.displayName}: ${m.content}\n`;
  }

  const fullPrompt = `${conversationPrompt}${client.user.username}: ${prompt}`;

  const response = await openai.createCompletion({
    prompt: fullPrompt,
    model: 'text-davinci-003',
    max_tokens: 500,
    stop: ['\n'],
  });

  return response.data.choices[0].text; // Return the generated AI response
}

module.exports = {
  name: 'gpttest',
  description: 'Test the GPT-3 AI chat functionality.',
  options: [
    {
      name: 'prompt',
      description: 'Enter your custom prompt for the GPT-3 AI.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: 'You can only run this command inside a server.',
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply();

    // Get the custom prompt entered by the user
    const prompt = interaction.options.getString('prompt');

    try {
      // Call the existing function to handle the AI chat functionality with the custom prompt
      const aiResponse = await handleChatGpt(prompt, interaction, client);

      // Send the AI response if it is not empty
      if (aiResponse.trim()) {
        await interaction.followUp(aiResponse);
      } else {
        await interaction.followUp("I'm sorry, but I couldn't generate a response for that prompt.");
      }
    } catch (error) {
      console.error('Error running /gpttest command:', error);
      await interaction.followUp('An error occurred while processing the AI response.');
    }

    // You can add any additional logic or response for the /gpttest command here if needed.
    // For example, you could perform some other action or send additional messages.
  },
};
