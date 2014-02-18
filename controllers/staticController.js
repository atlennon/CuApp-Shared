exports.home = function(req, res){
  res.render('home.handlebars', { title: 'Credit Union App' });
};
exports.index = function(req, res){
  res.render('index.html', { title: 'Credit Union App' });
};
exports.appform = function(req, res){
  res.render('appform', { title: 'Application form' });
};