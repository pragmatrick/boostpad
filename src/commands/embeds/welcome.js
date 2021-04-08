const Discord = require("discord.js");

module.exports = {
    names:       ["welcome"],
    permissions: ["ADMINISTRATOR"],
    description: "Posts the welcome-embed.",
    async execute(client, msg, args) {
        const insta = `<:${msg.guild.emojis.cache.get(client.config.emojis.instagram).identifier}>`;
        const cb = `<:${msg.guild.emojis.cache.get(client.config.emojis.cornerboost).identifier}>`
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/WelcomeFire.png")
        .setColor(client.config.colors.gold)
        .addFields(
            {name: `:scroll: Read the rules`, value: 
`I guess you will either way skip the <#${client.config.channels.rules}>, which is okay.
Just don't be a jerk and that will do it.\n\u200B`},
            {name: `:space_invader: Get to know our Bot`, value: 
`<@${client.config.admins.boostpad}> is our AI, which can automoderate, interact with users and do fun stuff. 
There are some commands to discover, go check out <#${client.config.channels.bot_info}> and learn how to use them.\n\u200B`},
            {name: `:thinking: Still have questions?`, value: 
`Here is a list of frequently asked questions: <#${client.config.channels.help}>
There is also an option to ask directly for help from the support team.\n\u200B`},
            {name: `:love_letter: Invite others to this server!`, value: 
`https://discord.gg/AuGkuSz`});
        await msg.channel.send(embed);
        await msg.delete();
    }
}