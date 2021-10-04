//const message = require('../../../RustPal/events/message');

// const { readdirSync } = require("fs");
module.exports = (client, message) => {
    var colors = require('colors');
    client.handlerEvent = async (events, path) => {
        for (const file of events) {
            const event = require(`../events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
                console.log(`${file} Initialized succesfully.`.green);
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
                console.log(`${file} Initialized succesfully.`.green);
            }
        }
    };
};