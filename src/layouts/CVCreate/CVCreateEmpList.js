/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */

import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "./CvCreate.css";
import axios from "axios";

const CVCreateEmpList = (props) => {
  const [empList, setEmpList] = useState([]);
  const [checked, setChecked] = useState(null);
  const [error, setError] = useState("");

  // integrating Api for Getting Project List
  const GetEmpList = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetAllEmployeesAsync");
      setEmpList(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheck = (item) => {
    setChecked(item);
    props.handleGetData(item);
  };

  useEffect(() => {
    GetEmpList();
  }, []);

  return (
    <Grid className="cv_emp_list_body">
      <Grid className="cv_emp_list_head">
        <GroupIcon fontSize="medium" />
        <Typography className="cv_emp_list_head_title">Employee List</Typography>
      </Grid>
      <Grid className="cv_emp_list_body_table">
        <table className="table_container">
          <thead>
            <tr>
              <th>Select</th>
              <th>Employee Name</th>
              <th>Email ID</th>
              <th>Contact</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {empList.map((item) => (
              <tr key={item.empCode}>
                <td>
                  <input
                    type="checkbox"
                    checked={checked === item}
                    onChange={() => handleCheck(item)}
                  />
                </td>
                <td>
                  [{item.empCode}] {item.empFName} {item.empMName} {item.empLName}
                </td>
                <td>{item.empEmailId}</td>
                <td>{item.empMobileNumber}</td>
                <td>{item.empSkills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default CVCreateEmpList;
