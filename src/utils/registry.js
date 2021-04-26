const fs    = require('fs').promises;
const path  = require('path');
const { checkCommandModule, checkCommandProperties, checkEventModule, checkEventProperties } = require('./validate');
const commandStatus = [
    [`→ Command`, `Aliases`, `Description`]
];
const eventStatus = [
    [`→ Event`, `←`, `Description`]
];

async function registerCommands(client, dir) {
    const files = await fs.readdir(path.join(__dirname, dir));
    for (const file of files) {
        const stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) {
            // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        } else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                try {
                    const cmdModule = require(path.join(__dirname, dir, file));
                    if (checkCommandModule(file, cmdModule)) {
                        if (checkCommandProperties(file, cmdModule)) {
                            for (const name of cmdModule.names) {
                                client.commands.set(name, cmdModule);
                            }
                            commandStatus.push(
                                [`+ ${file}`, `${cmdModule.names.join(", ")}`, `${cmdModule.description}`]
                            )
                        }
                    }
                } catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`ERR: ${file}`, `←`, '←']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    const files = await fs.readdir(path.join(__dirname, dir));
    for (const file of files) {
        const stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()){
            // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        } else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                try {
                    const eventModule = require(path.join(__dirname, dir, file));
                    if (checkEventModule(file, eventModule)) {
                        if (checkEventProperties(file, eventModule)) {
                            client.on(eventModule.name, (...args) => eventModule.run(client, ...args));
                            eventStatus.push(
                                [`+ ${file}`, `←`, `${eventModule.description}`]
                            )
                        }
                    }
                } catch(err) {
                    console.log(err);
                    eventStatus.push(
                        [`ERR: ${file}`, `←`, `←`]
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