/* eslint-disable import/newline-after-import */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import "./Education.css";
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

export default function EmpEducation() {
  const [open, setOpen] = useState(false);
  const [query, setQuary] = useState([]);
  const [error, setError] = useState("");
  const [educationData, setEducationData] = useState([]);
  console.log(educationData, "educationData");
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    educationId: "",
    educationEmpCode: "",
    educationStream: "",
    educationYearOfPassing: "",
    educationPercentage: "",
    educationBoard: "",
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

  const Payload = {
    // "extraCertificateId": 19,
    // "extraCertificateEmpCode": "TP/5",
    // "extraCertificateTitle": "test1",
    // "extraCertificateDescription": "test1",

    educationId: isEdit ? data.educationId : 0,
    educationEmpCode: getEmpCode.empCode,
    educationStream: data.educationStream,
    educationYearOfPassing: data.educationYearOfPassing,
    educationPercentage: data.educationPercentage,
    educationBoard: data.educationBoard,
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
          "https://localhost:5001/api/Education/UpdateEducation",

          Payload
        );
      } else {
        res = await axios.post(
          "https://localhost:5001/api/Education/CreateEducation",

          Payload
        );
      }

      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetEducationData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Education/GetEducations");
      setEducationData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAvtiveEdit = (data) => {
    console.log(data, "test");
    setOpen(true);
    setIsEdit(true);
    setData({
      educationId: data.educationId,
      educationEmpCode: data.educationEmpCode,
      educationStream: data.educationStream,
      educationYearOfPassing: data.educationYearOfPassing,
      educationPercentage: data.educationPercentage,
      educationBoard: data.educationBoard,
    });
  };

  useEffect(() => {
    handleGetEducationData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const myData = educationData.filter((item) => item.educationEmpCode === getEmpCode.empCode);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid className="activities">
        <LocalActivityIcon fontSize="medium" className="activities_icon" />
        <p className="activities_head">Add Education</p>
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
                  Year of Passing <span className="error">*</span>
                </Grid>

                <TextField
                  name="educationYearOfPassing"
                  type="date"
                  inputFormat="YYYY/MM/DD"
                  variant="outlined"
                  fullWidth
                  value={data.educationYearOfPassing}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid className="input_lable">
                  Stream<span className="error">*</span>
                </Grid>

                <TextField
                  fullWidth
                  name="educationStream"
                  placeholder="Enter Stream"
                  value={data.educationStream}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid className="input_lable">
                  Board<span className="error">*</span>
                </Grid>

                <TextField
                  fullWidth
                  name="educationBoard"
                  placeholder="Enter Board"
                  value={data.educationBoard}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid className="input_lable">
                  Percentage<span className="error">*</span>
                </Grid>

                <TextField
                  fullWidth
                  name="educationPercentage"
                  placeholder="Enter Percentage"
                  value={data.educationPercentage}
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
            <th>Year Of Passing </th>
            <th>Stream</th>
            <th>Board</th>
            <th>Percentage</th>
            <th>Action</th>
          </tr>

          {myData

            .filter(
              (data) =>
                data.educationStream.toLowerCase().includes(query) ||
                data.educationYearOfPassing.toLowerCase().includes(query) ||
                data.educationPercentage.toLowerCase().includes(query) ||
                data.educationBoard.toLowerCase().includes(query)
            )

            .map((item, index) => (
              <tr key={item.educationId}>
                <td>{index + 1}</td>
                <td>{item.educationYearOfPassing}</td>
                <td>{item.educationStream}</td>
                <td>{item.educationBoard}</td>
                <td>{item.educationPercentage}</td>

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
