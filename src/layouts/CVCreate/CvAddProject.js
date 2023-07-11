/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Grid, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import React, { useEffect, useState } from "react";

import axios from "axios";

const CvAddProject = (props) => {
  const [project, setProject] = useState([]);
  const [error, setError] = useState([]);
  const [checked, setChecked] = useState(null);

  // reciving Employee Data From CreateStapper Component
  const EmployeeData = props.state;

  const ProjectList = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Project/GetProjects");
      setProject(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProject = (data) => {
    setChecked(data);
    // Sendind Project Data To CVCreateStapper Component
    props.handleProjectData(data);
  };
  useEffect(() => {
    ProjectList();
  }, []);

  // Data is filtering on the basice of EmpCode
  const myData = project.filter((item) => item.projectEmpCode === EmployeeData.empCode);

  return (
    <Grid className="addproject">
      <Grid className="addproject_head">
        <AccountTreeIcon />
        <Typography className="head_item">Project List</Typography>
      </Grid>
      <Grid className="addproject_table_container">
        <table className="table_container">
          <thead>
            <tr>
              <th>Select</th>
              <th>Project Title</th>
              <th>Project Description</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((item) => (
              <tr key={item.projectId}>
                <td>
                  <input type="checkbox" onChange={() => handleProject(item)} />
                </td>
                <td>{item.projectName}</td>
                <td>{item.projectDescription}</td>
                <td>{item.projectDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default CvAddProject;
