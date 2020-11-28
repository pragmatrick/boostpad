const Discord = require("discord.js");
const moment = require("moment");

module.exports = async (client, messageReaction, user) => {
    // fetching message from outside cache
    if (messageReaction.partial) await messageReaction.fetch();
    messageReaction.message.channel.messages.fetch();
    const msg = messageReaction.message;

    if (!msg.guild || user.bot) return;

    // Report System
    if (msg.channel.id === client.config.channels.report && user.id !== client.config.admins.boostpad) {
        const message = (await msg.guild.channels.cache.get((msg.embeds[0].fields[2].value).slice(2,-1)).messages.fetch(msg.embeds[0].fields[3].value));
        if (message == undefined) {
            msg.reactions.removeAll(); 
            return;
        }
        switch (messageReaction.emoji.name) 
        {
            case "✅":
                const msgReactions = message.reactions.cache.get(client.config.report_emoji_id);
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
                if (!message.deleted) message.delete();
                await msg.guild.members.cache.get(message.member.id)
                    .roles.remove([client.config.roles.verified]);
                msg.delete();
                break;
            case "🔇":
                if (!message.deleted) message.delete();
                message.member.roles.add(message.guild.roles.cache.get(client.config.roles.stfu));
                message.delete();
                msg.delete();
                break;
        }
        return;
    }
    if (messageReaction.emoji.id === client.config.emojis.report) {
        if (!msg.member || msg.member.deleted) {  // if member who was reported already left the server
            console.log(msg.member);
            deleteUsersReactions(msg, user);
            return;
        }                  
        if (msg.member.hasPermission("ADMINISTRATOR")) { // you cant report an admin
            console.log("admin!");
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
        else {    // if not create a new report
            const date = moment(msg.createdAt);
            const embed = new Discord.MessageEmbed()
            .setColor(client.config.colors.red)
            .setThumbnail( msg.member.user.displayAvatarURL())
            .setDescription(`§ Report on ${msg.member}`)
            .setFooter(`📝written on ${date.format("ddd MMM MM YYYY k:mm")}`)
            .addFields(
                {name: "Message", value: `[${msg.cleanContent}](${msg.url})`, inline: false},
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

    // Support Ticket
    if (msg.channel.parentID === client.config.channels.support 
        && msg.author.bot && messageReaction.emoji.name === "🔒") {
        msg.channel.delete().catch(err => console.log("couldn't delete support channel"));
        return;
    }
    if (msg.channel.id === client.config.channels.help
        && messageReaction.emoji.name === "📩") {
        messageReaction.users.remove(user);
        if (msg.guild.channels.cache.find(channel => channel.name === user.id)) return;
        const sup_channel = await msg.guild.channels.create(
            user.id, {type: "text", parent: client.config.channels.support,
                permissionOverwrites: [
                    {id: user.id, allow: ["VIEW_CHANNEL"]},
                    {id: client.config.roles.everyone, deny: ["VIEW_CHANNEL", "ADD_REACTIONS"]},
                    {id: client.config.roles.verified, deny: ["CREATE_INSTANT_INVITE"]},
                    {id: client.config.roles.super_mod, allow: ["VIEW_CHANNEL"]},
                ]}
        )
        sup_channel.send(`${user}, support will be with you shortly.
While waiting for a <@&${client.config.roles.super_mod}> or the <@&${client.config.roles.owner}>, 
you can start typing your question.\n
To close the support-ticket, react with :lock:`)
        .then(explain_msg => explain_msg.react("🔒"));
    }
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