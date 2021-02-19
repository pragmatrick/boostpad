module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot shout whatever the args are.",
    async execute(client, msg, args) {
        const answer = args.join(" ");
        await msg.channel.send("**"+answer.toUpperCase()+"**");
        await msg.delete();
    }
}