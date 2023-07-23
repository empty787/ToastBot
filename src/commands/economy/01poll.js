const { Client, Interaction, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Create a poll with a question and options.',
  options: [
    {
      name: 'question',
      type: 3,
      description: 'Enter the poll question.',
      required: true,
    },
    {
      name: 'options_1',
      type: 3,
      description: 'Enter your first poll option.',
      required: true,
    },
    {
      name: 'options_2',
      type: 3,
      description: 'Enter your second poll option.',
      required: true,
    },
    {
      name: 'options_3',
      type: 3,
      description: 'Enter your third poll option (optional).',
      required: false,
    },
  ],

  callback: async (client, interaction) => {
    const question = interaction.options.getString('question');
    const option1 = interaction.options.getString('options_1');
    const option2 = interaction.options.getString('options_2');
    const option3 = interaction.options.getString('options_3');

    // Combine the options into an array
    const options = [option1, option2];
    if (option3) options.push(option3);

    if (options.length < 2) {
      interaction.reply('Invalid format! Please provide at least two options.');
      return;
    }

    // Create an array of objects to use as options for the Select Menu
    const selectMenuOptions = options.map((option, index) => ({
      label: option,
      value: `option_${index + 1}`,
    }));

    // Create the Select Menu component
    const selectMenuComponent = {
      type: 3,
      customId: 'poll_selection',
      options: selectMenuOptions,
      placeholder: 'Select an option',
    };

    // Send the initial message with the question and Select Menu
    await interaction.reply({
      content: `📊 Poll: ${question}`,
      components: [
        {
          type: 1,
          components: [selectMenuComponent],
        },
      ],
    });

    const filter = (buttonInteraction) =>
      buttonInteraction.customId === 'poll_selection' && buttonInteraction.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000, // 60 seconds
    });

    // Store the votes for each option
    const votes = new Map();

    collector.on('collect', (buttonInteraction) => {
      const selectedOption = buttonInteraction.values[0];

      // Increment the vote count for the selected option
      const optionIndex = parseInt(selectedOption.split('_')[1]);
      const selectedOptionLabel = options[optionIndex - 1];

      if (!votes.has(selectedOptionLabel)) {
        votes.set(selectedOptionLabel, 1);
      } else {
        votes.set(selectedOptionLabel, votes.get(selectedOptionLabel) + 1);
      }

      // Update the Select Menu with the new vote counts
      const updatedOptions = selectMenuOptions.map((option) => ({
        ...option,
        description: votes.get(option.label) ? `${votes.get(option.label)} votes` : '0 votes',
      }));

      selectMenuComponent.options = updatedOptions;

      // Update the original message with the updated Select Menu
      buttonInteraction.update({
        content: `📊 Poll: ${question}`,
        components: [
          {
            type: 1,
            components: [selectMenuComponent],
          },
        ],
      });
    });

    collector.on('end', () => {
      // Calculate the winner (option with the most votes)
      let winner = null;
      let maxVotes = 0;

      for (const [option, voteCount] of votes) {
        if (voteCount > maxVotes) {
          winner = option;
          maxVotes = voteCount;
        }
      }

      // Send the final poll result
      interaction.followUp(`📊 Poll Result: "${question}"\n\nWinner: ${winner}\nTotal Votes: ${maxVotes}`);
    });
  },
};
