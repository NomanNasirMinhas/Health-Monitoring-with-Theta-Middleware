import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Link as link } from "react-router-dom";

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
  useTheme,
} from "@material-ui/core/styles";

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ListIcon from "@material-ui/icons/List";

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const theme = createMuiTheme({
  primary: {
    main: "#2980B9",
  },
});

const rows = [
  { id: 1, name: "home", assigned_devices: 3 },
  { id: 2, name: "wahaj", assigned_devices: 0 },
  { id: 3, name: "mubeen", assigned_devices: 3 },
  { id: 4, name: "Kltamash", assigned_devices: 3 },
  { id: 5, name: "Dr. Lltamash", assigned_devices: 3 },
  { id: 6, name: "Dr. Vltamash", assigned_devices: 3 },
];
const useStylesTable = makeStyles({
  table: {
    maxWidth: "100%",
  },
  TableHead: {
    cell: { color: "white" },
    strong: { color: "white" },
  },
  paper: {
    maxwidth: "100%",
  },
  hover: {
    backgroundColor: "#1B4F72", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",
    "&:hover": {
      backgroundColor: "#2980B9", //#3498DB
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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

function Doctors(props) {
  const classesTable = useStylesTable();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalDoctors, settotalDoctors] = React.useState("");
  const [totalPatients, settotalPatients] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const credentials = localStorage.getItem("credentials");
        const data = JSON.parse(credentials);
        const username = data.username;
        const password = data.password;

        const response = await fetch(
          `https://thetamiddleware.herokuapp.com/getAllSeeds/${username}&${password}`
        );
        //  console.log("response =",   seeds);
        const fetched_data = await response.json();
        console.log("fetched-data =", fetched_data);
        setSeeds(fetched_data);

        console.log("Seeds =", seeds);
        //settotalDoctors(seeds.length);
      } catch (e) {}
    }

    getData();
  }, []);

  useEffect(() => {
    async function getPatients() {
      let s = [];
      let l = [];
      {
        /** let s=[]
      for(var i=0; i<= seeds.length ;i++){
        
      }  */
      }
      {
        seeds.map((obj) => {
          s.push(obj.SEED);
          console.log("extract", s);
        });
      }
      let count = 0;
      let current = "";
      for (var i = 0; i <= s.length; i++) {
        current = s[i];
        const add = await fetch(
          `https://thetamiddleware.herokuapp.com/getAllAddresses/${current}`
        );
        const js = await add.json();
        if (js == false) {
          continue;
        } else {
          js.map((obj) => {
            l.push(obj.ADDRESS);
          });
        }
      }
      if (l.length != 0) {
        settotalPatients(l.length);
      }
      console.log("total=", l, "length=", l.length);
      {
      }
    }
    getPatients();
  }, [seeds]);

  useEffect(() => {
    console.log("username=", seeds);
    settotalDoctors(seeds.length);
    if (seeds != null) {
      console.log("SEED=", seeds.SEED);
    }
  }, [seeds]);

  //Navigate to patients
  function Patients(props, SEED) {
    console.log("To Patients");
    props.history.push(`/ViewPatient/${SEED}`);
  }

  //IF FETCHING DATA------>

  if (seeds == false) {
    return (
      <ThemeProvider>
        <Navbar />
        <Typography
          variant="h3"
          style={{ marginTop: "2%", color: "#B4B4B4", fontWeight: "bold" }}
        >
          Doctors{" "}
        </Typography>

        <Grid container spacing={1}>
          {/**  <Grid item xs={0.5}></Grid> */}
          <Grid item xs={12}>
            <Paper
              elevation={5}
              style={{
                maxWidth: "100%",
                width: "100%",
                margin: "auto",
                marginTop: "2%",
                border: "solid grey 0.9px",
              }}
            ></Paper>
          </Grid>
          {/**  <Grid item xs={0.5}></Grid> */}
        </Grid>

        <Typography variant="h1"> Loading...</Typography>
      </ThemeProvider>
    );
  }

  // IF DATA IS FETCHED---->

  return (
    <ThemeProvider>
      <Navbar />

      <Typography
        variant="h3"
        style={{ marginTop: "1%", color: "#B4B4B4", fontWeight: "bold" }}
      >
        Doctors{" "}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ flaot: "right" }}>
          <Paper
            elevation={5}
            style={{
              width: "100%",
              margin: "auto",
              marginTop: "2%",

              border: "solid grey 0.9px",
            }}
          >
            {/** 
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
*/}

            <TableContainer className={classesTable.paper}>
              <Table className={classesTable.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#2980B9" }}>
                  <TableRow>
                    <TableCell align="center">
                      <strong style={{ color: "white" }}>Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong style={{ color: "white" }}>Specialization</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong style={{ color: "white" }}>Contact</strong>
                    </TableCell>

                    <TableCell align="center">
                      <strong style={{ color: "white" }}>Seed</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong style={{ color: "white" }}>Patients</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? seeds.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : seeds
                  ).map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        <strong> {obj.ID} </strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>{obj.Profile.specialization}</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong> {obj.Profile.contact}</strong>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <strong>{obj.SEED}</strong>
                      </TableCell>

                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            onClick={() => Patients(props, obj.SEED)}
                            startIcon={
                              <ListIcon
                                fontSize="small"
                                // component={link}
                                //to={`/ViewPatient/${obj.SEED}`}
                              />
                            }
                          >
                            {" "}
                            Patients
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter style={{ maxwidth: "100%" }}>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={12}
                      count={seeds.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: "1%" }}>
        {/**  <Grid item xs={1}></Grid> */}
        <Grid item xs={4}>
          <Paper
            elevation={5}
            style={{ backgroundColor: "#2980B9", marginTop: "2%" }}
          >
            <Typography
              variant="h4"
              style={{ marginTop: "1%", color: "white", fontWeight: "bold" }}
            >
              Registered Doctors{" "}
            </Typography>
            <Typography variant="h5">
              <strong style={{ color: "white" }}> {totalDoctors} </strong>
            </Typography>
          </Paper>
        </Grid>
        {/**  <Grid item xs={1}></Grid> */}

        <Grid item xs={4}>
          <Paper
            elevation={5}
            style={{ backgroundColor: "#2980B9", marginTop: "2%" }}
          >
            <Typography
              variant="h4"
              style={{ marginTop: "1%", color: "white", fontWeight: "bold" }}
            >
              Registered Patients{" "}
            </Typography>
            <Typography variant="h5">
              <strong style={{ color: "white" }}>
                {" "}
                {totalPatients == 0 ? "Fetching data..." : totalPatients}{" "}
              </strong>
            </Typography>
          </Paper>
        </Grid>
        {/**  <Grid item xs={1}></Grid> */}
        <Grid item xs={4}>
          <Paper
            elevation={5}
            style={{ backgroundColor: "#2980B9", marginTop: "2%" }}
          >
            <Typography
              variant="h4"
              style={{ marginTop: "1%", color: "white", fontWeight: "bold" }}
            >
              Total Devices{" "}
            </Typography>
            <Typography variant="h5">
              <strong style={{ color: "white" }}> -- </strong>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Doctors;
