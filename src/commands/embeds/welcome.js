const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Posts the welcome-embed.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.react("🤨");
            return;
        }
        const insta = `<:${msg.guild.emojis.cache.get(client.config.emojis.instagram).identifier}>`;
        const cb = `<:${msg.guild.emojis.cache.get(client.config.emojis.cornerboost).identifier}>`
        const embed = new Discord.MessageEmbed()
        .attachFiles(["./Pictures/Logos/WelcomeFire.png"])
        .setColor(client.config.colors.gold)
        .setTitle("__How to start at the official Cornerboost-Server:__")
        .addFields(
            {name: `\u200B\n:one: Read the rules`, value: 
`I guess you will either way skip the <#${client.config.channels.rules}>, which is okay.
Just don't be a jerk and that will do it.\n\u200B`},
            {name: `:two: Understand our roles`, value: 
`<#${client.config.channels.roles}> are highly exclusive and you can only get them manually.\n\u200B`},
            {name: `:three: Get to know our Bot`, value: 
`<@${client.config.admins.boostpad}> is our AI, which can automoderate, interact with users and do fun stuff. 
There are some commands to discover, go check out <#${client.config.channels.bot_info}> and learn __how and when__ to use them.\n\u200B`},
            {name: `:thinking: Still have questions?`, value: 
`Here is a list of frequently asked questions: <#${client.config.channels.help}>
There is also an option to ask directly for help from the support team.\n\u200B`},
            {name: `${insta} Visit our Instagram!`, value: 
`[@cornerboost](https://www.instagram.com/cornerboost/)`},
            {name: `:love_letter: Invite others to this server!`, value: 
`https://discord.gg/AuGkuSz`});
        msg.channel.send(embed);
        msg.delete();
    }
}