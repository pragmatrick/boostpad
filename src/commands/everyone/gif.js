const fetch = require("node-fetch")

module.exports = {
    aliases:  ["stupse"],
    description: "Posts a gif in the memes channel.",
    async execute(client, msg, args) {
        const token = process.env.tenor
        let keywords = "rickroll";
        if (args.length > 0) keywords = args.join(" ");
        const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${token}&limit=8&contentfilter=high`
        const fetchedURL = await fetch(url);
        const file = await fetchedURL.json();
        if (file.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * file.results.length)
            await msg.channel.send(file.results[randomIndex].url + `\nTenor Gif Search: ${keywords}`);
        }
        await msg.delete();
    }
}