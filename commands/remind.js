const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Set reminder.')
        .addNumberOption(option =>
            option
                .setName('minute')
                .setDescription('How many minutes?')),
    async execute(interaction) {
        const time = interaction.options.getNumber('minute');
        console.log(time);
        if (!time) {
            await interaction.reply(`Set time first!`); 
            return;
        } else {
            try {
                await delay(option);
            } catch (error) {
                const file = new AttachmentBuilder('./assets/data/itzy_ryujin_err.gif');
                const exampleEmbed = {
                    color: 0xED4245,
                    title: 'Error!',
                    description: `Still building. \nError executing ${interaction.commandName}. \nError: TimeoutOverflowWarning: ${time*1056929514296463500} does not fit into a 32-bit signed integer.`,
                    image: {
                        url: 'attachment://itzy_ryujin_err.gif',
                    },
                };
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
                await interaction.reply({ embeds: [exampleEmbed], files: [file], ephemeral: true });
            }
        }
    }
}