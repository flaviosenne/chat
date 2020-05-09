const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser')
const validator = require('express-validator')

//template engine
const app = express();
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(validator())
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended: true}));
// app.use(expressValidator())

// carregar as rotas automaticamente
consign()
    .include('app/routes')
    // .then('app/config/database.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app;