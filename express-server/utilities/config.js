const fs = require('fs');

var configPath = process.argv[2] || '/etc/autoexam/config.json';
if (configPath[0] != '/') configPath = process.cwd() + '/' + configPath;
console.log(`Loading config from ${configPath}...`);
if(!fs.existsSync(configPath)) {
  console.error('Cannot find config.json. If you don\'t have it, create it by copying config-template.json and changing the values.');
  console.error('Aborting.');
  process.exit(1);
}
module.exports = require(configPath);

