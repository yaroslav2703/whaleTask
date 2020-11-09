const database = require('./database');
const token = require('./models/Token');
const user = require('./models/User');


module.exports = () =>{
    const DB = database;
    let Token = token;
    let User = user;
    DB.sync()
        .then(result=>{
            console.log('Соединение с бд прошло успешно!');
        })
        .catch((err)=> {
            console.log('Ошибка подключения к базе данных!');
            process.exit(1);
        });
};