const moment = require("moment");
const Discord = require("discord.js");

module.exports = {
    name:        "voiceStateUpdate",
    description: "Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.",
    async run(client, oldMember, newMember) {
        // Logging
        if (oldMember.channel != newMember.channel) {
            const trackChannel = msg.guild.channels.cache.get(client.config.channels.tracker);
            if (oldMember.channel == null) {
                trackChannel.send(`🟢 ${newMember.member} connected to `+"`"+`<#${newMember.channelID}>`+"`");
            } else if (newMember.channel == null) {
                trackChannel.send(`🔴 ${oldMember.member} disconnected from `+"`"+`<#${oldMember.channelID}>`+"`");
            } else {
                trackChannel.send(`🔀 ${newMember.member} switched from to `+"`"+`<#${oldMember.channelID}>`+"` to " +"`"+`<#${newMember.channelID}>`+"`");
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
            if (newMember.member.roles.cache.get(client.config.roles.enemy)) {
                newMember.kick();
                return;
            }
            const joinedChannel = newMember.channel;
            const nickname = newMember.member.nickname;
            const name = nickname.split(/ +/)[0];
            joinedChannel.clone({
                    name: "Have you met "+name+"?", //client.config.create_channels.vc.name
                    permissionOverwrites: [
                        {id: newMember.member.id, allow: ["MANAGE_CHANNELS"]}
                    ]
                }).then(channel => {
                newMember.setChannel(channel);
            }).catch(err => {
                console.log(err);
                newMember.kick();
            });        
            // Sending infinite chamber use to log
            const channelID = (newMember.member.hasPermission("ADMINISTRATOR"))
                                    ? client.config.channels.admin_usage 
                                    : client.config.channels.bot_usage;
            const message = `🗣 | ${newMember.member} used the infinite chamber (${moment().format("ddd D MMM YYYY k:mm")}).`
            newMember.guild.channels.cache.get(channelID).send(message);
        }

        // Among Us Channel Clearing
        if (oldMember.channelID === client.config.channels.among_us) {
            if (oldMember.channel.members.size == 0) oldMember.channel.setName("💬╵Among Us");
        }
    }
}