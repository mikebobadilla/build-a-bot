import { Client } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({ intents: [] });

client.on('ready', () => {
  console.log(`ready`);
});

client.login(process.env.DISCORD_API_TOKEN);

