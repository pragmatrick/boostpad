module.exports = {
    names:       ["hack"],
    permissions: [],
    description: "Pretends to steal a user's boost.",
    async execute(client, msg, args) {
        let tag = await msg.mentions.members.first();
        if ( !((tag && args.length == 1) || args.length == 0) ) {
            await msg.delete();
            return;
        }

        if (args.length == 0) {
            const chooseMsg = await msg.channel.send("Choosing random...");
            do {
                tag = await msg.guild.members.cache.random();
            } while (Object.values(client.config.admins).includes(tag.id) || tag === msg.member);
            chooseMsg.delete();
            wait(500);
        } else if (tag.id === msg.author.id) {
            await msg.channel.send(`${msg.member} I can't hack you, tell me someone else to hack`);
            return;
        } else if (Object.values(client.config.admins).includes(tag.id)) {
            try {
                await msg.react(client.letterEmojis["s"]);
                await msg.react(client.letterEmojis["i"]);
                await msg.react(client.letterEmojis["k"]);
                await msg.react(client.letterEmojis["e"]);
            } catch(e) {}
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

function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}