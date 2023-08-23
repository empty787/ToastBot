// const express = require('express');
// const fetch = require('node-fetch');
// const { PrismaService } = require('./prisma.service');
// const { BotService } = require('./bot.service');
// const guildRoutes = require('./guild.routes'); // Import the guild routes
// const { AuthMiddleware } = require('./auth.middleware');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Initialize PrismaService and BotService
// const prisma = new PrismaService();
// const botService = new BotService(prisma);

// // Middleware
// app.use(express.json());

// // Example middleware for logging incoming requests
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request to ${req.url}`);
//   next();
// });

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, DELETE, PATCH');
//   next();
// });

// app.get('/api/auth/callback', (req, res) => {
//   // Handle the callback logic here
//   res.send('Received callback request');
// });

// // Use the guild routes from guild.routes.js
// app.use('/guilds', guildRoutes);

// // Update your AuthMiddleware (if needed)
// function getToken(req) {
//   let data = req.headers.authorization || null;

//   if (data == null || !data.startsWith('Bearer ')) {
//     throw new Error('You must log in first');
//   }

//   return {
//     token_type: 'Bearer',
//     access_token: data.slice('Bearer '.length).trim(),
//   };
// }

// // Utility function to get user ID
// async function getUserID(accessToken) {
//   const API_ENDPOINT = 'http://localhost:8080';
//   const res = await fetch(`${API_ENDPOINT}/users/@me`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + accessToken,
//     },
//   });
//   if (!res.ok) {
//     res.status(500).send('Failed to get user data');
//     return;
//   }

//   const user = await res.json();
//   return user.id;
// }

// // module.exports = app;
