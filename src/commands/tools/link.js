const fetch = require('isomorphic-fetch');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const { api } = process.env;

const roleData = [
  [0, '1124394044873785424', 5067615],      // No Rank
  [50, '1032801317908910100', 5592405],     // Rookie
  [100, '1032801556485128332', 16777215],   // Iron
  [250, '1032801656007557180', 16755200],   // Gold
  [500, '1032801757044158486', 43690],      // Diamond
  [1000, '1032801930675748984', 43520],     // Master
  [1200, '1032801992998912020', 43520],     // Master II
  [1400, '1032802060422348912', 43520],     // Master III
  [1600, '1032802107344027660', 43520],     // Master IV
  [1800, '1032802189686620251', 43520],     // Master V
  [2000, '1032802263858675773', 11141120],  // Legend
  [2600, '1032802332251013120', 11141120],  // Legend II
  [3200, '1032802466024128544', 11141120],  // Legend III
  [3800, '1032802538539454596', 11141120],  // Legend IV
  [4400, '1032802630621220884', 11141120],  // Legend V
  [5000, '1032802733167751298', 16777045],  // Grandmaster
  [6000, '1032802855184236564', 16777045],  // Grandmaster II
  [7000, '1032802979939635260', 16777045],  // Grandmaster III
  [8000, '1032802968417878097', 16777045],  // Grandmaster IV
  [9000, '1032803146998763551', 16777045],  // Grandmaster V
  [10000, '1032803215265255484', 11141290], // Godlike
  [13000, '1032803288774615050', 11141290], // Godlike II
  [16000, '1032803423982211142', 11141290], // Godlike III
  [29000, '1032803530752393297', 11141290], // Godlike IV
  [22000, '1032803624386043935', 11141290], // Godlike V
  [25000, '1032803767499886712', 8454143],  // Celestial
  [30000, '1032804102566068234', 8454143],  // Celestial II
  [35000, '1032804242479652884', 8454143],  // Celestial III
  [40000, '1032804385916473384', 8454143],  // Celestial IV
  [45000, '1032804535216914442', 8454143],  // Celestial V
  [500000, '1032804513482018838', 8454016], // Divine
  [100000, '1123709890553192499', 3090682], // Ascended
];


module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Gives a role based on Bridge Wins')
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

      //Remove Below to Disable Discord Auth!
      const hypixelDiscord = hypixelStats.player.socialMedia?.links?.DISCORD;
      const discordUsername = interaction.user.username;
      if (!hypixelDiscord || hypixelDiscord !== discordUsername) {
        await interaction.reply('Your Discord account is not linked to your Hypixel account, or you have not updated your discord username on Hypixel!');
        return;
      }
      //Remove Above to Disable Discord Auth!

      const bridgeWins = hypixelStats.player.achievements.duels_bridge_wins;
      const bridgeRank = getBridgeRank(bridgeWins);
      const roleColor = roleData[bridgeRank][2];
      const guild = interaction.guild;
      const roleId = roleData[bridgeRank][1];
      const member = guild.members.cache.get(interaction.user.id);
      const roleIdsToRemove = roleData.map(data => data[1]);
      removeRoles(guild, roleIdsToRemove, member);

      if (roleId !== '1124394044873785424') {
        await member.roles.add(roleId);
      } else {
        console.log('You Get No Roles Idiot!')
      }

      let roleNotif = '';
      if (roleId !== '1124394044873785424') {
        roleNotif = 'Roles May Take A Couple of Seconds to Apply!'
      } else {
        roleNotif = 'No Roles Applied!'
      }

      const embedMessage = `Username: **${mcUsername}**\nBridge Wins: **${bridgeWins}**\nRank: <@&${roleId}>\n\n**__${roleNotif}__**`;
      const skinUrl = `https://crafatar.com/renders/body/${mcIdReturn}?overlay=true&scale=10`;
      const success = new EmbedBuilder()
        .setTitle("Linking Roles!")
        .setDescription(embedMessage)
        .setThumbnail(skinUrl)
        .setColor(roleColor)
        .setFooter({
          text: "Created by Gali7 for the Bridge Duels Community",
          iconURL: "https://raw.githubusercontent.com/GaliEXE/Bridge-Duels-Bot/main/ChannelLogo.png",
        })
        .setTimestamp();

      try {
        await interaction.reply({ embeds: [success] });
      } catch (error) {
        console.error('An error occurred while replying to the interaction:', error);
      }

    } catch (error) {
      console.error('An Error Occurred. Please Try Again!', error);
    }
  },
  roleData,
};

async function removeRoles(guild, roleIdsToRemove, member) {
  for (const roleId of roleIdsToRemove) {
    const roleToRemove = guild.roles.cache.get(roleId);
    if (roleToRemove) {
      if (member.roles.cache.has(roleToRemove.id)) {
        await member.roles.remove(roleToRemove);
        console.log(`Role ${roleToRemove.name} removed from user ${member.user.username}`);
      } else {
      }
    } else {
      console.error(`Role ${roleId} not found.`);
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
