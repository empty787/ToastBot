module.exports = {
    name: 'emotify',
    description: 'Converts a sentence into emojis.',
    options: [
      {
        name: 'sentence',
        type: 3,
        description: 'The sentence to emojify.',
        required: true,
      },
    ],
  
    callback: (client, interaction) => {
      const sentence = interaction.options.getString('sentence');
      const emojis = {
        a: '😀',
        b: '😃',
        c: '😄',
        // ... Add more mappings for other characters.
      };
      let emotifiedSentence = '';
      for (const char of sentence) {
        emotifiedSentence += emojis[char.toLowerCase()] || char;
      }
      interaction.reply(emotifiedSentence);
    },
  };
  