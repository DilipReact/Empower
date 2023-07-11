/* eslint-disable prefer-destructuring */
/* eslint-disable no-debugger */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-var */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, TextField, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import "./Cv.css";
import axios from "axios";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Getting Data from localStorage
var AuthData = JSON.parse(localStorage.getItem("myData"));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Cv() {
  const [alertMsg, setAlertMsg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    cvEmployeeName: "",
    cvEmployeeSkills: "",
    cvEmployeeHighestQualification: "",
    cvEmployeePath: "",
  });
  const [pdfName, setPdfName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [empCV, setEmpCV] = useState([]);
  const [quarry, setQuarry] = useState([]);

  // For pagination
  const [currentpage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = empCV.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(empCV.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const changeNext = () => {
    if (currentpage !== nPage) {
      setCurrentPage(currentpage + 1);
    }
  };
  const changePrev = () => {
    if (currentpage !== 1) {
      setCurrentPage(currentpage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  // For  handle Change and uploads PDF file
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
    const fileType = ["application/pdf"];
    if (name === "cvEmployeePath") {
      const selectedFileName = e.target.files[0].name;
      setPdfName(selectedFileName);
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.onloadend = () => {
            const fileData = reader.result;
            setUploadedFile(fileData);
          };
          reader.readAsDataURL(selectedFile);
        }
      }
    }
  };

  //  for Download
  const downloadPdfHandler = (data) => {
    const link = document.createElement("a");
    link.href = data.cvEmployeePath;
    link.download = data.cvEmployeeCv;
    link.click();
  };

  // For Validation
  const Validation = () => {
    var errors = {};
    if (data.cvEmployeeName === "") {
      errors.cvEmployeeName = "Field Required";
    }
    if (data.cvEmployeeSkills === "") {
      errors.cvEmployeeSkills = "Field Required";
    }
    if (data.cvEmployeeHighestQualification === "") {
      errors.cvEmployeeHighestQualification = "Field Required";
    }
    if (data.cvEmployeePath === "") {
      errors.cvEmployeePath = "Field Required";
    }
    setError(errors);

    // Return true if there are no errors
    return Object.keys(errors).length < 1;
  };

  const myFile = uploadedFile.slice(uploadedFile.indexOf("4") + 2);
  console.log(myFile, "Converted data into base 64");

  // Post API Integration
  const dates = new Date();
  const Payload = {
    cvEmployeeId: isEdit ? data.cvEmployeeId : 0,
    cvEmployeeName: data.cvEmployeeName,
    cvEmployeeSkills: data.cvEmployeeSkills,
    cvEmployeeCv: pdfName,
    cvEmployeeHighestQualification: data.cvEmployeeHighestQualification,
    cvEmployeePath: "String",
    status: true,
    createdOn: dates,
    createdBy: AuthData.employeeName,
    modifiedOn: dates,
    modifiedBy: AuthData.employeeName,
  };

  const handleSubmit = async () => {
    const isValid = Validation();
    if (isValid) {
      try {
        let res;
        if (isEdit) {
          res = await axios.post("https://localhost:5001/api/CVEmployee/UpdateCVEmployee", Payload);
        } else {
          res = await axios.post("https://localhost:5001/api/CVEmployee/CreateCVEmployee", Payload);
        }
        setData(res.data);
        setOpen(false);
        setIsSuccess(true);
        setAlertMsg("Successfully Add");
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } catch (err) {
        setError(err.message);
        setOpen(false);
      }
    }
  };

  // For Get CV API integration
  const GetEmpCv = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/CVEmployee/GetCVEmployees");
      setEmpCV(res.data);
      // console.log(res.data);
    } catch (err) {
      setError(err.message);
    }
  };


  const UpdateCVEmp = (values) => {
    console.log(values, "data reciving for iterate");
    setIsEdit(true);
    setOpen(true);
    setData({
      cvEmployeeId: values.cvEmployeeId,
      cvEmployeeName: values.cvEmployeeName,
      cvEmployeeSkills: values.cvEmployeeSkills,
      cvEmployeeCv: values.cvEmployeeCv,
      cvEmployeePath: values.myFile,
      cvEmployeeHighestQualification: values.cvEmployeeHighestQualification,
    });
  };

  useEffect(() => {
    GetEmpCv();
  }, [data]);

  // For Dailog Box
  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isSuccess ? (
        <Stack className="alert_message" spacing={2}>
          <Alert severity="success">{alertMsg}</Alert>
        </Stack>
      ) : null}
      <Grid className="cv_head">
        <GroupIcon className="cv_icon" fontSize="large" />
        <Typography className="cv-head">Employee CV</Typography>
        <AddIcon
          className="cv_add"
          fontSize="medium"
          variant="outlined"
          onClick={handleClickOpen}
        />
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit === true ? "Update Employee CV " : "Add Employee CV "}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Grid className="cv_label">
                Employee Name<span>*</span>
              </Grid>
              <select
                className="selectBox"
                type="text"
                variant="outlined"
                name="cvEmployeeName"
                fullWidth
                value={data.cvEmployeeName}
                onChange={handleChange}
              >
                <option>hello</option>
              </select>
              <span className="error">{error.cvEmployeeName}</span>
            </Grid>
            <Grid item xs={6}>
              <Grid className="cv_label">
                Skills<span>*</span>
              </Grid>
              <TextField
                fullWidth
                placeholder="Enter Your Skills"
                name="cvEmployeeSkills"
                value={data.cvEmployeeSkills}
                onChange={handleChange}
              />
              <span className="error">{error.cvEmployeeSkills}</span>
            </Grid>
            <Grid item xs={6}>
              <Grid className="cv_label">
                Higest Qualifications<span>*</span>
              </Grid>
              <TextField
                fullWidth
                placeholder="Enter your Higest Qualifications"
                name="cvEmployeeHighestQualification"
                value={data.cvEmployeeHighestQualification}
                onChange={handleChange}
              />
              <span className="error">{error.cvEmployeeHighestQualification}</span>
            </Grid>
            <Grid item xs={6}>
              <Grid className="cv_label">
                Employee CV<span>*</span>
              </Grid>
              <TextField fullWidth type="file" name="cvEmployeePath" onChange={handleChange} />
              <span className="error">{error.cvEmployeePath}</span>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            {isEdit === false ? "Submit" : "Update"}
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Table of Employee CV start */}
      <Grid className="table_container">
        <TextField
          className="search_box"
          placeholder="Search..."
          onChange={(e) => setQuarry(e.target.value)}
        />
        <table>
          <tr>
            <th>Serial No.</th>
            <th>Employee Name</th>
            <th>Skills</th>
            <th>Highest Qualification</th>
            <th>Actions</th>
          </tr>
          {records
            .filter(
              (user) =>
                user.cvEmployeeName.toLowerCase().includes(quarry) ||
                user.cvEmployeeSkills.toLowerCase().includes(quarry) ||
                user.cvEmployeeHighestQualification.toLowerCase().includes(quarry)
            )

            .map((item, index) => (
              <tr key={item.cvEmployeeId}>
                <td>{index + 1}</td>
                <td>{item.cvEmployeeName}</td>
                <td>{item.cvEmployeeSkills}</td>
                <td>{item.cvEmployeeHighestQualification}</td>
                <td>
                  <Grid className="table_action">
                    <Grid className="action_edit">
                      <EditIcon onClick={() => UpdateCVEmp(item)} />
                    </Grid>
                    <Grid className="action_download">
                      <DownloadIcon onClick={() => downloadPdfHandler(item)} />
                    </Grid>
                  </Grid>
                </td>
              </tr>
            ))}
        </table>
        {/* Table of Employee CV End */}
        {/* Pagination */}
        <Grid className="pagination">
          <button className="pagination_btn" onClick={changePrev}>
            Prev
          </button>
          {numbers.map((n, i) => (
            <p className="pagination_num" onClick={() => changeCPage(n)}>
              {n}
            </p>
          ))}
          <button className="pagination_btn" onClick={changeNext}>
            Next
          </button>
        </Grid>
        {/* Pagination */}
      </Grid>
    </DashboardLayout>
  );
}
