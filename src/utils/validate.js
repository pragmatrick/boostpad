// Checking Events
module.exports.checkEventModule = (eventName, eventModule) => {
    if (!eventModule.hasOwnProperty('run')) {
        throw new Error(`${eventName} event module does not have property 'run'.`);
    }
    if (!eventModule.hasOwnProperty('description')) {
        throw new Error(`${eventName} event module does not have property 'description'.`);
    }
    if (!eventModule.hasOwnProperty('name')) {
        throw new Error(`${eventName} event module does not have property 'name'.`);
    }
    return true;
}
module.exports.checkEventProperties = (eventName, eventModule) => {
    if (typeof eventModule.run !== 'function') {
        throw new Error(`${eventName} event: run is not a function.`);
    }
    if (typeof eventModule.description !== 'string') {
        throw new Error(`${eventName} event: description is not a string.`);
    }
    if (typeof eventModule.name !== 'string') {
        throw new Error(`${eventName} event: name is not a string.`);
    }
    return true;
}

// Checking Commands
module.exports.checkCommandModule = (cmdName, cmdModule) => {
    if (!cmdModule.hasOwnProperty('execute')) {
        throw new Error(`${cmdName} command module does not have property 'execute'.`);
    }
    if (!cmdModule.hasOwnProperty('description')) {
        throw new Error(`${cmdName} command module does not have property 'description'.`);
    }
    if (!cmdModule.hasOwnProperty('names')) {
        throw new Error(`${cmdName} command module does not have property 'names'.`);
    }
    return true;
}

module.exports.checkCommandProperties = (cmdName, cmdModule) => {
    if (typeof cmdModule.execute !== 'function') {
        throw new Error(`${cmdName} command: execute is not a function.`);
    }
    if (typeof cmdModule.description !== 'string') {
        throw new Error(`${cmdName} command: description is not a string.`);
    }
    if (!Array.isArray(cmdModule.names)) {
        throw new Error(`${cmdName} command: names is not an Array.`);
    } else {
        if (cmdModule.names.length == 0) {
            throw new Error(`${cmdName} command: names-Array is empty.`);
        } else {
            for (const name of cmdModule.names) {
                if (!/[a-z]/.test(name)) {
                    throw new Error(`${cmdName} command: names-Array contains entries that doesn't follow on /[a-z]/.`);
                }
            }
        }
    }
    return true;
}