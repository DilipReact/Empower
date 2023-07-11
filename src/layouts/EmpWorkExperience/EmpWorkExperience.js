/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Grid, TextField, TextareaAutosize } from "@mui/material";
import "./EmpWorkExp.css";
import axios from "axios";
import { Edit } from "@mui/icons-material";

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

export default function EmpWorkExperience() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const [workExpData, setWorkExpData] = React.useState([]);

  const [data, setData] = React.useState({
    fromDate: "",
    toDate: "",
    compenyName: "",
    description: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((v) => ({ ...v, [name]: value }));
  };
  const formData = data.fromDate ? new Date(data.fromDate).toISOString() : null;
  const toData = data.toDate ? new Date(data.toDate).toISOString() : null;
  const Payload = {
    recId: isEdit ? data.recId : 0,
    employeeWorkExperienceEmpCode: AuthData.employeeName,
    employeeWorkExperienceCompanyName: data.compenyName,
    employeeWorkExperienceDescription: data.description,
    fromDate: formData,
    toDate: toData,
    status: isEdit ? 1 : 0,
    createdOn: new Date().toISOString(),
    createdBy: AuthData.employeeName,
    modifiedOn: new Date().toISOString(),
    modifiedBy: AuthData.employeeName,
  };

  const handleCreateWorkExp = async () => {
    try {
      let res;
      if (isEdit) {
        res = await axios.post(
          "https://localhost:5001/api/EmployeeWorkExperience/UpdateEmployeeWorkExperience",
          Payload
        );
      } else {
        res = await axios.post(
          "https://localhost:5001/api/EmployeeWorkExperience/CreateEmployeeWorkExperience",
          Payload
        );
      }
      setData(res.data);
      setOpen(true);
    } catch (err) {
      setError(err.message);
      setOpen(false);
    }
  };

  React.useEffect(() => {
    const handleGetWorkExpData = async () => {
      try {
        const res = await axios.get(
          "https://localhost:5001/api/EmployeeWorkExperience/GetEmployeeWorkExperiences"
        );
        setWorkExpData(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    handleGetWorkExpData();
  }, [isEdit]);

  const handleEditWorkExp = (item) => {
    setOpen(true);
    setIsEdit(true);
    setData({
      recId: item.recId,
      fromDate: item.fromDate,
      toDate: item.toDate,
      compenyName: item.employeeWorkExperienceCompanyName,
      description: item.employeeWorkExperienceDescription,
    });
  };

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
      <Grid className="workExp_head">
        <Grid className="workExp_icon">
          <EngineeringIcon fontSize="medium" />
        </Grid>
        <Grid className="workExp_icon">Add Work Experience</Grid>
        <button onClick={handleClickOpen} className="workExp_btn">
          +
        </button>
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Update Work Experience" : "Add Work Experience"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid>
                From Date<span className="error">*</span>
              </Grid>
              <TextField
                fullWidth
                type="month"
                name="fromDate"
                value={data.fromDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid>
                To Date<span className="error">*</span>
              </Grid>
              <TextField
                fullWidth
                type="month"
                name="toDate"
                value={data.toDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid>
                Company Name<span className="error">*</span>
              </Grid>
              <TextField
                fullWidth
                placeholder="Enter Company Name"
                name="compenyName"
                value={data.compenyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid>
                Description<span className="error">*</span>
              </Grid>
              <TextareaAutosize
                placeholder="Enter Description"
                className="autore_size_inpt"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreateWorkExp}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Grid className="table_container">
        <table className="table_body">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Compeny Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {workExpData &&
              workExpData?.map((item, index) => (
                <tr keys={item.recId}>
                  <td>{index + 1}</td>
                  <td>{item.employeeWorkExperienceCompanyName}</td>
                  <td>{item.employeeWorkExperienceDescription}</td>
                  <td>
                    <Grid className="table_body_action_btn" onClick={() => handleEditWorkExp(item)}>
                      <Edit />
                    </Grid>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Grid>
    </DashboardLayout>
  );
}
