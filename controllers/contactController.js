var contact = require('../models/contact.js');

// Display empty form to create a new contact
exports.new = (function (req, res) {
res.render('contact_new', {pagetitle: 'New Contact'});
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