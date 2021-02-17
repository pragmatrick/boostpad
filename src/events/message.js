const moment = require("moment");
const Discord = require("discord.js");

// discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})

module.exports = async (client, msg) => {
    if(msg.author.bot || !msg.guild) return;

    // checking discord invite links
    const regexDiscordLinks = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/;
    if (regexDiscordLinks.test(msg.cleanContent) && !msg.member.hasPermissions("ADMINISTRATOR")) {
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
        if (client.commands.get(cmd)) {
            let verb;
            if (msg.member.roles.cache.find(r => r.id === client.config.roles.enemy)) {
                msg.react("👎");
                verb = "denied from";
            } else {
                client.commands.get(cmd)(client, msg, args);
                verb = "used by";
            }
            // Sending cmd use to log
            const date = moment(msg.createdAt);
            const cmd_info = new Discord.MessageEmbed()
            .setColor(client.config.colors.blue)
            .setThumbnail(msg.member.user.displayAvatarURL())
            .setDescription(`👾 CMD ${verb} ${msg.member}`)
            .setFooter(`📝written on ${date.format("ddd D MMM YYYY k:mm")}`)
            .addFields(
                {name: "Message", value: `[${msg.cleanContent}](${msg.url})`, inline: false},
                {name: "Channel", value: `<#${msg.channel.id}>`, inline: false});
            msg.guild.channels.cache.get(client.config.channels.bot_usage).send(cmd_info);
        }
    }
};