const { Client, Interaction } = require('discord.js');

module.exports = {
  name: 'similarity',
  description: 'Calculate the similarity between two strings using Levenshtein distance.',
  options: [
    {
      name: 'string1',
      description: 'The first string to compare.',
      type: 3,
      required: true,
    },
    {
      name: 'string2',
      description: 'The second string to compare.',
      type: 3,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const string1 = interaction.options.getString('string1');
      const string2 = interaction.options.getString('string2');

      // Calculate the similarity using Levenshtein distance algorithm
      const similarity = calculateLevenshteinDistance(string1, string2);

      const response = `The similarity between "${string1}" and "${string2}" is ${similarity}.`;

      interaction.editReply(response);
    } catch (error) {
      console.error('Error with /similarity:', error);
      interaction.editReply('An error occurred while calculating the similarity.');
    }
  },
};

/**
 * Calculate the similarity between two strings using Levenshtein distance algorithm.
 * @param {string} string1
 * @param {string} string2
 * @returns {number}
 */
function calculateLevenshteinDistance(string1, string2) {
  const len1 = string1.length;
  const len2 = string2.length;

  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (string1[i - 1] === string2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[len1][len2];
}
