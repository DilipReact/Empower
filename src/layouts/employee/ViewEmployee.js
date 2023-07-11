/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable react/function-component-definition */

import { Card, Grid } from "@mui/material";

import MDBox from "components/MDBox";

import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const ViewEmployee = () => {
  const location = useLocation();

  const editData = location.state.empData;

  const [empData, setEmpData] = useState(editData);

  console.log(empData, "empodata");

  const navigate = useNavigate();

  const genderText = empData.empGenderId === 1 ? "Male" : "Female";

  console.log(genderText);

  const roleTexts = {
    1: "Admin",

    2: "BD",

    3: "User",

    // Add more mappings as needed
  };

  const roleText = roleTexts[empData.empRoleId] || "Unknown Role";

  const maritalstatusTexts = {
    5: "Married",

    6: "Unmarried",
  };

  const maritalstatusText = maritalstatusTexts[empData.empMaritalStatusId] || "Unknown";

  console.log(maritalstatusText, "maritalstatusText");

  console.log(roleText, "Role text");

  const designationNameTexts = {
    1: "Senior Software Developer Executive",

    2: "Human Resource Manager",

    5: "Business Development",

    6: "Accountant",

    7: "Team Lead",

    10: "Software Developer Executive ",
  };

  const designationNameText =
    designationNameTexts[empData.empDesignationId] || "Unknown Designation";

  console.log(designationNameText, "designationNameText");

  // Sending state to Employee Documents Component

  function handleEmployeeDoc(data) {
    navigate("/layouts/employeedocument", {
      state: {
        empData: data,
      },
    });

    console.log(data);
  }

  // Sending state to Others Education Component

  const handleEducationClick = (data) => {
    navigate("/layouts/employeeeducation", {
      state: {
        empData: data,
      },
    });
  };

  // Sending state to Others Address Component

  const handleAddressClick = (data) => {
   
    navigate("/layouts/employeeaddress", {
      state: {
        empData: data,
      },
    });
  };

  // Sending state to Others Activities Component

  function handleActivities(data) {
    navigate("/layouts/othesactivities", {
      state: {
        empData: data,
      },
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox
        mx={3}
        mt={1}
        mb={2}
        py={1}
        px={1}
        variant="gradient"
        bgColor=""
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h5" fontWeight="medium">
          View Employee Details
        </MDTypography>

        <Grid
          sx={{
            display: "flex",

            flexDirection: "row",

            justifyContent: "end",

            mar: "auto",
          }}
        >
          <MDButton
            variant="gradient"
            color="dark"
            onClick={() => handleEducationClick(empData)}
            sx={{ marginLeft: "10px" }}
          >
            Education
          </MDButton>

          <MDButton
            sx={{ marginLeft: "10px" }}
            variant="gradient"
            color="dark"
            onClick={() => navigate("/layouts/employeeworeExperience")}
          >
            Work Experience
          </MDButton>

          <MDButton
            sx={{ marginLeft: "10px" }}
            variant="gradient"
            color="dark"
            onClick={() => handleActivities(empData)}
          >
            Other Activities
          </MDButton>

          <MDButton
            sx={{ marginLeft: "10px" }}
            variant="gradient"
            color="dark"
            onClick={() => handleAddressClick(empData)}
          >
            Address
          </MDButton>

          <MDButton
            sx={{ marginLeft: "10px" }}
            variant="gradient"
            color="dark"
            onClick={() => handleEmployeeDoc(empData)}
          >
            Employee Document
          </MDButton>
        </Grid>
      </MDBox>

      <Card>
        <Grid container spacing={3} className="containers">
          <Grid item xs={6} className="box">
            <Grid className="box_head">Employee First Name</Grid>

            <Grid className="box_item">{empData.empFName}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Employee Middle Name</Grid>

            <Grid className="box_item">{empData.empMName}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Employee Last Name</Grid>

            <Grid className="box_item">{empData.empLName}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Employee Father Name</Grid>

            <Grid className="box_item">{empData.empFatherName}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Email</Grid>

            <Grid className="box_item">{empData.empEmailId}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Personal Email</Grid>

            <Grid className="box_item">{empData.empPersonalEmailId}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Mobile Number</Grid>

            <Grid className="box_item">{empData.empMobileNumber}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Emergency Contect</Grid>

            <Grid className="box_item">{empData.empEmergencyContactNumber}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Skills</Grid>

            <Grid className="box_item">{empData.empSkills}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Date Of Birth</Grid>

            <Grid className="box_item">{empData.empDateofBirth}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Language</Grid>

            <Grid className="box_item">{empData.emplanguage}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Hobbies</Grid>

            <Grid className="box_item">{empData.empHobbies}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Gender</Grid>

            <Grid className="box_item">{empData.empGenderId === 1 ? "Male" : "Female"}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Date Of joining</Grid>

            <Grid className="box_item">{empData.empJoiningDate}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Role</Grid>

            <Grid className="box_item">{roleTexts[empData.empRoleId] || "Unknown Role"}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Designation</Grid>

            <Grid className="box_item">
              {designationNameTexts[empData.empDesignationId] || "Unknown Designation"}
            </Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Employee Last Compeny</Grid>

            <Grid className="box_item">{empData.empLastCompany}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">PAN Number</Grid>

            <Grid className="box_item">{empData.empPAN}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Aadhar Number</Grid>

            <Grid className="box_item">{empData.empAadhar}</Grid>
          </Grid>

          <Grid item xs={6} className="box">
            <Grid className="box_head">Maritial Status</Grid>

            <Grid className="box_item">
              {maritalstatusTexts[empData.empMaritalStatusId] || "Unknown"}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default ViewEmployee;
