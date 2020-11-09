# Тестовое задание
условие:
Описание: Сделать сервис с REST API. Авторизация по bearer токену (/info, /latency, /logout). 
Настроенный CORS для доступа с любого домена. DB - Postgresql. 
Токен создавать при каждом заходе, действителен 10 минут. 
Продлевать при любом запросе пользователя (кроме signin). 
В качестве токена использовать JWT.

API:

/signin [POST] - запрос bearer токена по id и паролю // данные принимает в json

/signup [POST] - регистрация нового пользователя: // данные принимает в json Поля id и password, id - номер телефона или email. 
После регистрации пометить в профиле тип id (phone/mail). 
При удачной регистрации вернуть bearer токен.

/info [GET] - возвращает id пользователя и тип id.

/latency [GET] - возвращает задержку от сервиса до google.com

/logout [GET] - с параметром all:
    true - удаляет все bearer токены пользователя,
    false - удаляет только текущий bearer токен
    
## необходимая информация для успешной работы:

1.выполнить команду:
```
npm install
```
2.затем перейти в папку config и указать параметры для базы данных и секретный ключ для JWT токена:
```
database: {
    bd : 'auth_bd',
    login: 'postgres',
    password: '123456',
    dialect: 'postgres',
    host: 'localhost',
    port: '5432'
},
jwtSecret: "whale task yaroslav pitsukha"
```
таблицу создавать не обязательно. Если её в бд нет,
то она создадится автоматически. Поля и параметры таблицы должны совпадать.

SQL код который автоматически выполнится при успешном запуске приложения:
```
CREATE TABLE IF NOT EXISTS "users" (
    "id"   SERIAL ,
    "login" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL, 
    "loginType" VARCHAR(5) NOT NULL, 
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tokens" (
    "id"   SERIAL , 
    "value" VARCHAR(255) NOT NULL UNIQUE, 
    "userId" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
```

3.запускаем приложение командой:
```
npm run prod
``` 
4.после этого можно делать запросы:

POST:

http://localhost:5000/signup

http://localhost:5000/signin

в теле передаём json вида:
```
{
    "id": "+375297523029",
    "password": "123456"
}
```
или
```
{
    "id": "jjj@gmail.com",
    "password": "123456"
}
```

GET:

http://localhost:5000/info

http://localhost:5000/latency

http://localhost:5000/logout

во всех GET запросах должен присутствовать заголовок со значением токена:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwNDkxMTMwNCwiZXhwIjoxNjA0OTExOTA0fQ.JMGgRWwHTAzewT1qTOhXobqkP_pNFLSO2thb7ALyu2E
```

при запросе http://localhost:5000/logout неободимо
передать параметр all:

http://localhost:5000/logout?all=true

либо
 
http://localhost:5000/logout?all=false
