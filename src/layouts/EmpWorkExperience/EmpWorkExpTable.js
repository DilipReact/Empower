/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { id: "employeeWorkExperienceCompanyName", label: "Company Name", minWidth: 100 },

  { id: "employeeWorkExperienceDescription", label: "Description", minWidth: 170 },

  { id: "action", label: "Action", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },

  container: {
    maxHeight: 440,
  },
});

function EmpWorkExpTable(props) {
  const classes = useStyles();

  const editHandler = (data) => {
    props.editHandler(data);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.rowsData.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.projectId} style={{}}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === "action") {
                      return (
                        <TableCell
                          key={column.id + row.projectId}
                          align="left"
                          className="actions_btn"
                        >
                          <EditIcon onClick={() => editHandler(row)} className="btn_edit" />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id + row.projectId} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default EmpWorkExpTable;
