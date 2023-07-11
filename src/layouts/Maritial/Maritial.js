/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
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
import Typography from "@mui/material/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Grid, TextField } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Edit } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import axios from "axios";

import "./MaritialStatus.css";
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

export default function Maritial() {
  const [open, setOpen] = React.useState(false);
  const [maritalData, setMaritalData] = useState([]);
  const [error, setError] = useState("");
  const [querry, setQuerry] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({
    maritalStatusText: "",
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
  const records = maritalData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(maritalData.length / recordsPerPage);
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

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  // for Form Validation
  const Validation = () => {
    const Errors = {};
    if (data.maritalStatusText === "") {
      Errors.maritalStatusText = "Required";
    }
    setError(Errors);
    return Object.keys(Errors).length < 1;
  };

  // for Submit and Update API integration
  const Payload = {
    maritalStatusId: isEdit ? data.maritalStatusId : 0,
    maritalStatusText: data.maritalStatusText,
    status: !isEdit ? true : false,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
  };
  console.log(Payload);
  const handleSubmit = async () => {
    const isValid = Validation();
    if (isValid) {
      try {
        let res;
        if (isEdit) {
          res = await axios.post(
            "https://localhost:5001/api/MaritalStatus/UpdateMaritalStatus",
            Payload
          );
        } else {
          res = await axios.post(
            "https://localhost:5001/api/MaritalStatus/CreateMaritalStatus",
            Payload
          );
        }

        setData(res.data);
        setOpen(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // for Get Maritial Status API integration
  const GetMaritialData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/MaritalStatus/GetMaritalStatus");
      setMaritalData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const HandelEdit = (values) => {
    setOpen(true);
    setIsEdit(true);
    console.log(values);
    setData({
      maritalStatusId: values.maritalStatusId,
      maritalStatusText: values.maritalStatusText,
    });
  };

  useEffect(() => {
    if (data) {
      GetMaritialData();
    }
  }, [data]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isSuccess ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Successfully..</AlertTitle>
            Maritial Status Added <strong>Check It Out!</strong>
          </Alert>
        </Stack>
      ) : null}
      <Grid className="maritial_head">
        <PeopleAltIcon fontSize="large" />
        <Typography className="maritial_title">Maritial Status</Typography>
        <button className="create_btn" onClick={handleClickOpen}>
          +
        </button>
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit === true ? "Update Maritial Status" : "Add Maritial Status"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid id="Create_status_label">
                Maritial Status<span className="error">*</span>
              </Grid>
              <TextField
                className="maritial_input"
                fullWidth
                placeholder="Enter Your Maritial Status"
                name="maritalStatusText"
                value={data.maritalStatusText}
                onChange={handleChange}
              />
              <Grid className="error">{error.maritalStatusText}</Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid className="Create_status_btn">
            <Button className="Create_status_btn_cnsl" autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button className="Create_status_btn_save" autoFocus onClick={handleSubmit}>
              {isEdit === true ? "Update" : "Submit"}
            </Button>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
      <Grid>
        <TextField
          className="search"
          placeholder="Search...."
          name="querry"
          value={querry}
          onChange={(e) => setQuerry(e.target.value)}
        />
        <table>
          <tr>
            <th>Maritial Status</th>
            <th>Action</th>
          </tr>
          {records
            .filter((item) => item.maritalStatusText.toLowerCase().includes(querry))
            .map((item) => (
              <tr key={item.maritalStatusId}>
                <td>{item.maritalStatusText}</td>
                <td>
                  <Grid className="maritial_edit" onClick={() => HandelEdit(item)}>
                    <Edit />
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
