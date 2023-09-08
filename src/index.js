require('dotenv').config();
const Discord = require("discord.js");
const { Client, IntentsBitField, ActivityType, WebhookClient } = require('discord.js');
const messageCommandHandler = require('./other/commands');
const { logJoin, logLeave } = require('./other/logger');
const { generateWelcomeCard } = require('./other/welcome');
const status = require('./other/status');
// const { handleCommands } = require('./other/commands');
const { handleVideoIdea } = require('./other/videoIdeas');
// const { generateReply } = require('./other/chatbot');
// const { createCanvas, loadImage } = require('canvas');
const mongoose = require('mongoose');
// const express = require('express');
// const app = require('./other/backend/api');
const { red, blue, greenBright, cyan, yellow } = require("chalk");
const { loadCommands, handlePrefixCommands } = require('./handlers/commandHandler');
const { prefix } = require("../config.json")
const eventHandler = require('./handlers/eventHandler');

const { log } = require('./other/consolelogging');

// const PORT = process.env.PORT || 8080;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

function setBotStatus() {
  const chosenStatus = status[Math.floor(Math.random() * status.length)]; // Choose a random status from the array
  client.user.setActivity(chosenStatus.name, { type: chosenStatus.type, url: chosenStatus.url });
}

client.on('ready', (c) => {
  // console.clear();
  process.stdout.write('\x1Bc'); // Clears the terminal

    console.log(blue(`
██████╗░░█████╗░██╗░░░░░██████╗░██╗░░██╗██╗███╗░░██╗
██╔══██╗██╔══██╗██║░░░░░██╔══██╗██║░░██║██║████╗░██║
██║░░██║██║░░██║██║░░░░░██████╔╝███████║██║██╔██╗██║
██║░░██║██║░░██║██║░░░░░██╔═══╝░██╔══██║██║██║╚████║
██████╔╝╚█████╔╝███████╗██║░░░░░██║░░██║██║██║░╚███║
    Bot: ${c.user.tag}                                                 
    Prefix: ${prefix}                                   
╔════════════════════════════════════════════════════════════╗
║             Project Information (Coded by Dolphin#6086)    ║
╠════════════════════════════════════════════════════════════╣
║ Name:   Discord ultimate v14 bot                           ║
║ Author:   Dolphin#6086                                     ║
║ Version:  1.0.0                                            ║
╚════════════════════════════════════════════════════════════╝
    `))
  console.log(`✅ ${c.user.tag} woke up from a good night's sleep!💤😴🛌`);

  client.user.setPresence({ activities: [{ name: `😺in ${client.guilds.cache.size} servers` }], status: `idle` });

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 50 * 1000);
});

client.on('guildMemberAdd', async (member) => {
  try {
    await generateWelcomeCard(member); // Generate the welcome card using the function
  } catch (error) {
    console.error('Failed to send the welcome card:', error);
  }
});

client.on('messageCreate', async (message) => {
  try {
    const reply = await generateReply(message, client);

    // Handle the reply if needed...
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

// Message commands
// client.on('messageCreate', (message) => {
// handleCommands(message, client);
// });

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

// // Message Command Handler
// client.on('message', (message) => {
//   // Call the handleCommands function from messageCommandHandler
//   messageCommandHandler.handleCommands(message, client);
// });

// Load commands from the 'commands' directory
loadCommands('commands');

// Event handler for when a message is received
client.on('messageCreate', (message) => {
  // Call the handlePrefixCommands function from the command handler
  handlePrefixCommands(client, message);
});

// Start the Express.js server
// app.listen(PORT, () => {
//  console.log(`Server is running on port ${PORT}`);
// });

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