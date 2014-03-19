
var mongo = require('mongoskin');
var MongoClient = mongo.MongoClient;

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

/* Record visitor IP's in DB*/
module.exports.recordip = function(req, res){
    /* Connect to the DB and auth */
			object_to_insert = { 'ip': req.connection.remoteAddress, 'ts': new Date() };
			db.bind('ips');
            db.ips.insert(object_to_insert, {safe:true}, function(err, inserted) {
		});
}