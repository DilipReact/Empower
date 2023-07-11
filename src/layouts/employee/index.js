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
import "./index.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useNavigate, useParams } from "react-router-dom";
import addEmployee from "./addEmployee";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Data

// import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   tableContainer: {
//     maxHeight: 440,
//   },
// });

function Employee() {
  const [empData, setEmpData] = useState([]);
  const [error, setError] = useState("");
  const [quarry, setQuarry] = useState([]);
  const GetEmpData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetEmployees");
      setEmpData(res.data);
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    GetEmpData();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/employee/addEmployee");
  };

  // handleEditClick

  const handleEditClick = (Data) => {
    navigate("/employee/editEmployee", {
      state: {
        empData: Data,
      },
    });
  };

  const handleViewClick = (data) => {
    console.log(data);
    navigate("/employee/viewEmployee", {
      state: {
        empData: data,
      },
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
                {" "}
                <Grid>
                  {" "}
                  <TextField
                    className="search_box"
                    placeholder="Search..."
                    onChange={(e) => setQuarry(e.target.value)}
                  />
                </Grid>
                <MDButton variant="gradient" color="success" onClick={handleClick}>
                  Add Employee
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                <Grid container style={{ padding: "30px" }}>
                  <Table>
                    <TableRow>
                      <th>Employee Code</th>
                      <th>Employee First Name</th>
                      <th>Employee Last Name</th>
                      <th>Employee Email</th>
                      <th>Employee Number</th>
                      <th>Action</th>
                    </TableRow>

                    {empData
                      .filter(
                        (user) =>
                          user.empFName.toLowerCase().includes(quarry) ||
                          user.empLName.toLowerCase().includes(quarry) ||
                          user.empEmailId.toLowerCase().includes(quarry) ||
                          user.empMobileNumber.toLowerCase().includes(quarry)
                      )

                      .map((item, key) => (
                        <TableRow>
                          <TableCell> {item.empCode}</TableCell>
                          <TableCell>{item.empFName}</TableCell>
                          <TableCell>{item.empLName}</TableCell>
                          <TableCell>{item.empEmailId}</TableCell>
                          <TableCell>{item.empMobileNumber}</TableCell>
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
                                />{" "}
                              </Grid>

                              <Grid>
                                <VisibilityIcon
                                  onClick={() => handleViewClick(item)}
                                  style={{
                                    marginLeft: "10px",
                                    backgroundColor: "#1877F2",
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
          <Grid item xs={12}></Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Employee;
