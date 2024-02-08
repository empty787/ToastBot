module.exports = {
    name: 'joke',
    description: 'Send a random joke.',
  
    execute(message, args) {
        const jokes = [
            'Why did the chicken cross the road? To get to the other side!',
            'What do you get when you cross a snowman with a vampire? Frostbite!',
            // Add more jokes here...
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        message.reply(randomJoke);
    },
};
