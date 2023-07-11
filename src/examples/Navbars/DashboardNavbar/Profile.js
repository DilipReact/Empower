/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";

import { Button, Grid, TextField, Card, CardContent, Avatar, Table } from "@mui/material";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import "./Profile.css";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const authToken = localStorage.getItem("authToken");
const mydata = JSON.parse(localStorage.getItem("myData"));
console.log(authToken);

console.log(mydata, "myData");

function Profile() {
  const [formData, setFormData] = useState({
    updateRequestProfileEmpFName: "",
    updateRequestProfileEmpMName: "",
    updateRequestProfileEmpLName: "",
    updateRequestProfileEmpEmailId: "",
    updateRequestProfileEmpMobileNumber: "",
    updateRequestProfileEmpEmergencyContactNumber: "",
    updateRequestProfileEmpPersonalEmailId: "",
  });

  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/UpdateRequestProfile/GetUpdateRequestProfiles"
        );
        const data = response.data;
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (profileData.length > 0) {
      const profile = profileData[0];
      setFormData({
        updateRequestProfileId: id,
        updateRequestProfileEmpCode: empid,
        updateRequestProfileEmpFName: profile.updateRequestProfileEmpFName,
        updateRequestProfileEmpMName: profile.updateRequestProfileEmpMName,
        updateRequestProfileEmpLName: profile.updateRequestProfileEmpLName,
        updateRequestProfileEmpEmailId: profile.updateRequestProfileEmpEmailId,
        updateRequestProfileEmpPersonalEmailId: profile.updateRequestProfileEmpPersonalEmailId,
        updateRequestProfileEmpMobileNumber: profile.updateRequestProfileEmpMobileNumber,
        updateRequestProfileEmpEmergencyContactNumber:
          profile.updateRequestProfileEmpEmergencyContactNumber,
        updateRequestProfileUpdateRequest: true,
        createdBy: "string",
        modifiedBy: "string",
      });
    }
  }, [profileData]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:5001/api/UpdateRequestProfile/UpdateUpdateRequestProfile",
        formData
      );

      if (response.status === 200) {
        setShow(false);
        setProfileData([formData]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LName = profileData[0]?.updateRequestProfileEmpLName;
  const FName = profileData[0]?.updateRequestProfileEmpFName;
  const empid = profileData[0]?.updateRequestProfileEmpCode;
  const id = profileData[0]?.updateRequestProfileId;

  console.log(mydata, "myData");
  console.log(profileData, "Profile Data");
  const filterData = profileData.filter(
    (item) => item.updateRequestProfileEmpCode === mydata.empCode
  );

  console.log(filterData, "filterData");
  console.log(filterData, "filterData");
  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField sx={{ bgcolor: "#fff" }} placeholder="Search...." />
        </Grid>

        {!show ? (
          <Grid item xs={12} md={8}>
            <Card>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email ID</TableCell>
                      <TableCell>Email ID (P)</TableCell>
                      <TableCell>Phone No.</TableCell>
                      <TableCell>Phone No.(P)</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody className="Tabalecell">
                    {filterData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.updateRequestProfileEmpFName} {item.updateRequestProfileEmpMName}{" "}
                          {item.updateRequestProfileEmpLName}
                        </TableCell>
                        <TableCell>{item.updateRequestProfileEmpEmailId}</TableCell>
                        <TableCell>{item.updateRequestProfileEmpPersonalEmailId}</TableCell>
                        <TableCell>{item.updateRequestProfileEmpMobileNumber}</TableCell>
                        <TableCell>{item.updateRequestProfileEmpMobileNumber}</TableCell>
                        <TableCell>
                          <Grid className="edit_icon" onClick={() => setShow(!show)}>
                            <VisibilityIcon id="view_icon" />
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        ) : (
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <label className="label">First Name</label>

                    <TextField
                      name="updateRequestProfileEmpFName"
                      size="small"
                      fullWidth
                      required
                      sx={{ bgcolor: "#fff" }}
                      defaultValue={filterData[0].updateRequestProfileEmpFName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Middle Name</label>

                    <TextField
                      name="updateRequestProfileEmpMName"
                      size="small"
                      fullWidth
                      required
                      sx={{ bgcolor: "#fff" }}
                      defaultValue={filterData[0].updateRequestProfileEmpMName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Last Name</label>

                    <TextField
                      name="updateRequestProfileEmpLName"
                      size="small"
                      fullWidth
                      required
                      sx={{ bgcolor: "#fff" }}
                      defaultValue={filterData[0].updateRequestProfileEmpLName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Email ID</label>

                    <TextField
                      name="updateRequestProfileEmpEmailId"
                      size="small"
                      fullWidth
                      required
                      defaultValue={filterData[0].updateRequestProfileEmpEmailId}
                      onChange={handleChange}
                      sx={{ bgcolor: "#fff" }}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Mobile Number</label>

                    <TextField
                      name="updateRequestProfileEmpMobileNumber"
                      size="small"
                      fullWidth
                      required
                      defaultValue={filterData[0].updateRequestProfileEmpMobileNumber}
                      onChange={handleChange}
                      sx={{ bgcolor: "#fff" }}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Emergency Number</label>

                    <TextField
                      name="updateRequestProfileEmpEmergencyContactNumber"
                      size="small"
                      fullWidth
                      required
                      defaultValue={filterData[0].updateRequestProfileEmpEmergencyContactNumber}
                      onChange={handleChange}
                      sx={{ bgcolor: "#fff" }}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <label className="label">Personal Email ID</label>

                    <TextField
                      name="updateRequestProfileEmpPersonalEmailId"
                      size="small"
                      fullWidth
                      required
                      defaultValue={filterData[0].updateRequestProfileEmpPersonalEmailId}
                      onChange={handleChange}
                      sx={{ bgcolor: "#fff" }}
                      disabled={!editMode}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {editMode ? (
                      <>
                        <Button
                          onClick={handleSubmit}
                          className="save_btn"
                          variant="contained"
                          color="primary"
                        >
                          Save
                        </Button>

                        <Button
                          onClick={() => setEditMode(false)}
                          className="cancel_btn"
                          variant="contained"
                          color="black"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setEditMode(true)}
                        className="save_btn"
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <img
                src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-craig-adderley-1563356.jpg&fm=jpg"
                className="pic_baground"
                alt="Profile"
              ></img>

              <Avatar className="avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                <img src="" alt="image"></img>

                <Grid>{FName}</Grid>
              </Avatar>

              <Grid>
                {filterData.map((item) => (
                  <Grid>
                    <Grid className="Profile_name">
                      <span>{item.updateRequestProfileEmpFName}</span>
                      <span>{item.updateRequestProfileEmpMName}</span>
                      <span>{item.updateRequestProfileEmpLName}</span>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Profile;
