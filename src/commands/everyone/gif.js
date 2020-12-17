const fetch = require("node-fetch")

module.exports = {
    aliases:  ["stupse"],
    description: "Nudges a user.",
    async execute(client, msg, args) { 
        if (msg.channel.id === client.config.channels.memes) {
            const url = `https://api.tenor.com/v1/search?q=excited&key=${process.env.tenor}&&limit=8`;
            const fetchedURL = await fetch(url);
            const file = await fetchedURL.json();
            const randomIndex = Math.random() * file.results.length;
            msg.channel.send(file.results[randomIndex].url);
        } else {
            msg.react("🤨");
        }
    }
}