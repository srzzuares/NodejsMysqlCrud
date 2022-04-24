const express = require('express');
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const loginRoutes = require('./routes/login');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 4004;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.engine('.hbs', engine({
    extname:'.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('Servidor en puerto 4004 '+ PORT );
});

app.use(myconnection(mysql, {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'Movil'
}));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use('/', loginRoutes);
app.use('/', taskRoutes);

app.get('/', (req,res) => {
    if(req.session.loggedin == true){
        res.render('home', {name: req.session.name} );
    }else{
        res.redirect('/login');
    }
});


