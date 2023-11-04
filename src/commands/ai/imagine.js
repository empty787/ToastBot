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

      const buttonRow = {
        type: 1, // ActionRow
        components: [
          {
            type: 2, // BUTTON
            style: 3, // Danger style
            label: '💬Click to view image💬',
            customId: 'Danger',
          },
          {
            type: 2, // BUTTON
            style: 5, // Link style
            label: '🤓Download🤓',
            url: output[0], // Direct link to the image
          },
        ],
      };

      const replyData = {
        content: 'Here is the Image Generated!:',
        embeds: [
          {
            title: 'Image Generated 🤓🤖🧠🦾👨🏻‍💻',
            description: `**Prompt:**\n${prompt}`,
            color: 0x964b00, // Integer representation of the color
            footer: {
              text: `Requested by ${interaction.user.username} (bot coded by Toast)`,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            },
            timestamp: new Date(),
            image: {
              url: output[0],
            },
          },
        ],
        components: [buttonRow], // Add the button row to the message
      };

      await interaction.editReply(replyData);

      const filter = (buttonInteraction) => buttonInteraction.isButton() && buttonInteraction.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (buttonInteraction) => {
        // No need for switch cases, since there are only two buttons
        if (buttonInteraction.customId === 'Danger') {
          // Reply with the generated image URL
          await buttonInteraction.reply(`Here is the AI-generated image: ${output[0]}`);
        }
      });

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
