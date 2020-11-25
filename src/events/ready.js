const { createStream } = require('table');
const tableConfig = require('../utils/tableConfig');
const { commandStatus, eventStatus } = require('../utils/registry');
const Discord = require("discord.js");
const moment = require("moment");

module.exports = async (client) => {
    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);
    console.log("\n");
    
    console.log("----------------------------------------Boostpad was grabbed----------------------------------------");

    await client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.rules).messages.fetch();
    await client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.help).messages.fetch();

    client.user.setActivity(client.config.activity.object, {type: client.config.activity.doing}).catch(console.error);
    /*
    // Constant latency calculation
    const channel = client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.bot_info);
    const latency_channel = client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.bot_latency);
    const msg1 = await latency_channel.send("calibrating...")
    const msg2 = await latency_channel.send("calculating...");
    const ping = msg2.createdTimestamp - msg1.createdTimestamp;
    msg1.delete();
    msg2.delete();

    // First embed is send manually, because of time = 0;
    let embed = new Discord.MessageEmbed()
    .setTitle("Bot information")
    .setColor("#ff9e00")
    .addFields(
        { name: "Latency", value: `${ping}ms`, inline: true },
        { name: "Uptime", value: "0m", inline: true})
    let message = await channel.send(embed);
    const date = moment(msg2.createdAt);
    let heart = ping < client.config.good_ping ? "💚" : ping < client.config.high_ping ? "💛" : "💔";
    latency_channel.send(`${heart} ${date.format("ddd MMM MM YYYY | kk:mm")} | ${ping}ms`);
    // Pings grafpatron if ping is very high (warning)
    if (ping > client.config.high_ping) latency_channel.send(`<@${client.config.users.grafpatron}>`).then(warning => warning.delete());

    // From the second embed it is send per loop
    setInterval(async () => {
        const msg1 = await latency_channel.send("calibrating...");
        const msg2 = await latency_channel.send("calculating...");
        const ping = msg2.createdTimestamp - msg1.createdTimestamp;
        msg1.delete();
        msg2.delete();
        
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;

        if (days == 0)                                  days = "";
        else                                            days = days.toString()+"d ";
        if (hours == 0)                                 hours = "";
        else                                            hours = hours.toString()+"h ";
        if (minutes == 0 && hours == 0 && days == 0)    minutes = "1m";
        else if (minutes == 0)                          minutes = "";
        else                                            minutes = minutes.toString()+"m ";         
        
        embed.spliceFields(0, 2, [
            { name: "Latency", value: `${ping}ms`, inline: true },
            { name: "Uptime", value: (days==0 && hours==0 && minutes==0) ? "1m" : `${days}${hours}${minutes}`, inline: true}
        ]);

        message.edit(embed);
        const date = moment(msg2.createdAt);
        let heart = ping < client.config.good_ping ? "💚" : ping < client.config.high_ping ? "💛" : "💔";
        latency_channel.send(`${heart} ${date.format("ddd MMM MM YYYY | kk:mm")} | ${ping}ms`);
        if (ping > client.config.high_ping) latency_channel.send(`<@${client.config.users.grafpatron}>`).then(warning => warning.delete());
    }, 60000);*/
}

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval); 
    })
}