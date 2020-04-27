const Discord = require("discord.js");
const fs = require('fs');
module.exports.run = async (client, msg, args) => {
if(msg.author.id != "293445227501453313") return msg.reply("hell no.");
client.commands = new Discord.Collection();
fs.readdir("../", (err, folders) => {
	if (err) throw err;

	for (let i = 0; i < folders.length; i++) {
		fs.readdir(`../${folders[i]}`, (e, files) => {
			let jsfiles = files.filter(f => f.split(".").pop() === 'js');
			if (jsfiles.length < 1) {
				console.log(`No commands in ${folders[i]}`);
				return;
			}

			jsfiles.forEach((file) => {
                let properties = require(`../${folders[i]}/${file}`);
				console.log(`Loaded ${file}`);
				client.commands.set(properties.help.name, properties);
			})
		})
	}
})
msg.reply('Commands reloaded!');
}
module.exports.help = {
    name: 'reloadcommands',
    role: null,
    syntax: `reloadcommands`
}