const Discord = require("discord.js");
const {arl, officer, security, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
const parsedArgs = args.join(` `).split(`""`);
const title = parsedArgs.shift();
const description = parsedArgs.shift();
msg.channel.send("", {
    embed: {
        title: title,
        color: 9442302,
        footer: {
        icon_url: client.users.cache.get('293445227501453313').avatarURL(),
        text: 'Created by ' + client.users.cache.get('293445227501453313').tag
        },
        description: description,
    }
});
}
module.exports.help = {
    name: 'sayembed',
    role: security,
    syntax: `sayembed {title} "" {description}`
}