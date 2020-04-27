const Discord = require("discord.js");
const client = new Discord.Client();
const { Op } = require("sequelize");
const fs = require("fs");
const fetch = require('node-fetch');

const { prefix, TOKEN, vetRoleID} = require("./config.json");
Raid = require("./raid.js");
client.db = require("./database.js");


client.commands = new Discord.Collection();
client.generateHelp = require('./generateHelp.js');
client.reactions = new Discord.Collection();
client.raids = new Discord.Collection();

client.raids.set('Raiding 1', new Raid());
client.raids.set('Raiding 2', new Raid());
client.raids.set('Raiding 3', new Raid());
client.raids.set('Raiding 4', new Raid());
client.raids.set('Raiding 5', new Raid());

String.prototype.cleanup = function() {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}

fs.readdir("./cmds/", (err, folders) => {
	if (err) throw err;

	for (let i = 0; i < folders.length; i++) {
		fs.readdir(`./cmds/${folders[i]}`, (e, files) => {
			let jsfiles = files.filter(f => f.split(".").pop() === 'js');
			if (jsfiles.length < 1) {
				console.log(`No commands in ${folders[i]}`);
				return;
			}

			jsfiles.forEach((file) => {
                let properties = require(`./cmds/${folders[i]}/${file}`);
				console.log(`Loaded ${file}`);
				client.commands.set(properties.help.name, properties);
			})
		})
	}
})


client.on("ready",async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(';commands', { type: 'WATCHING'});
	client.db.sync(false);
	const guild = client.guilds.cache.get('699055053121650719');
	guild.emojis.cache.forEach(emoji => {
		client.reactions.set(emoji.name, emoji);
	});
	client.raids.map((raid, key) => {
		
		const raidingChannel = guild.channels.cache.find(channel => channel.name.startsWith(key));
		raid.setRaidChannel(raidingChannel.id);
		raid.setData();
		console.log(key);
	});
	const vetRole = guild.roles.cache.get(vetRoleID);
	const vetVerifyChannel = guild.channels.cache.get('704118227386761257');
	const vetMessage = await vetVerifyChannel.messages.fetch('704119700514144334');
	vetMessage.react('✅');
	const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot
    const collector = vetMessage.createReactionCollector(filter);
    collector.on('collect', async r => {
		let reactionMember = guild.members.cache.get(r.users.cache.last().id);
		if(reactionMember.roles.cache.has(vetRole)) return;
		let username = reactionMember.displayName.cleanup();
		fetch('http://www.tiffit.net/RealmInfo/api/user?u=' + username + '&f=')
        .then(res => res.json())
		.then(async account => {
			let maxedCount = 0;
			let meleeCount = 0;
			for(i = 0; i < account.characters.length; i++) {
				if(account.characters[i].stats_maxed == "8/8") {
					maxedCount += 1;
					if(account.characters[i].class == 'Warrior' || account.characters[i].class == 'Knight' || account.characters[i].class == 'Paladin') meleeCount += 1;
				};
			}
			if (maxedCount >= 3 && meleeCount >= 2) {
				reactionMember.roles.add(vetRole);
				reactionMember.user.send('You are now verified!');
			}else {
				reactionMember.user.send('You did not meet the reqs for vet raider!');
			}
		})
	});
});

client.on('message', msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const cmd = client.commands.get(command);
    if (cmd) {
		if (cmd.help.role) {
                const role = msg.guild.roles.cache.get(cmd.help.role);
                const member = msg.member;
				if (role) {
					let hasWLRole = false;
					if (role.position > member.roles.highest.position) return client.generateHelp(client, command, msg);
					if(cmd.help.wlRoles != undefined) {
						for(i = 0; i < cmd.help.wlRoles.length; i++) {
							if(msg.member.roles.cache.has(cmd.help.wlRoles[i])) hasWLRole = true;
						}
					}
					if(cmd.help.blRoles != undefined && hasWLRole == false) {
					for(i = 0; i < cmd.help.blRoles.length; i++) {
						let role = msg.guild.roles.cache.get(cmd.help.blRoles[i]);
						if (role.position == member.roles.highest.position) return client.generateHelp(client, command, msg);
					}
				}
				}
		}
        cmd.run(client, msg, args);
	}
});

client.on('message', async msg => {
	if(msg.channel.id != '702173334854434817') return;
	const suspensionAmount = await client.db.tables.suspensions.count( { where: { 
		[Op.and]: [
		{ discordID: msg.author.id },
		{ active: 'true' }
	  ]
	}});
	if(suspensionAmount <= 0) return;
	cmd = client.commands.get('suspend');
	cmd.run(client, null, [msg.author.id, 'PERMANENT', 'DM a security+']);
});

client.login(TOKEN);