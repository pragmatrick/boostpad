module.exports = {
    aliases: ["cc"],
    permissions: ["ADMINISTRATOR"],
    description: "Bulk delete of messages.",
    async execute(client, msg, args) {
        try {
            if (args.length > 0) {
                if (/^\d+$/.test(args[0])) {
                    const messages = await msg.channel.messages.fetch({limit: parseInt(args[0])+1});
                    await msg.channel.bulkDelete(messages);
                    return;
                }
            } 
            const messages = await msg.channel.messages.fetch({limit: 99});
            await msg.channel.bulkDelete(messages);
        } catch(err) {
            msg.delete();
            console.log(err)
        }
    }
}