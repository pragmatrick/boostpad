module.exports = async (client) => {
    console.log("----------------------------------------Boostpad was grabbed----------------------------------------");

    await client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.rules).messages.fetch();
    await client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.help).messages.fetch();

    client.user.setActivity(client.config.activity.object, {type: client.config.activity.doing}).catch(console.error);
}