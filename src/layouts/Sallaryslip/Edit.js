import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Button } from "@mui/material";

function Edit({ empid }) {

  return (
    <DashboardLayout>
    <Button onClick={() => handleEdit(empid)}>Edit</Button>
    
    </DashboardLayout>
  );
}

export default Edit;
