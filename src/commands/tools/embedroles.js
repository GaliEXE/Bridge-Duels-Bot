const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedroles')
        .setDescription('Embed Roles Command (ADMIN ONLY)')
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

        const linkCommand = '`/link`'
        const roleMessageOne = `<@&1032797514883145829> ~ The Owner of The Bridge Duels Community
            <@&1039641057866031165> ~ Manages Staff and Server Workflow
            <@&1032797587788529695> ~ Does Administrative Work on the Sever
            <@&1032797619241635931> ~ Ensures that Server Rules Are Followed By All Members
            <@&1032797657242030250> ~ Mod in Training
            =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n
            <@&1039640176164622447> ~ Top 10 in Lifetime Bridge Wins
            <@&1125549933408292984> ~ Very Special People
            <@&1039639912519061625> ~ Youtubers with 1k or more Subscribers
            <@&1039640054299111534> ~ Twitch Streamers with more than 500 followers
            =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`
        const roleMessageTwo = `<@&1123709890553192499> 100k+ Wins\n
            <@&1032804513482018838> 50k Wins\n
            <@&1032804535216914442> 45k Wins
            <@&1032804385916473384> 40k Wins
            <@&1032804242479652884> 35k Wins
            <@&1032804102566068234> 30k Wins
            <@&1032803767499886712> 25k Wins\n
            <@&1032803624386043935> 22k Wins
            <@&1032803530752393297> 19k Wins
            <@&1032803423982211142> 16k Wins
            <@&1032803288774615050> 13k Wins
            <@&1032803215265255484> 10k Wins\n
            <@&1032803146998763551> 9k Wins
            <@&1032802968417878097> 8k Wins
            <@&1032802979939635260> 7k Wins
            <@&1032802855184236564> 6k Wins
            <@&1032802733167751298> 5k Wins\n
            <@&1032802630621220884> 4.4k Wins
            <@&1032802538539454596> 3.8k Wins
            <@&1032802466024128544> 3.2k Wins
            <@&1032802332251013120> 2.6k Wins
            <@&1032802263858675773> 2k Wins\n
            <@&1032802189686620251> 1.8k Wins
            <@&1032802107344027660> 1.6k Wins
            <@&1032802060422348912> 1.4k Wins
            <@&1032801992998912020> 1.2k Wins
            <@&1032801930675748984> 1k Wins\n
            <@&1032801757044158486> 500 Wins
            <@&1032801656007557180> 250 Wins
            <@&1032801556485128332> 100 Wins
            <@&1032801317908910100> 50 Wins\n
            
            *To Get Your Roles Go To The <#1125181933039665316> channel and run the 
            ${linkCommand} You Will Need To Make Sure Your Discord Account
             is Updated On Hypixel!*
            =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`
        const roleMessageThree = `<@&1032797832433901588> ~ Standard Role For Users
            <@&1039699277657669672> ~ Announcement Notifications
            <@&1039699298650177626> ~ Notification for Server/Staff/Hypixel/
            Minecraft Updates
            <@&1039699306237661324> Notification for Community Media Posts
            <@&1039699224859787314> Notification for Question of The Day Posts\n
            *Note: To Receive Ping Roles Visit the Channels & Roles Tab*
            Roles are subject to change.
            =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`

        const embedOne = new EmbedBuilder()
            .setColor(0x001522)
            .setTitle('Staff & Special Roles')
            .setDescription(roleMessageOne)

        const embedTwo = new EmbedBuilder()
            .setColor(0x001522)
            .setTitle('Bridge Division Roles')
            .setDescription(roleMessageTwo)

        const embedThree = new EmbedBuilder()
            .setColor(0x001522)
            .setTitle('Standard Roles')
            .setDescription(roleMessageThree)
            .setImage('https://i.ytimg.com/vi/yfoF5QX9KzA/maxresdefault.jpg')
            .setFooter({
                text: "Created by Gali7 for the Bridge Duels Community",
                iconURL: "https://raw.githubusercontent.com/GaliEXE/Bridge-Duels-Bot/main/ChannelLogo.png",
            });

        const channelId = interaction.options.getChannel('channel').id;
        const channel = interaction.client.channels.cache.get(channelId);

        if (channel) {
            channel.send({ embeds: [embedOne] });
            channel.send({ embeds: [embedTwo] });
            channel.send({ embeds: [embedThree] });
            await interaction.reply({ content: 'Embeds Successfully Inserted' });
            console.log("embed inserted");
        } else {
            console.log('Specified channel not found');
        }
    }
}