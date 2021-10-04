const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Returns requested info.')
		.addSubcommand(subcommand =>
			subcommand
			.setName("user")
			.setDescription("Returns user info of user mentioned.")
			.addUserOption(option => option.setName("target").setDescription("The user you wish to see the info for.")))
		.addSubcommand(subcommand =>
			subcommand
			.setName("server")
			.setDescription("Returns server stats. (Depricated and less fancy~)")),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user") {
			const user = interaction.options.getUser("target");
			if (user) {
				const myava = "https://avatars.githubusercontent.com/u/35511603?v=4"
				const userEmbed = new MessageEmbed()
					.setTitle(`Steam Lookup`)
					.setDescription(`${user.tag}`)
					.setURL(`https://www.battlemetrics.com/rcon/players?filter%5Bsearch%5D=${user.id}`)
					.setAuthor("1gN0ble", myava,"https://github.com/1gN0bl3")
					.setThumbnail(user.displayAvatarURL())
					.addFields(
						{name: `Userid`, value: `${user.id}`, inline: true},
						{name: `Creation Date`, value: `${user.createdAt}}`, inline: true}
					)
					.setTimestamp()
					.setFooter(client.user.tag, client.user.displayAvatarURL());
				await interaction.reply({ embeds: [userEmbed], ephemeral:true});
			} else {
				const myava = "https://avatars.githubusercontent.com/u/35511603?v=4"
				const noUserEmbed = new MessageEmbed()
					.setTitle(`numberlookup Lookup`)
					.setDescription(`${interaction.user.tag}`)
					.setURL(`google.com/${interaction.user.id}`)
					.setAuthor("1gN0ble", myava,"https://github.com/1gN0bl3")
					.setThumbnail(interaction.user.displayAvatarURL())
					.addFields(
						{name: `Userid`, value: `${interaction.user.id}`, inline: true},
						{name: `Creation Date`, value: `${interaction.user.createdAt}}`, inline: true}
					)
					.setTimestamp()
					.setFooter(client.user.tag, client.user.displayAvatarURL());
				await interaction.reply({ embeds: [noUserEmbed],ephemeral:true,});
			}
		} else if (interaction.options.getSubcommand() === "server"){
			await interaction.reply({content:`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`,ephemeral:true,});
		}
	},
};
