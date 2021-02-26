module.exports = {
    names:       ["react"],
    permissions: ["ADMINISTRATOR"],
    description: "Makes the bot react to a message with certain emojis.",
    async execute (client, msg, args) {
        if (args.length > 1) {
            msg.delete();
            return;
        }
        let message;
        if (args.length == 0) message = await msg.channel.messages.cache.last(3).shift();
        else                  message = await msg.channel.messages.fetch(args[0]);
        const reply = await msg.channel.send("Perfect! Now react to your message with all the reactions and then accept");
        await msg.delete();
        await reply.react("✅").catch(err => console.log("couldn't set checkmark"));

        let setupdone = false;
        client.on("messageReactionAdd", async (messageReaction, user) => {
            if (!setupdone) {
                if (!user.bot && messageReaction.emoji.name == "✅" && messageReaction.message == reply) {
                    if (message.reactions.cache.array().length == 0) {
                        const userReactions = reply.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(user.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    }
                    else {
                        const savedreactions = Object.assign({}, message.reactions);
                        message.reactions.removeAll().catch(err => console.log("couldn't remove all reactions"));
                        savedreactions.cache.array().forEach(async (element) => {
                            await message.react(element.emoji);
                        });
                        await reply.delete();
                        setupdone = true;
                    }
                }
            } else return;
        });
    }
}