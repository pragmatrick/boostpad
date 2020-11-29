const Discord = require("discord.js");

module.exports = async (client, messageReaction, user) => {
    // fetching message from outside cache
    if (messageReaction.partial) await messageReaction.fetch();
    messageReaction.message.channel.messages.fetch();
    const msg = messageReaction.message;
   
    if (!msg.guild || user.bot) return;

    //Report System
    if (messageReaction.emoji.id === client.config.report_emoji_id && !msg.member.hasPermission("ADMINISTRATOR")) {
        const message = (await msg.guild.channels.cache.get(client.config.channels.report).messages.fetch())
        .find(message => message.embeds[0].fields[3].value === msg.id);
        const embed = new Discord.MessageEmbed(message.embeds[0])
        .spliceFields(1, 1, {name: "Amount", value: messageReaction.count, inline: true});
        message.edit(embed);
    };
}

module.exports = {
    description: "test"
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