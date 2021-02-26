module.exports = {
    name:        "guildMemberAdd",
    description: "Emitted whenever a user joins a guild.",
    async run(client, member) {
        member.guild.channels.cache.get(client.config.channels.greeting).send(`🔥 ${member} has full Boost now.`);
    }
}