const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
  name: 'runcode',
  description: 'Run JavaScript code using /usr/local/bin/cup interpreter.',

  execute(message, args) {
    if (args.length === 0) {
      return message.reply('Please provide code to run.');
    }

    // Combine the arguments to form a single code string
    const codeToRun = args.join(' ');

    // Create a temporary JavaScript file with the provided code
    const scriptFile = 'temp_script.js';
    fs.writeFileSync(scriptFile, codeToRun);

    // Define the command to run the interpreter with the code file
    const command = `/usr/local/bin/cup ${scriptFile}`;

    // Execute the command in a child process
    exec(command, (error, stdout, stderr) => {
      // Delete the temporary script file
      fs.unlinkSync(scriptFile);

      if (error || stderr) {
        const errorMessage = error || stderr;
        return message.reply(`Error:\n\`\`\`\n${errorMessage}\n\`\`\``);
      }

      // Send the output of the interpreter as a reply
      message.reply(`Output:\n\`\`\`\n${stdout}\n\`\`\``);
    });
  },
};
