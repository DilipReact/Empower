// /* eslint-disable no-shadow */
// /* eslint-disable import/order */
// /* eslint-disable no-var */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-restricted-globals */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/jsx-curly-brace-presence */
// /* eslint-disable react/function-component-definition */
// import React, { useEffect, useState } from "react";

// import {
//   Grid,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   TextareaAutosize,
//   Alert,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import LogoutIcon from "@mui/icons-material/Logout";
// import axios from "axios";
// import "./Project.css";
// import Table from "./Table";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// var AuthData = JSON.parse(localStorage.getItem("myData"));

// const Project = () => {
//   const [open, setOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     projectName: "",
//     projectDuration: "",
//     projectDescription: "",
//     projectEmpCode: "",
//     comment: "",
//   });

//   console.log(formData);

//   const [error, setError] = useState("");
//   const [getEmpData, setGetEmpData] = useState([]);
//   const [postData, setPostData] = useState("");
//   const [isEdit, setIsEdit] = useState(false);
//   const [selectedProjectId, setSelectedProjectId] = useState("");
//   const [validationError, setValidationError] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [status, setStatus] = useState("");
//   const [rows, setRows] = useState([]);
//   const [commentData, setCommentData] = useState("");
//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);

//     setIsEdit(false);

//     setSelectedProjectId("");

//     setFormData({
//       projectId: "",
//       projectName: "",
//       projectDuration: "",
//       projectDescription: "",
//       projectEmpCode: "",
//       comment: "",
//     });
//   };

//   const handleClose = () => {
//     setOpen(false);

//     setValidationError("");
//   };

//   const editHandler = (data) => {
//     setSelectedProjectId(data.projectId);
//     console.log(selectedProjectId);
//     setOpen(true);
//     setIsEdit(true);
//     setFormData({
//       projectId: selectedProjectId,
//       projectName: data.projectName,
//       projectDuration: data.projectDuration,
//       projectDescription: data.projectDescription,
//       projectEmpCode: data.projectEmpCode,
//       comment: formData.comment,
//       status: 1,
//       createdBy: AuthData.employeeName,
//       modifiedBy: AuthData.employeeName,
//     });

//     setCommentData({
//       projectId: "",
//       commentId: "",
//       commentText: "",
//       createdOn: "",
//       createdBy: "",
//       modifiedBy: "",
//       status: "",
//       comment: "",
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Perform form validation

//     if (
//       !formData.projectName ||
//       !formData.projectDuration ||
//       !formData.projectEmpCode ||
//       !formData.projectDescription
//     ) {
//       setValidationError("Please fill in all the required fields.");

//       return;
//     }

//     const d = new Date();

//     const formattedDate = d.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     console.log(formattedDate);

//     const payload = {
//       projectId: isEdit ? selectedProjectId : 0,
//       projectEmpCode: formData.projectEmpCode,
//       projectName: formData.projectName,
//       projectDescription: formData.projectDescription,
//       projectDuration: formData.projectDuration,
//       startDate: d,
//       endDate: d,
//       status: isEdit ? 1 : 0,
//       createdBy: AuthData.employeeName,
//       modifiedBy: AuthData.employeeName,
//       comment: formData.comment,
//     };

//     console.log(payload);

//     try {
//       let res;

//       if (isEdit) {
//         res = await axios.post(`https://localhost:5001/api/Project/UpdateProject`, payload);
//       } else {
//         res = await axios.post("https://localhost:5001/api/Project/CreateProject", payload);
//       }

//       setPostData(res.data);
//       setOpen(false);
//       setIsSuccess(true);
//       setTimeout(() => {
//         setIsSuccess(false);
//       }, 3000);

//       // Post comment to another API endpoint

//       if (commentData) {
//         const commentPayload = {
//           commentId: 0,
//           commentTaskId: formData.projectEmpCode,
//           commentText: formData.comment,
//           commentType: "string",
//           status: true,
//           createdOn: d,
//           createdBy: AuthData.employeeName,
//           modifiedBy: AuthData.employeeName,
//           comment: formData.comment,
//         };

//         response = await axios.post(
//           "https://localhost:5001/api/Comment/CreateComment",
//           commentPayload
//         );
//       }

//       setCommentData(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const GetEmpData = async () => {
//     try {
//       const res = await axios.get("https://localhost:5001/api/Employee/GetAllEmployeesAsync");
//       setGetEmpData(res.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     GetEmpData();
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     axios
//       .get("https://localhost:5001/api/Project/GetProjects")
//       .then((response) => {
//         setRows(response.data);
//       })

//       .catch((error) => {
//         console.error("Error fetching data from the API:", error);
//       });
//   }, [open]);

//   console.log(rows);

//   return (
//     <DashboardLayout>
//     <DashboardNavbar/>

//       <Grid className="project">
//         <Grid className="project_icon">
//           <AccountTreeIcon />
//         </Grid>

//         <Grid className="project_head">Project</Grid>

//         <Grid>
//           <Button variant="outlined" id="project_btn" onClick={handleClickOpen}>
//             <h1>+</h1>
//           </Button>

//         <Grid item className="logout_icon">
//           <LogoutIcon fontSize="large" />
//         </Grid>

//           {isSuccess && (
//             <div className="alert-massage">
//               <Alert severity="success">
//                 {isEdit ? "Project updated successfully!" : "Project added successfully!"}
//               </Alert>
//             </div>
//           )}

//         </Grid>
//       </Grid>

//       <div>
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle>{isEdit ? "Update Project" : "Add Project"}</DialogTitle>

//           <DialogContent>
//             <form onSubmit={handleFormSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <label className="label">Project Name</label>

//                   <TextField
//                     name="projectName"
//                     value={formData.projectName}
//                     onChange={handleInputChange}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <label className="label">Project Duration in Days</label>

//                   <TextField
//                     type="month"
//                     name="projectDuration"
//                     value={formData.projectDuration}
//                     onChange={handleInputChange}
//                     fullWidth
//                     required
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <label className="label">*Employee</label>
//                   <select
//                     className="select_box"
//                     name="projectEmpCode"
//                     value={formData.projectEmpCode}
//                     onChange={handleInputChange}
//                   >
//                     <option>--Select--</option>
//                     {getEmpData.map((item) => (
//                       <option key={item.empCode} value={item.empCode}>
//                         {item.empFName}
//                       </option>
//                     ))}
//                   </select>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <label className="label">Project Description</label>

//                   <TextareaAutosize
//                     className="text-aotosize"
//                     label="projectDescription"
//                     name="projectDescription"
//                     value={formData.projectDescription}
//                     onChange={handleInputChange}
//                     multiline
//                     rows={4}
//                     fullWidth
//                     required
//                   />
//                 </Grid>

//                 {isEdit && open && (
//                   <Grid item xs={6}>
//                     <label className="label">Status</label>

//                     <Box sx={{ minWidth: 120 }}>
//                       <FormControl fullWidth>
//                         <Select className="select_box" value={status} onChange={handleChange}>
//                           <MenuItem value={"active"}>Active</MenuItem>

//                           <MenuItem value={"inactive"}>Inactive</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </Box>
//                   </Grid>
//                 )}

//                 {status === "inactive" && close && (
//                   <Grid item xs={6}>
//                     <label className="label">Comment</label>

//                     <TextareaAutosize
//                       className="text-aotosize"
//                       label="comment"
//                       name="comment"
//                       value={formData.comment}
//                       onChange={handleInputChange}
//                       multiline
//                       rows={4}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                 )}
//               </Grid>

//               {validationError && <p className="error">{validationError}</p>}
//             </form>
//           </DialogContent>

//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>

//             <Button
//               type="submit"
//               className="add_btn"
//               variant="contained"
//               onClick={handleFormSubmit}
//             >
//               {isEdit ? "Update" : "Add"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <Grid container className="Project_table">
//         <Table editHandler={editHandler} rowsData={rows} />
//       </Grid>
//     </DashboardLayout>
//   );
// };

// export default Project;

import React, { useEffect, useState } from "react";

import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
  Alert,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./Project.css";
import Table from "./Table";

let AuthData = JSON.parse(localStorage.getItem("myData"));

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
const Project = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDuration: "",
    projectDescription: "",
    projectEmpCode: "",
    comment: "",
  });

  const [error, setError] = useState("");
  const [getEmpData, setGetEmpData] = useState([]);
  const [postData, setPostData] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [rows, setRows] = useState([]);
  const [commentData, setCommentData] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setSelectedProjectId("");
    setFormData({
      projectId: "",
      projectName: "",
      projectDuration: "",
      projectDescription: "",
      projectEmpCode: "",
      comment: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setValidationError("");
  };

  const editHandler = (data) => {
    setSelectedProjectId(data.projectId);

    console.log(selectedProjectId);

    setOpen(true);

    setIsEdit(true);

    setFormData({
      projectId: selectedProjectId,
      projectName: data.projectName,
      projectDuration: data.projectDuration,
      projectDescription: data.projectDescription,
      projectEmpCode: data.projectEmpCode,
      comment: formData.comment,
      status: 1,
      createdBy: AuthData.employeeName,
      modifiedBy: AuthData.employeeName,
    });

    setCommentData({
      projectId: "",
      commentId: "",
      commentText: "",
      createdOn: "",
      createdBy: "",
      modifiedBy: "",
      status: "",
      comment: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.projectDuration ||
      !formData.projectEmpCode ||
      !formData.projectDescription
    ) {
      setValidationError("Please fill in all the required fields");

      return;
    }

    const d = new Date();

    const formattedDate = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    console.log(formattedDate);

    const payload = {
      projectId: isEdit ? selectedProjectId : 0,
      projectEmpCode: formData.projectEmpCode,
      projectName: formData.projectName,
      projectDescription: formData.projectDescription,
      projectDuration: formData.projectDuration,
      startDate: d,
      endDate: d,
      status: isEdit ? 1 : 0,
      createdBy: AuthData.employeeName,
      modifiedBy: AuthData.employeeName,
      comment: "string",
    };

    console.log(payload);
    try {
      let res;
      if (isEdit) {
        res = await axios.post(`https://localhost:5001/api/Project/UpdateProject`, payload);
      } else {
        res = await axios.post("https://localhost:5001/api/Project/CreateProject", payload);
      }

      setPostData(res.data);
      setOpen(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      if (commentData) {
        const commentPayload = {
          commentId: 0,
          commentTaskId: formData.projectEmpCode,
          commentText: formData.comment,
          commentType: "string",
          status: true,
          createdOn: d,
          createdBy: AuthData.employeeName,
          modifiedBy: AuthData.employeeName,
          comment: formData.comment,
        };

        response = await axios.post(
          "https://localhost:5001/api/Comment/CreateComment",
          commentPayload
        );
      }

      setCommentData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const GetEmpData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Employee/GetAllEmployeesAsync");
      setGetEmpData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    GetEmpData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Project/GetProjects")
      .then((response) => {
        setRows(response.data);
      })

      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, [open]);

  console.log(rows);

  return (
    <DashboardLayout>
      <Grid className="header">
        <Grid item className="logout_icon">
          <LogoutIcon fontSize="large" />
        </Grid>
      </Grid>

      <Grid className="project">
        <Grid className="project_icon">
          <AccountTreeIcon />
        </Grid>

        <Grid className="project_head">Project</Grid>

        <Grid>
          <Button variant="outlined" id="project_btn" onClick={handleClickOpen}>
            <h1>+</h1>
          </Button>

          {isSuccess && (
            <div className="alert-massage">
              <Alert severity="success">
                {isEdit ? "Project updated successfully!" : "Project added successfully!"}
              </Alert>
            </div>
          )}
        </Grid>
      </Grid>

      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{isEdit ? "Update Project" : "Add Project"}</DialogTitle>

          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <label className="label">Project Name</label>

                  <TextField
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <label className="label">Project Duration in Days</label>

                  <TextField
                    type="month"
                    name="projectDuration"
                    value={formData.projectDuration}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label className="label">*Employee</label>

                  <select
                    className="select_box"
                    name="projectEmpCode"
                    value={formData.projectEmpCode}
                    onChange={handleInputChange}
                  >
                    <option>--Select--</option>

                    {getEmpData.map((item) => (
                      <option key={item.empCode} value={item.empCode}>
                        {item.empFName}
                      </option>
                    ))}
                  </select>
                </Grid>

                <Grid item xs={12}>
                  <label className="label">Project Description</label>

                  <TextareaAutosize
                    className="text-aotosize"
                    label="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                  />
                </Grid>

                {isEdit && open && (
                  <Grid item xs={6}>
                    <label className="label">Status</label>

                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select className="select_box" value={status} onChange={handleChange}>
                          <MenuItem value={"active"}>Active</MenuItem>

                          <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                )}

                {status === "inactive" && close && (
                  <Grid item xs={6}>
                    <label className="label">Comment</label>

                    <TextareaAutosize
                      className="text-aotosize"
                      label="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
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

      <Grid container className="Project_table">
        <Table editHandler={editHandler} rowsData={rows} />
      </Grid>
    </DashboardLayout>
  );
};

export default Project;
