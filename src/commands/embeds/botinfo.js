const Discord = require("discord.js");

module.exports = {
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Posts the botinfo-embed.",
    async execute(client, msg, args) {
        const sb_icon = `<:${msg.guild.emojis.cache.get(client.config.emojis.boostpad).identifier}>`;
        const report = `<:${msg.guild.emojis.cache.get(client.config.emojis.report).identifier}>`;
        const bb_cf = client.config.emojis.coinflip_big;    // bigboost-coinflip
        const sm_cf = client.config.emojis.coinflip_small;  // smallboost-coinflip
        const embed = new Discord.MessageEmbed()
        .attachFiles("../Pictures/Logos/BotInfoFire.png")
        .setTitle("Let me introduce myself...")
        .setColor(client.config.colors.blue)
        .addFields(
            {name: `${sb_icon} 1 — Automoderation`, value: 
`My primary task is to keep everything in harmony. 
I will detect violating behavior and act accordingly, e.g. by deleting a message. 
Every important decision like muting/kicking/banning will still be executed by a staff member.\n\u200B`},
            {name: `${sb_icon} 2 — Report System`, value: 
"You can help me detect bad behavior in chat rooms!\n"+
`By reacting to a message with ${report} (it's a server emoji), `+
"a report will be send to a mod-channel, where the staff can decide "+ 
"what will happen with the message and the user who wrote it.\n\u200B"},
            {name: `${sb_icon} 3 — Dynamic Voice Channels`, value: 
`We cannot look into the future and know how big or small the server will be. 
The so called **Infinite Chamber** is a place where everyone can create their own temporary room. `+
"Go to the bottom of the server and ``🗣 ╵ Join to create VC`` :wink:\n"+ 
`sounds confusing but after your first experience you'll get it.\n\u200B`},
            {name: `${sb_icon} 4 — Commands`, value: 
`Using commands in chat rooms can be quite funny. 
To be executed, your message must contain the command **only**.
They will often change, new ones will come, others will go...`},
            {name: `Command Name`, value:
"`/hack <@user>` \n"+
"`/coinflip` or `/boost` \n"+
"`/nudge <@user>` \n" +
"`/tenor <keywords>`", inline: true},
            {name: `Output`, value:
`steels a user's boost
<:${msg.guild.emojis.cache.get(bb_cf).identifier}> or <:${msg.guild.emojis.cache.get(sm_cf).identifier}>
deletes your message
posts a gif` , inline: true}
    );
        await msg.channel.send(embed);
        await msg.delete();
    }
}