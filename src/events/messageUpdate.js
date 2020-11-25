module.exports = async (client, oldMsg, msg) => {
    if (msg.author.bot || !msg.guild) return;
    if (msg.partial) await msg.fetch();
    
    // checking only links channel
    const regex = /https?:\/{2}(?:[\/-\w.]|(?:%[\da-fA-F]{2}))+/;
    if (!regex.test(msg.cleanContent) && client.config.channels.onlylinks.includes(msg.channel.id) 
        && !msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        return;
    }
    
    // checking commands
    if(msg.content.startsWith(client.config.prefix) && msg.content.length > client.config.prefix.length) {
        let args = msg.content.slice(client.config.prefix.length).split(/ +/);
        let cmd = args.shift().toLowerCase();
        if (client.commands.get(cmd)) {
            if (msg.member.roles.cache.find(r => r.id === client.config.roles.enemy)) {
                msg.react("👎");
                return;
            }
            client.commands.get(cmd)(client, msg, args, client.config);
            const date = moment(msg.createdAt);
            const cmd_info = new Discord.MessageEmbed()
            .setColor(client.config.colors.blue)
            .setThumbnail(msg.member.user.displayAvatarURL())
            .setDescription(`§ CMD used by ${msg.member}`)
            .setFooter(`📝written on ${date.format("ddd MMM MM YYYY k:mm")}`)
            .addFields(
                {name: "Message", value: `[${msg.cleanContent}](${msg.url})`, inline: false},
                {name: "Channel", value: `<#${msg.channel.id}>`, inline: false});
            msg.guild.channels.cache.get(client.config.channels.bot_usage).send(cmd_info);
        }
    }
}