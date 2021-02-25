module.exports = {
    aliases: [],
    permissions: ["MOVE_MEMBERS", "ADMINISTRATOR"],
    description: "Moves the the people from channel a channel which have the permissions to the another channel.",
    async execute(client, msg, args) {
        const originChannel = msg.member.voice.channel;
        msg.delete();
        if (args.length === 0) return;
        if (originChannel == null) return;
        
        let searchTerm = args.join(" ").toLowerCase();
        let moveChannel = await msg.guild.channels.cache.find(channel => 
            (channel.name.toLowerCase().includes(searchTerm) && channel.type == "voice")
        );

        if (!moveChannel) {
            searchTerm = searchTerm.split("").filter(char => /[a-zA-Z]/.test(char)).join("");
            moveChannel = await msg.guild.channels.cache.find(channel => 
                (channel.name.split("").filter(char => /[a-zA-Z]/.test(char)).join("").toLowerCase().includes(searchTerm)
                && channel.type == "voice")
            );
            if (!moveChannel) return;
        }
        
        if (moveChannel == originChannel 
            || !msg.member.permissionsIn(moveChannel).has("CONNECT") 
            || !msg.member.permissionsIn(moveChannel).has("VIEW_CHANNEL")
            || !msg.member.permissionsIn(moveChannel).has("MOVE_MEMBERS")
            || !msg.member.permissionsIn(originChannel).has("CONNECT") 
            || !msg.member.permissionsIn(originChannel).has("VIEW_CHANNEL")
            || !msg.member.permissionsIn(originChannel).has("MOVE_MEMBERS")) return;
        originChannel.members.array().forEach(member => {
            if (member.permissionsIn(moveChannel).has("CONNECT") && member.permissionsIn(moveChannel).has("VIEW_CHANNEL")) {
                member.voice.setChannel(moveChannel).catch(null);
            }
        });
    }
}