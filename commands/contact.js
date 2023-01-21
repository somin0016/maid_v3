const { SlashCommandBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
// import { homies } from './data/data.js';
const homies = require('../lib/data').homies;

module.exports ={
    data: new SlashCommandBuilder()
        .setName('contact')
        .setDescription('Gives you homies contact info.')
        .addUserOption(option =>
            option
                .setName('homie')
                .setDescription('Select someone from server.')
                .setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser('homie');
        console.table(homies)

        if (!user) {
            await interaction.reply(`Choose one user first.`);
        } else {
            console.log('User ID ' + user.id);

            var selectHomie = homies.filter((h) => h.userID === user.id);

            if (selectHomie.length > 0) {
                console.log(`User exists!`);
                console.log(selectHomie);
                console.log(`User exists with ${selectHomie[0].userPhone}`);
                console.log(selectHomie[0].userPhone);

                const copy_btn = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('copy_btn')
                            .setLabel('Copy!')
                            .setStyle(ButtonStyle.Primary),
                    );
                
                const copied_btn = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('copied_btn')
                            .setLabel('Copied!')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),
                    );

                await interaction.reply({ content: `${user.username}'s number is **${selectHomie[0].userPhone}**.`, components: [copy_btn] });
                
                const filter = i => i.customId === 'copy_btn';
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
                collector.on('collect', async i => {
                    await i.update({ content: `${user.username}'s number is **${selectHomie[0].userPhone}**.`, components: [copied_btn] });
                });
                collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            } else {
                await interaction.reply(`I don't know ${user.username}'s number. Do tell me if you know.`);
            }
        }
    }
}