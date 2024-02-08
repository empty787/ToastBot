require('dotenv').config();
const Discord = require("discord.js");
const { Client, IntentsBitField, ActivityType, WebhookClient } = require('discord.js');
const messageCommandHandler = require('./other/commands');
const { logJoin, logLeave } = require('./other/logger');
const { generateWelcomeCard } = require('./other/welcome');
const { handleVideoIdea } = require('./other/videoIdeas');
const mongoose = require('mongoose');
const { red, blue, greenBright, cyan, yellow } = require("chalk");
const { loadCommands, handlePrefixCommands } = require('./handlers/commandHandler');
const { prefix } = require("../config.json")
const eventHandler = require('./handlers/eventHandler');

const { log } = require('./other/consolelogging');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on('ready', (c) => {
  // console.clear();
  process.stdout.write('\x1Bc'); // Clears the terminal (clear)

    console.log(red(`
    Bot: ${c.user.tag}                                                 
    Prefix: ${prefix}                                   
╔════════════════════════════════════════════════════════════╗
║         Project Information (Coded by Dolphin#6086)        ║
╠════════════════════════════════════════════════════════════╣
║ Name:   Discord ultimate v14 bot                           ║
║ Author:   Dolphin#6086                                     ║
║ Version:  1.0.0                                            ║
╚════════════════════════════════════════════════════════════╝
    `))
  console.log(`✅ ${c.user.tag} is online`);

  client.user.setPresence({ activities: [{ name: `in ${client.guilds.cache.size} servers` }], status: `idle` });
});

client.on('guildMemberAdd', async (member) => {
  try {
    await generateWelcomeCard(member); // Generate the welcome card using the function
  } catch (error) {
    console.error('Failed to send the welcome card:', error);
  }
});

// handle video ideas
client.on('messageCreate', (message) => {
  handleVideoIdea(message);
});

// join server
client.on('guildCreate', async (guild) => {
  logJoin(client, guild);
});

// Event: When the bot leaves a server (guild)
client.on('guildDelete', async (guild) => {
  logLeave(client, guild);
});


// Load commands from the 'commands' directory
loadCommands('commands');

// Event handler for when a message is received
client.on('messageCreate', (message) => {
  // Call the handlePrefixCommands function from the command handler
  handlePrefixCommands(client, message);
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, { keepAlive: true });
    
    setTimeout(() => {
      console.log('Connected to DB.');
    }, 1000);

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();