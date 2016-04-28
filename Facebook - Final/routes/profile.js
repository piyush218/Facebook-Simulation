var soap = require('soap');
var baseURL = "http://localhost:8080/Facebook-JWS-Lab3/services";

var mysql = require('./mysql');

exports.profile = function(req, res){

	var userId = req.session.userId;
	if(userId){

		var option = {
				ignoredNamespaces : true	
		};
		var url = baseURL+"/Profile?wsdl";
		var args = {userId: req.param('userId'), schoolName: req.param('schoolName'),major: req.param('major'),
						e_startDate: req.param('eStartDate'),e_endDate: req.param('eEndDate'),
							companyName: req.param('companyName'),position: req.param('position'),
								w_startDate: req.param('wStartDate'),w_endDate: req.param('wEndDate'),
									phoneNumber: req.param('phoneNumber'),relationship: req.param('relationship'),
										city: req.param('city'),country: req.param('country'),
											music: req.param('music'),shows: req.param('shows'),
												sports: req.param('sports')};
		
		/*
		var schoolName = req.param("schoolName");
		var major = req.param("major");
		var e_startDate = req.param("eStartDate");
		var e_endDate = req.param("eEndDate");
		var companyName = req.param("companyName");
		var position = req.param("position");
		var w_startDate = req.param("wStartDate");
		var w_endDate = req.param("wEndDate");
		var phoneNumber = req.param("phoneNumber");
		var relationship = req.param("relationship");
		var city = req.param("city");
		var country = req.param("country");
		var music = req.param("music");
		var shows = req.param("shows");
		var sports = req.param("sports");*/

		soap.createClient(url,option, function(err, client) {
			console.log("client created");
			client.profile(args, function(err, result) {
				console.log("inside client profile");
				console.log("results" + JSON.stringify(result));
				if(result.profileReturn == true){
					console.log("200 alert");
					
					//req.session.userId = parseInt(result.loginReturn);
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					
					//if(req.param("firstLogIn") == "yes"){
					res.render('home_main', {title: "Home"});
					//}
					
					
					//res.send({statusCode:200});
				}
				else{
					console.log("401 alert");
					console.log("failed query in profile");
					res.render('failed_Query');
					//res.send({statusCode:401});
				}
		
				/*
		mysql.fetchData( function(err, result){

			if(err){
				console.log(err.message);
			}
			else{
				if(result.length > 0){
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					res.render('home_main', {title: "Home"});
				}
				else{
					console.log("failed query in profile");
					res.render('failed_Query');
				}
			}
		}, query);
	}
	*/
				
			});
		});
	}
	else{
			res.redirect('/');
	}
};




