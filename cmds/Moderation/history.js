const Discord = require("discord.js");
const {security, member} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    let user = msg.mentions.users.first();
    if(!user) return msg.reply("You need to specify a user!");
    let member = msg.mentions.members.first();
    const suspensions = await client.db.tables.suspensions.findAll( { where: { discordID: user.id} } );
    const suspensionAmount = await client.db.tables.suspensions.count( { where: { discordID: user.id} } );
    await suspensions.map(suspend => {
        return msg.channel.send({
            embed: {
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.avatarURL()
                  },
                title: member.nickname,
                description: 'User Suspended',
                color: 9442302,
                timestamp: new Date(Date.now()),
                footer: {
                icon_url: client.users.cache.get('293445227501453313').avatarURL(),
                text: 'Created by ' + client.users.cache.get('293445227501453313').tag
                },
                fields: [
                      {
                        name: `**Suspended By**`,
                        value: client.users.cache.get(suspend.get('suspendedBy')),
                      },
                      {
                          name: `**Duration**`,
                          value: suspend.get('duration'),
                      },
                      {
                          name: `**Reason**`,
                          value: suspend.get('reason'),
                      },
                      {
                        name: `Active?`,
                        value: suspend.get('active'),
                        },
                      {
                          name: `suspendID`,
                          value: suspend.get('suspendID'),
                      },
                ]
            }
        })
    });
    const warnings = await client.db.tables.warnings.findAll( { where: { discordID: user.id} } );
    const warningAmount = await client.db.tables.warnings.count( { where: { discordID: user.id} } );
    await warnings.map(warn => {
        return msg.channel.send({
            embed: {
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.avatarURL()
                  },
                title: member.nickname,
                description: 'User Warned',
                color: 9442302,
                timestamp: new Date(Date.now()),
                footer: {
                icon_url: client.users.cache.get('293445227501453313').avatarURL(),
                text: 'Created by ' + client.users.cache.get('293445227501453313').tag
                },
                fields: [
                      {
                        name: `**Warned By**`,
                        value: client.users.cache.get(warn.get('warnedBy')),
                      },
                      {
                        name: `warnID`,
                        value: warn.get('warnID'),
                     },
                ]
            }
        })
    });
    return msg.channel.send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
              },
            title: member.nickname,
            description: 'Summary of user history:',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: `**Total Warnings**`,
                    value: warningAmount,
                  },
                  {
                      name: `**Total Suspensions**`,
                      value: suspensionAmount,
                  }
            ]
        }
    });
}
module.exports.help = {
    name: 'history',
    role: security,
    syntax: `history {user}`
}