module.exports = async (client, message) => {
    try {
        if(message.author.id == client.user.id)return;
        console.log(`${message.author.tag}: ${message.content}`);

    } catch (exception) {
        console.log(exception);

    };
};