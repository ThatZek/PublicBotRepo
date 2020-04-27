const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    if (!args.length > 0) return client.generateHelp(client, "help", msg);
    let cmd = client.commands.get(args.shift());
    if(cmd) {
        return client.generateHelp(client, cmd.help.name, msg);
    }
}
module.exports.help = {
    name: 'help',
    role: null,
    syntax: 'help {command}'
}