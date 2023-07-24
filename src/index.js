require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: 'Sub to DolphinNotFound',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=DolphinNotFound',
  },
  {
    name: 'Sub to DolphinNotFound for 10000000 DolphinBucks and 40000000 DolphCoins!!!',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=opwWUaUadH0&ab_channel=DolphinNotFound',
  },
  {
    name: 'DolphWorld Economy',
    type: ActivityType.Competing,
  },
  {
    name: 'DolphinNotFound',
    type: ActivityType.Watching,
  },
  {
    name: '/ping | /level | /work | /spinwheel',
    type: ActivityType.Playing,
  },
  {
    name: 'Join DolphWorld! https://discord.gg/K65AYbuDeF',
    type: ActivityType.Playing,
  },
  {
    name: 'to DolphTunes',
    type: ActivityType.Listening
  },
];

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

// dolphworld welcome canvas

client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = member.guild.channels.cache.find((channel) => channel.name.toLowerCase().includes('welcome'));

  if (welcomeChannel) {
    const canvas = createCanvas(1200, 500); // Increase the canvas size
    const ctx = canvas.getContext('2d');

    // Load the background image
    const backgroundImage = await loadImage('https://i.imgur.com/FMXo96r_d.jpg?maxwidth=520&shape=thumb&fidelity=high');

    // Draw the background image with a brown outline
    ctx.fillStyle = '#964B00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 10, 10, canvas.width - 20, canvas.height - 20);

    // Set the text properties for the welcome message
    ctx.font = '36px Arial'; // Reduce the font size to fit the text better
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Cool transparent white
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the welcome message below the center of the canvas
    const welcomeMessage = `Welcome ${member.displayName} to ${member.guild.name}! Enjoy your stay.`;
    const textX = canvas.width / 2;
    const textY = canvas.height / 2 + 50; // Move the text down a bit
    const textPadding = 20;

    // Measure the text width to create a transparent black box around it
    const textWidth = ctx.measureText(welcomeMessage).width;
    const boxWidth = textWidth + textPadding * 2;

    // Draw the transparent black box around the welcome message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(textX - boxWidth / 2, textY - 30, boxWidth, 60);

    // Draw the welcome message
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Cool transparent white
    ctx.fillText(welcomeMessage, textX, textY);

    // Draw the circular user profile picture in the middle of the canvas
    const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png', size: 256 }));
    const radius = 100; // Set the radius of the circular image
    const centerX = canvas.width / 2; // Set the X-coordinate of the center of the circular image
    const centerY = canvas.height / 2 - radius; // Set the Y-coordinate of the center of the circular image
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.restore();

    // Convert the canvas to a buffer
    const buffer = canvas.toBuffer('image/png');

    // Send the welcome message with the canvas as an attachment
    welcomeChannel.send({
      content: `Welcome ${member} to ${member.guild.name}! Enjoy your stay.`,
      files: [{
        attachment: buffer,
        name: 'welcome.png',
      }],
    });
  } else {
    const serverOwner = member.guild.owner;
    if (serverOwner) {
      const randomChatChannel = member.guild.channels.cache.random();
      randomChatChannel.send(`Hey ${serverOwner}, please create a welcome channel in your server (${member.guild.name}) to enable the welcome message.`);
    }
  }
});

// code ending

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }

  if (message.mentions.users.has(client.user.id)) {
    const content = message.content.replace(`<@!${client.user.id}>`, '').trim();
      message.reply("Hey! I am Dolphin's bot :) How can I help you today?");
    }

  if (message.content === '!lenny') {
    message.reply('( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)');
  }

  if (message.content === '!clock') {
    const currentTime = new Date().toLocaleTimeString();
    message.reply(`The current time is ${currentTime}`);
  }

  if (message.content === 'hello') {
    message.reply('hello');
  }
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, { keepAlive: true });
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();