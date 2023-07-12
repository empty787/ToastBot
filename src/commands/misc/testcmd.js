module.exports = {
    name: 'test',
    description: 'just test',
    // devOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
      interaction.reply(`this is a test slash cmd`);
    },
  };