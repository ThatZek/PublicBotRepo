const {arl, officer, security, rl, member} = require("../../config.json");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
        //if(msg.channel.id != '702173334854434817') return;
        if(msg.member.roles.cache.has(member)) return;
        const veriMember = msg.member;
        const veriUser = msg.author;
        const veriRole = msg.guild.roles.cache.get(member);
        let string = "CO" + Math.floor(Math.random(11111) * 99999);
        await veriUser.send('Please put the following code ALONE in any of your realmeye description lines!');
        await veriUser.send({
                embed: {
                    color: 3447003,
                    title: string,
                }
            });
        await veriUser.send('Please reply with your ROTMG username once your description has been updated!')
        .then(async message => {
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === veriUser.id);
                    collector.on('collect', m => {
                        let username = m.content
                        m.channel.send("I will now finish the verification process!");
                        fetch('http://www.tiffit.net/RealmInfo/api/user?u=' + username + '&f=c')
                            .then(res => res.json())
                            .then(async account => {
                                const description = account.description;
                                if (description.includes(string)) {
                                    collector.stop();
                                    veriMember.roles.add(veriRole)
                                    veriMember.setNickname(account.name)
                                    .catch(console.error);
                                    m.channel.send('You are now verified!')
                                }else {
                                    m.reply('There was an error with verification!')
                                }
                            })
                    });
                }
                )
    }
module.exports.help = {
    name: 'verify',
    role: null,
    blRoles: [member],
    syntax: `verify`
}