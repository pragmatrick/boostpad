const Discord = require("discord.js");

module.exports = {
    names:       ["rules"],
    permissions: ["ADMINISTRATOR"],
    description: "Posts the rules-embed.",
    async execute(client, msg, args) {
        const cb_icon = `<:${msg.guild.emojis.cache.get(client.config.emojis.cornerboost).identifier}>`
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/RulesFire.png")
        .setColor(client.config.colors.green)
        .addFields(
            {name: `${cb_icon} 1 — Use common sense`, value: 
`We do not want spam, toxicity, self-promotion, swearing, harassment, impersonation of other members, etc.
Do not try to disturb the peace on this server.\n\u200B`},
            {name: `${cb_icon} 2 — Your name must be readable, mentionable, and appropriate`, value: 
`This means that names should not contain digits only, characters that cannot be easily typed on a regular keyboard, excessive use of symbols, etc.
We recommend you to adapt our server's style, being: `+ "``"+"<firstname> | <tag>"+"``"+"\n\u200B"},
            {name: `${cb_icon} 3 — Don't abuse our Bot`, value: 
`<@${client.config.admins.boostpad}> doesn't like to be abused, treat him like yourself :pleading_face:
_or else he will be no longer be your friend._`});
        await msg.channel.send(embed);
        await msg.delete();
    }
}