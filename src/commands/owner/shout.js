module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot shout whatever the args are.",
    execute(client, msg, args) {
        const answer = args.join(" ");
        msg.channel.send("**"+answer.toUpperCase()+"**");
        msg.delete();
    }
}