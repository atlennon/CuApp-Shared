
var mongo = require('mongoskin');
var MongoClient = mongo.MongoClient;

module.exports.connect = function(){

//Determine DB url

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var connectinfo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var connectinfo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'db');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
var mongourl = generate_mongo_url(connectinfo);

//establish the database connection

var db = MongoClient.connect(mongourl, {native_parser:true});

	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database');
	}
db.close();
});
}