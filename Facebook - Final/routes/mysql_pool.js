var mysql = require('./mysql');

var pool = [];
var count = 0;
var connStatus = [];
var noOfConn  = 0;
var statusCounter = 0;
var allConBusy = false;
var pendingConn = [];
var pndingCon_length = 10;	 //Set your queue length here


var jsonObject = [];



exports.createPool = function(numOfConns){

	noOfConn = numOfConns;
	for(var i=0; i < numOfConns; i++){

		var poolObject = {
				connection : mysql.getConnection(),
				status : false
		};

		jsonObject.push(poolObject);

	}

	console.log("Pool Created");
};

exports.getConnFromPool = function connAssigner(incomingConnection){

	if(count == jsonObject.length){


		//Push all new connections to a queue
		if(pndingCon_length !=0 ){

			console.log("Pushing "+pndingCon_length+" in queue");

			pendingConn.push(pndingCon_length);
			pndingCon_length--;


			setInterval(function(){
				//console.log("waited for 5 ms");
				//console.log(allConBusy);
				if(!allConBusy){

					console.log("Poping and assigning for "+pndingCon_length+" in queue");

					
			//		setTimeout(function() {
							
						pendingConn.splice(0, 1);

						//Make sure waiting connections does not exceed our expected wait connections
						if(pndingCon_length < 10)
							pndingCon_length++;
						console.log("loop value: " + loop());

						return (loop());
			//		}, 5000)
	
				}
				/*else{
					console.log("All connection busy, queue is not full");
					/*
					setTimeout(function() {
						connAssigner();
					}, 5000); 
					//return;*/
			

		}, 5);		



			console.log("After timeout");
			//return null;
	}
	else{
		//throw error anyhow, server is overloaded
		console.log("queue full, don't accept any new connection");
		return null;
	}


}
else{
	console.log("Connection assigned");
	return ( loop() );
	//console.log("below loop in else");
}

//connAssigner();
console.log("double check whether returnng or not/// should not print this ////");

};

function loop(){

	for(var i=0; i<noOfConn; i++){
		//console.log("i is " + i);

		//console.log("json object " + i +" " + jsonObject[i].status);

		if(jsonObject[i].status == false){

			allConBusy = false;
			jsonObject[i].status = true;
			count++;
			//console.log("pool use count: " + count)
			//console.log("returned pool: " + i);
			//console.log("conn pool - " + jsonObject[i].connection);

			return jsonObject[i].connection;

		}

	}

	allConBusy = true ;

}

exports.releaseConn = function(conn){

	count--;
	//console.log("release count: " + count);

	for(var i=0; i<jsonObject.length;  i++){

		if(jsonObject[i].connection === conn){
			jsonObject[i].status = false;
		}
	}

}

/*
exports.deQueue = function(){
	//console.log("waited for 5 ms");
	console.log("In deque"+allConBusy);
	if(!allConBusy){

		console.log("Poping and assigning for "+pndingCon_length+" in queue");

		pendingConn.splice(0, 1);

		//Make sure waiting connections does not exceed our expected wait connections
		if(pndingCon_length < 10)
			pndingCon_length++;
		console.log("loop value: " + loop());

		return (loop());
	}

	return null;

};*/