const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('this is a template command for me.'),
	async execute(interaction) {
		await interaction.reply('Command triggered!');
	},
};