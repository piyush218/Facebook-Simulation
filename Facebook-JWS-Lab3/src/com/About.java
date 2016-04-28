package com;

//import java.util.ArrayList;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.jws.WebService;

import com.bean.EduDetails;
import com.bean.UserDetails;
import com.bean.WorkDetails;
import com.dbconnection.DbConnection;

@WebService
public class About {

	public UserDetails about(String userId) {

		Connection conn = null;
		Statement stmt = null;

		UserDetails userDetails = new UserDetails();

		// ArrayList<UserDetails> arrayList = new ArrayList<UserDetails>();

		try {

			conn = DbConnection.getConnection();
			stmt = conn.createStatement();

			String query = "SELECT  tb1.interests_music, tb1.interests_shows, tb1.interests_sports, "
					+ "tb1.dateOfBirth, tb1.phoneNumber, tb1.relationship, tb1.city, "
					+ "tb1.country, tb2.emailId FROM userdetail tb1 "
					+ "INNER JOIN login tb2 ON tb1.USERID = tb2.userId where tb1.userId = " + userId + "";

			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {

				userDetails.setInterests_music(rs.getString("interests_music"));
				userDetails.setInterests_shows(rs.getString("interests_shows"));
				userDetails.setInterests_sports(rs.getString("interests_sports"));
				userDetails.setDateOfBirth(rs.getString("dateOfBirth"));
				userDetails.setPhoneNumber(rs.getString("phoneNumber"));
				userDetails.setRelationship(rs.getString("relationship"));
				userDetails.setCity(rs.getString("city"));
				userDetails.setCountry(rs.getString("country"));
				userDetails.setEmailId(rs.getString("emailId"));

				// arrayList.add(userDetails);

			}

			rs.close();
			stmt.close();
			conn.close();

		} catch (SQLException se) {
			// Handle errors for JDBC

			System.out.println("inside sql exception");

			se.printStackTrace();
		} catch (Exception e) {

		}
		return userDetails;
	}

	public WorkDetails work(String userId) {

		Connection conn = null;

		PreparedStatement stmt = null;

		WorkDetails workDetails = new WorkDetails();

		try {

			conn = DbConnection.getConnection();

			String workquery = "select COMPANYNAME, POSITION from workdetails where userId=?";
			stmt = conn.prepareStatement(workquery);
			stmt.setString(0, userId);
			ResultSet rs = stmt.executeQuery(workquery);

			while (rs.next()) {

				workDetails.setCompanyName(rs.getString("COMPANYNAME"));
				workDetails.setPosition(rs.getString("POSITION"));
			}

			rs.close();

			stmt.close();
			conn.close();

		} catch (SQLException se) {
			// Handle errors for JDBC

			System.out.println("inside sql exception");

			se.printStackTrace();
		} catch (Exception e) {

		}

		return workDetails;

	}

	public EduDetails education(String userId) {

		Connection conn = null;

		PreparedStatement stmt = null;

		EduDetails eduDetails = new EduDetails();

		try {

			conn = DbConnection.getConnection();

			String eduquery = "select SCHOOLNAME, major from educationdetails where userId=?";
			stmt = conn.prepareStatement(eduquery);
			stmt.setString(0, userId);
			ResultSet rs = stmt.executeQuery(eduquery);

			while (rs.next()) {

				eduDetails.setSchoolName(rs.getString("SCHOOLNAME"));
				eduDetails.setMajor(rs.getString("major"));
			}

			rs.close();
			stmt.close();
			conn.close();

		} catch (SQLException se) {
			// Handle errors for JDBC

			System.out.println("inside sql exception");

			se.printStackTrace();
		} catch (Exception e) {

		}

		return eduDetails;
	}
}
