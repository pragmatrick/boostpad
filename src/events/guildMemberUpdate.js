const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name:        "guildMemberUpdate",
    description: "Emitted whenever a guild member changes - i.e. new role, removed role, nickname. Also emitted when the user's details (e.g. username) change.",
    async run(client, oldMember, newMember) {
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
}