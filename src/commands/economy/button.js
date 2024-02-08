const { Client, Interaction, DiscordAPIError } = require('discord.js');

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
            url: 'https://github.com/ragingtoast813',
          },
        ],
      };

      const reply = await interaction.editReply({
        content: 'Buttons',
        components: [buttonRow],
      });

      const filter = (buttonInteraction) => buttonInteraction.isButton() && buttonInteraction.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (buttonInteraction) => {
        const customId = buttonInteraction.customId;

        try {
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
        } catch (error) {
          if (error instanceof DiscordAPIError && error.code === 10062) {
            // Ignore the "Unknown interaction" error
            return;
          } else {
            console.error('Error running button command:', error);
            await interaction.editReply('An error occurred while running the command.');
          }
        }
      });

      collector.on('end', async (collected, reason) => {
        try {
          // Set all buttons to disabled
          for (const button of buttonRow.components) {
            button.disabled = true;
          }

          // Update the reply with disabled buttons
          await reply.edit({ components: [buttonRow] });

          setTimeout(async () => {
            // Edit the reply to indicate the command is disabled
            await reply.edit({
              content: 'This command is now disabled HEHEHEHEHEHEHE.',
              components: [buttonRow],
            });
          }, 3000); // Delay in milliseconds before disabling the command
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error('Error running button command:', error);
      await interaction.editReply('An error occurred while running the command.');
    }
  },
};
