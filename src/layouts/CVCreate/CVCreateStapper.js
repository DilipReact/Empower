/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-fragments */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-fragments */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CVCreateEmpList from "./CVCreateEmpList";
import CvAddProject from "./CvAddProject";
import CvAddExperince from "./CvAddExperince";
import { styled } from "@mui/material/styles";
import "./CvCreate.css";
import CvCreateTable from "./CvCreateTable";

const steps = ["Employee List", "Add Experience", "Add Project"];

const StyledStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: 0,
  "& .MuiStepLabel-label": {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  "& .MuiStepLabel-icon": {
    color: theme.palette.primary.main,
  },
}));

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [propsData, setPropsData] = React.useState("");
  const [addExpData, setAddExpData] = React.useState("");
  const [projectData, setProjectData] = React.useState("");

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // EmpCode Data Reciving from CVCreateEmpList Component
  const handleGetData = (data) => {
    setPropsData(data);
  };
  // Experience And Technology Data Reciving from CVAddExperience Component
  const handleExpData = (data) => {
    setAddExpData(data);
  };

  // Project Data is Reaciving from CvAddProject component
  const handleProjectData = (data) => {
    setProjectData(data);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <StyledStepper activeStep={activeStep} className="stepperHeader">
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </StyledStepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography> */}
            <CvCreateTable
              // sending Employee Data
              propsData={propsData}
              // sending Experience And Technology Data
              addExpData={addExpData}
              // sending Project List Data
              projectData={projectData}
            />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <CVCreateEmpList handleGetData={handleGetData} />}
            {activeStep === 1 && <CvAddExperince handleExpData={handleExpData} />}
            {activeStep === 2 && (
              <CvAddProject state={propsData} handleProjectData={handleProjectData} />
            )}
            <Box className="stapper_btn">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ display: "flex" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </DashboardLayout>
  );
}
