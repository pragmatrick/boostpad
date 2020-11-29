const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Posts the roles-embed.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;

        justForFun = "\u200B\n"+
        `<@&${client.config.roles.magician}>`+", "+
        `<@&${client.config.roles.athlete}>`+", "+
        `<@&${client.config.roles.artist}>`+ ", "+
        `<@&${client.config.roles.communist}>`+", "+
        `<@&${client.config.roles.philosopher}>`+", "+
        `<@&${client.config.roles.drugs}>`+
        "\n\u200B";

        const embed = new Discord.MessageEmbed()
        .attachFiles("../../Pictures/Logos/RolesFire.png")
        .setColor(client.config.colors.red)
        .addFields(
            {name: "__Permission Roles__", value: "_define your rights on the server._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.owner}>
<@&${client.config.roles.admin}>
<@&${client.config.roles.agent}>\n
<@&${client.config.roles.super_mod}>
<@&${client.config.roles.mod}>
<@&${client.config.roles.dev}>\n
<@&${client.config.roles.verified}>
@everyone
<@&${client.config.roles.lost}>\n\u200B`, inline: true},
            {name: "\u200B", value: 
`| reserved for <@${client.config.admins.grafpatron}>
| reserved for <@${client.config.admins.boostpad}>
| reserved for <@${client.config.admins.not_a_bot}>\n
| kick/move/mute members + bot privileges
| kick/move/mute members
| bot privileges\n
| create invites, attach files, use external emojis
| write & talk
| you will be able to see only 2 channels\n\u200B`, inline: true},
            {name: "__Exclusive Roles__", value: "_make you part of the server elite._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.cb}>
<@&${client.config.roles.vip}>\n\u200B`, inline: true},
            {name: `\u200B`, value: 
`| :fire:
| :shushing_face:\n\u200B`, inline: true},
            {name: "__Punishments__", value: 
`_bring you disadvantages for disregarding our_ <#${client.config.channels.rules}>_ - c'est la vie._`},
            {name: `\u200B`, value: 
`<@&${client.config.roles.stfu}>
<@&${client.config.roles.enemy}>
<@&${client.config.roles.egoist}>\n
<@&${client.config.roles.taktiker}>\n\u200B`, inline: true},
            {name: `\u200B`, value: 
`| shut the fuck up
| enjoy getting ignored and disrespected
| nobody will help you anymore :stuck_out_tongue_closed_eyes:\n
| reserved for <@${client.config.users.berkay}>\n\u200B`, inline: true},
            {name: "__Just For Fun__", value: justForFun},
            {name: `\u200B`, value: 
`<@&${client.config.roles.cod}>
<@&${client.config.roles.impostor}>
<@&${client.config.roles.trader}>
<@&${client.config.roles.gc}>
<@&${client.config.roles.r6}>
<@&${client.config.roles.gm}>`, inline: true},
            {name: "__Gaming Roles__", value: justForFun},
            {name: `\u200B`, value: 
`| <:${msg.guild.emojis.cache.get(client.config.emojis.cod).identifier}>
| :moneybag:
| <:${msg.guild.emojis.cache.get(client.config.emojis.gc).identifier}>
| <:${msg.guild.emojis.cache.get(client.config.emojis.r6).identifier}>
| <:${msg.guild.emojis.cache.get(client.config.emojis.impostor).identifier}>
| :crown:`, inline: true});
        await msg.channel.send(embed);
        msg.delete();
    }
}