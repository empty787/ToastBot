const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  name: 'suggestion',
  description: "Your suggestion will be sent to ragingragingtoast813813's discord (void HQ)",

  callback: async (client, interaction) => {
    try {
      const modal = new ModalBuilder({
        customId: `myModal-${interaction.user.id}`,
        title: 'My Modal',
      });

      const suggestionInput = new TextInputBuilder({
        customId: 'suggestionInput',
        label: "Your suggestion",
        style: TextInputStyle.Paragraph,
      });

      const topicInput = new TextInputBuilder({
        customId: 'topicInput',
        label: "Topic",
        style: TextInputStyle.Short, // Use TextInputStyle.Short for a single-line topic input
      });

      const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);
      const secondActionRow = new ActionRowBuilder().addComponents(topicInput);

      modal.addComponents(firstActionRow, secondActionRow);

      await interaction.showModal(modal);

      const filter = (i) => i.customId === `myModal-${interaction.user.id}`;

      const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 30000 });

      if (!modalInteraction) {
        await interaction.followUp('You did not respond in time. The modal has closed.');
        return;
      }

      const suggestionValue = modalInteraction.components[0]?.components[0]?.value;
      const topicValue = modalInteraction.components[1]?.components[0]?.value;

      if (!suggestionValue || !topicValue) {
        await interaction.followUp('Some inputs are missing. The modal has closed.');
        return;
      }

      // Send the suggestion to the specific channel in your guild using process.env
      const guildId = process.env.GUILD_ID; // Replace with your guild ID
      const channelId = process.env.SUGGESTION_CHANNEL_ID; // Use your environment variable here

      const guild = client.guilds.cache.get(guildId);
      if (!guild) return console.log('Invalid guild ID');

      const channel = guild.channels.cache.get(channelId);
      if (!channel) return console.log('Invalid channel ID');

      const replyEmbed = {
        title: `Suggestion by ${interaction.user.username} LOLOLOLOLOLOLOLOLOLOLOL`,
        color: 0x964B00, // Brown color
        thumbnail: {
          url: interaction.user.displayAvatarURL({ dynamic: true }),
        },
        fields: [
          { name: "Topic", value: topicValue }, // If topicValue is not found in the map, default to 'Other'
          { name: "Suggestion", value: suggestionValue },
        ],
        footer: {
          text: 'void - Created by ragingtoast813',
          icon_url: 'https://i.imgur.com/CQiKstK.jpg',
        },
        timestamp: new Date(),
      };

      const replyData = { embeds: [replyEmbed] };

      await channel.send(replyData);

      // Send the confirmation message as a private (ephemeral) message
      await interaction.followUp({
        content: 'YAYAYAYAYAYAY! EEEEE Your suggestion has been sent to ragingragingtoast813813s discord! 🌟',
        ephemeral: true, // Set ephemeral to true to make the reply visible only to the command user
      });

      // Automatically close the form by deferring the update of the original interaction response
      await modalInteraction.deferUpdate();

    } catch (error) {
      console.error('Error showing the modal:', error);
    }
  },
};
