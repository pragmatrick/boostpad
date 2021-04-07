module.exports = {
    names:       ["djremove"],
    permissions: [],
    description: "Removes the DJ-role from a user.",
    async execute(client, msg, args) {
        const djroleID = client.config.roles.dj;
        const djrole = msg.guild.roles.cache.get(client.config.roles.dj);
        if (msg.member.roles.cache.has(djroleID)) {
            await msg.member.roles.remove(djrole);
            await msg.reply("I removed the DJ-role from you.");
        } else {
            await msg.reply("you already don't have the DJ-role.");
        }
    }
}