/**
 * Register user in database
 */

var soap = require('soap');
var baseURL = "http://localhost:8080/Facebook-JWS-Lab3/services";

exports.about = function(req, res){

var url = baseURL+"/About?wsdl";
var firstName = req.param('firstName');
var lastName = req.param('lastName');
var email = req.param('email');
var password = req.param('password');
var birthDate = req.param('birthDate');
var gender = req.param('gender');

var option = {
		ignoredNamespaces : true	
};

var args = {
				firstName: firstName,
				lastName : lastName,
				email : email,
				password : password,
				birthDate : birthDate,
				gender : gender
		
			};

soap.createClient(url, option, function(err, client) {
	console.log("client created");
	client.register(args, function(err, result) {
		
		console.log("inside client signup");
		console.log("results" + JSON.stringify(result));
		
				res.render('login', { title: 'Login'});
			});
		});


}

