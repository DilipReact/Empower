/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-debugger */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable prettier/prettier */
// /* eslint-disable arrow-body-style */
// /* eslint-disable react/function-component-definition */
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
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import AddIcon from "@mui/icons-material/Add";
import { Grid, TextField, TextareaAutosize } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./Designation.css";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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

export default function Designation() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [quarry, setQuarry] = useState([]);
  const [dsgData, setDsgData] = useState([]);
  const [data, setData] = useState({
    designationName: "",
    designationDescription: "",
  });
  const handleChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setData((v) => ({ ...v, [Name]: Value }));
  };

  // For pagination
  const [currentpage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dsgData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(dsgData.length / recordsPerPage);
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

  // for validation
  const Validation = () => {
    var errors = {};
    if (data.designationName === "") {
      errors.designationName = "Field Required";
    }
    if (data.designationDescription === "") {
      errors.designationDescription = "Field Required";
    }
    setError(errors);
  };
  //   for Designation Post API Integration
  const Payload = {
    designationId: isEdit ? data.designationId : 0,
    designationName: data.designationName,
    designationDescription: data.designationDescription,
    designationStatus: isEdit ? true : false,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
  };

  const handleSubmit = async () => {
    // const isValid = Validation();
    // if (isValid) {
    try {
      let res;
      if (isEdit) {
        res = await axios.post("https://localhost:5001/api/Designation/UpdateDesignation", Payload);
      } else {
        res = await axios.post("https://localhost:5001/api/Designation/CreateDesignation", Payload);
      }
      setData(res.data);
      console.log(red.data, "data 155");

      setIsSuccess(true);
      setAlertMsg("Successfully");
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
      setOpen(false);
      setData({
        designationName: "",
        designationDescription: "",
      });
    }
    // }
  };

  //   for Get Designation Data API Integration
  const DsgGetData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Designation/GetDesignations");
      setDsgData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (value) => {
    console.log(value);
    setOpen(true);
    setIsEdit(true);
    setData({
      designationId: value.designationId,
      designationName: value.designationName,
      designationDescription: value.designationDescription,
      designationStatus: true,
      createdBy: AuthData.employeeName,
      modifiedBy: AuthData.employeeName,
    });
  };
  useEffect(() => {
    DsgGetData();
  }, [data]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isSuccess ? (
        <Stack className="_dsg_alert_message" spacing={2}>
          <Alert severity="success">{alertMsg}</Alert>
        </Stack>
      ) : null}
      <Grid className="dsg_head">
        <PeopleAltIcon fontSize="medium" className="dsg_head" />
        <Typography className="dsg_heading">Designation</Typography>
        <Grid className="dsg_create_btn">
          <AddIcon id="dsg_create_icon" fontSize="medium" onClick={handleClickOpen} />
        </Grid>
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Update Designation" : "Add Designation"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Designation Name<span>*</span>
                </Grid>
                <TextField
                  fullWidth
                  className="dsg_inpt"
                  name="designationName"
                  value={data.designationName}
                  onChange={handleChange}
                />
                <Grid className="error">{error.designationName}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Designation Description<span>*</span>
                </Grid>
                <TextareaAutosize
                  className="autoresize_inpt"
                  fullWidth
                  name="designationDescription"
                  value={data.designationDescription}
                  onChange={handleChange}
                />
                <Grid className="error">{error.designationDescription}</Grid>
              </Grid>
            </Grid>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus className="dsg_cncl_btn" onClick={handleClose}>
            Cencel
          </Button>
          <Button autoFocus className="dsg_save_btn" onClick={handleSubmit}>
            {isEdit ? "update" : "Submit"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* for Table */}
      <Grid className="dsg_table">
        <TextField
          className="dsg_search"
          placeholder="Search...."
          name="quarry"
          onChange={(e) => setQuarry(e.target.value)}
        />

        <table className="dsg_table">
          <tr>
            <th>Serial No.</th>
            <th>Designation Name</th>
            <th>Designation Description</th>
            <th>Action</th>
          </tr>
          {records
            .filter(
              (dsg) =>
                dsg.designationName.toLowerCase().includes(quarry) ||
                dsg.designationDescription.toLowerCase().includes(quarry)
            )
            .map((item, index) => (
              <tr key={item.designationId}>
                <td>{index + 1}</td>
                <td>{item.designationName}</td>
                <td>{item.designationDescription}</td>
                <td>
                  <Grid className="dsg_edit">
                    <Edit id="dsg_edit_icon" onClick={() => handleEdit(item)} />
                  </Grid>
                </td>
              </tr>
            ))}
        </table>
      </Grid>
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
    </DashboardLayout>
  );
}
