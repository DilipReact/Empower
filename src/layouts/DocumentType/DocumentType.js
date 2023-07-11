/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Grid, TextField, TextareaAutosize } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import "./DocumentType.css";
import axios from "axios";
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

export default function DocumentType() {
  const [open, setOpen] = React.useState(false);
  const [quarry, setQuerry] = React.useState([]);

  const [data, setData] = useState({
    docTypeText: "",
    docTypeDescription: "",
  });
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [docData, setDocData] = useState([]);

  const handleChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setData((v) => ({ ...v, [Name]: Value }));
  };

  // For pagination
  const [currentpage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = docData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(docData.length / recordsPerPage);
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

  const Validation = () => {
    const Errors = {};
    if (data.docTypeText === "") {
      Errors.docTypeText = "Documents Type is Required";
    }
    if (data.docTypeDescription === "") {
      Errors.docTypeDescription = "Documents Description is Required";
    }
    setError(Errors);
    return Object.keys(Errors).length < 1;
  };

  const Payload = {
    // {
    //   "docTypeId": 0,
    //   "docTypeText": "string",
    //   "docTypeDescription": "string",
    //   "status": true,
    //   "createdBy": "string",
    //   "modifiedBy": "string"
    // }
    docTypeId: isEdit ? data.docTypeId : 0,
    docTypeText: data.docTypeText,
    docTypeDescription: data.docTypeDescription,
    status: false,
    createdBy: AuthData.employeeName,
    modifiedBy: AuthData.employeeName,
  };

  const handleSubmit = async () => {
    const isValid = Validation();
    if (isValid) {
      try {
        let res;
        if (isEdit) {
          res = await axios.post("https://localhost:5001/api/DocType/UpdateDocType", Payload);
        } else {
          res = await axios.post("https://localhost:5001/api/DocType/CreateDocType", Payload);
        }
        setData(res.data);
        setOpen(false);
      } catch (err) {
        setError(err.message);
        setOpen(false);
        setData({
          docTypeText: "",
          docTypeDescription: "",
        });
      }
    }
  };

  const handleEdit = (value) => {
    setIsEdit(true);
    setOpen(true);
    setData({
      docTypeId:value.docTypeId,
      docTypeText: value.docTypeText,
      docTypeDescription: value.docTypeDescription,
    });
  };

  const handleView = (a) => {
    console.log(a);
  };
  const GetDocData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/DocType/GetDocType");
      setDocData(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (data) {
      GetDocData();
    }
  }, [data]);

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
      <Grid className="doc_head">
        <PeopleAltIcon fontSize="medium" className="doc_head_icon" />
        <Typography className="doc_head_label">Documents</Typography>
        <button className="doc_btn_item" variant="outlined" onClick={handleClickOpen}>
          +
        </button>
      </Grid>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Update Documents" : "Add Documents"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Document Types<span>*</span>
                </Grid>
                <TextField
                  fullWidth
                  name="docTypeText"
                  value={data.docTypeText}
                  onChange={handleChange}
                />
                <Grid className="error">{error.docTypeText}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid className="input_lable">
                  Document Types Description<span>*</span>
                </Grid>
                <TextareaAutosize
                  className="create_doc_type_auto_resize"
                  name="docTypeDescription"
                  value={data.docTypeDescription}
                  onChange={handleChange}
                />
                <Grid className="error">{error.docTypeDescription}</Grid>
              </Grid>
            </Grid>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Grid className="doc_table">
        <TextField
          className="search"
          placeholder="Search...."
          value={quarry}
          onChange={(e) => setQuerry(e.target.value)}
        />
        <table>
          <tr>
            <th>Document Type</th>
            <th>Action</th>
          </tr>
          {records
            .filter((item) => item.docTypeText.toLowerCase().includes(quarry))
            .map((item) => (
              <tr>
                <td>{item.docTypeText}</td>
                <td>
                  <Grid className="doc_action_btn">
                    <Grid className="doc_edit_btn">
                      <BorderColor onClick={() => handleEdit(item)} />
                    </Grid>
                    <Grid className="doc_view_btn">
                      <RemoveRedEyeIcon onClick={() => handleView(item)} />
                    </Grid>
                  </Grid>
                </td>
              </tr>
            ))}
        </table>
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
      </Grid>
      {/* Pagination */}
    </DashboardLayout>
  );
}
