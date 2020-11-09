const express = require('express');
const cors = require('cors');
const app = express();
const bp = require('body-parser');
const cookieParser = require('cookie-parser')

const doMigrations = require('../database/migrations');

app.use(cors());
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.json());
app.use(cookieParser());

doMigrations();

const routes = express.Router();
require('./auth')(routes);
app.use('/', routes);

module.exports = app;