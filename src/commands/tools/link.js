const fetch = require('isomorphic-fetch');
const { SlashCommandBuilder } = require('discord.js');

const apiKey = '390b6fdf-3432-4bb3-a80a-18d82bd6bfd2';
const roleList = [
    //[50, '1032801317908910100'], // Rookie
    '1032801317908910100', // Rookie
    '1032801556485128332', // Iron
    '1032801656007557180', // Gold
    '1032801757044158486', // Diamond
    '1032801930675748984', // Master
    '1032801992998912020', // Master II
    '1032802060422348912', // Master III
    '1032802107344027660', // Master IV
    '1032802189686620251', // Master V
    '1032802263858675773', // Legend
    '1032802332251013120', // Legend II
    '1032802466024128544', // Legend III
    '1032802538539454596', // Legend IV
    '1032802630621220884', // Legend V
    '1032802733167751298', // Grandmaster
    '1032802855184236564', // Grandmaster II
    '1032802979939635260', // Grandmaster III
    '1032802968417878097', // Grandmaster IV
    '1032803146998763551', // Grandmaster V
    '1032803215265255484', // Godlike
    '1032803288774615050', // Godlike II
    '1032803423982211142', // Godlike III
    '1032803530752393297', // Godlike IV
    '1032803624386043935', // Godlike V
    '1032803767499886712', // Celestial
    '1032804102566068234', // Celestial II
    '1032804242479652884', // Celestial III
    '1032804385916473384', // Celestial IV
    '1032804535216914442', // Celestial V
    '1032804513482018838', // Divine
    '1123709890553192499', // Ascended
    '1124394044873785424', // None
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
      const mcUUIDResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('username')}`);
      const mcUUIDData = await mcUUIDResponse.json();
      if (!mcUUIDData || !mcUUIDData.id) {
        await interaction.reply('Invalid Minecraft username.');
        return;
      }
      const mcUUID = mcUUIDData.id;
      const userDiscResponse = await fetch(`https://api.hypixel.net/player?key=${apiKey}&uuid=${mcUUID}`);
      const userDiscData = await userDiscResponse.json();
      if (!userDiscData || !userDiscData.player || !userDiscData.player.achievements || !userDiscData.player.achievements.duels_bridge_wins) {
        await interaction.reply('No Bridge stats found for the provided Minecraft username.');
        return;
      }

      const discordAccount = userDiscData.player.socialMedia?.links?.DISCORD;
      const userDiscordId = interaction.user.username;
      if (!discordAccount || discordAccount !== userDiscordId) {
          await interaction.reply('Your Discord account is not linked to your Hypixel account, or you have not updated your discord username on Hypixel!');
          return;
      }


      const bridgeWins = userDiscData.player.achievements.duels_bridge_wins;

      let x;
      let roleColor;
      /*foreach( threshold, id in roleList )
      {
        if(bridgeWins > threshold) return id;
      }
      return roleList[-1]*/

      if (bridgeWins >= 50 && bridgeWins <= 99) {
        // rookie
        x = 0;
        roleColor = 5592405;
    } else if (bridgeWins >= 100 && bridgeWins <= 249) {
        // iron
        x = 1;
        roleColor = 16777215;
    } else if (bridgeWins >= 250 && bridgeWins <= 499) {
        // gold
        x = 2;
        roleColor = 16755200;
    } else if (bridgeWins >= 500 && bridgeWins <= 999) {
        // diamond
        x = 3;
        roleColor = 43690;
    } else if (bridgeWins >= 1000 && bridgeWins <= 1199) {
        // master
        x = 4;
        roleColor = 43520;
    } else if (bridgeWins >= 1200 && bridgeWins <= 1399) {
        // master II
        x = 5;
        roleColor = 43520;
    } else if (bridgeWins >= 1400 && bridgeWins <= 1599) {
        // master III
        x = 6;
        roleColor = 43520;
    } else if (bridgeWins >= 1600 && bridgeWins <= 1799) {
        // master IV
        x = 7;
        roleColor = 43520;
    } else if (bridgeWins >= 1800 && bridgeWins <= 1999) {
        // master V
        x = 8;
        roleColor = 43520;
    } else if (bridgeWins >= 2000 && bridgeWins <= 2599) {
        // legend
        x = 9;
        roleColor = 11141120;
    } else if (bridgeWins >= 2600 && bridgeWins <= 3199) {
        // legend II
        x = 10;
        roleColor = 11141120;
    } else if (bridgeWins >= 3200 && bridgeWins <= 3799) {
        // legend III
        x = 11;
        roleColor = 11141120;
    } else if (bridgeWins >= 3800 && bridgeWins <= 4399) {
        // legend IV
        x = 12;
        roleColor = 11141120;
    } else if (bridgeWins >= 4400 && bridgeWins <= 5000) {
        // legend V
        x = 13;
        roleColor = 11141120;
    } else if (bridgeWins >= 5000 && bridgeWins <= 5999) {
        // grandmaster
        x = 14;
        roleColor = 16777045;
    } else if (bridgeWins >= 6000 && bridgeWins <= 6999) {
        // grandmaster II
        x = 15;
        roleColor = 16777045;
    } else if (bridgeWins >= 7000 && bridgeWins <= 7999) {
        // grandmaster III
        x = 16;
        roleColor = 16777045;
    } else if (bridgeWins >= 8000 && bridgeWins <= 8999) {
        // grandmaster IV
        x = 17;
        roleColor = 16777045;
    } else if (bridgeWins >= 9000 && bridgeWins <= 9999) {
        // grandmaster V
        x = 18;
        roleColor = 16777045;
    } else if (bridgeWins >= 10000 && bridgeWins <= 12999) {
        // godlike
        x = 19;
        roleColor = 11141290;
    } else if (bridgeWins >= 13000 && bridgeWins <= 15999) {
        // godlike II
        x = 20;
        roleColor = 11141290;
    } else if (bridgeWins >= 16000 && bridgeWins <= 18999) {
        // godlike III
        x = 21;
        roleColor = 11141290;
    } else if (bridgeWins >= 19000 && bridgeWins <= 21999) {
        // godlike IV
        x = 22;
        roleColor = 11141290;
    } else if (bridgeWins >= 22000 && bridgeWins <= 24999) {
        // godlike V
        x = 23;
        roleColor = 11141290;
    } else if (bridgeWins >= 25000 && bridgeWins <= 29999) {
        // celestial
        x = 24;
        roleColor = 5636095;
    } else if (bridgeWins >= 30000 && bridgeWins <= 34999) {
        // celestial II
        x = 25;
        roleColor = 5636095;
    } else if (bridgeWins >= 35000 && bridgeWins <= 39999) {
        // celestial III
        x = 26;
        roleColor = 5636095;
    } else if (bridgeWins >= 40000 && bridgeWins <= 44999) {
        // celestial IV
        x = 27;
        roleColor = 5636095;
    } else if (bridgeWins >= 45000 && bridgeWins <= 49999) {
        // celestial V
        x = 28;
        roleColor = 5636095;
    } else if (bridgeWins >= 50000 && bridgeWins <= 99999) {
        //divine
        x = 29;
        roleColor = 16733695;
    } else if (bridgeWins >= 100000) {
        //ascended
        x = 30;
        roleColor = 16733525;
    } else {
        //none
        x = 31;
        roleColor = 5067615;
    }
    
    const roleId = roleList[x];

      // Fetch Minecraft skin and create the embed
      const skinUrl = `https://crafatar.com/renders/body/${mcUUID}?overlay=true&scale=10`;
      const embed = {
        title: 'Linking Roles!',
        description: `Username: ${interaction.options.getString('username')}\nBridge Wins: ${bridgeWins}\nRank: <@&${roleId}> \nRoles may take a couple of seconds to appear!`,
        thumbnail: { url: skinUrl },
        fields: [],
        color: roleColor,
      };

      // Send the embed
      try {
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error('An error occurred while replying to the interaction:', error);
      }

      applyRoles(interaction, bridgeWins); // Pass the interaction and bridgeWins to applyRoles function
    } catch (error) {
      console.error('An error occurred while retrieving data from the Hypixel API:', error);
      await interaction.reply('An error occurred while retrieving data from the Hypixel API. Please try again later.');
    }
  },
};
async function applyRoles(interaction, bridgeWins) {
    try {
        const guild = interaction.guild;
        const member = guild.members.cache.get(interaction.user.id);
        // Remove existing roles
        for (const roleId of roleList) {
            const roleToRemove = guild.roles.cache.get(roleId);
            if (roleToRemove) {
                if (member.roles.cache.has(roleToRemove.id)) {
                    await member.roles.remove(roleToRemove);
                    console.log(`Role ${roleToRemove.name} removed from user ${member.user.username}`);
                } else {
                    console.log(`Role ${roleToRemove.name} is not assigned to user ${member.user.username}`);
                }
            } else {
                console.error(`Role ${roleId} not found.`);
            }
        }

        // Assign new role based on the number of wins
            if (bridgeWins >= 50 && bridgeWins <= 99) { //rookie
                x = 0;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 100 && bridgeWins <= 249) { //iron
                x = 1;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 250 && bridgeWins <= 499) { //gold
                x = 2;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 500 && bridgeWins <= 999) { //diamond
                x = 3;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 1000 && bridgeWins <= 1199) { //master
                x = 4;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 1200 && bridgeWins <= 1399) { //master II
                x = 5;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 1400 && bridgeWins <= 1599) { //master III
                x = 6;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 1600 && bridgeWins <= 1799) { //master IV
                x = 7;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 1800 && bridgeWins <= 1999) { //master V
                x = 8;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 2000 && bridgeWins <= 2599) { //legend
                x = 9;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 2600 && bridgeWins <= 3199) { //legend II
                x = 10;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 3200 && bridgeWins <= 3799) { //legend III
                x = 11;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 3800 && bridgeWins <= 4399) { //legend IV
                x = 12;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 4400 && bridgeWins <= 5000) { //legend V
                x = 13;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 5000 && bridgeWins <= 5999) { //grandmaster
                x = 14;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 6000 && bridgeWins <= 6999) { //grandmaster II
                x = 15;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 7000 && bridgeWins <= 7999) { //grandmaster III
                x = 16;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 8000 && bridgeWins <= 8999) { //grandmaster IV
                x = 17;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 9000 && bridgeWins <= 9999) { //grandmaster V
                x = 18;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 10000 && bridgeWins <= 12999) { //godlike
                x = 19;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 13000 && bridgeWins <= 15999) { //godlike II
                x = 20;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 16000 && bridgeWins <= 18999) { //godlike III
                x = 21;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 19000 && bridgeWins <= 21999) { //godlike IV
                x = 22;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 22000 && bridgeWins <= 24999) { //godlike V
                x = 23;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 25000 && bridgeWins <= 29999) { //celestial
                x = 24;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 30000 && bridgeWins <= 34999) { //celestial II
                x = 25;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 35000 && bridgeWins <= 39999) { //celestial III
                x = 26;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 40000 && bridgeWins <= 44999) { //celestial IV
                x = 27;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 45000 && bridgeWins <= 49999) { //celestial V
                x = 28;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 50000 && bridgeWins <= 99999) { //divine
                x = 29;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            } if (bridgeWins >= 100000) { //ascended
                x = 30;
                const roleId = roleList[x];
                const role = guild.roles.cache.get(roleId);
                if (role && member) {
                    await member.roles.add(role);
                    console.log(`Role ${role.name} added to user ${member.user.username}`);
                } else {
                    console.error(`Role ${roleId} or member ${interaction.user.id} not found.`);
                }
            }

        console.log(`Roles assigned based on Bridge wins for user ${member.user.username}`);
    } catch (error) {
        console.error('An error occurred while applying roles:', error);
    }
}