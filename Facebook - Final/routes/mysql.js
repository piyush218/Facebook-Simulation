var mysql = require('mysql');

var pool = require('./mysql_pool');

var connection;

var getConnection = function(){
	var connection = mysql.createConnection({
		 host     : 'localhost',
		 user     : 'facebook',
		 password : '',
		 database : 'test',
		 port	 : 3306,
		 multipleStatements: true
	});
	//console.log("get connection method " + connection.toString());
	return connection;
}

exports.fetchData = function fetchData(functionCall,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
//	var connection = pool.getConnFromPool();
	//while(connection == null)
		//connection = pool.deQueue();
	
	console.log("connection " + connection);
	
	connection.query(sqlQuery, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else{
			//pool.releaseConn(connection);
			console.log("\n Fetch Data - Connection released..");
			functionCall(err, rows);
		}
	});
	
	connection.end();
	

};

exports.addData = function addData(functionCall, sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
		
	var connection=getConnection();
//	connection = pool.getConnFromPool(this.connection);
		
		connection.query(sqlQuery, function(err, result) {
			if(err){
				console.log("ERROR: " + err.message);
			}
			else{
				//pool.releaseConn(connection);
				console.log("\n Add Data - Connection released..");
				
				functionCall(err, result);
			}
		});
		
		connection.end();	
};