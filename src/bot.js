require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.ws.on('INTERACTION_CREATE', async (interaction) => {
  // Handle interactions from slash commands here...
});

client.login(token)
  .then(() => {
    console.log('Logged in successfully');
    console.log('Bot is now listening on 0.0.0.0');
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });

client.handleCommands();
