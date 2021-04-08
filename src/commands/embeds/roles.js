const Discord = require("discord.js");

module.exports = {
    names:       ["roles"],
    permissions: ["ADMINISTRATOR"],
    description: "Posts the roles-embed.",
    async execute(client, msg, args) {
        // DISABLED
        return;
        let justForFun = "";
        const server = client.guilds.cache.get(client.config.server_id);
        server.roles.cache.array().forEach(role => {
            if (!Object.values(client.config.roles).includes(role.id)) {
                justForFun += `${role}` + ", ";
            } 
        });     justForFun = justForFun.slice(0, -2);

        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/RolesFire.png")
        .setColor(client.config.colors.red)
        .addFields(
            {name: "__Permission Roles__", value: "_define your rights on the server._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.owner}>
<@&${client.config.roles.admin}>
<@&${client.config.roles.agent}>\n
<@&${client.config.roles.supporter}>
& <@&${client.config.roles.mod}>\n\u200B`, inline: true},
            {name: "\u200B", value: 
`| reserved for <@${client.config.admins.grafpatron}>
| reserved for <@${client.config.admins.boostpad}>
| reserved for <@${client.config.admins.not_a_bot}>\n
| community helper
| kick/move/mute members\n\u200B`, inline: true},
            {name: "__Punishments__", value: 
`_give you disadvantages for disregarding our_ <#${client.config.channels.rules}>_ - c'est la vie._`},
            {name: `\u200B`, value: 
`<@&${client.config.roles.stfu}>
<@&${client.config.roles.enemy}>
<@&${client.config.roles.egoist}>\n\u200B`, inline: true},
            {name: `\u200B`, value: 
`| no more writing for you
| no more bot-usage for you\n\u200B`, inline: true},
            {name: "__Exclusive Roles__", value: "_make you part of the server elite._"},
            {name: `\u200B`, value: 
`<@&${client.config.roles.cb}>
<@&${client.config.roles.prime}>
<@&${client.config.roles.wildcard}>
<@&${client.config.roles.vip}>\n
**and many more...**`, inline: true},
            {name: `\u200B`, value: 
`| :fire:
| :100:
| :black_joker:
| :shushing_face:`, inline: true});
        await msg.channel.send(embed);
        await msg.delete();
    }
}