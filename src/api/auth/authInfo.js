const User = require('../../database/models/User');


module.exports = async (req, res) => {
    try{
        const user = await User.findOne({where: {id: req.user.userId }});

        if(!user) {
            return await res.status(400).json({ message: 'Пользователь не найден'})
        }
        await res.json({id: user.login, idType: user.loginType});
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};