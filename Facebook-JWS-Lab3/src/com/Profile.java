package com;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.jws.WebService;

import com.dbconnection.DbConnection;

@WebService
public class Profile {

	public boolean profile(String userId, String schoolName, String major, String e_startDate, String e_endDate,
			String companyName, String position, String w_startDate, String w_endDate, String phoneNumber,
			String relationship, String city, String country, String music, String shows, String sports) {

		Connection conn = null;
		PreparedStatement stmt = null;
		int rs = 0;

		try {

			conn = DbConnection.getConnection();
			String query = "insert into workdetails(userId, companyname, position, startdate, enddate)"
					+ "values(?,?,?,?,?);"
					+ "insert into educationdetails(userId, SCHOOLNAME, major, STARTDATE, ENDDATE)"
					+ "values(?,?,?,?,?);"
					+ "update userdetail set relationship=?, phoneNumber=?, interests_music=?, interests_shows=?, interests_sports=?,city=?, country=? where userId =?";
			stmt = conn.prepareStatement(query);
			stmt.setString(0, userId);
			stmt.setString(1, companyName);
			stmt.setString(2, position);
			stmt.setString(3, w_startDate);
			stmt.setString(4, w_endDate);
			stmt.setString(5, userId);
			stmt.setString(6, schoolName);
			stmt.setString(7, major);
			stmt.setString(8, e_startDate);
			stmt.setString(9, e_endDate);
			stmt.setString(10, relationship);
			stmt.setString(11, phoneNumber);
			stmt.setString(12, music);
			stmt.setString(13, shows);
			stmt.setString(14, sports);
			stmt.setString(15, city);
			stmt.setString(16, country);
			stmt.setString(17, userId);
			rs = stmt.executeUpdate(query);

		} catch (SQLException e) {
			System.out.println("SQL error in profiles " + e);
		} catch (Exception e) {
			System.out.println("Exception error in profiles  " + e);
		}

		if (rs > 0)
			return true;
		else
			return false;
	}

}
