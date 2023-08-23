module.exports = {
    name: 'emojify',
    description: 'Convert text into emoji characters.',
  
    execute(message, args) {
        const text = args.join(' ').toLowerCase();
        const emojiMap = {
            a: '🅰️',
            b: '🅱️',
            c: '🇨',
            // Add more mappings as needed...
        };

        const question = args.join(' ');

        if (!question) {
            message.reply('Please ask a yes or no question.');
            return;
        }

        const emojifiedText = text.split('').map(char => emojiMap[char] || char).join(' ');
        message.reply(emojifiedText);
    },
};
