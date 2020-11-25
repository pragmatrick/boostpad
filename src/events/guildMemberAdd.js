module.exports = (client, member) => {
    member.guild.channels.cache.get(client.config.channels.greeting).send(`🔥 ${member} has full Boost now.`);
}