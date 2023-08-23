// const { prefix } = require("../../config.json");
// const { createCanvas, loadImage } = require('canvas');
// const calculateLevelXp = require('../utils/calculateLevelXp');
// const Level = require('../models/Level');

// module.exports = {
//   handleCommands: async (message, client) => {
//     if (message.author.bot) {
//       return;
//     }

//     if (message.content.startsWith(prefix + "ping")) { 
//       const startTime = Date.now();
//       message.channel.send("🏓 Pinging...").then(sentMessage => {
//         const endTime = Date.now();
//         const ping = endTime - startTime;
//         sentMessage.edit(`🏓 Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
//       });
//     }    

//     if (message.mentions.users.has(client.user.id)) {
//       const content = message.content.replace(`<@!${client.user.id}>`, '').trim();
//       message.reply("Hey! I am Dolphin's bot :) How can I help you today?");
//     }

//     if (message.content.startsWith(prefix + "lenny")) {
//       message.reply('( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°) ( ͡° ͜ʖ ͡°)');
//     }

//     if (message.content.startsWith(prefix + "clock")) {
//       const currentTime = new Date().toLocaleTimeString();
//       message.reply(`The current time is ${currentTime}`);
//     }

//     if (message.content.startsWith(prefix + "hello")) {
//       message.reply('Hello!');
//     }

//     if (message.content.startsWith(prefix + "test")) {
//       message.reply('Test successful!');
//     }

//     if (message.content.startsWith(prefix + "help")) {
//       const helpEmbed = {
//         color: 0x0099ff,
//         title: 'Available Commands',
//         fields: [
//           {
//             name: `${prefix}ping`,
//             value: 'Get a Pong response.',
//           },
//           {
//             name: `${prefix}lenny`,
//             value: 'Receive a lenny face.',
//           },
//           {
//             name: `${prefix}clock`,
//             value: 'Get the current time.',
//           },
//         ],
//         timestamp: new Date(),
//         footer: {
//           text: 'Your bot name',
//         },
//       };
    
//       message.reply({ embeds: [helpEmbed] });
//     }
//     if (message.content.startsWith(prefix + "say")) {
//       // Get the text to say (everything after the command)
//       const textToSay = message.content.slice((prefix + "say").length).trim();
//       message.channel.send(textToSay);
//     }
    
//     if (message.content.startsWith(prefix + "roll")) {
//       // Generate a random number between 1 and 100
//       const randomNumber = Math.floor(Math.random() * 100) + 1;
//       message.reply(`You rolled a ${randomNumber}!`);
//     }
    
//     if (message.content.startsWith(prefix + "coinflip")) {
//       // Generate a random number (0 or 1) for heads or tails
//       const result = Math.random() < 0.5 ? "Heads" : "Tails";
//       message.reply(`The coin landed on ${result}!`);
//     }

//     if (message.content.startsWith(prefix + "rank")) {
//       const mentionedUserId = message.mentions.users.first()?.id || message.author.id;
//       const targetUserObj = await message.guild.members.fetch(mentionedUserId);
  
//       const userLevel = await Level.findOne({ userId: mentionedUserId, guildId: message.guild.id });
  
//       if (!userLevel) {
//         message.reply(`<@${mentionedUserId}> doesn't have a rank yet.`);
//         return;
//       }
  
//       // Create and configure the canvas
//       const canvas = createCanvas(1000, 333);
//       const ctx = canvas.getContext('2d');
  
//       // Load the background image for the rank card (replace with your desired background image)
//       const backgroundImage = await loadImage('https://i.imgur.com/Rx35qid.gif');
//       ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  
//       // Draw the brown outline around the rank card
//       ctx.strokeStyle = '#8C6A43'; // Brown color for the outline
//       ctx.lineWidth = 44; // Width of the outline
//       ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
//       // Draw the transparent brown overlay to cover all information with rounded corners
//       const overlayWidth = 900; // Width of the overlay
//       const overlayHeight = 250; // Height of the overlay
//       const centerX = (canvas.width - overlayWidth) / 2; // Calculate the center of the canvas horizontally
//       const centerY = (canvas.height - overlayHeight) / 2; // Calculate the center of the canvas vertically
//       const cornerRadius = 20; // Radius of the rounded corners
  
//       ctx.beginPath();
//       ctx.moveTo(centerX + cornerRadius, centerY);
//       ctx.lineTo(centerX + overlayWidth - cornerRadius, centerY);
//       ctx.arcTo(centerX + overlayWidth, centerY, centerX + overlayWidth, centerY + cornerRadius, cornerRadius);
//       ctx.lineTo(centerX + overlayWidth, centerY + overlayHeight - cornerRadius);
//       ctx.arcTo(centerX + overlayWidth, centerY + overlayHeight, centerX + overlayWidth - cornerRadius, centerY + overlayHeight, cornerRadius);
//       ctx.lineTo(centerX + cornerRadius, centerY + overlayHeight);
//       ctx.arcTo(centerX, centerY + overlayHeight, centerX, centerY + overlayHeight - cornerRadius, cornerRadius);
//       ctx.lineTo(centerX, centerY + cornerRadius);
//       ctx.arcTo(centerX, centerY, centerX + cornerRadius, centerY, cornerRadius);
//       ctx.closePath();
  
//       ctx.fillStyle = 'rgba(56, 35, 17, 0.7)'; // Brown color with 70% opacity
//       ctx.fill();
  
//       // Set the font style for text elements
//       const font = 'bold 36px Arial';
//       const fontColor = '#FFFFFF';
  
//       // Draw the user's username, level, and XP at the top with increased font size
//       const usernameText = targetUserObj.user.username;
//       const levelText = `Level: ${userLevel.level}`;
//       const xpText = `XP: ${userLevel.xp}/${calculateLevelXp(userLevel.level)}`;
//       const textWidth = Math.max(ctx.measureText(usernameText).width, ctx.measureText(levelText).width, ctx.measureText(xpText).width);
//       const textX = (canvas.width - textWidth) / 2 + 160;
//       const textY = 110;
  
//       const strokeColor = '#000000'; // Black color for the outline
//       ctx.lineWidth = 4; // Width of the outline
  
//       // Calculate the dimensions of the rounded rectangle
//       const rectPadding = 10;
//       const rectWidth = textWidth + rectPadding * 2 + 210;
//       const rectHeight = 130;
//       const rectX = (canvas.width - rectWidth) / 2 + 260;
//       const rectY = 70;
  
//       // Draw the rounded rectangle as the outline
//       ctx.beginPath();
//       ctx.moveTo(rectX + 10, rectY);
//       ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + 10, 10);
//       ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - 10, rectY + rectHeight, 10);
//       ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - 10, 10);
//       ctx.arcTo(rectX, rectY, rectX + 10, rectY, 10);
//       ctx.closePath();
//       ctx.strokeStyle = strokeColor;
//       ctx.stroke();
  
//       ctx.font = font;
//       ctx.fillStyle = fontColor;
//       ctx.fillText(usernameText, textX, textY);
//       ctx.fillText(levelText, textX, textY + 40); // Adjust Y position for level
//       ctx.fillText(xpText, textX, textY + 80); // Adjust Y position for XP
  
//       // Draw the progress bar in the middle
//       const progressBarWidth = 600;
//       const progressBarHeight = 50;
//       const progressBarX = (canvas.width - progressBarWidth) / 2 + 110;
//       const progressBarY = canvas.height - 120;
  
//       const progress = Math.min(userLevel.xp / calculateLevelXp(userLevel.level), 1);
//       const progressBarFillWidth = progressBarWidth * progress;
  
//       // Draw the blue outline for the progress bar
//       ctx.strokeStyle = '#00F'; // Blue color for the outline
//       ctx.lineWidth = 3; // Width of the outline
//       ctx.strokeRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);
  
//       ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Green color with 50% opacity
//       ctx.fillRect(progressBarX, progressBarY, progressBarFillWidth, progressBarHeight);
  
//       // Draw the red outline for the whole progress bar with 50% transparency
//       ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Red color with 50% opacity
//       ctx.fillRect(progressBarX, progressBarY, progressBarFillWidth, progressBarHeight); // Left part of the progress bar
//       ctx.fillRect(progressBarX + progressBarFillWidth, progressBarY, progressBarWidth - progressBarFillWidth, progressBarHeight); // Right part of the progress bar
  
//       // Draw the user's avatar as a circle in the center with increased size
//       const avatarSize = 200; // Increased size for the avatar
//       const avatarX = 100;
//       const avatarY = (canvas.height - avatarSize) / 2; // Centered vertically
//       const avatarURL = targetUserObj.user.displayAvatarURL({ extension: 'png', size: 512 });
//       const avatarImage = await loadImage(avatarURL);
//       ctx.save();
//       ctx.beginPath();
//       ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
//       ctx.closePath();
//       ctx.clip();
//       ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
//       ctx.restore();
  
//       // Draw the outline for the user's avatar
//       const outlineRadius = avatarSize / 2 + 5; // Increase the size by 5 to create the outline
//       ctx.beginPath();
//       ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, outlineRadius, 0, Math.PI * 2);
//       ctx.strokeStyle = '#00FFFF'; // Cyan color for the outline
//       ctx.lineWidth = 5; // Width of the outline
//       ctx.stroke();
//       ctx.closePath();
  
//       // Convert the canvas to a buffer
//       const buffer = canvas.toBuffer('image/png');
  
//       // Send the generated rank card as a message
//       message.channel.send({ files: [buffer] });
//     }
//   },
// };
