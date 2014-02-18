exports.index = function(req, res){
  res.render('index', { title: 'Credit Union App' });
};
exports.appform = function(req, res){
  res.render('form.html', { title: 'Application form' });
};