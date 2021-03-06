
var ST = require('./server/modules/state-list');
var DL = require('./server/modules/deposit-list');
var AM = require('./server/modules/account-manager');
var PDF = require('./pdfFormCreator');
var EM = require('./server/modules/email-dispatcher');
var fs = require('fs');

module.exports = function(app) {

// main login page //

	app.get('/', function(req, res){
	// capture IP address of visitor
	AM.recordip(req, res);
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/memberinfo');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	app.post('/', function(req, res){
		AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
			if (!o){
				res.send(e, 400);
			}	else{
			    req.session.user = o;
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.send(o, 200);
			}
		});
	});
	
// logged-in user account homepage //
	
	  app.get('/home', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   else{
			  res.render('home', {
				title : 'Control Panel',
				udata : req.session.user
			});
	    }
	});
	
	app.post('/home', function(req, res){
		if (req.param('user') != undefined) {
			AM.updateAccount({
				user 		: req.param('user'),
				name 		: req.param('name'),
				email 		: req.param('email'),
				pass		: req.param('pass')
			}, function(e, o){
				if (e){
					res.send('error-updating-account', 400);
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.send('ok', 200);
				}
			});
		}	else if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		}
	});
	
// Member Forms //

	app.get('/memberinfo', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   	
		else {
			res.render('memberinfo', {
			title : 'Member Info',
			states : ST,
			deposits : DL,
			udata : req.session.user
			});
		}
	});

/// Post files
app.post('/memberinfo', function(req, res) {

	if (req.param('logout') == 'true'){
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e){ res.send('ok', 200); });
			}
		else{
				
				var output;
				var imageName = req.files.identification.name

				/// If there's an error
				if(!imageName){

					console.log("There was an error with the id file")
					res.redirect("/");
					res.end();

				} 
				else {
				
				var sigdata = req.param('signature_capture');

				function decodeBase64Image(dataString) {
				var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
				response = {};

				if (matches.length !== 3) {
				return new Error('Invalid signature string');
				}

				response.type = matches[1];
				response.data = new Buffer(matches[2], 'base64');

				return response;
				}
				
					member = new Object();
					member.fname=req.param('fname-rev');
					member.mname=req.param('mname-rev');
					member.lname=req.param('lname-rev');
					member.email=req.param('email-rev');
					member.addr=req.param('addr-rev');
					member.city=req.param('city-rev');
					member.state=req.param('state-rev');
					member.zip=req.param('zip-rev');
					member.ssn=req.param('ssn-rev');
					member.depositamt=req.param('deposit-amt-rev');
					member.depsittype=req.param('deposit-type-rev');
					member.creator=req.param('creator');
				  
				  var imageBuffer = decodeBase64Image(sigdata);
				  var sigPath = __dirname + "/public/uploads/" + member.lname + 'sig.jpg';
				  fs.writeFile(sigPath, imageBuffer.data, function(err) {if (err) throw err;});

				  fs.readFile(req.files.identification.path, function (err, data) {		
				  var idPath = __dirname + "/public/uploads/" + member.lname + '.jpg';
				  
				  /// write file to uploads folder
				  fs.writeFile(idPath, data, function (err) {if (err) throw err;});
				
				  });
						var serverpath = 'http://cuapp.dyndns.info/'+ member.creator + '.pdf'
						console.log('Wait for images to be uploaded');
						setTimeout(function(){PDF.create(member);}, 5000); // wait 1 seconds pass seconds to allow file upload..
						console.log('Wait for PDF to be created');
						setTimeout(function(){res.render('download', {
						title : 'Download',
						link : serverpath
						})}, 10000); // 2 seconds render new page..
						//if(output)
						//res.redirect(serverpath);
						//else
						//setTimeout(function(){console.log('More Delay'); res.redirect(serverpath);}, 10000); // 2 seconds pass..
			}
		}
});	

// Member Forms //

	app.get('/download', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   	
		else {
			res.render('download', {
			title : 'Download',
			link : serverpath
			});
		}
	});


	
// creating new accounts //
	
	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup'});
	});
	
	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.param('name'),
			email 	: req.param('email'),
			user 	: req.param('user'),
			pass	: req.param('pass')
		}, function(e){
			if (e){
				res.send(e, 400);
			}	else{
				res.send('ok', 200);
			}
		});
	});

// password reset //

	app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.param('email'), function(o){
			if (o){
				res.send('ok', 200);
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// should add an ajax loader to give user feedback //
					if (!e) {
					//	res.send('ok', 200);
					}	else{
						res.send('email-server-error', 400);
						for (k in e) console.log('error : ', k, e[k]);
					}
				});
			}	else{
				res.send('email-not-found', 400);
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		var nPass = req.param('pass');
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o){
			if (o){
				res.send('ok', 200);
			}	else{
				res.send('unable to update password', 400);
			}
		})
	});
	
// view visits //
	
	app.get('/visits', function(req, res) {
		AM.getAllVisits( function(e, ips){
			res.render('visits', { title : 'Visits', visits : ips });
		})
	});
	
// view & delete accounts //
	
	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});
	
	app.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
	            req.session.destroy(function(e){ res.send('ok', 200); });
			}	else{
				res.send('record not found', 400);
			}
	    });
	});
	
	app.get('/reset', function(req, res) {
		AM.delAllRecords(function(){
			res.redirect('/print');	
		});
	});
	
	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });


};