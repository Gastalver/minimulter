/**
 * Created by Miguel on 11/12/2016.
 */

// Dependencias
var express = require('express');
var exphbs = require('express-handlebars');
var multer = require('multer');
var app = express();

//Template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Request handlers
app.get('/', function (req,res){
    res.render('home');
})

app.listen(3000,function(req,res){
    console.log("Servidor operativo en puerto 3000");
    });