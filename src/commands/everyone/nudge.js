module.exports = {
    aliases:  ["stupse"],
    permissions: [],
    description: "Nudges a user.",
    execute(client, msg, args) { 
        msg.delete();
    }
}