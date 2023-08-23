// const { HttpStatus, HttpException } = require('@nestjs/common');

// function AuthMiddleware(req, _, next) {
//   const data = req.headers.authorization;

//   req.session = {
//     token_type: 'Bearer',
//     access_token: data.slice('Bearer'.length).trim(),
//   };
    
//   next();
// }

// module.exports = { AuthMiddleware };
