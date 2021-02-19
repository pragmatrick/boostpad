module.exports = {
    aliases: ["mv"],
    description: "Moves the whole channel to another channel.",
    async execute(client, msg, args) {
        if (msg.member.hasPermission("MOVE_MEMBERS") || msg.member.hasPermission("ADMINISTRATOR")) {

            const originChannel = msg.member.voice.channel;
            msg.delete();
            if (args.length === 0) return;
            if (originChannel == null) return;
            
            const searchTerm = args.join(" ").toLowerCase();
            const moveChannel = await msg.guild.channels.cache.find(channel => 
                (channel.name.toLowerCase().includes(searchTerm) && channel.type == "voice")
            );

            if (moveChannel) {
                if (moveChannel == originChannel 
                    || !msg.member.permissionsIn(moveChannel).has("CONNECT") 
                    || !msg.member.permissionsIn(moveChannel).has("VIEW_CHANNEL")
                    || !msg.member.permissionsIn(moveChannel).has("MOVE_MEMBERS")
                    || !msg.member.permissionsIn(originChannel).has("CONNECT") 
                    || !msg.member.permissionsIn(originChannel).has("VIEW_CHANNEL")
                    || !msg.member.permissionsIn(originChannel).has("MOVE_MEMBERS")) return;
                originChannel.members.array().forEach(member => {
                    member.voice.setChannel(moveChannel).catch(null);
                });
            }

        }
    }
}