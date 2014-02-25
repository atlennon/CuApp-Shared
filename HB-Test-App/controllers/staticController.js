exports.home = function(req, res){
  res.render('home.handlebars', { title: 'Credit Union App' });
};