module.exports = (client, member) => {
    console.log("New member");
    member.guild.channels.cache.get(client.config.channels.greeting).send(`🔥 ${member} has full Boost now.`);
}

module.exports = {
    description: "test"
}