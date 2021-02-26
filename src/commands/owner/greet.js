module.exports = {
    names:       ["greet"],
    permissions: ["ADMINISTRATOR"],
    description: "Greets a new user.",
    async execute(client, msg, args) {
        const member = msg.mentions.members.first();
        await msg.delete();
        if (member == null) return;
        client.emit("guildMemberAdd", member);
    }
}