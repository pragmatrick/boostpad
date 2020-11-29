module.exports = (client, oldMember, newMember) => {
    // Delete clear channels
    client.guilds.cache.get(client.config.server_id).channels.cache.array().forEach(channel => {
        if ((channel.parent == client.config.create_channels.vc.parent && channel.id != client.config.create_channels.vc.id)) {
            if (channel.members.size == 0 && !channel.deleted) channel.delete();
        }
    });
    // Join to create VC
    if (newMember.channelID === client.config.create_channels.vc.id) {
        if (newMember.member.roles.cache.find(role => role.id === client.config.roles.enemy)) {
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
            channel.overwritePermissions(
                {
                    id: newMember.member.id,
                    allow: ["MANAGE_CHANNELS"]
                }
            );
        }).catch(err => {
            console.log(err);
            newMember.kick();
        });
    }
}