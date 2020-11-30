const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Posts the faq-embed.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.react("🤨");
            return;
        }
        const embed = new Discord.MessageEmbed()
        .attachFiles(["./Pictures/Logos/FaqFire.png"])
        .setColor(client.config.colors.gold)
        .addFields(
            {name: `:thinking: Why can't I see some channels others can see?`, value: 
`You might miss some <#${client.config.channels.roles}>.\n\u200B`},
            {name: `:thinking: Why are my messages getting deleted right after I sent them?`, value: 
`Your message may violate our <#${client.config.channels.rules}>.\n\u200B`},
            {name: `:thinking: Why are my messages getting a :thumbsdown: dislike instantly?`, value: 
`You have been noticed lately for abusing <@${client.config.admins.boostpad}> which gave you the role <@&${client.config.roles.enemy}>.
This means he's no longer your friend and won't listen to your needs.\n\u200B`},
            {name: `:thinking: Why can't I write any message?`, value: 
`You have been noticed lately for not following our <#${client.config.channels.rules}> in chat rooms which gave you the role <@&${client.config.roles.stfu}>.
This means you won't be able to write anymore.\n\u200B`},
            {name: `:thinking: Why can't I get a support-ticket?`, value: 
`1. You have been noticed lately for abusing our ticket system and constantly asking stupid questions.
2. You used the support system to ask how to get rid of your punishment roles. This gave you the role <@&${client.config.roles.egoist}>.
This means the support will be closed for you.\n\u200B`},
            {name: `:thinking: Why is the Bot not responding to my needs?`, value: 
`Our bot could be offline for various reasons, please check that first.
If that is hindering you from taking a support-ticket, we ask you **not** to ping or dm a staff member unless it is really urgent.`});
        await msg.channel.send(embed);
        msg.delete();

        const ticket = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/Ticket.png")
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
        (await msg.channel.send(ticket)).react("📩");
    }
}