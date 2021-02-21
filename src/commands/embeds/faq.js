const Discord = require("discord.js");

module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Posts the faq-embed.",
    async execute(client, msg, args) {
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/FaqFire.png")
        .setColor(client.config.colors.gold)
        .addFields(
            {name: `:thinking: Why can't I see some channels others can see?`, value: 
`You might miss some <#${client.config.channels.roles}>.\n\u200B`},
            {name: `:thinking: Why are my messages getting deleted right after I sent them?`, value: 
`Your message may violate our <#${client.config.channels.rules}>.\n\u200B`},
            {name: `:thinking: Why are my messages getting a :thumbsdown: dislike instantly?`, value: 
`You have been noticed for abusing <@${client.config.admins.boostpad}> which gave you the role <@&${client.config.roles.enemy}>.
This means he's no longer your friend and won't listen to your needs.\n\u200B`},
            {name: `:thinking: Why can't I write any message?`, value: 
`You have been noticed for not following our <#${client.config.channels.rules}> in chat rooms which gave you the role <@&${client.config.roles.stfu}>.
This means you won't be able to write anymore.\n\u200B`},
            {name: `:thinking: Is there a possibility to get rid of a punishment?`, value: 
`Time. Patience. Good behaviour. - yes
DM mods. Take support-ticket. - no\n\u200B`},
            {name: `:thinking: Why can't I get a support-ticket?`, value: 
`You have been noticed for abusing our ticket system and constantly asking stupid questions. This gave you the role <@&${client.config.roles.egoist}>.
This means the support will be closed for you.\n\u200B`},
            {name: `:thinking: Why are some bot-features not working?`, value: 
`Our bot could be offline due to maintenance or other reasons.
If that is hindering you from taking a support-ticket, we ask you **not** to ping or dm a staff member unless it is really urgent.\n\u200B`},
            {name: `:thinking: I found a bug. What should I do?`, value: 
`If this bug doesn't hinder the support-ticket then use it please.
Otherwise we ask you to dm <@${client.config.admins.grafpatron}>.`});
        await msg.channel.send(embed);
        msg.delete();

        const ticket = new Discord.MessageEmbed()
        .attachFiles("./Pictures/Logos/Ticket.png")
        .setThumbnail("attachment://Ticket.png")
        .setColor(client.config.colors.aqua)
        .setDescription("You have still an unanswered question?")
        .addField(
            "Take a Support-Ticket:",
`• react to this message
• a temporary channel will be created for your need
• consider that you can only have one ticket
• ask your question there and wait for help`
        );
        await (await msg.channel.send(ticket)).react("📩");
    }
}