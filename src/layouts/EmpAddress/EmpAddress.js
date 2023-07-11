/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
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
import MDTypography from "components/MDTypography";
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

export default function EmpAddress() {
  const [open, setOpen] = useState(false);
  const [query, setQuary] = useState([]);
  const [error, setError] = useState("");
  const [addressData, setAddressData] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    state: "",
    addressId: "",
    addressEmpId: "",
    addressStateId: "",
    addressCityId: "",
    addressPinCode: "",
    address: "",
    city: "",
    addressType: "",
  });

  // const location = useLocation();
  // const editData = location.state.empData;
  // console.log(editData, "empData");
  const [getEmpCode, setEmpCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      state: {
        ...prevData.state,
        stateId: Number(value),
      },
    }));
  };

  console.log(getEmpCode.empCode, "EmpCode data");

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState("");

  const GetState = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/State/GetState");
      setState(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(state, "State");

  const GetCity = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/City/GetCity");
      setCity(res.data);
    } catch (err) {
      setErrors(err.message);
    }
  };

  console.log(city, "city");

  const Payload = {
    addressId: isEdit ? data.addressId : 0,
    addressEmpId: getEmpCode.empCode,
    addressStateId: isEdit ? data.addressStateId : 1,
    addressCityId: isEdit ? data.addressCityId : 1,
    addressPinCode: data.addressPinCode,
    address: data.address,
    addressType: true,
    status: true,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
    state: {
      stateId: 0,
      stateText: isEdit ? data.state.stateText : "string",
      status: true,
    },

    city: {
      cityId: 0,
      cityStateId: isEdit ? data.city.cityStateId : 0,
      cityText: isEdit ? data.city.cityText : "",
      status: true,
      createdBy: AuthData.employeeName,
      modifiedBy: AuthData.employeeName,
    },
  };

  const handleSubmit = async () => {
    setOpen(false);

    try {
      let res;
      if (isEdit) {
        res = await axios.post(
          "https://localhost:5001/api/EmployeeAddress/UpdateEmployeeAddress",
          Payload
        );
      } else {
        res = await axios.post(
          "https://localhost:5001/api/EmployeeAddress/CreateEmployeeAddress",
          Payload
        );
      }

      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetAddressData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/EmployeeAddress/GetEmployeeAddress");
      setAddressData(res.data);
      console.log(res.data, "Address Data");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddressEdit = (data) => {
    console.log(data);
    setOpen(true);
    setIsEdit(true);
    setData({
      state: data.state,
      addressId: data.addressId,
      addressEmpId: data.addressEmpId,
      addressStateId: data.addressStateId,
      addressCityId: data.addressCityId,
      addressPinCode: data.addressPinCode,
      address: data.address,
      city: data.city,
      addressType: data.addressType,
    });
  };

  useEffect(() => {
    GetState();
    GetCity();
    handleGetAddressData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const myData = addressData.filter((item) => item.addressEmpId === getEmpCode.empCode);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid className="activities">
        <LocalActivityIcon fontSize="medium" className="activities_icon" />
        <p className="activities_head">Add Address</p>
        <button className="activities_create_btn" onClick={handleClickOpen}>
          +
        </button>
      </Grid>

      <button className="activity_back_btn" onClick={() => navigate("/employee")}>
        Back
      </button>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Update" : "Add"}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            <Grid container style={{ padding: "10px" }}>
              <Grid xs={12} style={{ marginTop: "10px" }}>
                <MDTypography variant="h6" fontWeight="bold">
                  State:
                </MDTypography>

                <select
                  className="customSelectBox"
                  name="stateId"
                  required
                  value={data.stateId}
                  onChange={handleChange}
                >
                  <option>--Select--</option>

                  {state.map((item) => (
                    <option key={item.stateId} value={item.stateId}>
                      {item.stateText}
                    </option>
                  ))}
                </select>
              </Grid>

              <Grid xs={12}>
                <MDTypography variant="h6" fontWeight="bold">
                  City:
                </MDTypography>

                <select
                  className="customSelectBox"
                  name="city"
                  required
                  fullWidth
                  value={data.city}
                  onChange={handleChange}
                >
                  <option>--Select--</option>

                  {city.map((item) => (
                    <option key={item.cityId} value={item.cityId}>
                      {item.cityText}
                    </option>
                  ))}
                </select>
              </Grid>

              <Grid xs={12}>
                <MDTypography variant="h6" fontWeight="bold">
                  Address:
                </MDTypography>

                <TextField
                  name="address"
                  variant="outlined"
                  fullWidth
                  value={data.address}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid xs={12}>
                <MDTypography variant="h6" fontWeight="bold">
                  PinCode:
                </MDTypography>

                <TextField
                  name="addressPinCode"
                  variant="outlined"
                  value={data.addressPinCode}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>

              <Grid xs={12}>
                <MDTypography variant="h6" fontWeight="bold">
                  Address Type:
                </MDTypography>

                <select
                  className="customSelectBox"
                  name="addressType"
                  fullWidth
                  value={data.addressType}
                  onChange={handleChange}
                >
                  <option>--Select--</option>

                  <option value={1}>Permenant</option>
                </select>
              </Grid>

              <Grid xs={12} style={{ marginTop: "30px" }}>
                <MDTypography variant="h6" fontWeight="bold"></MDTypography>
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
            <th>State</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Address Type</th>
            <th>Action</th>
          </tr>

          {myData
            // .filter(
            //   (data) =>
            //     data.stateId.toLowerCase().includes(query) ||
            //     data.cityId.toLowerCase().includes(query) ||
            //     data.addressPinCode.toLowerCase().includes(query) ||
            //     data.addressType.toLowerCase().includes(query)
            // )

            .map((item, index) => (
              <tr key={item.addressId}>
                <td>{index + 1}</td>
                <td>{item.state.stateText}</td>
                <td>{item.city.cityText}</td>
                <td>{item.addressPinCode}</td>
                <td>{item.address}</td>
                <td>
                  <Grid className="edit_icon" onClick={() => handleAddressEdit(item)}>
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
