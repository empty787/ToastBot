module.exports = {
    name: 'dolphinnotfound',
    description: 'the floppa jumpscare >:)',
    callback: (client, interaction) => {
      const embed = {
        title: 'Dolphin lives in sus town',
        description: 'QWERTYYYYYY',
        color: parseInt('964B00', 16), // Replace with your desired hex code
        image: {
          url: 'https://media.tenor.com/OuymV7N0sBwAAAAM/cat-jumpscaree-big-floppa.gif', // Replace with the URL of your hosted image
        },
      };
  
      interaction.reply({ embeds: [embed] });
    },
  };
  