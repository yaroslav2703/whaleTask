const User = require('../../database/models/User');
const Token = require('../../database/models/Token');
const config = require('../../../config/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
    try{
        const {id, password} = req.body;

        const candidate = await User.findOne({where: {login: id }});

        if (candidate) {
           return await res.status(400).json({ message: 'Такой пользователь уже существует'});
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        let loginType = 'phone';
        for(let item of id){
            if(item === '@'){
                loginType = 'mail';
            }
        }


        const user = await User.create({ login: id, password: hashedPassword, loginType: loginType });

        const jwtToken = jwt.sign(
            {userId: user.id},
            config.jwtSecret,
            {expiresIn: '600000'}
        );

        await Token.create({ value: jwtToken, userId: user.id});

        await res.json({jwtToken})
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};
