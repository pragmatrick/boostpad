const fetch = require("node-fetch")

module.exports = {
    aliases:  ["stupse"],
    description: "Nudges a user.",
    async execute(client, msg, args) { 
        if (msg.channel.id === client.config.channels.memes) {
            let keywords = "rickroll";
            if (args.length > 0) keywords = args.join(" ");
            const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.tenor}&limit=8&contentfilter=high`;
            const fetchedURL = await fetch(url);
            const file = await fetchedURL.json();
            const randomIndex = Math.floor(Math.random() * file.results.length)
            await msg.channel.send(file.results[randomIndex].url);
            await msg.delete();
        } else {
            msg.react("🤨");
        }
    }
}