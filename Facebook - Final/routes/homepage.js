
var mysql = require('./mysql');
var requestGen = require('./commons/responseGenerator');

exports.homepage = function(req, res){
	
	var userID = req.session.userId;
	
	if(userID){
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('home_main', { title: 'Home'});
	}else{
		res.redirect('/');
	}
	
};

exports.getUserName = function(req, res){
	
	var userID = req.session.userId;
	
	var option = {
			ignoredNamespaces : true	
	};
	var url = baseURL+"/Homepage?wsdl";
	var args = {userId: req.param('userId')};
	
	
	soap.createClient(url,option, function(err, client) {
		console.log("client created");
		client.homepage(args, function(err, result) {
			console.log("result " + JSON.stringify(result.aboutReturn));
			
			
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render(requestGen.responseGenerator(requestGen.success,
						result.homepageReturn));
		});
	});
	
	/*
	mysql.fetchData(function(err, result) {

		if (err) {
			console.log(err.message);
			res.send(requestGen.responseGenerator(requestGen.failure,
					"Something went wrong."));
		} else {
			if (result.length > 0) {
				
				var name = result[0].firstname + ' ' + result[0].lastname;
				
				res.send(requestGen.responseGenerator(requestGen.success,
						name));
			} else {
				res.send(requestGen.responseGenerator(requestGen.success,
						"No Username"));
			}
		}
	}, query);*/
	
};