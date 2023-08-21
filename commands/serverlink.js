const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverlink')
        .setDescription('Gives you server link.'),
    async execute(interaction) {
        const file = new AttachmentBuilder('./assets/ico/maid_ico02.jpg');
        const exampleEmbed = {
            color: 0x1ABC9C,
            title: 'Hello! မင်္ဂလာပါ! こんにちは! 안녕!',
            url: 'https://discord.gg/7x6Dy5b5',
            author: {
                name: 'Maid',
                icon_url: 'attachment://maid_ico02.jpg',
            },
            description: `Server Link: https://discord.gg/7x6Dy5b5`,
            thumbnail: {
                url: 'attachment://maid_ico02.jpg',
            },
        };
        await interaction.reply({ embeds: [exampleEmbed], files: [file] });
    }
}