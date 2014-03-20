# cuapp-shared

####A basic form app that can be used to collect information on a mobile device built in Node.js with the following features :

* New User Account Creation
* Secure Password Reset via Email
* Ability to Update / Delete Account
* Session Tracking for Logged-In Users
* Local Cookie Storage for Returning Users
* User Password Encryption
* Form to collect information on new applicants

***

####CuApp is built on top of the following libraries :

* [Node.js](http://nodejs.org/) - Application Server
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [MongoDb](http://www.mongodb.org/) - Database Storage
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [Stylus](http://learnboost.github.com/stylus/) - CSS Preprocessor
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library

***

A [Live Demo] cuapp.aws.af.cm

***

####Installation & Setup
This assumes you already have node.js & npm installed.
```
git clone hhttps://github.com/atlennon/CuApp-Shared.git cuapp
cd node-login
npm install -d
node app
```
For testing purposes, I've provided a [database dump of all accounts here.](http://node-login.braitsch.io/print)  
Please note this list and the entire database automatically resets every 24 hours.

Questions and suggestions for improvement are welcome.