module.exports = {
    name:        "guildMemberRemove",
    description: "Emitted whenever a member leaves a guild, or is kicked.",
    async run(client, member) {
        member.guild.channels.cache.get(client.config.channels.greeting).send(`💨 ${member} has used up all his Boost.`);
    }
}