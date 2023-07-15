const { Client, Interaction, DiscordAPIError } = require('discord.js');
const Level = require('../../models/Level');

module.exports = {
  name: 'xp-button',
  description: 'e',
  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const buttons = [
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
          type: 2,
          style: 4,
          label: 'Danger',
          customId: 'Danger',
        },
      ];

      // Select a random button to assign XP to
      const randomIndex = Math.floor(Math.random() * buttons.length);
      const selectedButton = buttons[randomIndex];

      const buttonRow = {
        type: 1,
        components: buttons,
      };

      await interaction.editReply({
        content: 'Buttons',
        components: [buttonRow],
      });

      const filter = (buttonInteraction) =>
        buttonInteraction.isButton() && buttonInteraction.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      let gameOver = false;

      collector.on('collect', async (buttonInteraction) => {
        if (gameOver) return;

        const customId = buttonInteraction.customId;

        if (customId === selectedButton.customId) {
          try {
            await buttonInteraction.update({ content: `You clicked the ${selectedButton.label} button!` });
          } catch (error) {
            if (error instanceof DiscordAPIError && error.code === 10062) {
              // Interaction is no longer valid, ignore the error
              return;
            } else {
              console.error('Error updating button interaction:', error);
              return;
            }
          }
          const xpAmount = 5;
          const userId = buttonInteraction.user.id;
          await giveXP(userId, xpAmount);
          await interaction.channel.send(`Gave <@${userId}> ${xpAmount} XP.`);
        } else {
          gameOver = true;
          try {
            await buttonInteraction.update({ content: 'Game over. You clicked the wrong button.' });
          } catch (error) {
            if (error instanceof DiscordAPIError && error.code === 10062) {
              // Interaction is no longer valid, ignore the error
              return;
            } else {
              console.error('Error updating button interaction:', error);
              return;
            }
          }
        }
      });
    } catch (error) {
      console.error('Error running button command:', error);
      await interaction.editReply('An error occurred while running the command.');
    }
  },
};

async function giveXP(userId, xpAmount) {
  try {
    const user = await Level.findOne({ userId });
    if (!user) {
      const newUser = new Level({ userId, xp: xpAmount });
      await newUser.save();
    } else {
      user.xp += xpAmount;
      await user.save();
    }
  } catch (error) {
    console.error('Error giving XP:', error);
  }
}
