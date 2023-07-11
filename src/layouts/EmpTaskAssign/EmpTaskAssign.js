/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
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
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MDButton from "components/MDButton";

function EmpTaskAssign() {
  const [formState, setFormState] = useState({
    empName: "",
    employeeTaskEmpCode: "",
    employeeTaskProjectID: "",
    employeeTaskName: "",
    employeeTaskDescription: "",
    employeeTaskDuration: "",
  });

  const [empTask, setempTask] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const GetEmployeeTasks = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/EmployeeTask/GetEmployeeTasks");
      setempTask(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (data) => {
    navigate("/layouts/updateemployeetaskassign", {
      state: {
        empTask: data,
      },
    });
  };

  const handleClick = () => {
    navigate("/layouts/addemployeetaskassign");
  };

  useEffect(() => {
    GetEmployeeTasks();
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
                <MDButton variant="gradient" color="dark" onClick={handleClick}>
                  Add Employee Task+
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                <Grid container style={{ padding: "30px" }}>
                  <Table>
                    <TableRow>
                      <th>TaskEmp Code </th>
                      <th>Task Name</th>
                      <th>Task Description</th>
                      <th>Task Duration(In Days) </th>
                      <th>Action</th>
                    </TableRow>
                    {empTask.map((item, key) => (
                      <TableRow>
                        <TableCell>{item.employeeTaskEmpCode}</TableCell>
                        <TableCell>{item.employeeTaskName}</TableCell>
                        <TableCell>{item.employeeTaskDescription}</TableCell>
                        <TableCell>{item.employeeTaskDuration}</TableCell>
                        <TableCell>
                          <MDBox style={{ display: "flex" }}>
                            <Grid>
                              <EditIcon
                                onClick={() => handleEditClick(item)}
                                style={{
                                  backgroundColor: "#5072A7",
                                  color: "white",
                                  padding: "5%",
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "5px",
                                }}
                              />
                            </Grid>
                          </MDBox>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default EmpTaskAssign;
