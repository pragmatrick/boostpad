const Discord = require("discord.js")
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = {
    aliases: [],
    description: "Not working yet.",
    async execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            if (!args[0].startsWith("https://")) {
                msg.delete();
                return;
            }
            const file = await fetch(args[0]).then(response => response.text());
            console.log(file);
        } 
    }
}



/*try {
                fetch(args[0]).then(res => res.text())
                .then(html => {
                    const $ = cheerio.load(html);
                    const website = $("meta[property='og:site_name']")[0] || $("meta[name='twitter:site_name']");
                    const title =  $("meta[property='og:title']")[0] || $("meta[name='twitter:title']");
                    const description = $("meta[property='og:itemSummaryPrice']")[0] || $("meta[name='twitter:itemSummaryPrice']")[0];
                    const image = $("meta[property='og:image']")[0] || $("meta[name='twitter:image']")[0];  
                    //console.log(title.attribs == undefined ? "!undefined" : "!defined");
                    console.log(description);
                    const embed = new Discord.MessageEmbed()
                    .setColor(client.config.colors.gold)
                    .setTitle(title != undefined && title.attribs != undefined? title.attribs.content : args[0])
                    .setURL(args[0])
                    .setDescription(description != undefined && description.attribs != undefined? description.attribs.content : "")
                    .setFooter(`Suggested by ${msg.member.user.tag}`, msg.member.user.displayAvatarURL())
                    .setThumbnail(image != undefined ? image.attribs.content : "https://cdn.discordapp.com/emojis/738688254311792691.png?v=1")
                    //.addField("⛓️", `[${title != undefined ? title.attribs.content :  args[0]}](${args[0]})`)

                    msg.channel.send(embed);
                });
            } catch (err){
                msg.channel.send(args[0]);
            }*/