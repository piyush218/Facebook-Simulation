var mysql = require('./mysql');


exports.getUserData = function(req, res){
	
	var userId = req.session.userId;
	
	var getUserData = "select firstName from userdetail where userId='"+userId+"'";

	mysql.fetchData(function(err, result){
		
		var json_response;
		
		if(err){
			console.log(err.message);
			json_response = {
					statusCode : 100
			};
	
		}
		else{
			if(result.length > 0){
				json_response = {
						statusCode : 200,
						getUname : result[0]
				};
				
				res.send(json_response);
			}
			else{
				res.render('DataNotFound', { title: 'Incorrect login'});
			}
		}

	}, getUserData);

};



exports.getJson = function(req, res){
	
	var userId = req.session.userId;
	
	if(typeof(req.session.userId)!=="undefined")
	
	{
		Uid = 1;
	}
	
	
	var query = "select post_status.STATUS_TEXT, post_status.userId, userdetail.firstName " +
			"from " +
			"post_status INNER JOIN userdetail ON post_status.userId = userdetail.userId " +
			"ORDER BY status_time DESC";
	
mysql.fetchData(function(err, result){
		
		var json_response;
		
		if(err){
			console.log(err.message);
			json_response = {
					statusCode : 100
			};
	
		}
		else{
			if(result.length > 0){
				json_response = {
						statusCode : 200,
						status : result
				};
				
				res.send(json_response);
			}
			else{
				res.render('DataNotFound', { title: 'Incorrect login'});
			}
		}

	}, query);
};
	
	

exports.postStatus = function(req, res)
{
	var userId = req.session.userId;
	
	var postDetails = req.param('postValue');

	var insertPost = "insert into post_status(userId,STATUS_TEXT,SOURCEID) values('"+userId+"', "+"'"+postDetails+"', " +
	"'"+Uid+"')";
	
	mysql.addData(function(err, result) {
			if(err){
				
				console.log(err.message);
				json_response = {
						statusCode : 100
				};
			}
			
			else{
				if(result.affectedRows){
					
					json_response = {
							statusCode : 200,
							status : result
					};
					res.send(json_response);
				}
				
				else{
					res.render('DataNotFound', { title: 'Invalid'});
				}
				
			}
		}, insertPost);
};





