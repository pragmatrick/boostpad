const Discord = require("discord.js");
const moment = require("moment");
module.exports = (client, oldMember, newMember) => {
    if (oldMember.nickname === newMember.nickname) return;
    
    const date = moment();
    const embed = new Discord.MessageEmbed()
        .setColor(client.config.colors.aqua)
        .setThumbnail(newMember.user.displayAvatarURL())
        .setDescription(`§ Nickname change for ${newMember}`)
        .setFooter(`changed on ${date.format("ddd MMM MM YYYY k:mm")}`)
        .addFields(
            {name: "from", value: oldMember.nickname, inline: true},
            {name: "to", value: newMember.nickname, inline: true});
    newMember.guild.channels.cache.get(client.config.channels.log).send(embed);
}