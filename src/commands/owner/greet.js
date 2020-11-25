const Canvas = require("canvas");
const Discord = require("discord.js");

module.exports = {
    aliases: [],
    description: "Creates for a user a custom welcome-image.",
    async execute(client, msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) return;
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext("2d");
            let fontSize = 70;
            
            do {
                ctx.font = `${(fontSize -= 10)}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);
            
            return ctx.font;
        };
        let member;
        if (args.length > 0)  {
            member = msg.mentions.members.first();
        }
        else {
            msg.delete(); return;
        }
        const bg = (Math.floor(Math.random() * 8) + 1).toString();
        const channel = member.guild.channels.cache.find(ch => ch.id === client.config.channels.greeting);
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage("./Pictures/Logos/wallpaper.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
        "You have full boost now!",
        canvas.width / 2.5,
        canvas.height / 3.5
        );
        ctx.font = applyText(canvas, `${member.user.tag}!`);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
        `${member.user.tag}!`,
        canvas.width / 2.5,
        canvas.height / 1.8
        );
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: "jpg" })
        );
        ctx.drawImage(avatar, 25, 25, 200, 200);
        const attachment = new Discord.MessageAttachment(
            canvas.toBuffer(),
            "welcome-image.png"
        );
        channel.send(`Welcome to the server, ${member}!`, attachment);
        msg.delete();
    }
}