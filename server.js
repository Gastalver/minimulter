var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            req.invalidUpload = 'Archivo no admitido';
            return cb(null, false);
        }
        cb(null, true);
}}).single('archivo');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function (req,res){
    res.render('home');
});

app.post('/imagen', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log('Multer error:' + err);
            return
        }
        // Everything went fine
        if (!req.invalidUpload){
            console.log('Uploaded');
            res.send('Uploaded');
        } else {
            console.log(req.invalidUpload);
            res.send(req.invalidUpload);
        }
    })
})

app.listen(3000,function(req,res){
    console.log("Servidor operativo en puerto 3000");
    });