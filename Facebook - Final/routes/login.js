/*
 * check login data in database
 */

var soap = require('soap');
var baseURL = "http://localhost:8080/Facebook-JWS-Lab3/services";

exports.signin = function signin(req, res) {

	res.render('home', {title: 'Login'});

}


exports.firstLogIn = function(){
	res.render('login', {title: "Login"});
};


exports.login = function login(req, res){

	
	var option = {
			ignoredNamespaces : true	
	};
	var url = baseURL+"/Login?wsdl";
	var args = {emailid: req.param('emailId'),password: req.param('password')};
	console.log(args);
	

	soap.createClient(url,option, function(err, client) {
		console.log("client created");
		client.login(args, function(err, result) {
			console.log("inside client login");
			console.log("results" + JSON.stringify(result));
			if(result.loginReturn !== null){
				console.log("200 alert");
				
				req.session.userId = parseInt(result.loginReturn);
				
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				
				if(req.param("firstLogIn") == "yes"){
					res.render("addProfile", { title: 'Facebook - Add Profile Information' });
				}
				else{

					res.render('home_main', { title: 'Home'});
				}
				
				//res.send({statusCode:200});
			}
			else{
				console.log("401 alert");
				console.log("Wrong pwd/uname");
				res.render('login/failed_login');
				//res.send({statusCode:401});
			}
		});
	});

};