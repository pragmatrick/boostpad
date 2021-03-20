module.exports = {
    names:       ["coinflip", "boost"],
    permissions: [],
    description: "Sends a random emoji, either BigBoost-Coin, or a SmallBoost-Coin.",
    execute(client, msg, args) { 
        let answer = Math.random() < 0.5 
        ? `<:${msg.guild.emojis.cache.get(client.config.emojis.coinflip_big).identifier}>`
        : `<:${msg.guild.emojis.cache.get(client.config.emojis.coinflip_small).identifier}>`;
        msg.channel.send(answer);
    }
}