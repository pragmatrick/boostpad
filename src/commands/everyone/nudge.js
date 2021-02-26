module.exports = {
    names:       ["nudge", "stupse"],
    permissions: [],
    description: "Nudges a user.",
    execute(client, msg, args) { 
        msg.delete();
    }
}