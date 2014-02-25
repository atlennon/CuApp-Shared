var member = require('../models/contact.js');
var app = require('../app');
describe('contacts page', function() {
before(function() {
this.server = app.listen(3000);
this.browser = new Browser({site: 'http://localhost:3000/'});

// Empty existing test data
contact.find().remove();
});
it('should add user and show list', function(done) {
var browser = this.browser;
browser.visit("/contacts/new", function() {
browser.fill('first', 'Walter').
fill('last', 'White').
fill('company', 'Graymatter').
fill('jobtitle', 'Lab Manager').
fill('email', 'heisenberg@graymatter.com');
browser.pressButton('Save').then(function() {
assert.ok(browser.html().indexOf('Walter White') > -1);
}).then(done, done);
});
});
after(function() {

// Clean up test data
contact.find().remove();
this.server.close();
});
});