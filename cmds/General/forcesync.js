const Discord = require("discord.js");
module.exports.run = async (client, msg, args) => {
if(msg.author.id != "293445227501453313") return msg.reply("hell no.");
client.db.sync(true);
return msg.reply("Database has been ***YEETED***.");
}
module.exports.help = {
    name: 'forcesync',
    role: null,
    syntax: `forcesync`
}