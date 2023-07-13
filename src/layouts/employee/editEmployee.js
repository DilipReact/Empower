/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Autocomplete, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
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

export default function EditEmployee() {
  const [errormessage, setErrorMessage] = useState({});

  const [checked, setChecked] = React.useState(false);

  const location = useLocation();

  const editData = location.state.empData;

  const [maritalstatus, setmaritalstatus] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const [empData, setEmpData] = useState([]);

  const [errorss, setErrorss] = useState("");

  const GetEmpData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetEmployees");

      setEmpData(res.data);
    } catch (err) {
      setErrorss(err.message);

      console.log(errorss);
    }
  };

  useEffect(() => {
    GetEmpData();

    // EditEmplyeeDetails();
  }, []);

  console.log(editData);
  const AuthGEt = JSON.parse(localStorage.getItem("myData"));
  const [gender, setGender] = useState([]);
  const [errors, setErrors] = useState("");
  const [role, setRole] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [formState, setFormState] = useState({
    empCode: Object.keys(editData).length > 0 ? editData.empCode : "",
    empFName: Object.keys(editData).length > 0 ? editData.empFName : "",
    empMName: Object.keys(editData).length > 0 ? editData.empMName : "",
    empLName: Object.keys(editData).length > 0 ? editData.empLName : "",
    empFatherName: Object.keys(editData).length > 0 ? editData.empFatherName : "",
    empEmailId: Object.keys(editData).length > 0 ? editData.empEmailId : "",
    empPersonalEmailId: Object.keys(editData).length > 0 ? editData.empPersonalEmailId : "",
    empMobileNumber: Object.keys(editData).length > 0 ? editData.empMobileNumber : "",
    empEmergencyContactNumber:Object.keys(editData).length > 0 ? editData.empEmergencyContactNumber : "",
    empGenderId: Object.keys(editData).length > 0 ? editData.empGenderId : "",
    empLeaderId: Object.keys(editData).length > 0 ? editData.empLeaderId : "",
    empStatusId: Object.keys(editData).length > 0 ? editData.empStatusId : "",
    empJoiningDate: Object.keys(editData).length > 0 ? editData.empJoiningDate : "",
    empDesignationId: Object.keys(editData).length > 0 ? editData.empDesignationId : "",
    empDateofBirth: Object.keys(editData).length > 0 ? editData.empDateofBirth : "",
    empMaritalStatusId: Object.keys(editData).length > 0 ? editData.empMaritalStatusId : "",
    empDateofMarriage: Object.keys(editData).length > 0 ? editData.empDateofMarriage : "",
    empLeavingReason: Object.keys(editData).length > 0 ? editData.empLeavingReason : "",
    empLeavingDate: Object.keys(editData).length > 0 ? editData.empLeavingDate : "",
    reJoining: Object.keys(editData).length > 0 ? editData.reJoining : "",
    oldEmpid: Object.keys(editData).length > 0 ? editData.oldEmpid : "",
    empPAN: Object.keys(editData).length > 0 ? editData.empPAN : "",
    empAadhar: Object.keys(editData).length > 0 ? editData.empAadhar : "",
    empHobbies: Object.keys(editData).length > 0 ? editData.empHobbies : "",
    emplanguage: Object.keys(editData).length > 0 ? editData.emplanguage : "",
    empSummary: Object.keys(editData).length > 0 ? editData.empSummary : "",
    empSkills: Object.keys(editData).length > 0 ? editData.empSkills : "",
    empLastCompany: Object.keys(editData).length > 0 ? editData.empLastCompany : "",
    empLead: Object.keys(editData).length > 0 ? editData.empLead : "",
    empRoleId: Object.keys(editData).length > 0 ? editData.empRoleId : "",
    createdBy: Object.keys(AuthGEt).length > 0 ? AuthGEt.employeeName : "",
    modifiedBy: Object.keys(AuthGEt).length > 0 ? AuthGEt.employeeName : "",
  });

  const employeePayload = {
    empCode: formState.empCode,
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
    reJoining: true,
    empPAN: formState.empPAN,
    empAadhar: formState.empAadhar,
    oldEmpid: formState.oldEmpid,
    emplanguage: formState.emplanguage,
    empLastCompany: formState.empLastCompany,
    empSummary: formState.empSummary,
    empSkills: formState.empSkills,
    empHobbies: formState.empHobbies,
    empLead: true,
    empStatusId: formState.empStatusId,
    empLeaderId: formState.empLeaderId,
    empLeavingReason: formState.empLeavingReason,
    empLeavingDate: formState.empLeavingDate,
    createdBy: AuthGEt.employeeName,
    modifiedBy: AuthGEt.employeeName,
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

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validateForm = () => {
    const errorMessage = {};

    // Validate empFName
    if (formState.empFName === "") {
      errormessage.empFName = "Employee First Name is required";
      // eslint-disable-next-line no-empty
    } else {
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

    setErrorMessage({ ...errormessage });
    // Return true if there are no errors
    return Object.keys(errormessage).length < 1;
  };

  const updateEmployee = async (e) => {
    if (e) {
      e.preventDefault();
       const isValide = validateForm();
    if (isValide) {
      axios
        .post("https://localhost:5001/api/Employee/UpdateEmployee", employeePayload)
        .then((response) => {
          // Handle the response
          console.log(response.data, "api data");
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
          navigate("/employee");
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
    }
  // console.log("employeePayload", employeePayload);
  };

  const [error, setError] = useState("");

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

  // API Implementation of Designation

  const GetDesignation = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Designation/GetDesignations");

      setDesignation(res.data);
    } catch (err) {
      setErrors(err.message);

      console.log(error);
    }
  };

  // api integration

  const GetMaritalStatus = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/MaritalStatus/GetMaritalStatus");

      setmaritalstatus(res.data);
    } catch (err) {
      setErrors(err.message);

      console.log(error);
    }
  };

  useEffect(() => {
    GetRole();

    GetMaritalStatus();

    GetGender();

    GetDesignation();

    updateEmployee();
  }, []);

  function handleClick() {
    navigate("/employee");
  }

  const handleChange = (e) => {
    if (e.target.name === "reJoining") {
      setChecked(e.target.checked);
    }

    const { name, value } = e.target;

    setFormState({
      ...formState,

      [name]: value,
    });
  };

  return (
    <>
      <DashboardLayout>
        {isSuccess ? (
          <Stack sx={{ width: "100%", position: "fixed", top: 0, zIndex: 9999 }} spacing={2}>
            <Alert severity="success">This is a success alert — check it out!</Alert>
          </Stack>
        ) : null}

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
                    Update Employee Details
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
                      variant="outlined"
                      fullWidth
                      value={formState.empDateofBirth.slice(
                        0,

                        formState.empDateofBirth.indexOf("T")
                      )}
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
                      // defaultValue={formState.empGenderId}

                      value={formState.empGenderId}
                      onChange={handleChange}
                      name="empGenderId"
                    >
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
                      variant="outlined"
                      fullWidth
                      value={formState.empJoiningDate.slice(
                        0,

                        formState.empJoiningDate.indexOf("T")
                      )}
                      onChange={handleChange}
                    />

                    <Box className="error">{errormessage.empJoiningDate}</Box>
                  </Grid>

                  {/* // for Role Dropdown */}

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Role:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      value={formState.empRoleId}
                      onChange={handleChange}
                      name="empRoleId"
                    >
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
                      value={formState.empDesignationId}
                      onChange={handleChange}
                      name="empDesignationId"
                    >
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
                      value={formState.empLead}
                      onChange={handleChange}
                      name="empLead"
                    >
                      <option value={1}>True</option>

                      <option value={0}>False</option>
                    </select>

                    <Box className="error">{errormessage.empLead}</Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h6" fontWeight="bold">
                      Employee Leader:
                    </MDTypography>

                    <select
                      className="customSelectBox"
                      value={formState.empLeaderId}
                      onChange={handleChange}
                      name="empLeaderId"
                    >
                      {empData.map((item) => (
                        <option key={item.empCode} defaultValue={item.empCode}>
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
                      value={formState.empMaritalStatusId}
                      onChange={handleChange}
                      name="empMaritalStatusId"
                    >
                      {maritalstatus.map((item) => (
                        <option key={item.maritalStatusId} defaultValue={item.maritalStatusId}>
                          {item.maritalStatusText}{" "}
                        </option>
                      ))}
                    </select>
                  </Grid>

                  {formState.empMaritalStatusId === 1 ? (
                    <Grid item xs={12} sm={6}>
                      <MDTypography variant="h6" fontWeight="bold">
                        Date of Marriage:
                      </MDTypography>

                      <TextField
                        name="empDateofMarriage"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={formState.empDateofMarriage}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : null}

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
                    <MDButton variant="gradient" color="info" onClick={updateEmployee}>
                      Update
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
