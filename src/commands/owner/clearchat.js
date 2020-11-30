module.exports = {
    aliases: ["cc"],
    description: "Bulk delete of messages.",
    execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        
        if ((args.length != 0 && !/^\d+$/.test(args[0])) || args.length > 1 || msg.channel.parent.id == client.config.channels.cin) {
            return;
        }
        if (args[0] < 99) {
            msg.channel.messages.fetch({limit: parseInt(args[0])+1}).then(async (messages) => {
                await msg.channel.bulkDelete(messages)
                .catch(err => console.log("bulk delete didn't work because the messages where older than 14 days"));
            }); 
        }
        else {
            msg.channel.messages.fetch({limit: 99}).then(async (messages) => {
                await msg.channel.bulkDelete(messages)
                .catch(err => console.log("bulk delete didn't work because the messages where older than 14 days"));
            });
        }
    }
}