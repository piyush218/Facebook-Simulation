package com;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;

import com.dbconnection.DbConnection;

@WebService
public class Login {

	/*
	 * static final String jdbc_driver = "com.mysql.jdbc.Driver";
	 * 
	 * static final String db_url = "jdbc:mysql://localhost:3308/facebook";
	 * 
	 * static final String db_username = "root";
	 * 
	 * static final String db_password = "Chirag123!@";
	 */
	public Double login(String username, String password) {

		// boolean loginTrue = false;

		Connection conn = null;
		PreparedStatement stmt = null;

		Double userId = null;

		try {
			// STEP 2: Register JDBC driver
			// Class.forName(jdbc_driver);

			// STEP 3: Open a connection
			System.out.println("Connecting to database...");
			// conn =
			// DriverManager.getConnection(db_url,db_username,db_password);

			conn = DbConnection.getConnection();

			System.out.println("connection " + conn);

			// STEP 4: Execute a query
			System.out.println("Creating statement...");
			String sql;
			sql = "SELECT * FROM users where emailid = ?";
			stmt = conn.prepareStatement(sql);
			stmt.setString(0, username);
			System.out.println("query " + sql);
			ResultSet rs = stmt.executeQuery(sql);

			System.out.println("Before rs " + rs);

			// STEP 5: Extract data from result set
			while (rs.next()) {
				// Retrieve by column name
				String userName = rs.getString("emailId");
				String passWord = rs.getString("passwrd");

				System.out.println("username " + userName);
				System.out.println("password " + passWord);

				if (userName.equals(username) && passWord.equals(password)) {
					System.out.println("true");
					userId = rs.getDouble("userId");
					// loginTrue = true;
				}

			}
			// STEP 6: Clean-up environment
			rs.close();
			stmt.close();
			conn.close();
		} catch (SQLException se) {
			// Handle errors for JDBC

			System.out.println("inside sql exception");

			se.printStackTrace();
		} catch (Exception e) {
			// Handle errors for Class.forName

			System.out.println("inside sql exception");
			e.printStackTrace();
		}

		return userId;
	}

}