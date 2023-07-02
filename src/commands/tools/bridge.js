const fetch = require('isomorphic-fetch');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const { api } = process.env;
const { roleData } = require('./link');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bridge')
        .setDescription('Lists Player Bridge Stats')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Minecraft Username')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const userResponce = await fetch(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('username')}`);
            const mcId = await userResponce.json();
            if (!mcId || !mcId.id) {
                await interaction.reply('Invalid Minecraft Username!');
                return;
            }

            const mcIdReturn = mcId.id;
            const mcUsername = mcId.name;
            const hypixelRequest = await fetch(`https://api.hypixel.net/player?key=${api}&uuid=${mcIdReturn}`)
            const hypixelStats = await hypixelRequest.json();
            if (!hypixelStats || !hypixelStats.player || !hypixelStats.player.achievements || !hypixelStats.player.achievements.duels_bridge_wins) {
                await interaction.reply('No Bridge stats found for the provided Minecraft username.');
                return;
            }

            const bridgeWins = hypixelStats.player.achievements.duels_bridge_wins;
            const networkExperience = hypixelStats.player.networkExp;
            const networkLevel = Math.floor((Math.sqrt((2 * networkExperience) + 30625) / 50) - 2.5);
            let onesWins = hypixelStats.player.stats.Duels?.bridge_duel_wins;
            let twosWins = hypixelStats.player.stats.Duels?.bridge_doubles_wins;
            let threesWins = hypixelStats.player.stats.Duels?.bridge_threes_wins;
            let teamsWins = hypixelStats.player.stats.Duels?.bridge_four_wins;
            let twosSquaredWins = hypixelStats.player.stats.Duels?.bridge_2v2v2v2_wins;
            let threesSquaredWins = hypixelStats.player.stats.Duels?.bridge_3v3v3v3_wins;
            let threesCTFWins = hypixelStats.player.stats.Duels?.capture_threes_wins;

            for(let i = 0; i < 8; i++){
                if (onesWins === undefined) {
                    onesWins = 0;
                } else if (twosWins === undefined) {
                    twosWins = 0;
                } else if (threesWins === undefined) {
                    threesWins = 0;
                } else if (teamsWins === undefined) {
                    teamsWins = 0;
                } else if (twosSquaredWins === undefined) {
                    twosSquaredWins = 0;
                } else if (threesSquaredWins === undefined) {
                    threesSquaredWins = 0;
                } else if (threesCTFWins === undefined) {
                    threesCTFWins = 0;
                }
            }

            const bridgeRank = getBridgeRank(bridgeWins);
            const roleColor = roleData[bridgeRank][2];
            const guild = interaction.guild;
            const roleId = roleData[bridgeRank][1];
            const member = guild.members.cache.get(interaction.user.id);
            const characterException = '__'
            let characterFix = ''

            if(mcUsername.slice(-2) === characterException){
                characterFix = '__';
            }

            const embedMessage = `Username: **${mcUsername}**${characterFix} 
            ${characterFix} Network Level: **${networkLevel}**
            Overall Bridge Wins: **${bridgeWins}**
            Rank:<@&${roleId}>\n
            __**Gamemode Wins**__
            1v1: **${onesWins}**
            2v2: **${twosWins}**
            3v3: **${threesWins}**
            4v4: **${teamsWins}**
            2v2v2v2: **${twosSquaredWins}**
            3v3v3v3: **${threesSquaredWins}**
            3v3 CTF: **${threesCTFWins}**\n`
            const skinUrl = `https://crafatar.com/renders/body/${mcIdReturn}?overlay=true&scale=10`;
            const embed = new EmbedBuilder()
                .setTitle("Bridge Stats")
                .setDescription(embedMessage)
                .setThumbnail(skinUrl)
                .setColor(roleColor)
                .setFooter({
                    text: "Created by Gali7 for the Bridge Duels Community",
                    iconURL: "https://raw.githubusercontent.com/GaliEXE/Bridge-Duels-Bot/main/ChannelLogo.png",
                })
                .setTimestamp();

            try {
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error('An error occurred while replying to the interaction:', error);
            }

        } catch (error) {
            console.error('An Error Occurred. Please Try Again!', error);
        }
    }
}

function getBridgeRank(bridgeWins) {
    for (let i = 0; i < roleData.length; i++) {
        if (bridgeWins < roleData[i][0]) {
            return Math.max(0, i - 1);
        }
    }
    return roleData.length - 1;
}