const Sequelize = require('sequelize');
const fs = require('fs');

sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

module.exports.sync = async (force) =>  {
    sequelize.sync({ force: force});
}

module.exports.tables = {
    suspensions: sequelize.define('suspendData', {
        suspendID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        discordID: {
            type: Sequelize.STRING,
        },
        duration: Sequelize.STRING,
        reason: Sequelize.TEXT,
        active: {
            type: Sequelize.STRING,
            defaultValue: 'true',
        },
        suspendedBy: Sequelize.STRING,
    }),
    warnings: sequelize.define('warnData', {
        discordID: {
            type: Sequelize.STRING,
        },
        warnID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        warnedBy: Sequelize.STRING,
    })
}