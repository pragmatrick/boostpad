const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Posts the roles-embed.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/RolesFire.png")
        .setColor(client.config.colors.red)
        .addFields(
            {name: "__Permission Roles__", value: "_define your rights on the server._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.admin}>
<@&${client.config.roles.owner}>
<@&${client.config.roles.agent}>\n
<@&${client.config.roles.super_mod}>
<@&${client.config.roles.mod}>
<@&${client.config.roles.dev}>\n
<@&${client.config.roles.verified}>
@everyone
<@&${client.config.roles.lost}>\n\u200B`, inline: true},
            {name: "\u200B", value: 
`| reserved for <@${client.config.users.boostpad}>
| reserved for <@${client.config.users.grafpatron}>
| reserved for <@${client.config.users.not_a_bot}>\n
| kick/move/mute members + bot privileges
| kick/move/mute members
| bot privileges\n
| create invites, attach files, use external emojis
| write & talk
| you will be able to see only 2 channels\n\u200B`, inline: true},
            {name: "__Punishments__", value: 
`_bring you disadvantages for disregarding our_ <#${client.config.channels.rules}>_ - c'est la vie._`},
            {name: `\u200B`, value: 
`<@&${client.config.roles.stfu}>
<@&${client.config.roles.enemy}>
<@&${client.config.roles.egoist}>\n\u200B`, inline: true},
            {name: `\u200B`, value: 
`| shut the fuck up
| enjoy getting ignored and disrespected
| nobody will help you anymore :stuck_out_tongue_closed_eyes:\n\u200B`, inline: true},
            {name: "__Exclusive Roles__", value: "_make you part of the server elite._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.cb}>
<@&${client.config.roles.vip}>\n
<@&${client.config.roles.ball_chaser}>
<@&${client.config.roles.rookie}>\n
<@&${client.config.roles.magician}>
<@&${client.config.roles.athlete}>
<@&${client.config.roles.artist}>\n\u200B`, inline: true},
            {name: "\u200B", value: 
`| :fire:
| :shushing_face:\n
| reserved for <@${client.config.users.berkay}>
| reserved for <@${client.config.users.timof}>\n
| :sparkles:
| :muscle_tone3:
| :art:\n\u200B`, inline: true},
            {name: "__Gaming Roles__", value: "_group you into associated communities._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.trader}>
<@&${client.config.roles.gc}>
<@&${client.config.roles.r6}>
<@&${client.config.roles.impostor}>
<@&${client.config.roles.gm}>`, inline: true},
            {name: `\u200B`, value: 
`| :moneybag:
| <:${msg.guild.emojis.cache.get(client.config.emojis.gc).identifier}>
| <:${msg.guild.emojis.cache.get(client.config.emojis.r6).identifier}>
| <:${msg.guild.emojis.cache.get(client.config.emojis.impostor).identifier}>
| :crown:`, inline: true});
        await msg.channel.send(embed);
        msg.delete();
    }
} 