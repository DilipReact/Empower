
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./Technology.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import BiotechIcon from "@mui/icons-material/Biotech";
import TechnologyTabale from "./TechnologyTable";
// eslint-disable-next-line import/order
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Technology() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    technologyName: "",
  });

  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setFormData({
      technologyId: 0,
      technologyName: "",
      status: 0,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setValidationError("");
  };

  const editHandler = (data) => {
    setOpen(true);
    setIsEdit(true);
    setFormData({
      technologyId: data.technologyId,
      technologyName: data.technologyName,
    });
  };

  const Payload = {
    technologyId: isEdit ? formData.technologyId : 0,
    technologyName: formData.technologyName,
    status: 0,
    createdBy: "string",
    modifiedBy: "string",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.technologyName) {
      setValidationError("Please fill in all the required fields.");
      return;
    }

    try {
      let res;
      if (isEdit) {
        res = await axios.post(`http://localhost:5000/api/Technology/UpdateTechnology`, Payload);
      } else {
        res = await axios.post("http://localhost:5000/api/Technology/CreateTechnology", Payload);
      }

      setFormData({
        technologyId: "",
        technologyName: "",
      });

      setOpen(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filterHandler = (e) => {
    setSearchValue(e.target.value);

    setFilter(
      rows.filter(
        (item) =>
          item.technologyId.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.technologyName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios

      .get("http://localhost:5000/api/Technology/GetTechnologys")
      .then((response) => {
        setRows(response.data);
        setFilter(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, [open]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid className="project">
        <Grid className="project_icon">
          <BiotechIcon />
        </Grid>
        <Grid className="project_head">Technology</Grid>
        <Grid>
          <Button variant="outlined" id="project_btn" onClick={handleClickOpen}>
            <h1>+</h1>
          </Button>

          {isSuccess && (
            <div className="alert-massage">
              <Alert severity="success">
                {isEdit ? "Technology Updated Successfully!" : "Technology Added Successfully!"}
              </Alert>
            </div>
          )}
        </Grid>
      </Grid>

      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{isEdit ? "Update technology" : "Add technology"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className="label">Technology Name</label>
                  <TextField
                    name="technologyName"
                    value={formData.technologyName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              {validationError && <p className="error">{validationError}</p>}
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              className="add_btn"
              variant="contained"
              onClick={handleFormSubmit}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Grid item xs={12}>
        <TextField label="Search" value={searchValue} onChange={filterHandler} />
        <TechnologyTabale editHandler={editHandler} rowsData={filter} />
      </Grid>
    </DashboardLayout>
  );
}

export default Technology;
