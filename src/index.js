const Discord   = require("discord.js");
const fs        = require("fs");
const path      = require("path");
const client    = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]});
// partials -> things that will load even after starting the bot
const { registerCommands, registerEvents } = require('./utils/registry');

const token = "NzM2MTU0Nzc2NTA0NjMxMzA4.Xxqrjw.oj274O0w5WiiEmcTTjh7EMat7R8";

(async () => {
    client.login(token); //process.env.
    client.commands               = new Map();
    client.cachedMessageReactions = new Map();
    client.config   = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json"), "utf-8"));
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
})();
