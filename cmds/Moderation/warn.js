const Discord = require("discord.js");
const {security, member, rl} = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    let suspendUser = msg.mentions.users.first();
    let suspendMember = msg.mentions.members.first();
    if(!suspendUser) return client.generateHelp(client, "warn", args);
    args.shift();
    let duration = args.shift();
    let reason = args.join(" ");
    await client.db.tables.warnings.create({
        discordID: suspendUser.id,
        warnedBy: msg.author.id,
    });
    suspendUser.send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
              },
            title: 'You have been warned!',
            description: 'Hello, this is an automated warning from the staff of Cults Only. You were found to be in violation of 1 or more of our minor infraction rules, which you can read about here in #raiding-rules. These include but are not limited to crashing, being in location early, minor dragging, etc. This is your one warning, should you be found repeating your offense the penalties will apply as detailed in the same #raiding-rules channel. If you would like to learn more about your infraction, or feel this was unjustly given, please contact one of our @Security team members. Thank you, be safe, and follow the rules.',
            color: 9442302,
            timestamp: new Date(Date.now()),
            footer: {
            icon_url: client.users.cache.get('293445227501453313').avatarURL(),
            text: 'Created by ' + client.users.cache.get('293445227501453313').tag
            },
        }
    })
    return msg.guild.channels.cache.get("699067535881928804").send({
        embed: {
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL()
              },
            description: 'User Warned',
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
module.exports.help = {
    name: 'warn',
    role: rl,
    syntax: `warn {user}`
}