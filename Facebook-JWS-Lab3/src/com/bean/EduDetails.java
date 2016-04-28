package com.bean;

import java.sql.Date;

public class EduDetails {

	Double edu_Id;
	Double userId;
	String schoolName;
	String major;
	String startDate;
	String endDate;
	
	
	public Double getEdu_Id() {
		return edu_Id;
	}
	public void setEdu_Id(Double edu_Id) {
		this.edu_Id = edu_Id;
	}
	public Double getUserId() {
		return userId;
	}
	public void setUserId(Double userId) {
		this.userId = userId;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}
