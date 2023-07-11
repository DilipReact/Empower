/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/require-default-props */
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
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import "./OtherActivities.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function OtherActivities() {
  const [open, setOpen] = useState(false);
  const [query, setQuary] = useState([]);
  const [error, setError] = useState("");
  const [workData, setWorkData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    certificate: "",
    description: "",
  });

  const location = useLocation();
  const editData = location.state.empData;
  const [getEmpCode, setEmpCode] = useState(editData);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setData((v) => ({ ...v, [Name]: Value }));
  };

  console.log(getEmpCode.empCode, "Emp data");
  const Payload = {
    // "extraCertificateId": 19,
    // "extraCertificateEmpCode": "TP/5",
    // "extraCertificateTitle": "test1",
    // "extraCertificateDescription": "test1",
    extraCertificateId: isEdit ? data.extraCertificateId : 0,
    extraCertificateEmpCode: getEmpCode.empCode,
    extraCertificateTitle: data.certificate,
    extraCertificateDescription: data.description,
    status: 0,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
  };

  const handleSubmit = async () => {
    setOpen(false);
    try {
      let res;
      if (isEdit) {
        res = await axios.post(
          "https://localhost:5001/api/ExtraCertificate/UpdateExtraCertificate",
          Payload
        );
      } else {
        res = await axios.post(
          "https://localhost:5001/api/ExtraCertificate/CreateExtraCertificate",
          Payload
        );
      }

      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetData = async () => {
    try {
      const res = await axios.get(
        "https://localhost:5001/api/ExtraCertificate/GetExtraCertificates"
      );
      setWorkData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAvtiveEdit = (data) => {
    console.log(data, "test");
    setOpen(true);
    setIsEdit(true);
    setData({
      extraCertificateId: data.extraCertificateId,
      extraCertificateEmpCode: data.extraCertificateEmpCode,
      certificate: data.extraCertificateTitle,
      description: data.extraCertificateDescription,
    });
  };

  useEffect(() => {
    handleGetData();
  }, [isEdit]);

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const myData = workData.filter((item) => item.extraCertificateEmpCode === getEmpCode.empCode);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid className="activities">
        <LocalActivityIcon fontSize="medium" className="activities_icon" />
        <p className="activities_head">Add Other Activities</p>
        <button className="activities_create_btn" onClick={handleClickOpen}>
          +
        </button>
      </Grid>
      <button className="activity_back_btn" onClick={() => navigate("/employee")}>
        Back
      </button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Update Activities" : "Add Activities"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Extra Certificate Title<span className="error">*</span>
                </Grid>
                <TextField
                  fullWidth
                  name="certificate"
                  placeholder="Enter Title"
                  value={data.certificate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Extra Certificate Description<span className="error">*</span>
                </Grid>
                <TextField
                  fullWidth
                  name="description"
                  placeholder="Enter Description"
                  value={data.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cencel
          </Button>
          <Button autoFocus onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Grid className="activities_table">
        <TextField
          className="search_activity"
          placeholder="Search...."
          name="query"
          value={query}
          onChange={(e) => setQuary(e.target.value)}
        />
        <table>
          <tr>
            <th>Serial No.</th>
            <th>Extra Certificate</th>
            <th>Certificate Description</th>
            <th>Action</th>
          </tr>
          {myData
            .filter(
              (data) =>
                data.extraCertificateDescription.toLowerCase().includes(query) ||
                data.extraCertificateTitle.toLowerCase().includes(query)
            )
            .map((item, index) => (
              <tr key={item.extraCertificateId}>
                <td>{index + 1}</td>
                <td>{item.extraCertificateTitle}</td>
                <td>{item.extraCertificateDescription}</td>
                <td>
                  <Grid className="edit_icon" onClick={() => handleAvtiveEdit(item)}>
                    <Edit />
                  </Grid>
                </td>
              </tr>
            ))}
        </table>
      </Grid>
    </DashboardLayout>
  );
}
