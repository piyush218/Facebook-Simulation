exports.logout = function(req, res){
	req.session.destroy();
	
	res.render('home', {title:'Sign In'});
};