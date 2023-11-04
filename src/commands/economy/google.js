module.exports = {
  name: 'google',
  description: 'Perform a Google search and display the top search results!',
  options: [
    {
      name: 'query',
      description: 'The search query',
      type: 3, // Corrected type value for string option
      required: true,
    },
  ],

  callback: (client, interaction) => {
    const query = interaction.options.getString('query');

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    const embed = {
      title: 'Google Search Results',
      description: `Click here to view the search results for "${query}":\n[Google Search Results](${searchUrl})`,
      color: 0x4285F4, // Google Blue color
      thumbnail: {
        url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      footer: {
        text: 'ToastBot - Created by Toast',
        icon_url: 'https://i.imgur.com/CQiKstK.jpg',
      },
      timestamp: new Date(),
    };

    interaction.reply({ embeds: [embed] });
  },
};


function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}