console.clear();
const fs = require('fs');

const {
    Client,
    Intents,
    Collection
} = require("discord.js");
const config = require("./config/config.json");
const client = new Client({
    intents: ["GUILDS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS"
    ]
});


/////   Starts the (/) command handlers   /////
client.commands = new Collection();
client.cooldown = new Set();
client.config = config;
const structures = fs.readdirSync("./src/structures").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/slash-commands");
(async () => {
    for (file of structures) {
        require(`./structures/${file}`)(client);
    }
    client.handlerEvent(events, "./src/events");
    client.handlerCommand(commandFolders, "/src/slash-commands");
    client.login(client.config.TOKEN);
})();
/////   End of main handlers   /??


//   I had to make a seprate handler cause im to retarded to get it to work in the events folder...      :(
client.on('messageCreate', (message) => {
    const messageEvent = require('./logging/logger.js');
    messageEvent(client, message);

});