module.exports = {
  name: 'moderationcmd',
  description: 'for moderation purposes at DolphWorld only!',

  callback: (client, interaction) => {
    interaction.reply(`Please read the DolphWorld rules, faq, roles info, etc. before you talk!`);
  },
};