module.exports = {
    aliases: [],
    description: "Makes the bot say whatever the args are.",
    execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(client.config.roles.super_mod)) {
            let answer = "";
            args.forEach(word => {
                answer += word + " ";
            });
            msg.channel.send(answer);
            msg.delete();
        }
    }
}