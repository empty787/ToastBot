const { Client, Interaction } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const User = require('../../models/User');

module.exports = {
  name: 'profile',
  description: 'Shows your DolphWorld economy profile or account! :)',

  callback: async (client, interaction) => {
    const targetUser = interaction.user;
    const avatarURL = targetUser.displayAvatarURL({ dynamic: true });

    try {
      // Fetch level data from database
      const fetchedLevel = await Level.findOne({
        userId: targetUser.id,
        guildId: interaction.guild.id,
      });

      if (!fetchedLevel) {
        interaction.reply(`You don't have a level yet.`);
        return;
      }

      // Fetch user data from the database
      const fetchedUser = await User.findOne({ userId: targetUser.id, guildId: interaction.guild.id });

      const level = fetchedLevel.level;
      const xp = fetchedLevel.xp;
      const requiredXp = calculateLevelXp(level);
      const balance = fetchedUser ? fetchedUser.balance : 0;

      // Create buttons for each piece of information
      const levelButton = {
        type: 2,
        style: 1,
        label: 'Level',
        customId: 'level',
      };

      const xpButton = {
        type: 2,
        style: 1,
        label: 'XP',
        customId: 'xp',
      };

      const balanceButton = {
        type: 2,
        style: 1,
        label: 'Balance',
        customId: 'balance',
      };

      // Create an action row with the buttons
      const actionRow = {
        type: 1,
        components: [levelButton, xpButton, balanceButton],
      };

      // Send the initial message with the action row
      await interaction.reply({
        content: 'Please select an option to view:',
        embeds: [
          {
            title: `Profile of ${targetUser.username}`,
            description: `Level: ${level}\nXP: ${xp}/${requiredXp}\nBalance: ${balance}`,
            color: 0x964B00,
            image: {
              url: avatarURL,
            },
          },
        ],
        components: [actionRow],
      });

      const filter = (buttonInteraction) =>
        buttonInteraction.user.id === interaction.user.id && buttonInteraction.isButton() && actionRow.components.some((button) => button.customId === buttonInteraction.customId);

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on('collect', async (buttonInteraction) => {
        let responseMessage = '';

        // Handle button interactions based on the selected option
        switch (buttonInteraction.customId) {
          case 'level':
            responseMessage = `Your level is: ${level}`;
            break;
          case 'xp':
            responseMessage = `Your XP is: ${xp}/${requiredXp}`;
            break;
          case 'balance':
            responseMessage = `Your balance is: ${balance}`;
            break;
        }

        // Update the message with the selected information
        await buttonInteraction.update({
          content: responseMessage,
          components: [actionRow], // Re-add the action row to the updated message
        });
      });

      collector.on('end', () => {
        interaction.followUp('The menu has closed.');
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      interaction.reply('An error occurred while fetching your profile.');
    }
  },
};
