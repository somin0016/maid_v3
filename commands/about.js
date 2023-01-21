const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About Maid.'),
    async execute(interaction) {
        const file = new AttachmentBuilder('./assets/ico/maid_ico02.jpg');
        const exampleEmbed = {
            color: 0x1ABC9C,
            title: 'Hello! မင်္ဂလာပါ! こんにちは! 안녕!',
            url: 'https://youtu.be/pSUydWEqKwE',
            author: {
                name: 'Maid',
                icon_url: 'attachment://maid_ico02.jpg',
            },
            description: `You know what? I'm just going to say it. This server fucking sucks. I don't give a shit if the admins will mute me or if I get banned, but I want to get my message across, because it amazes me how many idiots in this server have a poor taste in quality. This server is like a fucking mental ward, and you all need to seek help. It's always the same damn shit everyday, and nothing new ever comes out of anyone's shriveled brains.`,
            thumbnail: {
                url: 'attachment://maid_ico02.jpg',
            },
            // fields: [
            //     {
            //         name: 'Regular field title',
            //         value: 'Some value here',
            //     },
            //     {
            //         name: '\u200b',
            //         value: '\u200b',
            //         inline: false,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            // ],
            // image: {
            //     url: 'https://i.imgur.com/AfFp7pu.png',
            // }
        };
        await interaction.reply({ embeds: [exampleEmbed], files: [file] });
    }
}