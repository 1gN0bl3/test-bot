// const fs = require('fs');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const fs = require('fs');
var colors = require('colors');


module.exports = (client) => {
    client.handlerCommand = async (commandFolders, path) => {
        // const config = require("./config/config.json");
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./${path}/${folder}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../slash-commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                console.log(`${file} command Initialized succesfully.`.green);
            }

        }



        const rest = new REST({
            version: '9'
        }).setToken(client.config.TOKEN);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationGuildCommands(client.config.clientId, client.config.guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();




    };
};