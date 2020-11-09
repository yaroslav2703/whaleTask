const Sequelize = require('sequelize');
const database = require('../database');

const Token = database.define('token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    }
});

module.exports = Token;