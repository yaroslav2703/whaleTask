const Sequelize = require('sequelize');
const database = require('../database');
const Token = require('./Token');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    loginType: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
});
User.hasMany(Token, { onDelete: "cascade" });

module.exports = User;

