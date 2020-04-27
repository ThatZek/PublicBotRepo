const Discord = require("discord.js");
const {arl, officer, security, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const raid = client.raids.find(raid => raid.fetchStatus() == 'afk');
    if(!raid) return msg.reply('There is no AFK in progress!');
    const keys = raid.getKeys();
    let keyMessage = [];
    for(i = 0; i < keys.length; i++) {
        let member = msg.guild.members.cache.get(keys[i]);
        if(member) {
        keyMessage.push(member.displayName);
        }
    }
    const vials = raid.getVials();
    let vialMessage = [];
    for(i = 0; i < vials.length; i++) {
        let member = msg.guild.members.cache.get(vials[i]);
        if(member) {
        vialMessage.push(member.displayName);
        }
    }
    const boosters = raid.getBoosters();
    let boosterMessage = [];
    for(i = 0; i < boosters.length; i++) {
        let member = msg.guild.members.cache.get(boosters[i]);
        if(member) {
        boosterMessage.push(member.displayName);
        }
    }
    const raiderNumber = raid.getRaiders().length;
    msg.author.send({
        embed: {
            title: `Raid Info`,
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            description: `Information on the AFK you ended.`,
            fields: [
                {
                    name: 'Keys',
                    value: keyMessage.join('\n') || 'None',
                },
                {
                    name: 'Vials',
                    value: vialMessage.join('\n') || 'None',
                },
                {
                    name: 'Boosters | Rls',
                    value: boosterMessage.join('\n') || 'None',
                },
                {
                    name: 'Raider Count',
                    value: raiderNumber,
                },
            ]
        }
    });
    let afkMsg = msg.guild.channels.cache.get('699067426507063326').messages.cache.get(raid.fetchAFK());
    await afkMsg.edit({
        embed: {
            title: `${raid.getType()} Check Ended`,
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            description: `make sure to stay in vc and listen to rl calls,gl.`
        }
    });
    await raid.endAFK();
    return msg.delete();
}
module.exports.help = {
    name: 'endafk',
    role: arl,
    blRoles: [officer, security],
    wlRoles: [arl, rl],
    syntax: `endafk`
}