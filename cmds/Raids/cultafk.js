const Discord = require("discord.js");
const {arl, officer, security, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    channelNumber = args.shift();
    const raid = client.raids.get("Raiding " + channelNumber);
    if(!raid) return msg.reply('You need to use a valid channel number!');
    if(!client.raids.every(raid => raid.fetchStatus() != "afk")) return msg.reply(`There is an AFK in progress, please wait until the AFK is finished.`);
    const server = args.shift();
    const bazaar = args.shift();
    if(server == undefined || bazaar == undefined) return client.generateHelp(client, 'cult', msg);
    raid.setLocation(server, bazaar);
    const raidStatus = raid.fetchStatus();
    const raidLeader = msg.author.id;
    if(raidStatus == "raid") return msg.reply(`There's already a raid for that channel!`);
    const afkMsg = await msg.guild.channels.cache.get('699067426507063326').send("@here");
    await raid.startAFK(raidLeader, afkMsg.id, 'Cult');
    await afkMsg.edit("", {
        embed: {
            title: `Cult started by ${msg.member.nickname} in Raiding ${channelNumber}`,
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            description: `React with the cult icon if you are going to join the run\n
            React with the class's you are willing to bring to the run\n
            Key and rushers are appreciated,Thank you.`
        }
    }).then(async m => {
        const filter = (reaction, user) => reaction.emoji.id === client.reactions.get('Cult').id && !user.bot || reaction.emoji.id === client.reactions.get('lhkey').id && !user.bot || reaction.emoji.id === client.reactions.get('nitro').id && !user.bot
        const collector = m.createReactionCollector(filter);
        raid.setCollector(collector);
        collector.on('collect', async r => {
            if (r.emoji.id === client.reactions.get('Cult').id) {
                raid.addRaider(r.users.cache.last().id);
            } else if (r.emoji.id === client.reactions.get('lhkey').id) {
                user = r.users.cache.last();
                const confirmationMsg = await user.send('Are you sure you have a key?');
                const filter = (reaction, user) => reaction.emoji.id === client.reactions.get('lhkey').id && !user.bot
                confirmationMsg.react(client.reactions.get('lhkey'));
                const collector = confirmationMsg.createReactionCollector(filter, { maxUsers: 1 });
                collector.on('collect', async r => {
                if (r.emoji.id === client.reactions.get('lhkey').id) {
                user = r.users.cache.last();
                await user.send('The location is: ' + raid.getLocation());
                await collector.stop();
                raid.addKey(user.id);
                }
                });
            } else if (r.emoji.id === client.reactions.get('nitro').id) {
                user = r.users.cache.last();
                member = msg.guild.members.cache.get(user.id);
                if(!member) return;
                if(member.roles.highest.position < msg.guild.roles.cache.get('702210402452242533').position) return;
                await user.send('The location is: ' + raid.getLocation());
                raid.addBooster(user.id);
                }
        });

        await m.react(client.reactions.get('Cult'));
        await m.react(client.reactions.get('lhkey'));
        await m.react(client.reactions.get('Warrior'));
        await m.react(client.reactions.get('Paladin'));
        await m.react(client.reactions.get('Knight'));
        await m.react(client.reactions.get('Puri'));
        await m.react(client.reactions.get('Brain'));
        await m.react(client.reactions.get('T2orb'));
        await m.react(client.reactions.get('Ogmur'));
        await m.react(client.reactions.get('Rogue'));
        await m.react(client.reactions.get('mseal'));
    })
    return msg.delete();
}
module.exports.help = {
    name: 'cult',
    role: arl,
    blRoles: [officer, security],
    wlRoles: [arl, rl],
    syntax: `cult {channel} {Server Location} {Bazzar Location}`
}