module.exports = {
  name: 'lenny',
  description: 'Send a random lenny faceᕙ(⇀‸↼‶)ᕗ',
  callback: (client, interaction) => {
    const lennyFaces = [
      '( ͡° ͜ʖ ͡°)',
      'ᕙ(⇀‸↼‶)ᕗ',
      '( ͡ᵔ ͜ʖ ͡ᵔ )',
      '( ͡° ʖ̯ ͡°)',
      '¯\\_(ツ)_/¯',
      '(╯°□°）╯︵ ┻━┻',
      '( ͡~ ͜ʖ ͡°)',
      'ʕ•ᴥ•ʔ',
    ];

    const randomIndex = Math.floor(Math.random() * lennyFaces.length);
    const randomLennyFace = lennyFaces[randomIndex];

    interaction.reply(randomLennyFace);
  },
};