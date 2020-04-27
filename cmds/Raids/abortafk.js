const Discord = require("discord.js");
const {arl, officer, security, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const raid = client.raids.find(raid => raid.raidData.status == 'afk');
    if(!raid) return msg.reply('There is no AFK in progress!');
    let afkMsg = msg.guild.channels.cache.get('699067426507063326').messages.cache.get(raid.raidData.afkMsg);
    await afkMsg.edit({
        embed: {
            title: `${raid.getType()} AFK Check Aborted`,
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            description: `This run was aborted :(`
        }
    });
    await raid.endAFK();
    await raid.endRun();
    return msg.delete();
}
module.exports.help = {
    name: 'abortafk',
    role: arl,
    blRoles: [officer, security],
    wlRoles: [arl, rl],
    syntax: `abortafk`
}