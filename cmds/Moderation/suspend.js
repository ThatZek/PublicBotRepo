const Discord = require("discord.js");
const {security, member, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const guild = client.guilds.cache.get('699055053121650719');
    let suspendMember;
    if(msg == null) {
        suspendMember = guild.members.cache.get(args.shift());
        if(!suspendMember) return;
        suspendMember.roles.add(guild.roles.cache.get("699057196742344755"));
        suspendMember.roles.remove(guild.roles.cache.get(member));
        let duration = args.shift();
        let reason = args.join(" ");
        suspend = await client.db.tables.suspensions.create({
        discordID: suspendMember.user.id,
        duration: duration,
        reason: reason,
        suspendedBy: client.user.id,
    });
    suspendMember.user.send({
        embed: {
            author: {
                name: client.user.tag,
                icon_url: client.user.avatarURL(),
              },
            description: 'You have been suspended!',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                {
                    name: `**Duration**`,
                    value: duration,
                },
                {
                    name: `**Reason**`,
                    value: reason,
                },
                {
                    name: `suspendID`,
                    value: suspend.get('suspendID'),
                },
            ]
        }
    })
    return guild.channels.cache.get("699067535881928804").send({
        embed: {
            author: {
                name: client.user.tag,
                icon_url: client.user.avatarURL(),
              },
            description: 'User Suspended',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: `**User**`,
                    value: suspendMember.user,
                  },
                  {
                      name: `**Duration**`,
                      value: duration,
                  },
                  {
                      name: `**Reason**`,
                      value: reason,
                  }
            ]
        }
    })
    } else {
        suspendMember = msg.mentions.members.first();
        args.shift();
        if(suspendMember.roles.cache.has("699057196742344755")) return msg.reply("User already suspended!");
        if(!suspendMember) return client.generateHelp(client, "suspend", args);
        suspendMember.roles.add(guild.roles.cache.get("699057196742344755"));
    suspendMember.roles.remove(guild.roles.cache.get(member));
    let duration = args.shift();
    let reason = args.join(" ");
    suspend = await client.db.tables.suspensions.create({
        discordID: suspendMember.user.id,
        duration: duration,
        reason: reason,
        suspendedBy: msg.author.id,
    });
    suspendMember.user.send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL(),
              },
            description: 'You have been suspended!',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                {
                    name: `**Duration**`,
                    value: duration,
                },
                {
                    name: `**Reason**`,
                    value: reason,
                },
                {
                    name: `suspendID`,
                    value: suspend.get('suspendID'),
                },
            ]
        }
    })
    return guild.channels.cache.get("699067535881928804").send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL(),
              },
            description: 'User Suspended',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: `**User**`,
                    value: suspendMember.user,
                  },
                  {
                      name: `**Duration**`,
                      value: duration,
                  },
                  {
                      name: `**Reason**`,
                      value: reason,
                  }
            ]
        }
    })
    }
    
}
module.exports.help = {
    name: 'suspend',
    role: rl,
    syntax: `suspend {user} {duration} {reason}`
}