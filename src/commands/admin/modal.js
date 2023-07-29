const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  name: 'modal',
  description: 'Shows a modal!',

  callback: async (client, interaction) => {
    try {
      const modal = new ModalBuilder({
        customId: `myModal-${interaction.user.id}`,
        title: 'My Modal',
      });

      const favoriteColorInput = new TextInputBuilder({
        customId: 'favoriteColorInput',
        label: "What's your favorite color?",
        style: TextInputStyle.Short,
      });

      const hobbiesInput = new TextInputBuilder({
        customId: 'hobbiesInput',
        label: "What's your favorite hobbies?",
        style: TextInputStyle.Paragraph,
      });

      const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
      const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

      modal.addComponents(firstActionRow, secondActionRow);

      await interaction.showModal(modal);

      const filter = (i) => i.customId === `myModal-${interaction.user.id}`;

      const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 30000 });

      if (!modalInteraction) {
        await interaction.followUp('You did not respond in time. The modal has closed.');
        return;
      }

      const favoriteColorValue = modalInteraction.components[0]?.components[0]?.value;
      const hobbiesValue = modalInteraction.components[1]?.components[0]?.value;

      if (!favoriteColorValue || !hobbiesValue) {
        await interaction.followUp('Some inputs are missing. The modal has closed.');
        return;
      }

      const replyEmbed = {
        title: 'Your Modal Responses',
        color: 0xe32424,
        fields: [
          { name: "Favorite Color", value: favoriteColorValue },
          { name: "Favorite Hobbies", value: hobbiesValue },
        ],
      };

      const replyData = { embeds: [replyEmbed] };

      // Send the reply data to the interaction channel
      await interaction.followUp(replyData);

      // Close the modal by deferring the update of the original interaction response
      await modalInteraction.deferUpdate();

    } catch (error) {
      console.error('Error showing the modal:', error);
    }
  },
};
