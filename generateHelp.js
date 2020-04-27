const Discord = require("discord.js");
module.exports = async (client, commandName, msg) => {
    const cmd = client.commands.get(commandName);
    if(!cmd) return "error";
    return msg.channel.send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL
            },
            color: 9442302,
            description: "**{}** is a **required** argument and **[]** is an **optional** argument.\nThe required role is the **MINIMUM ROLE REQUIRED**.",
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL,
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
            fields: [
                  {
                    name: "**Arguments:**",
                    value: "```css\n" + cmd.help.syntax + "\n```",
                  },
                  {
                    name: "**Required Role:**",
                    value: msg.guild.roles.cache.get(cmd.help.role) || "None"
                  }
            ]
        }
    });
}