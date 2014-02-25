//var contact = require('../models/contact.js');

// Display empty form to create a new contact
exports.new = (function (req, res) {
res.render('form.handlebars', {pagetitle: 'New Form'});
});

// Save new contact
exports.save = (function (req, res) {
new contact({
name: {first: req.body.first, last: req.body.last},
company: req.body.company,
title: req.body.jobtitle,
email: req.body.email
}).save();
res.redirect('/');
});