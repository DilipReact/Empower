/* eslint-disable no-debugger */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable prettier/prettier */
// /* eslint-disable import/newline-after-import */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable arrow-body-style */
// /* eslint-disable react/function-component-definition */
// import React from "react";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import "./EmployeeDoc.css";

// const EmployeeDoc = () => {
//   return <DashboardLayout>
//     <Grid>

//     </Grid>
//   </DashboardLayout>;
// };

// export default EmployeeDoc;

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
import PostAddIcon from "@mui/icons-material/PostAdd";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import "./EmployeeDoc.css";
import { Grid, TextField } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DownloadIcon from "@mui/icons-material/Download";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

export default function EmployeeDoc() {
  const [open, setOpen] = useState(false);
  const [getDocType, setGetDocType] = useState([]);
  const [empDocData, setEmpDocData] = useState([]);

  const [error, setError] = useState("");
  const [data, setData] = useState({
    dropdownValue: "",
    file: "",
  });

  // documents data is comming from viewEmployee components via state
  const location = useLocation();
  const docDataId = location.state.empData;

  console.log(docDataId);

  // for Select Option Hedling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((v) => ({ ...v, [name]: value }));
  };

  // Fro File Heandling
  const handleFileChange = (event) => {
    const fileType = ["application/pdf"];
    const file = event.target.files[0];

    if (file && fileType.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setData((prevData) => ({
          ...prevData,
          file: {
            name: file.name, // File name
            path: base64Data, // File path or base64 encoded data
          },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setError("Invalid file format. Please select a PDF file.");
    }
  };

  // API Intrgration For getting All Documents type for dropdown in select input
  const GetDocTypeData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/DocType/GetDocType");
      setGetDocType(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(getDocType, "Getting Dropdown Value");

  const Payload = {
    docId: 0,
    docTypeId: data.dropdownValue,
    docEmpId: docDataId.empCode,
    docFileName: data.file.name,
    docPath: data.file.path,
    status: true,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
  };
  console.log(Payload);

  // Intregiting Employee Documents post API
  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://localhost:5001/api/EmployeeDoc/CreateEmployeeDoc", {
        Payload,
        // docPath: data.file, // Use the base64 encoded file data
      });
      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
    setOpen(false);
    console.log(data, "Error");
  };

  const selectedText =
    getDocType.find((option) => option.docTypeId === data.dropdownValue)?.text || "";
  console.log(selectedText);
  // Binding Data for Updating in the basis of ID

  const handleUpdateEmpDoc = (doc) => {
    console.log(doc);
    setOpen(true);
    setData({
      dropdownValue: doc.docTypeId,
      file: doc.docPath,
    });
  };

  console.log(data, "Binding Data for Edit");

  // Intregiting all Employees Documents get API
  const handleGetDocumentData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/EmployeeDoc/GetEmployeeDoc");
      setEmpDocData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // handling Download Employee Documents pdf file
  const handleDownloadEmpDoc = (get) => {
    console.log(get);
  };
  useEffect(() => {
    handleGetDocumentData();
    GetDocTypeData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid className="emp_doc">
        <PostAddIcon fontSize="large" />
        <Typography className="emp_doc_head">Employee Documents</Typography>
        <button variant="outlined" className="emp_doc_crt_btn" onClick={handleClickOpen}>
          +
        </button>
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Employee Documents
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid className="emp_doc_input_label">
                  Document Types<span className="error">*</span>
                </Grid>
                <Select
                  className="selict_box"
                  id="dropdown"
                  fullWidth
                  name="dropdownValue"
                  value={data.dropdownValue}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  {getDocType.map((item) => (
                    <MenuItem key={item.docTypeId} value={item.docTypeId}>
                      {item.docTypeText}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Grid className="emp_doc_input_label">
                  Document File<span className="error">*</span>
                </Grid>
                <TextField
                  fullWidth
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
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
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Grid className="table_container">
        <table>
          <tr>
            <th>Srrial No.</th>
            <th>Documents Type</th>
            <th>Document File</th>
            <th>Actions</th>
          </tr>

          {empDocData.map((item, index) => (
            <tr key={item.docId}>
              <td>{index + 1}</td>
              <td>{item.docTypeId}</td>
              <td>{item.docFileName}</td>
              <td>
                <Grid className="emp_doc_table_action_btn">
                  <Grid
                    className="emp_doc_table_action_btn_edit"
                    onClick={() => handleUpdateEmpDoc(item)}
                  >
                    <Edit />
                  </Grid>
                  <Grid
                    className="emp_doc_table_action_btn_download"
                    onClick={() => handleDownloadEmpDoc(item)}
                  >
                    <DownloadIcon />
                  </Grid>
                </Grid>
              </td>
            </tr>
          ))}
        </table>
      </Grid>
    </DashboardLayout>
  );
}
