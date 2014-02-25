var staticController = require('./controllers/staticController.js');
var contactController = require('./controllers/contactController.js');

module.exports = function(app) {
app.get('/', staticController.home);
app.get('/contacts/new', contactController.new);
app.post('/contacts/new', contactController.save);
}