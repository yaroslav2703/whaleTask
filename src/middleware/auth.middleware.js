const config = require('../../config/index');
const Token = require('../database/models/Token');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        const jwtToken = req.headers.authorization.split(' ')[1];
        if(!jwtToken) {
            return await res.status(401).json({ message: 'Нет авторизации' })
        }

        const token = await Token.findOne({where: {value: jwtToken }});
        if (!token) {
            return await res.status(400).json({ message: 'Токен авторизации уже не действителен'});
        }

        req.user = jwt.verify(jwtToken, config.jwtSecret);
        req.token = jwtToken;
        next()
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
