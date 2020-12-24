const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Posts the rules-embed.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.react("🤨");
            return;
        }
        const cb_icon = `<:${msg.guild.emojis.cache.get(client.config.emojis.cornerboost).identifier}>`
        const embed = new Discord.MessageEmbed()
        .attachFiles(["./Pictures/Logos/RulesFire.png"])
        .setColor(client.config.colors.green)
        .addFields(
            {name: `${cb_icon} 1 — Use common sense`, value: 
`We do not want spam, toxicity, swearing, harassment, impersonation of other members, etc.
Do not try to disturb the peace on this server.
_or else → <@&${client.config.roles.stfu}> (role punishment → mute)_\n\u200B`},
            {name: `${cb_icon} 2 — Use the right channels`, value: 
`We have dedicated gaming channels, talk channels, jam & chat rooms.
Self promotion is __nowhere__ allowed.
_or else → warning_\n\u200B`},
            {name: `${cb_icon} 3 — Your name must be readable, mentionable, and appropriate`, value: 
`This means that names should not contain digits only, characters that cannot be easily typed on a regular keyboard, excessive use of symbols, etc.
We recommend you to adapt our server's style, being:\n`+ 
"``"+"<firstname> | <tag>"+"``" + "\n_or else → warning (+manual nickname change)_\n\u200B"},
            {name: `${cb_icon} 4 — Don't abuse our Bot`, value: 
`<@${client.config.admins.boostpad}> doesn't like to be abused, treat him like yourself :pleading_face:
_or else he will be no longer be your friend 
→ <@&${client.config.roles.enemy}>/<@&${client.config.roles.egoist}> (role punishment)_`});
        (await msg.channel.send(embed));
        msg.delete();
    }
}