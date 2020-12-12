module.exports = (client, oldMember, newMember) => {
    // Delete clear channels
    client.guilds.cache.get(client.config.server_id).channels.cache.array().forEach(channel => {
        if ((channel.parent == client.config.create_channels.vc.parent && channel.id != client.config.create_channels.vc.id)) {
            if (channel.deletable && channel.members.size == 0) channel.delete().catch(err => {});
        }
    });

    // Join to create VC
    if (newMember.channelID === client.config.create_channels.vc.id) {
        if (newMember.member.roles.cache.get(client.config.roles.enemy)) {
            newMember.kick();
            return;
        }
        const joinedChannel = newMember.channel;
        joinedChannel.clone({
                name: client.config.create_channels.vc.name,
                permissionOverwrites: [
                    {id: newMember.member.id, allow: "MANAGE_CHANNELS"}
                ]
            }).then(channel => {
            newMember.setChannel(channel);
        }).catch(err => {
            console.log(err);
            newMember.kick();
        });
    }
}