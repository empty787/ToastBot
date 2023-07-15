const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'button',
  description: 'Random buttons!1!1!1!',
  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const buttonRow = {
        type: 1,
        components: [
          {
            type: 2, 
            style: 1, 
            label: 'Primary',
            customId: 'Primary',
          },
          {
            type: 2, 
            style: 2, 
            label: 'Secondary',
            customId: 'Secondary',
          },
          {
            type: 2, 
            style: 3, 
            label: 'Success',
            customId: 'Success',
          },
          {
            type: 2, // BUTTON
            style: 4, // Danger style
            label: 'Danger',
            customId: 'Danger',
          },
          {
            type: 2,
            style: 5,
            label: 'Link >:) lol',
            url: 'https://github.com/DolphinNotFound',
          },
        ],
      };

      await interaction.editReply({
        content: 'Buttons',
        components: [buttonRow],
      });

      const filter = (buttonInteraction) => buttonInteraction.isButton() && buttonInteraction.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (buttonInteraction) => {
        const customId = buttonInteraction.customId;

        switch (customId) {
          case 'Primary':
            await buttonInteraction.update({ content: 'You clicked the Primary button!' });
            break;
          case 'Secondary':
            await buttonInteraction.update({ content: 'You clicked the Secondary button!' });
            break;
          case 'Success':
            await buttonInteraction.update({ content: 'You clicked the Success button!' });
            break;
          case 'Danger':
            await buttonInteraction.update({ content: 'You clicked the Danger button!' });
            break;
          default:
            await buttonInteraction.update({ content: 'Unknown button.' });
        }
      });
    } catch (error) {
      console.error('Error running button command:', error);
      await interaction.editReply('An error occurred while running the command.');
    }
  },
};
