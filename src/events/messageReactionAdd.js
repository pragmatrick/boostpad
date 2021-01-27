const Discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, messageReaction, user) => {
    // fetching message from outside cache
    if (messageReaction.partial) await messageReaction.fetch();
    messageReaction.message.channel.messages.fetch();
    const msg = messageReaction.message;

    if (!msg.guild || user.bot) return;

    // Support Ticket
    if (msg.channel.parentID === client.config.channels.support && msg.author.bot && messageReaction.emoji.name === "🔒") {
        try {
            await msg.channel.delete();
        } catch (err) {}
        return;
    }

    // EGOISM PROTECTION
    if ((await msg.guild.members.fetch(user.id)).roles.cache.get(client.config.roles.egoist)) {
        messageReaction.users.remove(user);
        return;
    }

    if (msg.channel.id === client.config.channels.help && messageReaction.emoji.name === "📩") {
        messageReaction.users.remove(user);
        if (msg.guild.channels.cache.find(channel => channel.name === user.id)) return;
        const sup_channel = await msg.guild.channels.create(
            user.id, {type: "text", parent: client.config.channels.support,
                permissionOverwrites: [
                    {id: user.id, allow: ["VIEW_CHANNEL"]},
                    {id: client.config.roles.everyone, deny: ["VIEW_CHANNEL", "ADD_REACTIONS", "CREATE_INSTANT_INVITE"]},
                    {id: client.config.roles.supporter, allow: ["VIEW_CHANNEL"]},
                ]}
        )
        sup_channel.send(`${user}, support will be with you shortly.
While waiting for a <@&${client.config.roles.supporter}>, you can start typing your question.\n
To close the support-ticket, react with :lock:`)
        .then(explain_msg => explain_msg.react("🔒"));
    }

    // Report System
    if(!(await msg.guild.members.fetch(msg.author.id).catch(() => null))) return;

    if (msg.channel.id === client.config.channels.report && user.id !== client.config.admins.boostpad) {
        const message = (await msg.guild.channels.cache.get((msg.embeds[0].fields[2].value).slice(2,-1)).messages.fetch(msg.embeds[0].fields[3].value));
        if (message == undefined) {
            console.log("trg undefined");
            msg.reactions.removeAll(); 
            return;
        }
        const date = moment(message.createdAt);
        switch (messageReaction.emoji.name) 
        {
            case "✅":
                const msgReactions = await message.reactions.cache.get(client.config.emojis.report);
                if (msgReactions != undefined) {
                    msgReactions.remove();
                }
                msg.delete();
                break;
            case "❌":
                if (!message.deleted) message.delete();
                msg.delete();
                break;
            case "⚠":
                // Warn Message
                const warnEmbed = new Discord.MessageEmbed()
                    .setColor(client.config.colors.red)
                    .setDescription(`§ WARNING`)
                    .addFields(
                        {name: "Message", value: `[${message.cleanContent}](${message.url})`, inline: false},
                        {name: "Channel", value: `<#${message.channel.id}>`, inline: true},
                        {name: "Timestamp", value: date.format("ddd MMM Do YYYY HH:mm"), inline: true},
                        {name: `This warning was caused by our community that reported your message.`, value: 
`Our staff's review resulted in giving you another chance.
Please read our <#${client.config.channels.rules}> carefully again and check out <#${client.config.channels.help}>.
__We hope you will refrain from such behaviour__. 
Otherwise you will be **kicked** or even **banned** from the server.`, inline: false});
                const dm1 = await message.author.createDM();
                dm1.send(warnEmbed);
                sendPunishment("WARNING", client, message, date, client.config.colors.olive);
                if (!message.deleted) message.delete();
                msg.delete();
                break;
            case "🔇":
                // Mute Message
                const muteEmbed = new Discord.MessageEmbed()
                    .setColor(client.config.colors.red)
                    .setDescription(`§ MUTE PENALTY`)
                    .addFields(
                        {name: "Message", value: `[${message.cleanContent}](${message.url})`, inline: false},
                        {name: "Channel", value: `<#${message.channel.id}>`, inline: true},
                        {name: "Timestamp", value: date.format("ddd MMM Do YYYY HH:mm"), inline: true},
                        {name: `This penalty was caused by our community that reported your message.`, value: 
`Our staff's review resulted in muting you for an undefined time.
Please read our <#${client.config.channels.rules}> carefully again and try to understand your fault.
However you will get a second chance. **In one month** you will have to take a support ticket at <#${client.config.channels.help}> to apologize.
__Abusing the support system will cause a permanent ban__.`, inline: false});
                const dm2 = await message.author.createDM();
                dm2.send(muteEmbed);
                sendPunishment("MUTE PENALTY", client, message, date, client.config.colors.red);
                if (!message.deleted) message.delete();
                message.member.roles.add(message.guild.roles.cache.get(client.config.roles.stfu));
                msg.delete();
                break;
        }
        return;
    }
    if (messageReaction.emoji.id === client.config.emojis.report) {
        if (msg.member.deleted) {
            console.log(msg.member==null);
            deleteUsersReactions(msg, user);
            return;
        }                  
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            const r = msg.reactions.cache.find(r => r.emoji.name == client.config.report_emoji);
            r.remove();
            return;
        }
        // try to find out if message was already reported before
        const message = (await msg.guild.channels.cache.get(client.config.channels.report).messages.fetch()).find(f_msg => f_msg.embeds[0].fields[3].value === msg.id);
        if (message) {
            const embed = new Discord.MessageEmbed(message.embeds[0])
            .spliceFields(1, 1, {name: "Amount", value: messageReaction.count, inline: true});
            message.edit(embed);
        } 
        else {    // if not, create a new report
            const date = moment(msg.createdAt);
            const content = msg.cleanContent == "" ? "<...>" : msg.cleanContent;
            const embed = new Discord.MessageEmbed()
            .setColor(client.config.colors.red)
            .setThumbnail(msg.member.user.displayAvatarURL())
            .setDescription(`§ Report on ${msg.member}`)
            .setFooter(`📝written on ${date.format("ddd MMM Do YYYY HH:mm")}`)
            .addFields(
                {name: "Message", value: `[${content}](${msg.url})`, inline: false},
                {name: "Amount", value: messageReaction.count, inline: true},
                {name: "Channel", value: `<#${msg.channel.id}>`, inline: true},
                {name: "Message ID", value: msg.id, inline: false});

            const reply = await msg.member.guild.channels.cache.get(client.config.channels.report).send(embed);
            try {
                await reply.react("✅");
                await reply.react("❌");
                await reply.react("⚠");
                await reply.react("🔇");
            } 
            catch (error) {
                console.error("Failed to react to a report embed");
            }
        } 
    }
}

async function sendPunishment(title, client, message, date, color) {
    const punishment = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`§ ${title} -> ${message.member}`)
        .setThumbnail(message.member.user.displayAvatarURL())
        .addFields(
            {name: "Message", value: `[${message.cleanContent}](${message.url})`, inline: false},
            {name: "Channel", value: `<#${message.channel.id}>`, inline: true},
            {name: "Timestamp", value: date.format("ddd MMM Do YYYY HH:mm"), inline: true});
    const channel = await message.guild.channels.cache.get(client.config.channels.punishments);
    channel.send(punishment);
}

async function deleteUsersReactions(msg, user) {
    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
    try {
        for (const reaction of userReactions.values()) {
            await reaction.users.remove(user.id);
        }
    } catch (error) {
        console.error('Failed to remove reactions.');
    }
}