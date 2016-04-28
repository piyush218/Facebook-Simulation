var soap = require('soap');
var baseURL = "http://localhost:8080/Facebook-JWS-Lab3/services";

exports.renderer = function(req, res) {
    res.render('frnd_view_renderer');
}

exports.list = function(req, res) {

    var userId = req.session.userId;
    // var query = "select userId2,status from friendlist where userId1="
	// + session_id + "";
    if(userId){

	var option = {
			ignoredNamespaces : true	
	};
	
	var url = baseURL+"/About?wsdl";
	var args = {userId: userId};

    soap.createClient(url,option, function(err, client) {
	console.log("client created");
	client.getSessionUserFriend(args, function(err, result) {
	    if(!err){
		console.log("result " + JSON.stringify(result.getSessionUserFriendReturn));
		var args = {friendList:result.getSessionUserFriendReturn}
		client.getFriendsName(args, function(err, friendName){
			console.log("work result " + JSON.stringify(friendName.getFriendsNameReturn));
			if (!err) {

			    for (i = 0; i < friendName.getFriendsNameReturn.length; i++) {
				merger
					.extend(
						result.getSessionUserFriendReturn[i],
						friendName.getFriendsNameReturn[i]);
			    }
			    console.log("Answer: "+ JSON.stringify(result));

			    json_response = {
				statusCode : 200,
				status : result.getSessionUserFriendReturn
			    };

			    res.send(json_response);
			}else{
			    json_response = {
					statusCode : 501,
					status : null
				    };

				    res.send(json_response);
			    }
		
		});
	}else{
	    json_response = {statusCode : 501,status : null};
	    res.send(json_response);
	}

	});
    });
    }else{
	res.redirect('/');
}
};

exports.pendingList = function(req, res) {
    var session_id = req.session.userId;
    if(userId){

	var option = {
			ignoredNamespaces : true	
	};
	
	var url = baseURL+"/About?wsdl";
	var args = {userId: userId};

    soap.createClient(url,option, function(err, client) {
	console.log("client created");
	client.getSessionUserPendingFriend(args, function(err, result) {
	    if(!err){
		console.log("result " + JSON.stringify(result.getSessionUserPendingFriendReturn));
		var args = {friendList:result.getSessionUserFriendReturn}
		client.getFriendsName(args, function(err, friendName){
			console.log("work result " + JSON.stringify(friendName.getFriendsNameReturn));
			if (!err) {

			    for (i = 0; i < friendName.getFriendsNameReturn.length; i++) {
				merger
					.extend(
						result.getSessionUserPendingFriendReturn[i],
						friendName.getFriendsNameReturn[i]);
			    }
			    console.log("Answer: "+ JSON.stringify(result));

			    json_response = {
				statusCode : 200,
				status : result.getSessionUserPendingFriendReturn
			    };

			    res.send(json_response);
			}else{
			    json_response = {
					statusCode : 501,
					status : null
				    };

				    res.send(json_response);
			    }
		
		});
	}else{
	    json_response = {statusCode : 501,status : null};
	    res.send(json_response);
	}

	});
    });
    }else{
	res.redirect('/');
}
};
