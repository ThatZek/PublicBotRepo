const Discord = require("discord.js");
const { Op } = require('sequelize');
const {security, member} = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    let suspendUser = msg.mentions.users.first();
    let suspendMember = msg.mentions.members.first();
    if(!suspendUser) return client.generateHelp(client, "unsuspend", args);
    const affectedRows = await client.db.tables.suspensions.update({ active: 'false' }, {
        where: {
            [Op.and]: [
              { discordID: suspendUser.id },
              { active: 'true' }
            ]
          }
    });
    if (affectedRows > 0) {
    suspendMember.roles.remove(msg.guild.roles.cache.get("699057196742344755"));
    suspendMember.roles.add(msg.guild.roles.cache.get(member));
    args.shift();
    msg.reply('User unsuspended!');
    return msg.guild.channels.cache.get("699067535881928804").send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
              },
            description: 'User Unsuspended',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: `**User**`,
                    value: suspendUser,
                  }
            ]
        }
    })
}
return msg.reply('User not suspended');
}
module.exports.help = {
    name: 'unsuspend',
    role: security,
    syntax: `suspend {user} {duration} {reason}`
}