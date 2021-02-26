module.exports = {
    names:       ["tell"],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot react to a message with regional indicators.",
    async execute(client, msg, args) {
        //await msg.channel.messages.fetch();
        await msg.delete();
        if (args.length < 1) {
            return;
        }
        const messages = await msg.channel.messages.fetch({ limit: 2 });
        if (messages.array().length < 2) {
            return;
        }
        const lastMessage = messages.last();
        const word = args[0].toLowerCase();
        for (let i = 0; i < word.length && i < 10; i++) {
            const letter = word[i];
            if (letter in client.letterEmojis) {
                await lastMessage.react(client.letterEmojis[letter]);
            }
        }
    }
}