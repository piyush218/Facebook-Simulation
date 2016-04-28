package com.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbConnection {

	static final String jdbc_driver = "com.mysql.jdbc.Driver";

	static final String db_url = "jdbc:mysql://localhost:3304/test";

	static final String db_username = "facebook";

	static final String db_password = "";
	
	
	public static Connection getConnection(){
		
		Connection conn = null;

		try{
			//STEP 2: Register JDBC driver
			Class.forName(jdbc_driver);

			//STEP 3: Open a connection
			System.out.println("Connecting to database...");
			conn = DriverManager.getConnection(db_url,db_username,db_password);
		}
		catch(Exception e){
			System.out.println("Exception");
			e.printStackTrace();
		}
		return conn;
	}
}
