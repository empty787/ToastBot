const { ApplicationCommandOptionType } = require('discord.js');
const { REPLICATE_API_KEY } = require('../../../config.json');
const models = require('../../models/models');

module.exports = {
  name: 'imagine',
  description: 'Generate an image using a prompt.',
  options: [
    {
      name: 'prompt',
      description: 'Enter your prompt',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'model',
      description: 'The image model',
      type: ApplicationCommandOptionType.String,
      choices: models,
      required: false,
    },
  ],

  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const { default: Replicate } = await import('replicate');
      const replicate = new Replicate({ auth: REPLICATE_API_KEY });

      const prompt = interaction.options.getString('prompt');
      const model = interaction.options.getString('model') || models[0].value;

      const output = await replicate.run(model, { input: { prompt } });

      const replyData = {
        content: 'OH NOOO AI TAKING OVER AHHHH Image Generated:',
        embeds: [
          {
            title: 'OH NOOO AI TAKING OVER AHHHH HELPPImage Generated',
            description: `**Prompt:**\n${prompt}`,
            color: 0xe32424, // Integer representation of the color
            footer: {
              text: `Requested by ${interaction.user.username}`,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            },
            timestamp: new Date(),
            image: {
              url: output[0],
            },
          },
        ],
      };

      await interaction.editReply(replyData);
    } catch (error) {
      const errReplyData = {
        content: 'An error occurred:',
        embeds: [
          {
            description: `\`\`\`${error}\`\`\``,
            color: 0xff0000, // Red color for the error message
          },
        ],
      };

      await interaction.editReply(errReplyData);
    }
  },
};
