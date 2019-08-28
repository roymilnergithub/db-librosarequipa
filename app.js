var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

var connection = require('./connection');
var routes = require('./routes');
var cors = require('./cors');

app.use(cors.permisos);
connection.inicia();
routes.configurar(app);

var server = app.listen(8000, function(){
	console.log('Escuchando en el puerto ',server.address().port);
})