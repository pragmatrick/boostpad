const moment = require("moment");
const Discord = require("discord.js");

// discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})

module.exports = async (client, msg) => {
    if(msg.author.bot || !msg.guild) return;

    // checking discord invite links
    const regexDiscordLinks = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/;
    if (regexDiscordLinks.test(msg.cleanContent) && !msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        return;
    }

    // checking only links channel
    const regex = /https?:\/{2}(?:[\/-\w.]|(?:%[\da-fA-F]{2}))+/;
    if (!regex.test(msg.cleanContent) && client.config.channels.onlylinks.includes(msg.channel.id) 
        && !msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        return;
    }
    
    if (msg.channel.id === client.config.channels.umfragen) {
        try {
            await msg.react("👍🏼");
            await msg.react("👎🏼");
            await msg.react("🇽");
            await msg.react("🇦");
            await msg.react("🇧");
            await msg.react("🇩");
            await msg.react("🇪");
            await msg.react("🇵");
            await msg.react("🇹");
        } catch (err) {}
        return;
    }

    // checking for commands
    const prefix = client.config.prefix;
    if(msg.content.startsWith(prefix) && msg.content.length > prefix.length) {

        let args = msg.content.slice(prefix.length).split(/ +/);
        let cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd);
        if (!command) return;
        if (hasRoleOrPermission(msg, command)) {
            if (msg.member.roles.cache.get(client.config.roles.enemy)) {
                await msg.react("👎");
            } else {
                if (client.commands.get(cmd).execute(client, msg, args)) {
                    // Sending cmd use to log
                    const date = moment(msg.createdAt);
                    const cmd_info = new Discord.MessageEmbed()
                    .setColor(client.config.colors.blue)
                    .setThumbnail(msg.member.user.displayAvatarURL())
                    .setDescription(`👾 CMD used by ${msg.member}`)
                    .setFooter(`📝written on ${date.format("ddd D MMM YYYY at k:mm")}`)
                    .addFields(
                        {name: "Message", value: `[${msg.cleanContent}](${msg.url})`, inline: true},
                        {name: "Channel", value: `<#${msg.channel.id}>`, inline: true});
                    const channelID = (msg.member.id === client.config.admins.grafpatron) 
                                    ? client.config.channels.admin_usage 
                                    : client.config.channels.bot_usage;
                    msg.guild.channels.cache.get(channelID).send(cmd_info);
                } else {
                    await msg.react("⁉");
                }
            }
        } else {
            await msg.react("🤨");
        }
    }
};

function hasRoleOrPermission(msg, command) {
    for (let i = 0; i < command.permissions.length; i++) {
        if (msg.member.hasPermission(command.permissions[i])) return true;
    }
    return (command.permissions.length == 0);
}