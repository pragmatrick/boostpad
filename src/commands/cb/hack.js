module.exports = {
    aliases: [],
    description: "Pretends to steal a user's boost.",
    async execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.roles.cache.has(client.config.roles.cb)) {
            let tag = msg.mentions.members.first();
            if (!tag) {
                if (args.length != 0) {
                    msg.delete();
                    return;
                }
                const choose = await msg.channel.send("Choosing random...");
                do {
                    tag = await msg.guild.members.cache.random().user;
                } while (tag.bot || tag == msg.author);
                choose.delete();
                wait(500);
            }
            if (tag.id === msg.author.id) {
                return msg.channel.send(`${msg.member} I can't hack you, tell me someone else to hack`);
            }
            if (tag.id === client.config.users.grafpatron) {
                await msg.react("\:regional_indicator_s:");
                await msg.react("\:regional_indicator_i:");
                await msg.react("\:regional_indicator_k:");
                await msg.react("\:regional_indicator_e:");
                return;
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