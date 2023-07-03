const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedfaq')
        .setDescription('Temporary Embed Command')
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The Channel to Send the Embed')
            .setRequired(true)),
    async execute(interaction) {
        // Check if the user has admin permissions
        const guild = interaction.guild;
        const member = interaction.member;
        if (!member.roles.cache.has('1039641057866031165') && !member.roles.cache.has('1032797514883145829')) {
            await interaction.reply({ content: 'You do not have permission to run this command.', ephemeral: true });
            console.log('Unauthorized Command Usage!');
            return;
        }

        const linkCommand = '`/link`';
        const faqMessage = `**Q: How do I get my Bridge Role?**
        **A:** Go the <#1125181933039665316> channel and do the ${linkCommand}\ command, if you have a role that is applicable to you, you will receive it.
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n
        **Q: How do I get QOTD and other Ping Roles?**
        **A:** Go the the Channels & Roles Page and click the roles you want?
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n
        **Q: How do I apply for a staff position?**
        **A:** Applications are available in <#1032800031499112550>.
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n
        **Q: How do I get the Top 10 Role**
        **A:** There will be another application in <#1032800031499112550>.
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n
        **Q: How does the Bridge Division System Work?**
        **A:** The division system has a set of milestones you have to reach to get every
        rank. The win milestones required for each rank are listed in <#1032799190062989402>.
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n
        **Q: What do I get from Nitro Boosting**
        **A:** The Nitro Boosting Perks Include:
        -Special Discord Nitro Boost Role
        -Custom Name Color
        -Access <#1032799628317429861> Channel
        -More Perks May Come Soon!
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`;

        const embed = new EmbedBuilder()
            .setColor(0x001522)
            .setTitle('FAQ')
            .setDescription(faqMessage)
            .setImage('https://i.ytimg.com/vi/yfoF5QX9KzA/maxresdefault.jpg')
            .setFooter({
                text: "Created by Gali7 for the Bridge Duels Community",
                iconURL: "https://raw.githubusercontent.com/GaliEXE/Bridge-Duels-Bot/main/ChannelLogo.png",
            });

        const channelId = interaction.options.getChannel('channel').id;
        const channel = interaction.client.channels.cache.get(channelId);

        if (channel) {
            channel.send({ embeds: [embed] });
            await interaction.reply({ content: 'Embed Successfully Inserted'});
        } else {
            console.log('Specified channel not found');
        }
    }
};
