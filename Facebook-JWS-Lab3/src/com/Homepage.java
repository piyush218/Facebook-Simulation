package com;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.jws.WebService;

import com.bean.UserDetails;
import com.dbconnection.DbConnection;

@WebService
public class Homepage {

	public UserDetails homepage(String userId) {

		Connection conn = null;
		PreparedStatement stmt = null;

		UserDetails userDetails = new UserDetails();

		try {

			conn = DbConnection.getConnection();

			String query = "SELECT firstname, lastname FROM userdetail where userId = ?";
			stmt = conn.prepareStatement(query);
			stmt.setString(0, userId);
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {

				userDetails.setFirstName(rs.getString("firstname"));
				userDetails.setLastName(rs.getString("lastname"));
			}

			rs.close();
			stmt.close();
			conn.close();

		} catch (SQLException e) {
			System.out.println("SQL error in homepage " + e);
		} catch (Exception e) {
			System.out.println("Exception error in homepage " + e);
		}

		return userDetails;
	}
}
