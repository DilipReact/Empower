/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import Button from "@mui/material/Button";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import "./SallarySlip.css";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Sallaryslip() {
  const [postData, setPostData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    EmpId: "",
    filename: "",
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState([]);
  const [edit, setEdit] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allEmployeesSalaryList, setAllEmployeesSalaryList] = useState([]);
  const [salaryId, setSalaryId] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setEdit(false);
    setFormData((prevState) => ({
      ...prevState,
      date: "",
      EmpId: "",
      filename: "",
      sallary_date: "",
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const { empid } = useParams();
  // Assuming the empid is passed as a URL parameter
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("myData"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Payload = {
      employeeSalaryId: 0,
      employeeSalaryEmpId: formData.EmpId,
      employeeSalaryMonthYear: formData.sallary_date,
      employeeSalaryFileName: formData.filename,
      employeeSalaryPath: "file:///D:/pdf/amit.pdf", //uploadedFile.slice(uploadedFile.indexOf("4") + 2),
      status: true,
      createdBy: authData.employeeName,
      modifiedBy: authData.employeeName,
      employee: {
        empCode: "string",
        empFName: "string",
        empMName: "string",
        empLName: "string",
        empFatherName: "string",
        empEmailId: "string",
        empPersonalEmailId: "string",
        empMobileNumber: "string",
        empEmergencyContactNumber: "string",
        empRoleId: 0,
        empGenderId: 0,
        empDesignationId: 0,
        empJoiningDate: "2023-06-06T05:24:21.544Z",
        empDateofBirth: "2023-06-06T05:24:21.544Z",
        empMaritalStatusId: 0,
        empDateofMarriage: "2023-06-06T05:24:21.544Z",
        reJoining: true,
        empPAN: "string",
        empAadhar: "string",
        oldEmpid: "string",
        empHobbies: "string",
        emplanguage: "string",
        empLastCompany: "string",
        empSummary: "string",
        empSkills: "string",
        empLead: true,
        empStatusId: 0,
        empLeaderId: "string",
        empLeavingReason: "string",
        empLeavingDate: "2023-06-06T05:24:21.544Z",
        employeeStatus: {
          empStatusId: 0,
          empStatusText: "string",
        },
        role: {
          roleId: 0,
          roleText: "string",
        },
        gender: {
          genderId: 0,
          genderText: "string",
        },
        designation: {
          designationId: 0,
          designationName: "string",
          designationDescription: "string",
          designationStatus: true,
        },
      },
    };

    if (formData.EmpId === "" || formData.sallary_date === "" || formData.filename === "") {
      setError("Please fill in all fields");
      return;
    } else {
      try {
        axios
          .post("https://localhost:5001/api/EmployeeSalary/CreateEmployeeSalary", Payload)

          .then((resp) => {
            setPostData(resp.data);
            setError("");
            handleClose();
            setIsSuccess(true);
            setAlertMsg("Added Successfully");
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const GetData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/EmployeeSalary/GetEmployeeSalaryById?EmployeeSalaryId=${empid}`
      );

      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [isSuccess]);

  useEffect(() => {
    if (empid) {
      GetData();
    }
  }, [empid]);

  const handleEdit = async (value, e) => {
    setSalaryId(value.row.original.SalaryID);
    setFormData((prevState) => ({ ...prevState, ["EmpId"]: value.row.original.EmpId }));
    setFormData((prevState) => ({ ...prevState, ["date"]: value.row.original.Month }));
    // setFormData((prevState) => ({ ...prevState, ['filename']: value.row.original.File }));
    setOpen(true);
    setEdit(true);
  };
  const editApiHandle = async () => {
    try {
      const res = await axios
        .post(`https://localhost:5001/api/EmployeeSalary/UpdateEmployeeSalary`, {
          employeeSalaryId: salaryId,
          employeeSalaryEmpId: formData.EmpId,
          employeeSalaryMonthYear: formData.date,
          employeeSalaryFileName: formData.filename,
          employeeSalaryPath: uploadedFile.slice(uploadedFile.indexOf("4") + 2),
          status: true,
          createdBy: authData.employeeName,
          modifiedBy: authData.employeeName,
        })

        .then((resp) => {
          setEdit(resp.data);
          setError("");
          handleClose();
          setIsSuccess(true); // Set the state for update success
          setAlertMsg("Update Successfully");
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        });

      setFormData(res.data);

      navigate("/salleryslip");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/EmployeeSalary/GetEmployeeSalarys");
      setData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterHandler = (e) => {
    setFilter(
      data.filter(
        (item) =>
          item.employeeSalaryEmpId.toLowerCase() === e.target.value.toLowerCase() ||
          item.employeeSalaryMonthYear.toLowerCase() === e.target.value.toLowerCase()
      )
    );
  };

  const tableData = {
    columns: [
      { Header: "EmpId", accessor: "EmpId", width: "18%" },
      { Header: "Month", accessor: "Month", width: "18%" },
      {
        Header: "File",
        accessor: "File",
        width: "12%",
        Cell: (value) => (
          <button className="doenload_btn" onClick={() => downloadPdfHandler(value)}>
            Download
          </button>
        ),
      },
      {
        Header: "Actions",
        accessor: "Actions",
        width: "18%",
        Cell: (value) => <Edit onClick={() => handleEdit(value)} />,
      },
    ],

    rows:
      filter.length > 0
        ? filter.reverse().map((item) => ({
            EmpId: item.employeeSalaryEmpId,
            Month: item.employeeSalaryMonthYear,
            File: item.employeeSalaryFileName,
            Actions: item.employeeSalaryPath,
            Download: item.sallaryslip,
            SalaryID: item.employeeSalaryId,
          }))
        : data.reverse().map((item, index) => ({
            EmpId: item.employeeSalaryEmpId,
            Month: item.employeeSalaryMonthYear,
            File: item.employeeSalaryFileName,
            Actions: item.employeeSalaryPath,
            Download: item.sallaryslip,
            SalaryID: item.employeeSalaryId,
          })),
  };

  React.useEffect(() => {
    axios.get("https://localhost:5001/api/Employee/GetEmployees").then((resp) => {
      setAllEmployees(resp.data);
    });

    axios.get("https://localhost:5001/api/EmployeeSalary/GetEmployeeSalarys").then((resp) => {
      setAllEmployeesSalaryList(resp.data);
    });
  }, []);

  const fileHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    const fileType = ["application/pdf"];
    if (e.target.name === "filename") {
      var PDFNAme = e.target.files[0].name;
      setPdfName(PDFNAme);
      let selectedFile = e.target.files[0];

      if (selectedFile) {
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = (e) => {
            setUploadedFile(e.target.result);
          };
        } else {
          setUploadedFile("");
        }
      } else {
        console.log("select your file");
      }
    }
  };

  const downloadPdfHandler = (data) => {
    const linkSource = `data:application/pdf;base64,${data.row.original.Actions}`;
    console.log(linkSource, "fjdkfdhkf");
    const downloadLink = document.createElement("a");
    console.log(pdfName);
    const fileName = data.row.original.EmpId + "Salaryslip";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isSuccess ? (
        <Stack className="alert_message" spacing={2}>
          <Alert severity="success">{alertMsg}</Alert>
        </Stack>
      ) : null}
      <div>
        <Button onClick={handleOpen} variant="contained" className="btn">
          Add Salary Slip
        </Button>

        <Grid container spacing={2} sx={{ mt: "10px" }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={{ bgcolor: "#fff" }}
              placeholder="Search...."
              onChange={filterHandler}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              sx={{ width: "40%" }}
              placeholder="MM/YYYY"
              type="month"
              name="date"
              value={formData.date}
              onChange={filterHandler}
              inputFormat="MM/YYYY"
            />
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{edit === true ? "Update Salary Slip" : "Add Salary Slip"}</DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <lable>Select Employee</lable>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="EmpId"
                    value={formData.EmpId}
                    onChange={fileHandler}
                    sx={{
                      height: 50,
                    }}
                    disabled={edit ? true : false}
                  >
                    {allEmployees.map((item) => (
                      <MenuItem value={item.empCode}>
                        {item.empCode} {item.empFName} {item.empMName} {item.empLName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  placeholder="MM/YYYY"
                  type="month"
                  name="sallary_date"
                  value={formData.sallary_date}
                  onChange={fileHandler}
                  inputFormat="MM/YYYY"
                />
              </Grid>

              <Grid item xs={12}>
                <input type="file" name="filename" onChange={fileHandler} />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={edit === false ? handleSubmit : editApiHandle}
              variant="contained"
              color="primary"
              className="btn"
            >
              {edit === true ? "Update" : "Add to Table"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <DataTable table={tableData} />
    </DashboardLayout>
  );
}

export default Sallaryslip;

// import React, { useState, useEffect } from "react";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// import DataTable from "examples/Tables/DataTable";

// import Button from "@mui/material/Button";

// import axios from "axios";

// import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from "@mui/material";

// import { Edit } from "@mui/icons-material";

// import "./SallarySlip.css";

// import { useNavigate, useParams } from "react-router-dom";

// import InputLabel from "@mui/material/InputLabel";

// import MenuItem from "@mui/material/MenuItem";

// import FormControl from "@mui/material/FormControl";

// import Select from "@mui/material/Select";

// import Alert from "@mui/material/Alert";

// import Stack from "@mui/material/Stack";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// function Sallaryslip() {
//   const [postData, setPostData] = useState([]);

//   const [formData, setFormData] = useState({
//     date: "",

//     EmpId: "",

//     filename: "",
//   });

//   const [data, setData] = useState([]);

//   const [error, setError] = useState("");

//   const [filter, setFilter] = useState([]);

//   const [edit, setEdit] = useState(false);

//   const [allEmployees, setAllEmployees] = useState([]);

//   const [allEmployeesSalaryList, setAllEmployeesSalaryList] = useState([]);

//   const [salaryId, setSalaryId] = useState([]);

//   const [uploadedFile, setUploadedFile] = useState("");

//   const [isSuccess, setIsSuccess] = useState(false);

//   const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

//   const [alertMsg, setAlertMsg] = useState("");

//   const [pdfName, setPdfName] = useState("");

//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);

//     setEdit(false);

//     setFormData((prevState) => ({
//       ...prevState,

//       date: "",

//       EmpId: "",

//       filename: "",

//       sallary_date: "",
//     }));
//   };

//   const handleClose = () => {
//     setOpen(false);

//     setEdit(false);
//   };

//   const { empid } = useParams();

//   // Assuming the empid is passed as a URL parameter

//   const navigate = useNavigate();

//   const authData = JSON.parse(localStorage.getItem("mydata"));

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if any field is blank

//     if (formData.EmpId === "" || formData.sallary_date === "" || formData.filename === "") {
//       setError("Please fill in all fields");

//       return;
//     } else {
//       try {
//         axios
//           .post("https://localhost:5001/api/EmployeeSalary/CreateEmployeeSalary", {
//             employeeSalaryId: 0,
//             employeeSalaryEmpId: formData.EmpId,
//             employeeSalaryMonthYear: formData.sallary_date,
//             employeeSalaryFileName: formData.filename,
//             employeeSalaryPath: uploadedFile.slice(uploadedFile.indexOf("4") + 2),
//             status: true,
//             createdBy: authData.employeeName,
//             modifiedBy: authData.employeeName,
//           })

//           .then((resp) => {
//             setPostData(resp.data);
//             console.log(resp.data, "Data Salery Slip");
//             setError("");
//             handleClose();
//             setIsSuccess(true);
//             setAlertMsg("Added Successfully");
//             setTimeout(() => {
//               setIsSuccess(false);
//             }, 3000);
//           });
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const GetData = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/EmployeeSalary/GetEmployeeSalaryById?EmployeeSalaryId=${empid}`
//       );
//       setData(res.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     handleGetData();
//   }, [isSuccess]);

//   useEffect(() => {
//     if (empid) {
//       GetData();
//     }
//   }, [empid]);

//   const handleEdit = async (value, e) => {
//     setSalaryId(value.row.original.SalaryID);
//     setFormData((prevState) => ({ ...prevState, ["EmpId"]: value.row.original.EmpId }));
//     setFormData((prevState) => ({ ...prevState, ["date"]: value.row.original.Month }));
//     // setFormData((prevState) => ({ ...prevState, ['filename']: value.row.original.File }));
//     setOpen(true);
//     setEdit(true);
//   };

//   const editApiHandle = async () => {
//     try {
//       const res = await axios
//         .post(`https://localhost:5001/api/EmployeeSalary/UpdateEmployeeSalary`, {
//           employeeSalaryId: salaryId,
//           employeeSalaryEmpId: formData.EmpId,
//           employeeSalaryMonthYear: formData.date,
//           employeeSalaryFileName: formData.filename,
//           employeeSalaryPath: uploadedFile.slice(uploadedFile.indexOf("4") + 2),
//           status: true,
//           createdBy: authData.employeeName,
//           modifiedBy: authData.employeeName,
//         })
//         .then((resp) => {
//           setEdit(resp.data);
//           setError("");
//           handleClose();
//           setIsSuccess(true); // Set the state for update success
//           setAlertMsg("Update Successfully");
//           setTimeout(() => {
//             setIsSuccess(false);
//           }, 3000);
//         });

//       setFormData(res.data);
//       navigate("/salleryslip");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGetData = async () => {
//     try {
//       const res = await axios.get("https://localhost:5001/api/EmployeeSalary/GetEmployeeSalarys");
//       setData(res.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const filterHandler = (e) => {
//     setFilter(
//       data.filter(
//         (item) =>
//           item.employeeSalaryEmpId.toLowerCase() === e.target.value.toLowerCase() ||
//           item.employeeSalaryMonthYear.toLowerCase() === e.target.value.toLowerCase()
//       )
//     );
//   };

//   const tableData = {
//     columns: [
//       { Header: "EmpId", accessor: "EmpId", width: "18%" },
//       { Header: "Month", accessor: "Month", width: "18%" },
//       {
//         Header: "File",
//         accessor: "File",
//         width: "12%",
//         Cell: (value) => (
//           <button className="doenload_btn" onClick={() => downloadPdfHandler(value)}>
//             Download
//           </button>
//         ),
//       },

//       {
//         Header: "Actions",
//         accessor: "Actions",
//         width: "18%",
//         Cell: (value) => <Edit onClick={() => handleEdit(value)} />,
//       },
//     ],

//     rows:
//       filter.length > 0
//         ? filter.reverse().map((item) => ({
//             EmpId: item.employeeSalaryEmpId,
//             Month: item.employeeSalaryMonthYear,
//             File: item.employeeSalaryFileName,
//             Actions: item.employeeSalaryPath,
//             Download: item.sallaryslip,
//             SalaryID: item.employeeSalaryId,
//           }))
//         : data.reverse().map((item, index) => ({
//             EmpId: item.employeeSalaryEmpId,
//             Month: item.employeeSalaryMonthYear,
//             File: item.employeeSalaryFileName,
//             Actions: item.employeeSalaryPath,
//             Download: item.sallaryslip,
//             SalaryID: item.employeeSalaryId,
//           })),
//   };

//   React.useEffect(() => {
//     axios.get("https://localhost:5001/api/Employee/GetEmployees").then((resp) => {
//       setAllEmployees(resp.data);
//     });

//     axios.get("https://localhost:5001/api/EmployeeSalary/GetEmployeeSalarys").then((resp) => {
//       setAllEmployeesSalaryList(resp.data);
//     });
//   }, []);

//   const fileHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//     const fileType = ["application/pdf"];

//     if (e.target.name == "filename") {
//       var PDFNAme = e.target.files[0].name;
//       setPdfName(PDFNAme);
//       let selectedFile = e.target.files[0];
//       if (selectedFile) {
//         if (selectedFile && fileType.includes(selectedFile.type)) {
//           let reader = new FileReader();
//           reader.readAsDataURL(selectedFile);
//           reader.onloadend = (e) => {
//             setUploadedFile(e.target.result);
//           };
//         } else {
//           setUploadedFile("");
//         }
//       } else {
//         console.log("select your file");
//       }
//     }
//   };

//   const downloadPdfHandler = (data) => {
//     const linkSource = `data:application/pdf;base64,${data.row.original.Actions}`;
//     console.log(linkSource, "fjdkfdhkf");
//     const downloadLink = document.createElement("a");

//     console.log(pdfName);

//     const fileName = data.row.original.EmpId + "Salaryslip";

//     downloadLink.href = linkSource;

//     downloadLink.download = fileName;

//     downloadLink.click();
//   };

//   return (
//     <DashboardLayout>
//       {isSuccess ? (
//         <Stack className="alert_message" spacing={2}>
//           <Alert severity="success">{alertMsg}</Alert>
//         </Stack>
//       ) : null}

//       <div>
//         <Button onClick={handleOpen} variant="contained" className="btn">
//           Add Salary Slip
//         </Button>

//         <Grid container spacing={2} sx={{ mt: "10px" }}>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               sx={{ bgcolor: "#fff" }}
//               placeholder="Search...."
//               onChange={filterHandler}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               sx={{ width: "40%" }}
//               placeholder="MM/YYYY"
//               type="month"
//               name="date"
//               value={formData.date}
//               onChange={filterHandler}
//               inputFormat="MM/YYYY"
//             />
//           </Grid>
//         </Grid>

//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle>{edit == true ? "Update Salary Slip" : "Add Salary Slip"}</DialogTitle>

//           <DialogContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <lable>Select Employee</lable>

//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     name="EmpId"
//                     value={formData.EmpId}
//                     onChange={fileHandler}
//                     sx={{
//                       height: 50,
//                     }}
//                     disabled={edit ? true : false}
//                   >
//                     {allEmployees.map((item) => (
//                       <MenuItem value={item.empCode}>
//                         {item.empCode} {item.empFName} {item.empMName} {item.empLName}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   sx={{ width: "100%" }}
//                   placeholder="MM/YYYY"
//                   type="month"
//                   name="sallary_date"
//                   value={formData.sallary_date}
//                   onChange={fileHandler}
//                   inputFormat="MM/YYYY"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <input type="file" name="filename" onChange={fileHandler} />
//               </Grid>
//             </Grid>
//           </DialogContent>

//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>

//             <Button
//               onClick={edit == false ? handleSubmit : editApiHandle}
//               variant="contained"
//               color="primary"
//               className="btn"
//             >
//               {edit == true ? "Update" : "Add to Table"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <DataTable table={tableData} />
//     </DashboardLayout>
//   );
// }

// export default Sallaryslip;
