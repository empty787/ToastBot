const googleIt = require('google-it');

module.exports = {
  name: 'google',
  description: 'Searches Google for the provided query.',
  options: [
    {
      name: 'query',
      description: 'The search query.',
      type: 3, // String type
      required: true,
    },
  ],

  async execute(interaction) {
    const query = interaction.options.getString('query');

    try {
      await interaction.deferReply();

      // Perform the Google search
      const results = await googleIt({ query });

      // Process and format the search results as needed
      const formattedResults = results.map((result) => `${result.title}: ${result.link}`);

      // Send the formatted search results as a reply
      await interaction.editReply(`Here are the search results for "${query}":\n${formattedResults.join('\n')}`);
    } catch (error) {
      console.error(`Error performing Google search: ${error}`);
      await interaction.editReply('Sorry, an error occurred while performing the search.');
    }
  },
};
