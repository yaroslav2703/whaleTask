const User = require('../../database/models/User');
const Token = require('../../database/models/Token');
const config = require('../../../config/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
    try{
        const {id, password} = req.body;

        const user = await User.findOne({where: {login: id }});

        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный логин или пароль, попробуйте снова'})
        }

        const jwtToken = jwt.sign(
            {userId: user.id},
            config.jwtSecret,
            {expiresIn: '600000'}
        );

        await Token.create({ value: jwtToken, userId: user.id});

        await res.json({jwtToken})
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};
