
var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');
var PDFDocument = require('pdfkit');
var expressValidator = require("express-validator");
var port = (process.env.VMC_APP_PORT || 80);
var host = (process.env.VCAP_APP_HOST || '192.168.193.82');
var db = require('./app/server/modules/db-connect');

app.configure(function(){
	app.set('port', 80);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.favicon(__dirname + '/app/public/css/apple-touch-icon.png'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(expressValidator());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(express.static(__dirname + '/app/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

require('./app/router')(app);

db.connect();
	
http.createServer(app).listen(port, host);
console.log("The server is running on port " + port);
