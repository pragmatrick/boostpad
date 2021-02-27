const moment = require("moment");
const Discord = require("discord.js");

module.exports = {
    name:        "message",
    description: "Emitted whenever a message is created.",
    async run(client, msg) {
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
        if (msg.content.startsWith(prefix) && msg.content.length > prefix.length) {

            const args    = msg.content.slice(prefix.length).split(/ +/);
            const cmd     = args.shift().toLowerCase();
            if (!client.commands.has(cmd)) return;
            const cmdModule = client.commands.get(cmd);
            if (hasRoleOrPermission(msg, cmdModule)) {
                if (msg.member.roles.cache.get(client.config.roles.enemy)) {
                    await msg.react("👎");
                } else {
                    cmdModule.execute(client, msg, args);
                    // Sending cmd-usage to "bot-usage / admin-usage"
                    const date = moment(msg.createdAt);
                    const cmd_info = new Discord.MessageEmbed()
                    .setColor(client.config.colors.blue)
                    .setThumbnail(msg.member.user.displayAvatarURL())
                    .setDescription(`👾 CMD used by ${msg.member}`)
                    .setFooter(`📝written on ${date.format("ddd D MMM YYYY at k:mm")}`)
                    .addFields(
                        {name: "Message", value: `[${msg.cleanContent}](${msg.url})`, inline: true},
                        {name: "Channel", value: `<#${msg.channel.id}>`, inline: true});
                    const channelID = (msg.member.hasPermission("ADMINISTRATOR"))
                                    ? client.config.channels.admin_usage 
                                    : client.config.channels.bot_usage;
                    msg.guild.channels.cache.get(channelID).send(cmd_info);
                }
            } else {
                await msg.react("🤨");
            }
        }
    }
};

function hasRoleOrPermission(msg, command) {
    for (let i = 0; i < command.permissions.length; i++) {
        if (msg.member.hasPermission(command.permissions[i])) return true;
    }
    return (command.permissions.length == 0);
}