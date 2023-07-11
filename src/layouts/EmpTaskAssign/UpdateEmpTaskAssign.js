/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
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
import Grid from "@mui/material/Grid";
import "./EmpTaskAssign.css";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useLocation, useNavigate } from "react-router-dom";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function UpdateEmpTaskAssign() {
  const location = useLocation();
  const editTask = location.state.empTask;

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    recId: Object.keys(editTask).length > 0 ? editTask.recId : "",
    employeeTaskEmpCode: Object.keys(editTask).length > 0 ? editTask.employeeTaskEmpCode : "",
    employeeTaskProjectID: Object.keys(editTask).length > 0 ? editTask.employeeTaskProjectID : "",
    employeeTaskName: Object.keys(editTask).length > 0 ? editTask.employeeTaskName : "",
    employeeTaskDescription:
      Object.keys(editTask).length > 0 ? editTask.employeeTaskDescription : "",
    employeeTaskDuration: Object.keys(editTask).length > 0 ? editTask.employeeTaskDuration : "",
  });

  const AuthGEt = JSON.parse(localStorage.getItem("myData"));
  const [empTask, setempTask] = useState([]);
  const [empProject, setempProject] = useState([]);
  const [error, setError] = useState("");

  const payLoad = {
    recId: formState.recId,
    employeeTaskEmpCode: formState.employeeTaskEmpCode,
    employeeTaskProjectID: 0,
    employeeTaskName: formState.employeeTaskName,
    employeeTaskDescription: formState.employeeTaskDescription,
    employeeTaskDuration: formState.employeeTaskDuration,
    employeeTaskStar: 0,
    status: 1,
    createdBy: AuthGEt.employeeName,
    modifiedBy: AuthGEt.employeeName,
  };

  const UpdateEmployeeTask = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/EmployeeTask/UpdateEmployeeTask",
        payLoad
      );
      setempTask(response.data);
      navigate("/layouts/employeetaskassign");
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const [empData, setEmpData] = useState([]);

  const GetEmpData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetEmployees");
      setEmpData(res.data);
    } catch (err) {
      setErrorss(err.message);
    }
  };
  const GetProjects = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Project/GetProjects");
      setempProject(res.data);
    } catch (err) {
      setErrorss(err.message);
    }
  };

  const handleEditClick = (data) => {
    navigate("layouts/updateemployeetaskassign", {
      state: {
        empTask: data,
      },
    });
  };

  useEffect(() => {
    GetEmpData();
    GetProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,

      [name]: value,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {error !== "" && <h4>{error}</h4>}

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
                <MDTypography variant="gradient" color="dark">
                  Update Employee Task
                </MDTypography>
              </MDBox>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={{ padding: "20px" }}
              >
                <Grid item xs={12} sm={6} style={{ marginTop: "30px" }}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Employee Name:
                  </MDTypography>

                  <select
                    className="customSelectBox"
                    type="text"
                    variant="outlined"
                    name="employeeTaskEmpCode"
                    fullWidth
                    value={formState.employeeTaskEmpCode}
                    required
                    onChange={handleChange}
                  >
                    <option>--Select--</option>{" "}
                    {empData.map((item) => (
                      <option key={item.empCode} value={item.empCode}>
                        {item.empFName} {item.empLName}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: "30px" }}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Project Name:
                  </MDTypography>

                  <select
                    className="customSelectBox"
                    type="text"
                    variant="outlined"
                    name="employeeTaskProjectID"
                    fullWidth
                    value={formState.employeeTaskProjectID}
                    required
                    onChange={handleChange}
                  >
                    <option>--Select--</option>{" "}
                    {empProject.map((item) => (
                      <option key={item.projectId} value={item.projectId}>
                        {item.projectEmpCode} {item.projectName}
                      </option>
                    ))}
                  </select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Employee Task Name:
                  </MDTypography>

                  <TextField
                    name="employeeTaskName"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={formState.employeeTaskName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Employee Task Duration(In Days):
                  </MDTypography>

                  <TextField
                    name="employeeTaskDuration"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={formState.employeeTaskDuration}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" fontWeight="bold">
                    Employee Task Description:
                  </MDTypography>

                  <TextareaAutosize
                    className="StyledTextarea"
                    name="employeeTaskDescription"
                    onChange={handleChange}
                    minRows={3}
                    placeholder="Minimum 3 rows"
                    value={formState.employeeTaskDescription}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <MDButton variant="gradient" color="info" onClick={UpdateEmployeeTask}>
                    Submit
                  </MDButton>

                  <MDButton
                    variant="gradient"
                    color="light"
                    sx={{ marginLeft: "10px" }}
                    onClick={() => navigate("/layouts/employeetaskassign")}
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
  );
}

export default UpdateEmpTaskAssign;
