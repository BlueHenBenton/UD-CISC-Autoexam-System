// This file loads the config file and exports its contents.

const fs = require('fs');

// Get configPath from command-line argument, or default to a hardcoded string.
var configPath = process.argv[2] || '/etc/autoexam/config.json';
// If it doesn't start with a slash, prepend the current working directory to the path.
if (configPath[0] != '/') configPath = process.cwd() + '/' + configPath;

console.log(`Loading config from ${configPath}...`);

// If the file doesn't exist, error and exit.
if(!fs.existsSync(configPath)) {
  console.error('Cannot find config.json. If you don\'t have it, create it by copying config-template.json and changing the values.');
  console.error('Aborting.');
  process.exit(1);
}

// If we don't have read access, error and exit.
try {
  fs.accessSync(configPath, fs.constants.R_OK);
} catch(e) {
  console.log('Config file exists, but cannot be read. Do you have read access?');
  process.exit(2);
}

// Export the contents of the config file.
module.exports = JSON.parse(fs.readFileSync(configPath));

