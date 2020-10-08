import React from "react";
import Navbar from "./Navbar";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  useTheme
} from "@material-ui/core/styles";

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from '@material-ui/core/TableFooter';
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const theme = createMuiTheme({
  primary: {
    main: "#0ea80e",
  },
});

const rows = [
  { id: 1, name: "Dr. Altamash", assigned_devices: 3 },
  { id: 2, name: "Dr. Altamash", assigned_devices: 0 },
  { id: 3, name: "Dr. Altamash", assigned_devices: 3 },
  { id: 4, name: "Dr. Altamash", assigned_devices: 3 },
  { id: 5, name: "Dr. Altamash", assigned_devices: 3 },
  { id: 6, name: "Dr. Altamash", assigned_devices: 3 },
  { id: 7, name: "Dr. Altamash", assigned_devices: 3 },
];
const useStylesTable = makeStyles({
  table: {
    maxWidth: 650,
  },
  paper: {
    maxwidth: 650,
  },
  hover: {
    backgroundColor: "#2FC243",
    color: "white",
    "&:hover": {
      backgroundColor: "#67D977 ",
    },
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

/* TABLE PAGINATION */

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function Doctors() {
  const classesTable = useStylesTable();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider>
      <Navbar />

      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} style={{ flaot: "right" }}>
          <TableContainer className={classesTable.paper}>
            <Paper
              elevation={5}
              style={{
                width: 650,
                margin: "auto",
                marginTop: "5%",
                border: "solid grey 0.9px",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                style={{
                  textAlign: "center",
                  backgroundColor: "#0ea80e",
                  color: "white",
                  alignSelf: "center",
                }}
              >
                <b>Doctors</b>
              </Typography>

              <Table className={classesTable.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Doctors ID</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Assigned Devices</strong>
                    </TableCell>

                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.id}
                      </TableCell>
                      <TableCell align="center">{obj.name}</TableCell>
                      <TableCell align="center">
                        {obj.assigned_devices}
                      </TableCell>

                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            startIcon={<SettingsIcon fontSize="small" />}
                          >
                            {" "}
                            Configure
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
                      onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>

        <Grid item xs={3}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Doctors;
