const { emojis } = require("../../regionalIndicators");

module.exports = {
    aliases: [],
    description: "Makes the bot react to a message with regional indicators.",
    async execute(client, msg, args) {
        await msg.channel.messages.fetch();
        if (msg.member.hasPermission("ADMINISTRATOR")){//} || msg.member.roles.cache.has(client.config.roles.mod) 
        //|| msg.member.roles.cache.has(client.config.roles.super_mod)) {
            if (args.length < 1) {
                await msg.delete();
                return;
            }
            let message;
            /*try {
                message = await msg.channel.messages.fetch(args[0]);
                if (args.length == 1) {
                    msg.delete();
                    return;
                }
                args.shift();
            } catch (err) {
                
            }*/
            message = await msg.channel.messages.cache.last(2).shift();
            const word = args[0].toLowerCase();
            for (let i = 0; i < word.length && i < 10; i++) {
                const letter = word[i];
                if (letter in emojis) {
                    await message.react(emojis[letter]);
                }
            }
            await msg.delete();
        } else {
            await msg.react("🤨");
        }
    }
}