/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

import HistoryIcon from "@mui/icons-material/History";

import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

const columns = [
  { id: "projectId", label: "Project ID", minWidth: 170 },

  { id: "projectEmpCode", label: "Employee Code", minWidth: 100 },

  { id: "projectName", label: "Project Name", minWidth: 170 },

  { id: "projectDescription", label: "project Description", minWidth: 170 },

  { id: "projectDuration", label: "Project Duration (in days)", minWidth: 170 },

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

const TableWithPagination = (props) => {
  const [mydata, setMyData] = useState([]);

  const classes = useStyles();

  //const [rows, setRows] = useState([]);

  const [IsEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState("");

  const navigate = useNavigate();

  const editHandler = (data) => {
    const mm = props.editHandler(data);
    console.log(mm);
    setMyData(props.editHandler(data));

    console.log(data);
  };

  const handleHestiry = (data) => {
    navigate("/layouts/tablecomment", {
      state: {
        data: data,
      },
    });

    console.log(data);
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.projectId}>
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

                          <HistoryIcon className="btn_history" onClick={() => handleHestiry(row)} />
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
};

export default TableWithPagination;
