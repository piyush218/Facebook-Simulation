var soap = require('soap');
var baseURL = "http://localhost:8080/Facebook-JWS-Lab3/services";

exports.about = function(req, res){

	var userId = req.session.userId;

	if(userId){

		var option = {
				ignoredNamespaces : true	
		};
		
		var url = baseURL+"/About?wsdl";
		var args = {userId: userId};
		
		soap.createClient(url,option, function(err, client) {
			console.log("client created");
			client.about(args, function(err, result) {
				console.log("result " + JSON.stringify(result.aboutReturn));
				
				client.work(args, function(err, workResult){
					console.log("work result " + JSON.stringify(workResult.workReturn));
					
					client.education(args, function(err, eduResult){
						console.log("edu result " + JSON.stringify(eduResult.educationReturn));	
						
						res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
						res.render('about', { title: 'About', 
							result: result.aboutReturn, workResult: workResult.workReturn, eduResult: eduResult.educationReturn});
					});
				});
			});
		});

	}
	else{
		res.redirect('/');
	}
};