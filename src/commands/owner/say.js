module.exports = {
    aliases: [],
    description: "Makes the bot say whatever the args are.",
    execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            const answer = args.join(" ");
            msg.channel.send(answer);
            msg.delete();
        } else {
            msg.react("🤨");
        }
    }
}