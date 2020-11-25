const Discord = require("discord.js");

module.exports = async (client, messageReaction, user) => {
    // fetching message from outside cache
    if (messageReaction.partial) await messageReaction.fetch();
    messageReaction.message.channel.messages.fetch();
    const msg = messageReaction.message;
   
    if (!msg.guild || user.bot) return;

    //Reaction Roles
    if (msg.channel.id === client.config.channels.roles && msg.id === msg.channel.messages.cache.first().id) {
        if (await msg.guild.members.cache.get(user.id).roles.cache.find(role => role.id === client.config.roles.verified)) {
            switch (messageReaction.emoji.name)
            {
                case "💰":
                    await msg.guild.members.cache.get(user.id)
                    .roles.remove(client.config.roles.trader);
                    return;
                case "♟️":
                    await msg.guild.members.cache.get(user.id)
                    .roles.remove(client.config.roles.gm);
                    return;
            }
            switch (messageReaction.emoji.id)
            {
                case client.config.emojis.gc:
                    await msg.guild.members.cache.get(user.id)
                    .roles.remove(client.config.roles.gc);
                    return;
                case client.config.emojis.r6:
                    await msg.guild.members.cache.get(user.id)
                    .roles.remove(client.config.roles.r6);
                    return;
                case client.config.emojis.impostor:
                    await msg.guild.members.cache.get(user.id)
                    .roles.remove(client.config.roles.impostor);
                    return;
            }
        }
        else {
            deleteUsersReactions(msg, user);
            await msg.guild.members.cache.get(user.id)
                .roles.remove([
                    client.config.roles.trader,
                    client.config.roles.gc,
                    client.config.roles.r6,
                    client.config.roles.impostor,
                    client.config.roles.gm
                ]);
            return;
        }
    }

    if (messageReaction.emoji.id === client.config.report_emoji_id && !msg.member.hasPermission("ADMINISTRATOR")) {
        //Report System
        const message = (await msg.guild.channels.cache.get(client.config.channels.report).messages.fetch())
        .find(message => message.embeds[0].fields[3].value === msg.id);
        const embed = new Discord.MessageEmbed(message.embeds[0])
        .spliceFields(1, 1, {name: "Amount", value: messageReaction.count, inline: true});
        message.edit(embed);
    };
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