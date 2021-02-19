const Discord = require('discord.js');

module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "DEACTIVATED: Returns an embed with the bots ping.",
    async execute(client, msg, args) {
        /*const msg1 = await msg.channel.send("calibrating...");
        const msg2 = await msg.channel.send("calculating...");
        const ping = msg2.createdTimestamp - msg1.createdTimestamp;
        
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60 +1;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        if (days == 0)      days = "";
        else                days = days.toString()+"d ";
        if (hours == 0)     hours = "";
        else                hours = hours.toString()+"h ";
        if (minutes == 0)   minutes = "";
        else                minutes = minutes.toString()+"m ";

        if (days == 0 && hours == 0 && min == 0) {
            minutes = "0m";
        }

        const embed = new Discord.MessageEmbed()
        .setTitle("Bot information")
        .setColor("#ff9e00")
        .setTimestamp()
        .addFields(
        { name: "Latency", value: `${ping}ms`, inline: true },
        { name: "Uptime", value: `${days}${hours}${minutes}`, inline: true})
        
        msg.delete();
        msg1.delete();
        msg2.delete();
        msg.channel.send(embed);
        */
    }
}