module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot say whatever the args are.",
    execute(client, msg, args) {
        const answer = args.join(" ");
        msg.channel.send(answer);
        msg.delete();
    }
}