var express = require('express'),
    mysql = require('mysql'),
	mongoose = require('mongoose'),
	exphbs  = require('express3-handlebars'),
	path = require('path'),
    app = express();
	
var	user = "john";
	
// DB connection setup

mongoose.connect('mongodb://ea7e2872-1554-4ff1-b40e-e0657eaf2a35:2e81a8e2-e837-418b-9f59-3093eef12cb6@10.0.55.70:25327/db/contacts');
 
 /*
var connection = mysql.createConnection({
        host:'localhost',
        user:'uVY6VvL4pXhkS',
        password:'pvpUV3ZnkZGJ8',
		port:10000
    });	
*/
	
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

// development only
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

//Render homepage
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});