var express = require('express'),
    //mysql = require('mysql'),
	mongoose = require('mongoose'),
	exphbs  = require('express3-handlebars'),
	hbs = require('hbs'),
	path = require('path'),
    app = express();
	
// DB connection setup

//mongoose.connect('mongodb://438f382e-d28e-4b5b-b28d-cbf18639a065:364a9b1d-c025-43a4-81c4-cee5f16f8f15@10.0.55.70:25327');
 
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

require('./routes')(app);
require('handlebars-form-helpers').register(hbs.handlebars);

app.listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});