module.exports = {
  name: 'menu',
  description: 'Goofy ahh select menu!',
  callback: async (client, interaction) => {
    const selectMenuOptions = [
      {
        label: 'Pepe the Frog',
        value: 'pepe',
      },
      {
        label: 'Doge',
        value: 'doge',
      },
      {
        label: 'SpongeBob SquarePants',
        value: 'spongebob',
      },
      {
        label: 'Homer Simpson',
        value: 'homer',
      },
      {
        label: 'Kermit the Frog',
        value: 'kermit',
      },
    ];

    const selectMenuComponent = {
      type: 3,
      custom_id: 'modal_select',
      options: selectMenuOptions,
      placeholder: 'Select a meme character',
    };

    const modalData = {
      type: 1,
      components: [selectMenuComponent],
    };

    await interaction.reply({
      content: 'Please select a meme character from the menu:',
      components: [modalData],
    });

    const filter = (buttonInteraction) =>
      buttonInteraction.customId === 'modal_select' && buttonInteraction.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (buttonInteraction) => {
      const selectedOption = buttonInteraction.values[0];
      let emoji;

      switch (selectedOption) {
        case 'pepe':
          emoji = '😄';
          break;
        case 'doge':
          emoji = '😂';
          break;
        case 'spongebob':
          emoji = '🤣';
          break;
        case 'homer':
          emoji = '🍩';
          break;
        case 'kermit':
          emoji = '🐸';
          break;
        default:
          emoji = '😊';
          break;
      }

      await buttonInteraction.reply(`You selected ${selectedOption} ${emoji}`);
    });

    collector.on('end', () => {
      interaction.followUp('The menu has closed.');
    });
  },
};
