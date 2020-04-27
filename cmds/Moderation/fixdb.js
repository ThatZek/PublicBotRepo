const Discord = require("discord.js");
const { Op } = require('sequelize');
const {security, member} = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    const affectedRows = client.db.tables.suspensions.update({ active: 'false' }, {
        where: {
            [Op.or]: [
              { active: 0 },
              { active: 1 }
            ]
          }
    });
}
module.exports.help = {
    name: 'fixdb',
    role: security,
    syntax: `fixdb`
}