const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
// partials -> things that will load even after starting the bot
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    client.config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
    client.login(process.env.token);
})();