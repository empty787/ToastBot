const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { prefix } = require('../../config.json');
const path = require('path'); // Add this line

// Define the client.commands collection
const commands = new Collection();

// Function to load commands from a directory
function loadCommands(client) {
    const commandFolders = readdirSync(path.join(__dirname, '../commands/prefix/'));
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(path.join(__dirname, `../commands/prefix/${folder}`)).filter(files => files.endsWith(`.js`));
        for (const file of commandFiles) {
            const command = require(path.join(__dirname, `../commands/prefix/${folder}/${file}`));
            commands.set(command.name, command);
        }
    }
}

// Function to handle messages and execute commands
function handlePrefixCommands(client, message) {
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName) ||
        commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        return;
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
    }
}

module.exports.loadCommands = loadCommands;
module.exports.handlePrefixCommands = handlePrefixCommands;
