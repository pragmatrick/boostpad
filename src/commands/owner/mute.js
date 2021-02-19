module.exports = {
    aliases: [],
    description: "Mutes the current channel.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        
        const channel = msg.member.voice.channel;
        msg.delete();
        if (channel == null) return;
        
        channel.members.array().forEach(async (member) => {
            await member.fetch();
            await member.voice.setMute(true);
        });
    }
}