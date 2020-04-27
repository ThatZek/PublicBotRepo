const Discord = require("discord.js");
const {security} = require("../../config.json");

module.exports.run = async (client, msg, args) => {
const nickname = args.shift().cleanup();
member = msg.guild.members.cache.find(member => member.displayName.cleanup() == nickname);
if(!member) return msg.reply(`I couldn't find someone by that nickname`);
msg.channel.send({
    embed: {
        author: {
            name: msg.author.tag,
            icon_url: msg.author.avatarURL()
          },
        description: 'User found!',
        color: 9442302,
        timestamp: new Date(Date.now()),
        footer: {
        icon_url: client.users.cache.get('293445227501453313').avatarURL(),
        text: 'Created by ' + client.users.cache.get('293445227501453313').tag
        },
        fields: [
            {
                name: '**User**',
                value: member.user,
            }
        ]
    }
})
}
module.exports.help = {
    name: 'finduser',
    role: security,
    syntax: `finduser {user}`
}

String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
 }