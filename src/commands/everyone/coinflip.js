module.exports = {
    aliases:  ["boost"],
    permissions: [],
    description: "Sends a random emoji, either BigBoost-Coin, or a SmallBoost-Coin.",
    execute(client, msg, args) { 
        let random = Math.floor(Math.random() * 2);
        if (random == 0) {
            msg.channel.send(`<:${msg.guild.emojis.cache.get(client.config.emojis.coinflip_big).identifier}>`);
        }
        else {
            msg.channel.send(`<:${msg.guild.emojis.cache.get(client.config.emojis.coinflip_small).identifier}>`);
        }
    }
}