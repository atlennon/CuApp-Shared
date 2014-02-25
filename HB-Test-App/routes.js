var staticController = require('./controllers/staticController.js');
var contactController = require('./controllers/contactController.js');
var formController = require('./controllers/formController.js');

module.exports = function(app) {
app.get('/', staticController.home);

app.get('/form/new', formController.new);

app.get('/contacts/new', contactController.new);
app.post('/contacts/new', contactController.save);
}