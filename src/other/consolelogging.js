const chalk = require('chalk');
const moment = require('moment');

function log(message, type = 'info') {
  const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;
  let formattedMessage = '';

  switch (type) {
    case 'error':
      formattedMessage = `${timestamp} ERROR: ${chalk.red(message)}`;
      break;
    case 'warning':
      formattedMessage = `${timestamp} WARNING: ${chalk.yellow(message)}`;
      break;
    case 'success':
      formattedMessage = `${timestamp} SUCCESS: ${chalk.green(message)}`;
      break;
    case 'info':
      formattedMessage = `${timestamp} INFO: ${chalk.blue(message)}`;
      break;
    // Add more cases for different log types here if needed.
    default:
      formattedMessage = `${timestamp} INFO: ${chalk.blue(message)}`;
  }

  console.log(formattedMessage);
}

module.exports = { log };

// example
// log('This is an info message', 'info'); // The whole message will be in blue
// log('This is a success message', 'success'); // The whole message will be in green
// log('This is a warning message', 'warning'); // The whole message will be in yellow
// log('This is an error message', 'error'); // The whole message will be in red