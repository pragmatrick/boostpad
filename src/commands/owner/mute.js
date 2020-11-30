module.exports = {
    aliases: [],
    description: "Mutes the Among Us Channel.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        
        const channel = msg.guild.channels.cache.get(client.config.channels.among_us);
        channel.members.array().forEach(async (member) => {
            await member.fetch();
            await member.voice.setMute(true);
        });
        msg.delete();
    }
}