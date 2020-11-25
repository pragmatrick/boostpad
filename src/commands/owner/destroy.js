module.exports = {
    aliases: ["turnoff", "to"],
    description: "Turns off the bot.",
    async execute(client, msg, args) {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            console.log("---------------------------------------Every boost was used up--------------------------------------");
            process.exit();
        }
    }
}