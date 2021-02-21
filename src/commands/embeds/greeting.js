const Discord = require("discord.js");

module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Creates a certain hardcoded embed.",
    async execute(client, msg, args) {
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/Cornerboost.png")
        .setTitle("__Welcome to the official Cornerboost-Server!__")
        .setColor(client.config.colors.gold)
        .setThumbnail("attachment://Cornerboost.png")
        .addFields(
            {name: "Visit our Instagram:", value: `<:${msg.guild.emojis.cache.get(client.config.emojis.instagram).identifier}> [@cornerboost](https://www.instagram.com/cornerboost/)`},
            {name: "Want to invite others to this server? Use this link!", value: ":love_letter: https://discord.gg/AuGkuSz"}
        )
        await msg.channel.send(embed);
        await msg.delete();
    }
}