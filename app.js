var express = require('express'),
    mysql = require('mysql'),
	exphbs  = require('express3-handlebars'),
	path = require('path'),
    app = express();
	
// DB connection setup
 
var connection = mysql.createConnection({
        host:'localhost',
        user:'uVY6VvL4pXhkS',
        password:'pvpUV3ZnkZGJ8',
		port:10000
    });	

//All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});