/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-irregular-whitespace */

/* eslint-disable no-console */

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */

/* eslint-disable import/no-duplicates */

/* eslint-disable react/self-closing-comp */

/* eslint-disable react/jsx-boolean-value */

/* eslint-disable prettier/prettier */

/**

=========================================================

* Material Dashboard 2 React - v2.1.0

=========================================================




* Product Page: https://www.creative-tim.com/product/material-dashboard-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)




Coded by www.creative-tim.com




 =========================================================




* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components

import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// import DataTable from "examples/Tables/DataTable";

// Data

// import authorsTableData from "layouts/tables/data/authorsTableData";

// import projectsTableData from "layouts/tables/data/projectsTableData";

// import MDButton from "components/MDButton";

const namesoption = [
  "  Operating systems",
  " Programming",
  " Security",
  " Servers",
  "  Software",
  "Solution delivery",
  "  Structures",
  "  Systems analysis",
  "  Technical support",
  "  Technology",
  " Testing",
  " Tools",
  " Training",
  " Troubleshooting",
  " klApplications",
  " Coding",
  "  Computing",
  " Configuration",
  "Customer support",
  "Debugging",
  "Design",
  "  Development",
  " Hardware",
  "  HTML",
  " Information technology",
];

export default function AddEmployee() {
  const [errormessage, setErrorMessage] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [empData, setEmpData] = useState([]);
  const [errorss, setErrorss] = useState("");
  const [employeeData, setemployeeData] = useState("");
  const [gender, setGender] = useState([]);
  const [errors, setErrors] = useState("");
  const [role, setRole] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [maritalstatus, setmaritalstatus] = useState([]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    empFName: "",
    empMName: "",
    empLName: "",
    empFatherName: "",
    empEmailId: "",
    empPersonalEmailId: "",
    empMobileNumber: "",
    empEmergencyContactNumber: "",
    empGenderId: "",
    empJoiningDate: "",
    empDesignationId: "",
    empDateofBirth: "",
    empMaritalStatusId: "",
    empDateofMarriage: "",
    reJoining: "",
    oldEmpid: "",
    empPAN: "",
    empAadhar: "",
    empHobbies: "",
    empSkills: "",
    emplanguage: "",
    empSummary: "",
    empLastCompany: "",
    empLead: "",
    empRoleId: "",
    empStatusId: "",
  });

  const handleClick = () => {
    navigate("/employee");
  };

  const AuthGEt = JSON.parse(localStorage.getItem("myData"));
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
  const validateForm = () => {
    const errormessage = {};
    // Validate empFName
    if (formState.empFName === "") {
      errormessage.empFName = "Employee First Name is required";
    }
    // Validate empMName
    if (formState.empMName === "") {
      errormessage.empMName = "Employee Middle Name is required";
    }
    // Validate empLName
    if (formState.empLName === "") {
      errormessage.empLName = "Employee Last Name is required";
    }
    // Validate empFatherName
    if (formState.empFatherName === "") {
      errormessage.empFatherName = "Employee Father Name is required";
    }
    // Validate empEmailId
    if (formState.empEmailId === "") {
      errormessage.empEmailId = "Email is required";
    } else if (!emailRegex.test(formState.empEmailId)) {
      errormessage.empEmailId = "Invalid email address";
    }
    // Validate empPersonalEmailId
    if (formState.empPersonalEmailId === "") {
      errormessage.empPersonalEmailId = "Personal EmailId is required";
    } else if (!emailRegex.test(formState.empPersonalEmailId)) {
      errormessage.empPersonalEmailId = "Invalid email address";
    }
    // Validate empMobileNumber
    if (formState.empMobileNumber === "") {
      errormessage.empMobileNumber = "Employee Mobile Number is required";
    } else if (!numberRegex.test(formState.empMobileNumber)) {
      errormessage.empMobileNumber = "Invalid Number";
    }
    // Validate empEmergencyContactNumber
    if (formState.empEmergencyContactNumber === "") {
      errormessage.empEmergencyContactNumber = "Employee Emergency Contact Number is required";
    }
    // Validate empSkills
    if (formState.empSkills === "") {
      errormessage.empSkills = "Employee Skills is required";
    }
    // Validate empDateofBirth
    if (formState.empDateofBirth === "") {
      errormessage.empDateofBirth = "Employee Date of Birth is required";
    }
    // Validate emplanguage
    if (formState.emplanguage === "") {
      errormessage.emplanguage = "Employee Language is required";
    }
    // Validate empHobbies

    if (formState.empHobbies === "") {
      errormessage.empHobbies = "Employee Hobbies is required";
    }
    // Validate empGenderId
    if (formState.empGenderId === "") {
      errormessage.empGenderId = "Employee Gender is required";
    }
    // Validate empJoiningDate
    if (formState.empJoiningDate === "") {
      errormessage.empJoiningDate = "Employee Joining Date is required";
    }
    // Validate empRoleId
    if (formState.empRoleId === "") {
      errormessage.empRoleId = "Employee Role is required";
    }
    // Validate empLastCompany
    if (formState.empLastCompany === "") {
      errormessage.empLastCompany = "Employee Last Company is required";
    }
    // Validate empPAN
    if (formState.empPAN === "") {
      errormessage.empPAN = "Employee PAN is required";
    }
    // Validate empAadhar
    if (formState.empAadhar === "") {
      errormessage.empAadhar = "Employee Aadhar is required";
    }
    // Validate empDesignationId
    if (formState.empDesignationId === "") {
      errormessage.empDesignationId = "Employee Designation is required";
    }
    // Validate empLeaderId
    if (formState.empLeaderId === "") {
      errormessage.empLeaderId = "Employee Leader is required";
    }
    setErrorMessage(errormessage);
    // Return true if there are no errors
    return Object.keys(errormessage).length < 1;
  };

  const employeePayload = {
    empCode: "",
    empFName: formState.empFName,
    empMName: formState.empMName,
    empLName: formState.empLName,
    empFatherName: formState.empFatherName,
    empEmailId: formState.empEmailId,
    empPersonalEmailId: formState.empPersonalEmailId,
    empMobileNumber: formState.empMobileNumber,
    empEmergencyContactNumber: formState.empEmergencyContactNumber,
    empRoleId: parseInt(formState.empRoleId),
    empGenderId: parseInt(formState.empGenderId),
    empDesignationId: parseInt(formState.empDesignationId),
    empJoiningDate: formState.empJoiningDate,
    empDateofBirth: formState.empDateofBirth,
    empMaritalStatusId: parseInt(formState.empMaritalStatusId),
    empDateofMarriage: formState.empDateofMarriage,
    empHobbies: formState.empHobbies,
    reJoining: true,
    empPAN: formState.empPAN,
    empAadhar: formState.empAadhar,
    oldEmpid: formState.oldEmpid,
    emplanguage: formState.emplanguage,
    empLastCompany: formState.empLastCompany,
    empSummary: formState.empSummary,
    empSkills: formState.empSkills,
    empStatusId: 1,
    createdBy: AuthGEt.employeeName,
    modifiedBy: AuthGEt.employeeName,
    empLead: true,
    empLeaderId: formState.empLeaderId,
    empLeavingReason: "",
    empLeavingDate: "2023-05-30T11:17:02.688Z",
    employeeStatus: {
      empStatusId: 0,
      empStatusText: "",
    },

    role: {
      roleId: 0,
      roleText: "",
    },

    gender: {
      genderId: 0,
      genderText: "",
    },

    designation: {
      designationId: 0,
      designationName: "",
      designationDescription: "",
      designationStatus: true,
      createdBy: AuthGEt.employeeName,
      modifiedBy: AuthGEt.employeeName,
    },
  };

  const createEmployee = async (event) => {
    event.preventDefault();
    const isValide = validateForm();
    if (isValide) {
      axios
        .post("http://localhost:5000/api/Employee/CreateEmployee", employeePayload)
        .then((res) => {
          setemployeeData(res.data);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
          navigate("/employee");
        })

        .catch(() => {
          console.error();
          setFormState({
            empFName: "",
            empMName: "",
            empLName: "",
            empFatherName: "",
            empEmailId: "",
            empPersonalEmailId: "",
            empMobileNumber: "",
            empEmergencyContactNumber: "",
            empGenderId: "",
            empJoiningDate: "",
            empDesignationId: "",
            empDateofBirth: "",
            empMaritalStatusId: "",
            empDateofMarriage: "",
            reJoining: "",
            oldEmpid: "",
            empPAN: "",
            empAadhar: "",
            empHobbies: "",
            empSkills: "",
            emplanguage: "",
            empSummary: "",
            empLastCompany: "",
            empLead: "",
            empRoleId: "",
            empStatusId: "",
          });
        });
    }

    console.log(formState);
  };

  const GetEmpData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetEmployees");
      setEmpData(res.data);
    } catch (err) {
      setErrorss(err.message);
      console.log(errorss);
    }
  };

  const GetRole = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Role/GetRole");
      setRole(res.data);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  const GetGender = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Gender/GetGender");
      setGender(res.data);
    } catch (err) {
      setErrors(err.message);
      console.log(error);
    }
  };

  const GetDesignation = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Designation/GetDesignations");
      setDesignation(res.data);
    } catch (err) {
      setErrors(err.message);
      console.log(error);
    }
  };

  const GetMaritalStatus = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/MaritalStatus/GetMaritalStatus");
      setmaritalstatus(res.data);
    } catch (err) {
      setErrors(err.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const AddOtherActivities = () => {
    navigate("/layouts/Othesactivities");
  };

  useEffect(() => {
    GetEmpData();
    GetRole();
    GetMaritalStatus();
    GetDesignation();
    GetGender();
  }, []);

  return (
    <>
      {isSuccess ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">This is a success alert — check it out!</Alert>
        </Stack>
      ) : null}

      <DashboardLayout>
        <DashboardNavbar />

        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor=""
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h5" fontWeight="medium">
                    Employee Create
                  </MDTypography>
                </MDBox>

                <Grid container spacing={2} style={{ padding: "20px" }}>
                  <Grid item xs={12} sm={6} style={{ marginTop: "30px" }}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee First Name:
                    </MDTypography>

                    <TextField
                      name="empFName"
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={formState.empFName}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empFName}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6} style={{ marginTop: "30px" }}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Middle Name:
                    </MDTypography>

                    <TextField
                      name="empMName"
                      variant="outlined"
                      fullWidth
                      value={formState.empMName}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empMName}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Last Name:
                    </MDTypography>

                    <TextField
                      name="empLName"
                      variant="outlined"
                      fullWidth
                      value={formState.empLName}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empLName}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Father Name:
                    </MDTypography>

                    <TextField
                      name="empFatherName"
                      variant="outlined"
                      fullWidth
                      value={formState.empFatherName}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empFatherName}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Email:
                    </MDTypography>

                    <TextField
                      name="empEmailId"
                      variant="outlined"
                      fullWidth
                      value={formState.empEmailId}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empEmailId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Personal Email:
                    </MDTypography>

                    <TextField
                      name="empPersonalEmailId"
                      variant="outlined"
                      fullWidth
                      value={formState.empPersonalEmailId}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empPersonalEmailId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Mobile Number:
                    </MDTypography>

                    <TextField
                      name="empMobileNumber"
                      variant="outlined"
                      fullWidth
                      value={formState.empMobileNumber}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empMobileNumber}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Emergency Contact:
                    </MDTypography>

                    <TextField
                      name="empEmergencyContactNumber"
                      variant="outlined"
                      fullWidth
                      value={formState.empEmergencyContactNumber}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empEmergencyContactNumber}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Skills:
                    </MDTypography>

                    <TextField
                      name="empSkills"
                      variant="outlined"
                      fullWidth
                      value={formState.empSkills}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empSkills}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Date Of Birth:
                    </MDTypography>

                    <TextField
                      name="empDateofBirth"
                      type="date"
                      inputFormat="YYYY/MM/DD"
                      variant="outlined"
                      fullWidth
                      value={formState.empDateofBirth}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empDateofBirth}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Language:
                    </MDTypography>

                    <TextField
                      name="emplanguage"
                      variant="outlined"
                      fullWidth
                      value={formState.emplanguage}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.emplanguage}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Hobbies:
                    </MDTypography>

                    <TextField
                      name="empHobbies"
                      variant="outlined"
                      fullWidth
                      value={formState.empHobbies}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empHobbies}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Gender:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      name="empGenderId"
                      value={formState.empGenderId}
                      onChange={handleChange}
                    >
                      <option>--Select--</option>

                      {gender.map((item) => (
                        <option key={item.genderId} value={item.genderId}>
                          {item.genderText}{" "}
                        </option>
                      ))}
                    </select>

                    <Box className="error">{errormessage.empGenderId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Date of Joining:
                    </MDTypography>

                    <TextField
                      name="empJoiningDate"
                      type="date"
                      inputFormat="YYYY/MM/DD"
                      variant="outlined"
                      fullWidth
                      value={formState.empJoiningDate}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empJoiningDate}</Box>
                  </Grid>

                  {/* // for Role Dropdown */}

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Role:
                    </MDTypography>

                    <select className="customSelectBox" name="empRoleId" onChange={handleChange}>
                      <option>--Select--</option>

                      {role.map((item) => (
                        <option key={item.roleId} value={item.roleId}>
                          {item.roleText}{" "}
                        </option>
                      ))}
                    </select>

                    <Box className="error">{errormessage.empRoleId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Last Company:
                    </MDTypography>

                    <TextField
                      name="empLastCompany"
                      variant="outlined"
                      fullWidth
                      value={formState.empLastCompany}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empLastCompany}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      PAN Number:
                    </MDTypography>

                    <TextField
                      name="empPAN"
                      variant="outlined"
                      fullWidth
                      value={formState.empPAN}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empPAN}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      AADHAR Number:
                    </MDTypography>

                    <TextField
                      name="empAadhar"
                      variant="outlined"
                      fullWidth
                      value={formState.empAadhar}
                      onChange={handleChange}
                      required
                    />

                    <Box className="error">{errormessage.empAadhar}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Designation:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      name="empDesignationId"
                      onChange={handleChange}
                    >
                      <option>--Select--</option>

                      {designation.map((item) => (
                        <option key={item.designationId} value={item.designationId}>
                          {item.designationName}{" "}
                        </option>
                      ))}
                    </select>

                    <Box className="error">{errormessage.empDesignationId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Lead:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      name="empLead"
                      value={formState.empLead}
                      onChange={handleChange}
                    >
                      <option>--Select--</option>

                      <option value={1}>True</option>

                      <option value={0}>False</option>
                    </select>

                    <Box className="error">{errormessage.empLead}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Leader:
                    </MDTypography>

                    <select className="customSelectBox" name="empLeaderId" onChange={handleChange}>
                      <option>--Select--</option>{" "}
                      {empData.map((item) => (
                        <option key={item.empCode} value={item.empCode}>
                          {item.empFName} {item.empLName}
                        </option>
                      ))}
                    </select>

                    <Box className="error">{errormessage.empLeaderId}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Summary:
                    </MDTypography>

                    <TextField
                      name="empSummary"
                      variant="outlined"
                      fullWidth
                      value={formState.empSummary}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Marital Status:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      name="empMaritalStatusId"
                      value={formState.maritalStatusId}
                      onChange={handleChange}
                    >
                      <option>--Select--</option>{" "}
                      {maritalstatus.map((item) => (
                        <option key={item.maritalStatusId} value={item.maritalStatusId}>
                          {item.maritalStatusText}{" "}
                        </option>
                      ))}
                    </select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Date of Marriage:
                    </MDTypography>

                    <TextField
                      name="empDateofMarriage"
                      type="date"
                      inputFormat="YYYY/MM/DD"
                      variant="outlined"
                      fullWidth
                      value={formState.empDateofMarriage}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Rejoining:
                    </MDTypography>

                    <Checkbox
                      name="reJoining"
                      checked={checked}
                      value={formState.reJoining}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Grid>

                  {checked ? (
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="h6" fontWeight="bold">
                        Old Employee ID:
                      </MDTypography>

                      <TextField
                        name="oldEmpid"
                        variant="outlined"
                        fullWidth
                        value={formState.oldEmpid}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : null}

                  <Grid item>
                    <MDButton variant="gradient" color="info" onClick={createEmployee}>
                      Submit
                    </MDButton>

                    <MDButton
                      variant="gradient"
                      color="light"
                      sx={{ marginLeft: "10px" }}
                      onClick={handleClick}
                    >
                      Cancel
                    </MDButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <Footer />
      </DashboardLayout>
    </>
  );
}
