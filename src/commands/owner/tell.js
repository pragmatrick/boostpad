module.exports = {
    aliases: [],
    description: "Makes the bot react to a message with regional indicators.",
    async execute(client, msg, args) {
        await msg.channel.messages.fetch();
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            if (args.length < 1) {
                await msg.delete();
                return;
            }
            let message;
            message = await msg.channel.messages.cache.last(2).shift();
            const word = args[0].toLowerCase();
            for (let i = 0; i < word.length && i < 10; i++) {
                const letter = word[i];
                if (letter in client.emojis) {
                    await message.react(client.emojis[letter]);
                }
            }
            await msg.delete();
        } else {
            await msg.react("🤨");
        }
    }
}