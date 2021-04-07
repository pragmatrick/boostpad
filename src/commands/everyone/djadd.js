module.exports = {
    names:       ["djadd"],
    permissions: [],
    description: "Gives the DJ-role to a user.",
    async execute(client, msg, args) {
        const djroleID = client.config.roles.dj;
        const djrole = msg.guild.roles.cache.get(client.config.roles.dj);
        if (!msg.member.roles.cache.has(djroleID)) {
            await msg.member.roles.add(djrole);
            await msg.channel.reply("I gave you the DJ-role.");
        } else {
            await msg.channel.send("You already have the DJ-role.");
        }
    }
}