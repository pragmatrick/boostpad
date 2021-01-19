module.exports = {
    aliases: [],
    description: "Makes the bot shout whatever the args are.",
    execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            const answer = args.join(" ");
            msg.channel.send("**"+answer.toUpperCase()+"**");
            msg.delete();
        } else {
            msg.react("🤨");
        }
    }
}