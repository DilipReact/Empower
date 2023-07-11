/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import "./CvCreate.css";
import axios from "axios";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CvCreateTable = (props) => {
  const EmpDatas = props.propsData;
  const Project = props.projectData;
  const ExpData = props.addExpData;
  const [empData, setEmpData] = React.useState(EmpDatas);
  const [experience, setExperience] = React.useState(ExpData);
  const [project, setProject] = React.useState(Project);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [educationData, setEducationData] = React.useState([]);
  const [addressData, setAddressData] = React.useState([]);
  const [otherActivitiesData, setOtherActivitiesData] = useState([]);
  const [error, setError] = React.useState("");

  // for Date of Birth
  const dob = new Date(empData.empDateofBirth).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDailogOpen = (data) => {
    setDialogOpen(true);
    console.log(data);
  };

  const handleDailogClose = () => {
    setDialogOpen(false);
  };

  const tech = experience.selectedItems.join(" , ");

  // For Maritial Status Text

  const getMaritalStatusText = (statusId) => {
    if (statusId === 5) {
      return "Married";
    } else if (statusId === 6) {
      return "Unmarried";
    }
    return "";
  };

  const status = getMaritalStatusText(empData.empMaritalStatusId);
  console.log(status, "status");

  // For Gender Status Text
  const getGenderText = (genderId) => {
    if (genderId === 1) {
      return "Male";
    } else if (genderId === 2) {
      return "Female";
    } else if (genderId === 3) {
      return "TransGender";
    }
    return "";
  };

  const gender = getGenderText(empData.empGenderId);

  console.log(gender, "gender");

  //API Integration for Education Data
  const GetEducationData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Education/GetEducations");
      setEducationData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    GetEducationData();
  }, []);

  // for Filter Education Data besice of Employee id
  const filteredEducationData = educationData.filter(
    (item) => item.educationEmpCode === empData.empCode
  );

  //API Integration for Address Data
  const GetAddressData = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/EmployeeAddress/GetEmployeeAddress");
      setAddressData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    GetAddressData();
  }, []);

  // for Filter Education Data besice of Employee id
  const filtAddressData = addressData.filter((item) => item.addressEmpId === empData.empCode);
  console.log(filtAddressData, "filtAddressData");

  //API Integration for other Activities Data
  const GetOtherActivitiesData = async () => {
    try {
      const res = await axios.get(
        "https://localhost:5001/api/ExtraCertificate/GetExtraCertificates"
      );
      setOtherActivitiesData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    GetOtherActivitiesData();
  }, []);

  console.log(otherActivitiesData, "OtherActivitiesData");

  // for Filter Activities Data besice of Employee id
  const filterOtherActivitiecData = otherActivitiesData.filter(
    (item) => item.extraCertificateEmpCode === empData.empCode
  );
  console.log(filterOtherActivitiecData, "filterOtherActivitiecData");

  // For PDF Download
  const handleDownloadFile = (data) => {
    const documentDefinition = {
      content: [
        {
          text: `${data.empFName} ${data.empMName} ${data.empLName}`,
          style: "head",
        },
        { text: data.empPersonalEmailId, style: "bodyTexthead" },
        { text: data.empMobileNumber, style: "bodyTexthead" },
        { text: "Objective", style: "header" },
        {
          text: "To get an opportunity where I can make the best of my potential and contribute to the organization's growth. Seeking a position in a company where I can launch my career and build a valuable skill set. Seeking a role in an MNC where I can upgrade my skills with time and take the company to the next level",
          style: "bodyText",
        },
        { text: "Personal Information", style: "header" },
        { text: "Father Name :- ", style: "subheader" },
        { text: data.empFatherName, style: "itemText" },
        { text: "Date Of Birth :- ", style: "subheader" },
        { text: dob, style: "itemText" },
        { text: "Gender :- ", style: "subheader" },
        { text: gender, style: "itemText" },
        { text: "Maritial Status :- ", style: "subheader" },
        { text: "Marride", style: "itemText" },
        { text: "Address :- ", style: "subheader" },
        { text: filtAddressData.length > 0 ? filtAddressData[0].address : "", style: "itemText" },

        { text: "Technicial Information", style: "header" },
        { text: "Education", style: "header" },
        { text: "Board :-", style: "subheaderitem" },
        {
          text: filteredEducationData.length > 0 ? filteredEducationData[0].educationBoard : "",
          style: "itemTextEdu",
        },
        { text: "Stream :-", style: "subheaderitem" },
        {
          text: filteredEducationData.length > 0 ? filteredEducationData[0].educationStream : "",
          style: "itemTextEdu",
        },
        { text: "Percentage :-", style: "subheaderitem" },
        {
          text:
            filteredEducationData.length > 0 ? filteredEducationData[0].educationPercentage : "",
          style: "itemTextEdu",
        },
        { text: "Passing Year :-", style: "subheaderitem" },
        {
          text:
            filteredEducationData.length > 0 ? filteredEducationData[0].educationYearOfPassing : "",
          style: "itemTextEdu",
        },
        { text: "Projects ", style: "header" },
        { text: "Name of Project :-", style: "subheader" },
        { text: project.projectName, style: "itemText" },

        { text: "Experience :-", style: "subheader" },
        { text: experience.year, style: "itemText" },
        { text: "Technologyes :-", style: "subheader" },
        { text: tech, style: "itemText" },
        { text: "Extra Activities", style: "header" },
        { text: "Activities Name :- ", style: "subheader" },
        {
          text:
            filterOtherActivitiecData.length > 0
              ? filterOtherActivitiecData[0].extraCertificateTitle
              : "",
          style: "itemText",
        },

        { text: "Activities :-", style: "subheader" },
        {
          text:
            filterOtherActivitiecData.length > 0
              ? filterOtherActivitiecData[0].extraCertificateDescription
              : "",
          style: "itemText",
        },

        { text: "Hobbies :-", style: "header" },
        { text: empData.empHobbies, style: "itemText" },
      ],
      styles: {
        bodyTexthead: {
          fontSize: 10,
          alignment: "center",
          color: "#000",
          bold: true,
        },
        head: {
          fontSize: 14,
          alignment: "center",
          color: "#327ba8",
          bold: true,
        },
        header: {
          fontSize: 14,
          color: "#515b7d",
          // alignment: "center",
          bold: true,
          margin: [0, 20, 10, 5],
        },
        subheader: {
          fontSize: 11,
          bold: true,
          margin: [10, 5, 0, 2],
        },
        itemText: {
          color: "#000",
          fontSize: 11,
          margin: [105, -16, 2, 2],
        },
        itemTextEdu: {
          color: "#000",
          fontSize: 11,
          margin: [105, -18, 2, 2],
        },
        subheaderitem: {
          fontSize: 11,
          color: "#000",
          bold: true,
          margin: [10, 10, 0, 5],
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download(`${data.empFName}`);
  };

  return (
    <Grid className="cv_create_table">
      <Grid className="cv_create_table_head">
        <PersonIcon fontSize="medium" />
        <Grid className="cv_create_head_item">Employees CV Table</Grid>
      </Grid>
      <Grid className="cv_create_table_body">
        <table className="table_container">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Employee Name</th>
              <th>Email ID</th>
              <th>Contact No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                {empData.empFName} {empData.empMName} {empData.empLName}
              </td>
              <td>{empData.empPersonalEmailId}</td>
              <td>{empData.empMobileNumber}</td>
              <td>
                <Grid className="cv_action_btn">
                  <Grid className="cv_action_view_btn" onClick={() => handleDailogOpen(empData)}>
                    <VisibilityIcon />
                  </Grid>
                  <Grid
                    className="cv_action_download_btn"
                    onClick={() => handleDownloadFile(empData)}
                  >
                    <DownloadIcon />
                  </Grid>
                </Grid>
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Dialog open={isDialogOpen} onClose={handleDailogClose}>
        <Grid className="dialog">
          <DialogTitle>Curriculum Vitae</DialogTitle>
          <DialogContent>
            <Grid className="cv_name">
              {empData.empFName} {empData.empMName} {empData.empLName}
            </Grid>
            <Grid container spacing={2} className="cv_name_item">
              <Grid item xs={6} className="cv_name_items">
                <p>
                  Email: <span>{empData.empPersonalEmailId}</span>
                </p>
                <p>
                  Phone: <span>{empData.empMobileNumber}</span>
                </p>
              </Grid>
            </Grid>
            <Grid className="about_emp">
              <Grid className="about_emp_label">Objective:</Grid>
              <p className="about_emp_text">
                To get an opportunity where I can make the best of my potential and contribute to
                the organization's growth. Seeking a position in a company where I can launch my
                career and build a valuable skill set. Seeking a role in an MNC where I can upgrade
                my skills with time and take the company to the next level.
              </p>
            </Grid>
            <Grid className="cv_label">Personal Information:</Grid>
            <Grid container spacing={2} className="cv_item">
              <Grid item xs={6} className="dob">
                Date Of Birth: <span>{dob}</span>
              </Grid>
              <Grid item xs={6} className="gender">
                Gender: <span>{gender}</span>
              </Grid>
              <Grid item xs={6} className="marital">
                Marital Status: <span>{status}</span>
              </Grid>
              <Grid item xs={6} className="father">
                Father Name: <span>{empData.empFatherName}</span>
              </Grid>
              <Grid item xs={6} className="Address">
                Address:{" "}
                <span>
                  {filtAddressData.length > 0 ? filtAddressData[0].address : ""}, Pin Code-
                  {filtAddressData.length > 0 ? filtAddressData[0].addressPinCode : ""}
                </span>
              </Grid>
            </Grid>

            <Grid className="cv_label">Education:</Grid>
            <Grid item xs={6} className="experience">
              Board:{" "}
              <span>
                {filteredEducationData.length > 0 ? filteredEducationData[0].educationBoard : ""}
              </span>
            </Grid>
            <Grid item xs={6} className="projects">
              Stream:{" "}
              <span>
                {filteredEducationData.length > 0 ? filteredEducationData[0].educationStream : ""}
              </span>
            </Grid>
            <Grid item xs={6} className="technologies">
              Percentage:
              <span>
                {filteredEducationData.length > 0
                  ? filteredEducationData[0].educationPercentage
                  : ""}
              </span>
            </Grid>
            <Grid item xs={6} className="technologies">
              Passing Year:
              <span>
                {filteredEducationData.length > 0
                  ? filteredEducationData[0].educationYearOfPassing
                  : ""}
              </span>
            </Grid>

            <Grid className="cv_label">Technical Information:</Grid>
            <Grid item xs={6} className="experience">
              Experience: <span>{experience.year}</span>
            </Grid>
            <Grid item xs={6} className="projects">
              Projects: <span>{project.projectName}</span>
            </Grid>
            <Grid item xs={6} className="technologies">
              Technologies: <span>{tech}</span>
            </Grid>
            <Grid className="cv_label">Other Activities:</Grid>
            <p className="hobbies">
              {filterOtherActivitiecData.length > 0
                ? filterOtherActivitiecData[0].extraCertificateDescription
                : ""}
            </p>
            <p className="hobbies">
              {filterOtherActivitiecData.length > 0
                ? filterOtherActivitiecData[0].extraCertificateTitle
                : ""}
            </p>
            <Grid className="cv_label">Hobbies:</Grid>
            <p className="hobbies">{empData.empHobbies}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDailogClose} color="primary">
              Close
            </Button>
            <Button onClick={() => handleDownloadFile(empData)} color="primary">
              Download
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default CvCreateTable;
