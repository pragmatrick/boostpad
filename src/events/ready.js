const { createStream }               = require("table");
const tableConfig                    = require("../utils/tableConfig");
const { commandStatus, eventStatus } = require("../utils/registry");


module.exports = async (client) => {
        console.log("----------------------------------------Boostpad was grabbed----------------------------------------");

        await client.guilds.cache.get(client.config.server_id).channels.cache.get(client.config.channels.help).messages.fetch();

        client.user.setActivity(client.config.activity.object, {type: client.config.activity.doing}).catch(console.error);

        await loadTable(commandStatus, 50);
        console.log("\n");
        await loadTable(eventStatus, 50);
        console.log("\n");
}

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval); 
    })
}