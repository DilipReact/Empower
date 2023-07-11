/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { id: "serialNumber", label: "Serial No", minWidth: 50 },
  { id: "technologyName", label: "Technology Name", minWidth: 100 },
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

function TechnologyTable(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };
  /* eslint-disable react/prop-types */
  const editHandler = (data) => {
    props.editHandler(data);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const displayedRows = props.rowsData.slice(startIndex, endIndex);

  return (
    <Paper className={classes.root}>
      <div>
        <Select className="page_box" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </div>

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
            {displayedRows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.technologyId}>
                <TableCell align="left">{startIndex + index + 1}</TableCell>
                <TableCell align="left">{row.technologyName}</TableCell>
                <TableCell align="left">
                  <EditIcon onClick={() => editHandler(row)} className="btn_edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(props.rowsData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
}

export default TechnologyTable;
