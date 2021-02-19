module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot say whatever the args are.",
    async execute(client, msg, args) {
        const answer = args.join(" ");
        await msg.channel.send(answer);
        await msg.delete();
    }
}