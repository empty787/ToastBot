const { Client, Interaction } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const User = require('../../models/User');

module.exports = {
  name: 'character',
  description: "Shows your DolphWorld economy character profile or other users' profiles!",
  options: [
    {
      name: 'user',
      type: 6,
      description: 'Select a user to view their character profile',
      required: false,
    },
  ],

  callback: async (client, interaction) => {
    try {
      const targetUserId = interaction.options.getUser('user')?.id || interaction.user.id;
      const targetUser = await interaction.guild.members.fetch(targetUserId);

      // Fetch level data from the database
      const fetchedLevel = await Level.findOne({
        userId: targetUser.id,
        guildId: interaction.guild.id,
      });

      if (!fetchedLevel) {
        interaction.reply(`This user doesn't have a character profile yet.`);
        return;
      }

      // Fetch user data from the database
      const fetchedUser = await User.findOne({
        userId: targetUser.id,
        guildId: interaction.guild.id,
      });

      const level = fetchedLevel.level;
      const xp = fetchedLevel.xp;
      const requiredXp = calculateLevelXp(level);
      const balance = fetchedUser ? fetchedUser.balance : 0;

      // Create the select menu manually with different options
      const selectMenuOptions = [
        {
          label: 'Level',
          value: 'level',
        },
        {
          label: 'XP',
          value: 'xp',
        },
        {
          label: 'Balance',
          value: 'balance',
        },
        {
          label: 'Full Profile',
          value: 'full',
        },
      ];

      // Manually create the data for the select menu
      const selectMenuComponent = {
        type: 3,
        custom_id: 'modal_select',
        options: selectMenuOptions,
        placeholder: 'Select an option',
      };

      // Send the initial message with the select menu
      await interaction.reply({
        content: 'Please select an option to view:',
        components: [
          {
            type: 1,
            components: [selectMenuComponent],
          },
        ],
      });

      const filter = (buttonInteraction) =>
        buttonInteraction.customId === 'modal_select' && buttonInteraction.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on('collect', async (buttonInteraction) => {
        const selectedOption = buttonInteraction.values[0];

        // Check the selected option and update the profile message accordingly
        let profileMessage = '';
        switch (selectedOption) {
          case 'level':
            profileMessage = `**Level:** ${level}`;
            break;
          case 'xp':
            profileMessage = `**XP:** ${xp}/${requiredXp}`;
            break;
          case 'balance':
            profileMessage = `**Balance:** ${balance}`;
            break;
          default:
            // If 'full' option or no option is selected, show the full character profile
            profileMessage = `**Character Profile of ${targetUser.user.username}**\n\n**Level:** ${level}\n**XP:** ${xp}/${requiredXp}\n**Balance:** ${balance}`;
        }

        // Create the embed
        const embed = {
          title: 'DolphWorld Economy Character Profile',
          description: profileMessage,
          color: 0x964B00,
        };

        // Update the initial message with the selected option
        await buttonInteraction.update({ embeds: [embed] });
      });

      collector.on('end', () => {
        interaction.followUp('The menu has closed.');
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      interaction.reply('An error occurred while fetching the character profile.');
    }
  },
};
