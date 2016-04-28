package com;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
//import java.util.ArrayList;
//import java.util.ArrayList;

import javax.jws.WebService;

import com.bean.FriendList;
import com.bean.FriendName;
import com.dbconnection.DbConnection;

@WebService
public class Friend {

	public FriendList[] getSessionUserFriend(String userId) {

		Connection conn = null;
		PreparedStatement stmt = null;

		// ArrayList<FriendList> arrayList = new ArrayList<FriendList>();

		FriendList[] friendList = null;

		int i = 0;

		try {

			conn = DbConnection.getConnection();
			String query = "select userId2,status from friendlist where userId1=?";
			stmt = conn.prepareStatement(query);
			stmt.setString(0, userId);
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {

				friendList[i].setUserId1(Double.valueOf(userId));
				friendList[i].setUserId2(rs.getDouble("userId2"));
				friendList[i].setStatus(rs.getInt("status"));

				// arrayList.add(friend);
				i++;
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
		return friendList;
	}

	public FriendName[] getFriendsName(FriendList friendList[]) {

		Connection conn = null;

		Statement stmt = null;

		// ArrayList<FriendName> arrayList = new ArrayList<FriendName>();

		FriendName[] friendName = null;

		try {

			conn = DbConnection.getConnection();

			StringBuilder workquery = new StringBuilder("select firstName,lastName from userdetail where userId IN (");

			for (int i = 0; i < friendList.length; i++) {
				FriendList id = friendList[i];
				workquery.append(String.valueOf(id.getUserId2()));
				if (i > friendList.length - 2) {
					workquery.append(",");
				}
			}
			workquery.append(");");

			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(workquery.toString());

			int i = 0;
			while (rs.next()) {

				// FriendName fn = new FriendName();

				friendName[i].setFirstName(rs.getString("firstName"));
				friendName[i].setLastName(rs.getString("lastName"));
				i++;
				// arrayList.add(fn);
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
		return friendName;

	}

	public FriendList[] getSessionUserPendingFriend(String userId) {

		Connection conn = null;
		PreparedStatement stmt = null;

		// ArrayList<FriendList> arrayList = new ArrayList<FriendList>();

		FriendList[] friendList = null;

		try {

			conn = DbConnection.getConnection();

			String query = "select userId2,status from friendlist where userId1=? AND status=0;";
			stmt = conn.prepareStatement(query);
			stmt.setString(0, userId);
			ResultSet rs = stmt.executeQuery(query);
			int i = 0;
			while (rs.next()) {

				// FriendList friend = new FriendList();

				friendList[i].setUserId1(Double.valueOf(userId));
				friendList[i].setUserId1(rs.getDouble("userId2"));
				friendList[i].setStatus(rs.getInt("status"));

				// arrayList.add(friend);

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
		return friendList;
	}
}
