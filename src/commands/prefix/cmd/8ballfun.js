module.exports = {
    name: '8ball',
    description: 'Ask the Magic 8-Ball a yes or no question.',
  
    execute(message, args) {
        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            // Add more responses here...
        ];

        const question = args.join(' ');

        if (!question) {
            message.reply('Please ask a yes or no question.');
            return;
        }

        const response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(`You asked: ${question}\nMagic 8-Ball says: ${response}`);
    },
};
