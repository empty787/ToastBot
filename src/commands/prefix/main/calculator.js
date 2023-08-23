module.exports = {
    name: 'calculate',
    description: 'Perform basic arithmetic calculations.',
  
    execute(message, args) {
        const expression = args.join(' ');
        try {
            const result = eval(expression);
            message.reply(`The result of ${expression} is ${result}`);
        } catch (error) {
            message.reply('Invalid expression. Please provide a valid calculation.');
        }
    },
};
