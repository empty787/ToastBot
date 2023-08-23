// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080';
// const { HttpException, HttpStatus } = require('@nestjs/common');
// const fetch = require('node-fetch');

// /**
//  * Define the structure of a user session.
//  * @typedef {Object} UserSession
//  * @property {string} access_token - The user's access token.
//  * @property {string} token_type - The type of token (e.g., 'Bearer').
//  */

// /**
//  * Get the user ID associated with the provided access token.
//  * @param {string} accessToken - The user's access token.
//  * @returns {Promise<string>} - A promise that resolves to the user's ID.
//  */
// async function getUserID(accessToken) {
//   const res = await fetch(`${API_ENDPOINT}/users/@me`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + accessToken,
//     },
//   });

//   if (!res.ok) {
//     throw new HttpException(
//       'Failed to get user data',
//       HttpStatus.INTERNAL_SERVER_ERROR
//     );
//   }

//   const user = await res.json();
//   return user.id;
// }

// module.exports = { getUserID };
