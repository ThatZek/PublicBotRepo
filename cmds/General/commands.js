const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    commandContent = client.commands.map(command => command.help.name).join('\n');
    return msg.channel.send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
              },
            description: 'use ;help {command} for more info!',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: `Commands`,
                    value: '```css\n' + commandContent + '\n```',
                  }
            ]
        }
    });
}
module.exports.help = {
    name: 'commands',
    role: null,
    syntax: 'commands'
}