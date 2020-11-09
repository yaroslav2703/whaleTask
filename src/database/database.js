const Sequelize = require('sequelize');
const config = require('../../config');


const sequelize = new Sequelize(
    config.database.bd,
    config.database.login,
    config.database.password,
    {
        dialect: config.database.dialect,
        host: config.database.host,
        port: config.database.port,
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;