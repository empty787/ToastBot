const { ApplicationCommandOptionType, MessageAttachment } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const context = require('../../other/context');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const msgLengthLimit = 2000;

module.exports = {
  name: 'gpt-chat',
  description: 'Chat with an AI using GPT-3.5 model.',
  options: [
    {
      name: 'question',
      description: 'Enter your question or message.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const question = interaction.options.getString('question');

      // Rest of the code (message processing and conversation log)...
      const conversationLog = [
        { role: 'system', content: context },
        { role: 'user', content: question },
      ];

      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
      });

      const reply = res.data.choices[0].message?.content;

      if (!reply) {
        await interaction.followUp('I apologize, but I could not generate a reply at the moment.');
        return;
      }

      if (reply.length > msgLengthLimit) {
        const buffer = Buffer.from(reply, 'utf8');
        const txtFile = new MessageAttachment(buffer, `${interaction.user.tag}_response.txt`);

        await interaction.followUp({ files: [txtFile] });
      } else {
        await interaction.followUp(reply);
      }
    } catch (error) {
      console.error('Error:', error);
      await interaction.followUp('An error occurred while processing your request.');
    }
  },
};
