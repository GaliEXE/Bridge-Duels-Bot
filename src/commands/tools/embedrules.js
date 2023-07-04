const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('embedrules')
        .setDescription('Embed Rules Command (ADMIN ONLY')
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The Channel To Send The Embed')
            .setRequired(true)),
    async execute(interaction) {
        const guild = interaction.guild;
        const member = interaction.member;
        if (!member.roles.cache.has('1039641057866031165') && !member.roles.cache.has('1032797514883145829')) {
            await interaction.reply({ content: 'You do not have permission to run this command.', ephemeral: true });
            console.log('Unauthorized Command Usage!');
            return;
        }

        const rulesMessage = `**1.)** Follow Discord's Terms of Service and Community Guidelines:
        https://discord.com/terms
        https://discord.com/guidelines\n
        **2.)** Treat everyone with respect, if you wouldn't like people doing it to you then don't do it to them.\n
        **3.)** NO NSFW content on the server in any form. \n
        **4.)** Don't post personal or private information about yourself or others.\n
        **5.)** Don't spam things in any channel.\n
        **6.)** Use the correct channel for the correct occasion don't be advertising in general.\n
        **7.)** Respect the staff members and don't spam ping them or anyone else on the server.\n
        **Note:** Punishments for violating any of these rules are to the discretion of the staff. So don't break the rules and you won't have to find out what those punishments might be.
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`

        const rulesembed = new EmbedBuilder()
            .setColor(0x001522)
            .setTitle("Rules")
            .setDescription(rulesMessage)
            .setImage('https://i.ytimg.com/vi/yfoF5QX9KzA/maxresdefault.jpg')
            .setFooter({
                text: "Created by Gali7 for the Bridge Duels Community",
                iconURL: "https://raw.githubusercontent.com/GaliEXE/Bridge-Duels-Bot/main/ChannelLogo.png",
            });

            const channelId = interaction.options.getChannel('channel').id;
            const channel = interaction.client.channels.cache.get(channelId);

            if (channel) {
                channel.send({ embeds: [rulesembed] });
                await interaction.reply({ content: 'Embeds Successfully Inserted' });
                console.log("embed inserted");
            } else {
                console.log('Specified channel not found');
            }
    }
}