const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const responses = [
  'It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes, definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  'Don\'t count on it.',
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
];

module.exports = {
  name: '8ball',
  description: 'Ask the Magic 8-Ball a question!',
  callback: async (client, interaction) => {
    try {
      const modal = new ModalBuilder({
        customId: `8ballModal-${interaction.user.id}`,
        title: 'Magic 8-Ball',
        description: 'Please enter your question below:',
      });

      const questionInput = new TextInputBuilder({
        customId: '8ballQuestion',
        label: 'Question',
        style: TextInputStyle.Paragraph,
      });

      const firstActionRow = new ActionRowBuilder().addComponents(questionInput);

      modal.addComponents(firstActionRow);

      await interaction.showModal(modal);

      const filter = (i) => i.customId === `8ballModal-${interaction.user.id}`;

      const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 30000 });

      if (!modalInteraction) {
        await interaction.followUp('You did not respond in time. The modal has closed.');
        return;
      }

      const questionValue = modalInteraction.components[0]?.components[0]?.value;

      if (!questionValue) {
        await interaction.followUp('You did not provide a valid question. The modal has closed.');
        return;
      }

      const response = responses[Math.floor(Math.random() * responses.length)];

      const replyEmbed = {
        title: 'Magic 8-Ball',
        description: `You asked: ${questionValue}\n\nMagic 8-Ball says: \n${response}`,
        color: 0x4287f5, // Blue color
      };

      // Use followUp to send the reply as a private message to the user
      await interaction.followUp({
        embeds: [replyEmbed],
      });

      // Close the modal by deferring the update of the original interaction response
      await modalInteraction.deferUpdate();

    } catch (error) {
      console.error('Error showing the 8-Ball modal:', error);
    }
  },
};