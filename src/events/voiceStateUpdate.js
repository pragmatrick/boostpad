const moment = require("moment");
const Discord = require("discord.js");

module.exports = async (client, oldMember, newMember) => {
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
        const nickname = newMember.member.nickname;;
        const name = nickname.split(/ +/)[0];
        joinedChannel.clone({
                name: "Have you met "+name+"?", //client.config.create_channels.vc.name
                permissionOverwrites: [
                    {id: newMember.member.id, allow: ["MANAGE_CHANNELS", "MANAGE_ROLES"]}
                ]
            }).then(channel => {
            newMember.setChannel(channel);
        }).catch(err => {
            console.log(err);
            newMember.kick();
        });        
        // Sending cmd use to log
        const date = moment();
        const cmd_info = new Discord.MessageEmbed()
        .setColor(client.config.colors.blue)
        .setThumbnail(newMember.member.user.displayAvatarURL())
        .setDescription(`§ VC created by ${newMember.member}`)
        .setFooter(`🗣 done on ${date.format("ddd D MMM YYYY k:mm")}`);
        newMember.guild.channels.cache.get(client.config.channels.bot_usage).send(cmd_info).catch(err => {});
    }
}