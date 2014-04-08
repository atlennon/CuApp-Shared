
var CT = require('./server/modules/country-list');
var ST = require('./server/modules/state-list');
var AM = require('./server/modules/account-manager');
var PDF = require('./pdfFormCreator');
var EM = require('./server/modules/email-dispatcher');
var uploadHelper = require('./server/modules/uploadHelper');
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
				
				var imageName = req.files.identification.name

				/// If there's an error
				if(!imageName){

					console.log("There was an error")
					res.redirect("/");
					res.end();

				} 
				else {
				
					member = new Object();
					member.fname=req.param('fname');
					member.mname=req.param('mname');
					member.lname=req.param('lname');
					member.email=req.param('email');
					member.state=req.param('addr1');
					member.state=req.param('state');
					member.state=req.param('zip');
					member.ssn=req.param('ssn');
					member.depositamt=req.param('depositAmt');
					member.depsittype=req.param('depositType');
					member.ssn=req.param('ssn');
					member.creator=req.param('creator');
				  
				  fs.readFile(req.files.identification.path, function (err, data) {		
				  var newPath = __dirname + "/public/uploads/" + member.lname + '.jpg';
				  
				  /// write file to uploads folder
				  fs.writeFile(newPath, data, function (err) {
					
					var output=PDF.create(member);
						/// Download it 
						res.download(output);

				  });
				});
			}
		}
});	

/*	

	app.post('/memberinfo' , function(req,res){
				if (req.param('logout') == 'true'){
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e){ res.send('ok', 200); });
			}
			else {
					uploadHelper.doUpload(req,res);
			}
		});
		
	

	app.post('/memberinfo', function(req, res){
		if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		}
		else{
		
			/// Verify there is an ID file
			
			var idName = req.files.identification.name

			if(idName){

			var idPath = __dirname + "/uploads/" + idName;

			/// write file to uploads folder
			fs.writeFileSync(idPath, data, function (err, idPath) {
			if (err) throw err;
		  	/// let's see it
		  	//res.redirect("/uploads/" + imageName);
				});
			}

			var sigPath = __dirname + "/uploads/" + req.files.signature.name

			/// write file to uploads folder
			fs.writeFileSync(sigPath, data, function (err, sigPath) {
			if (err) throw err;
				});
			
			member = new Object();
			
				member.fname=req.param('fname');
				member.mname=req.param('mname');
				member.lname=req.param('lname');
				member.email=req.param('email');
				member.state=req.param('state');
				member.ssn=req.param('ssn');
				member.depositamt=req.param('depositAmt');
				member.depsittype=req.param('depositType');
				member.creator=req.param('creator');
				member.sigPath=sigPath;
				member.idPath=sigPath;
			
			 var output=PDF.create(member);
			
		
			res.send('ok', 200);
			}	
	});

	
	
// Member Forms //

	app.get('/memberinfo', function(req, res) {
	    if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
	        res.redirect('/');
	    }   
		else{
			AM.addMember(req.session.user, function(e, m){
				if (e){
					res.render('404',{title: 'Databease Error'});
				}	
				else {
					res.render('memberinfo', {
					title : 'Member Info',
					states : ST,
					udata : req.session.user,
					mdata : m
					});
				}
			});
		}
	});


		
	app.post('/memberinfo', function(req, res){
		if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		}
		else {
		
			var idName = req.files.identification.name
			
			data = req.files.identification

			/// If there's an error
			if(!idName){

			console.log("There was an error with the ID file")
			res.redirect("/memberinfo");
			res.end();
			} 
			else {

			var idPath = __dirname + "/uploads/" + idName;

			/// write file to uploads folder
			fs.writeFileSync(idPath, data, function (err, idPath) {
			if (err) throw err;
		  	/// let's see it
		  	//res.redirect("/uploads/" + imageName);
				});
			}

			var sigPath = __dirname + "/uploads/" + req.files.signature.name

			/// write file to uploads folder
			fs.writeFileSync(sigPath, data, function (err, sigPath) {
			if (err) throw err;
				});
			}
			
			AM.addMember({
				fname 		: req.param('fname'),
				mname 		: req.param('mname'),
				lname 		: req.param('lname'),
				email 		: req.param('email'),
				state 		: req.param('state'),
				ssn			: req.param('ssn'),
				depositamt 	: req.param('depositAmt'),
				depsittype	: req.param('depositType'),
				signature	: sigPath,
				user		: req.param('creator'),
				idfile		: newPath
				}
			, function(e, m){
				if (e){
				res.send(e, 400);
				}	
				else{
				res.send('ok', 200);
				}
			});	
		
	});

*/
	
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