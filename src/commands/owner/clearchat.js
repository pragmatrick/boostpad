module.exports = {
    aliases: ["cc"],
    description: "Bulk delete of messages.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        
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