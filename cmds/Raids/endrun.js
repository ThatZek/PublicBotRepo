const Discord = require("discord.js");
const {arl, officer, security, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const channelNumber = args.shift();
    if(!channelNumber) return client.generateHelp(client, 'endrun', msg);
    const raid = client.raids.get("Raiding " + channelNumber);
    let afkMsg = msg.guild.channels.cache.get('699067426507063326').messages.cache.get(raid.fetchAFK());
    await afkMsg.edit({
        embed: {
            title: `${raid.getType()} Run Ended.`,
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            description: `Thanks for coming!`
        }
    })
    raid.endRun();
    return msg.delete();
}
module.exports.help = {
    name: 'endrun',
    role: arl,
    blRoles: [officer, security],
    wlRoles: [arl, rl],
    syntax: `endrun {number}`
}