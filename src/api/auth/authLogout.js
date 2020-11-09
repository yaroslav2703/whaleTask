const Token = require('../../database/models/Token');


module.exports = async (req, res) => {
    try{
        let all = req.query.all;
        if(!all){
            return await res.status(400).json({ message: 'Параметр all не указан'})
        }
        if(all==='true'){
            await Token.destroy({where: {userId: req.user.userId}});
            return await res.status(200).json({ message: 'Все токены пользователя удалены'})
        }
        else if(all==='false'){
            await Token.destroy({where: {userId: req.user.userId, value: req.token}});
            return await res.status(200).json({ message: 'Текущий токен пользователя удален'})
        }
        else{
            return await res.status(400).json({ message: 'Неверное значение параметра all'})
        }
    }catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};