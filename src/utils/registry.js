const fs    = require('fs').promises;
const path  = require('path');
const { checkCommandModule, checkProperties } = require('./validate');
const commandStatus = [
    [`*Command*`, `*Status*`, `*Description*`]
];
const eventStatus = [
    [`*Event*`, `*Status*`, ``]
];

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if(checkCommandModule(cmdName, cmdModule)) {
                        if(checkProperties(cmdName, cmdModule)) {
                            let { aliases } = cmdModule;
                            client.commands.set(cmdName, cmdModule);
                            if(aliases.length !== 0)
                                aliases.forEach(alias => client.commands.set(alias, cmdModule));
                            commandStatus.push(
                                [`${cmdName}`, `Success`, `${cmdModule.description}`]
                            )
                        }
                    }
                }
                catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`${cmdName}`, `❌ FAILED`, '⬅']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    eventStatus.push(
                        [`${eventName}`, `Success`, `${eventModule.description}`]
                    )
                }
                catch(err) {
                    console.log(err);
                    eventStatus.push(
                        [`${eventName}`, `❌ FAILED`, ``]
                    );
                }
            }
        }
    }
}

module.exports = { 
    commandStatus,
    eventStatus,
    registerEvents, 
    registerCommands 
};