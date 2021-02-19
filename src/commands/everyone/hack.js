module.exports = {
    aliases: [],
    permissions: [],
    description: "Pretends to steal a user's boost.",
    async execute(client, msg, args) {
        if (Object.values(client.config.admins).includes((await msg.mentions.members.first()).id)) {
            try {
                await msg.react(client.letterEmojis["s"]);
                await msg.react(client.letterEmojis["i"]);
                await msg.react(client.letterEmojis["k"]);
                await msg.react(client.letterEmojis["e"]);
            } catch(e) {}
            return;
        }
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(client.config.roles.cb)) {
            let tag = msg.mentions.members.first();
            if (!tag) {
                if (args.length != 0) {
                    msg.delete();
                    return;
                }
                const choose = await msg.channel.send("Choosing random...");
                do {
                    tag = await msg.guild.members.cache.random();
                } while (tag.user.bot || tag === msg.member);
                choose.delete();
                wait(500);
            }
            if (tag.id === msg.author.id) {
                return msg.channel.send(`${msg.member} I can't hack you, tell me someone else to hack`);
            }
            const a = await msg.channel.send(`Hacking ${tag}!`);
            wait(1000);
            let b, c = a;
            b = await c.edit(`Getting ${tag}'s boost.`);
            c = await b.edit(`Getting ${tag}'s boost..`);
            b = await c.edit(`Getting ${tag}'s boost...`);
            wait(300);
            c = await b.edit(`Done Getting ${tag}'s boost!`);
            wait(1000);
            const d = await c.edit(`Selling data to Psyonix...`);
            wait(500);
            let random = Math.floor(Math.random() * 500 ) + 500;
            const e = await d.edit(`${tag}'s boost sold for ${random}xcredits to Psyonix.`);
        } else {
            msg.react("🤨");
        }
    }
}

function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}