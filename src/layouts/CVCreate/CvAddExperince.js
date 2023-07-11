/* eslint-disable object-shorthand */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Grid, MenuItem, Select, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CvCreate.css";
import axios from "axios";

const CvAddExperince = (props) => {
  const [checked, setChecked] = useState(false);
  const [technology, setTechnology] = useState([]);
  const [error, setError] = useState("");
  const [expData, setExpData] = useState({
    selectedItems: [],
    year: "",
    otherTech: "",
  });
  // sending Experience and Technology to CVCreateStapper Component
  useEffect(() => {
    props.handleExpData(expData);
  }, [expData]);

  const handleChange = (e) => {
    setExpData({
      ...expData,
      selectedItems: e.target.value,
    });
  };
  const handleChangeYear = (e) => {
    setExpData({
      ...expData,
      year: e.target.value,
    });
  };

  // Integration Project API
  const handleProject = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Technology/GetTechnologys");
      setTechnology(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    handleProject();
  }, []);

  const handleCheckBox = () => {
    setChecked(!checked);
  };
  return (
    <Grid className="add_exp">
      <Grid className="exp_head">Employee Year Of Experience</Grid>

      <Grid container spacing={2} className="add_exp_form">
        <Grid item xs={12} className="add_exp_form_item">
          <label className="add_exp_inpt_label">Year Of Experience</label>
          <Select
            className="multipal_select"
            fullWidth
            value={expData.year}
            onChange={handleChangeYear}
          >
            <MenuItem value="1">1 Year</MenuItem>
            <MenuItem value="2">2 Year</MenuItem>
            <MenuItem value="3">3 Year</MenuItem>
            <MenuItem value="4">4 Year</MenuItem>
            <MenuItem value="5">5 Year</MenuItem>
            <MenuItem value="6">6 Year</MenuItem>
            <MenuItem value="7">7 Year</MenuItem>
            <MenuItem value="8">8 Year</MenuItem>
            <MenuItem value="9">9 Year</MenuItem>
            <MenuItem value="10">10 Year</MenuItem>
            <MenuItem value="10 Year and Above">+ 10 Year</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} className="add_exp_form_item">
          <label className="add_exp_inpt_label">Technology</label>
          <Select
            className="multipal_select"
            multiple
            fullWidth
            value={expData.selectedItems}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {technology &&
              technology?.map((item) => (
                <MenuItem key={item.technologyId} value={item.technologyName}>
                  {item.technologyName}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={12} className="add_exp_form_item">
          <input
            type="checkbox"
            className="checkbox_input"
            checked={checked}
            onChange={handleCheckBox}
          />
          <span className="add_exp_inpt_label">
            {checked ? "Add Technologys" : "''Click Here'' To Add Other Technologies"}
          </span>
        </Grid>
        {checked ? (
          <Grid item xs={12} className="add_exp_form_item">
            <TextareaAutosize
              className="input_field"
              placeholder="Enter Your Technologys"
              name="othertech"
              value={expData.otherTech}
              onChange={(e) => {
                setExpData({
                  ...expData,
                  otherTech: e.target.value,
                });
              }}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CvAddExperince;
