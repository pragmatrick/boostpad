const moment = require("moment");
const Discord = require("discord.js");

module.exports = {
    name:        "voiceStateUpdate",
    description: "Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.",
    async run(client, oldMember, newMember) {
        // Logging
        if (oldMember.channel != newMember.channel) {
            const trackChannel = oldMember.guild.channels.cache.get(client.config.channels.tracker);
            const member = oldMember.member.hasPermission("ADMINISTRATOR") ? "**"+oldMember.member.displayName+"**" : oldMember.member;
            if (oldMember.channel == null) {
                trackChannel.send(`🟢 ${member} connected to `+"`"+`${newMember.channel.name}`+"`");
            } else if (newMember.channel == null) {
                trackChannel.send(`🔴 ${member} disconnected from `+"`"+`${oldMember.channel.name}`+"`");
            } else {
                trackChannel.send(`🔀 ${member} switched from to `+"`"+`${oldMember.channel.name}`+"` to " +"`"+`${newMember.channel.name}`+"`");
            }
        }

        // Delete clear channels
        client.guilds.cache.get(client.config.server_id).channels.cache.array().forEach(channel => {
            if ((channel.parent == client.config.create_channels.vc.parent && channel.id != client.config.create_channels.vc.id)) {
                if (channel.deletable && channel.members.size == 0) channel.delete().catch(err => {});
            }
        });

        // Join to create VC
        if (newMember.channelID === client.config.create_channels.vc.id) {
            const joinedChannel = newMember.channel;
            const nickname = newMember.member.nickname;
            const name = nickname.split(/ +/)[0];
            joinedChannel.clone({
                    name: client.config.create_channels.vc.name, //"Have you met "+name+"?"
                    permissionOverwrites: [
                        {id: newMember.member.id, allow: ["MANAGE_CHANNELS"]}
                    ]
                }).then(async (channel) => {
                await newMember.setChannel(channel);
            }).catch(async (err) => {
                console.log(err);
                await newMember.kick();
            });        
            // Sending infinite chamber use to log
            let channelID, member;
            if (newMember.member.hasPermission("ADMINISTRATOR")) {
                channelID = client.config.channels.admin_usage;
                member = newMember.member.nickname;
            } else {
                channelID = client.config.channels.bot_usage;
                member = newMember.member;
            }
            const message = `🗣 | ${member} used the infinite chamber (${moment().format("ddd D MMM YYYY k:mm")}).`
            newMember.guild.channels.cache.get(channelID).send(message);
        }

        // Among Us Channel Clearing
        if (oldMember.channelID === client.config.channels.among_us) {
            if (oldMember.channel.members.size == 0) oldMember.channel.setName("💬╵Among Us");
        }
    }
}