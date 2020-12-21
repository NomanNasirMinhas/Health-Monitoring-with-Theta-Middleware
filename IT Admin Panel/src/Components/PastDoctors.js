import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { Button, Typography, CircularProgress, Slide } from "@material-ui/core";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  useTheme,
} from "@material-ui/core/styles";

//**** TABLE ******/
import EllipsisText from "react-ellipsis-text";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

//import {Img} from 'react-image'

import db from "../Firebase";

let theme = createMuiTheme({
  typography: {
    fontFamily: ["Metrophobic", "sans-serif"].join(","),
  },
  primary: {
    main: "#2980B9",
  },
});
//Adjuts font size
theme = responsiveFontSizes(theme);

const useStylesTable = makeStyles({
  row: { backgroundColor: "white" },

  table: {
    maxWidth: "100%",
    fontFamily: "Metrophobic",
  },
  TableHead: {
    cell: { color: "white" },
    fontFamily: "Metrophobic",
  },
  paper: {
    maxwidth: "100%",
  },
  hover: {
    backgroundColor: "#1B4F72", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",

    "&:hover": {
      backgroundColor: "#2980B9", //#3498DB
      padding: "10px",
    },
  },

  papers: {
    "&:hover": {
      padding: "0px",
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
    <ThemeProvider theme={theme}>
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
      </div>{" "}
    </ThemeProvider>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function PastDoctors() {
  const classesTable = useStylesTable();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [oldSeeds, setOldSeeds] = React.useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //code to get firebase DATA
  var dummy = ["wahaj"];
  // const data= firebase.firestone().collection("profile");
  //const data= firebase.database().collection("profile");
  useEffect(() => {
    function getData() {
      console.log("in fucntion");
      db.collection("profile")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());

          console.log("data=", data);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getOldSeeds() {
      var credentials = localStorage.getItem("credentials");
      const data = JSON.parse(credentials);
      console.log("data: pass", data.password);
      console.log("data: username", data.username);
      //  setUsername(data.username);
      //  setPassword(data.password);
      // console.log("USername:", username);
      // console.log("Pass:", password);
      const response = await fetch(
        `https://thetamiddleware.herokuapp.com/getAllOldSeeds/${data.username}&${data.password}`
      );

      const fetched = await response.json();
      console.log("fetched", fetched);
      setOldSeeds(fetched);
      console.log("old:", oldSeeds);
    }
    getOldSeeds();
  }, []);

  if (oldSeeds == null) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container spacing={0}>
          {/**  <Grid item xs={0.5}></Grid> */}
          <Grid item xs={12}></Grid>
          {/**  <Grid item xs={0.5}></Grid> */}
        </Grid>
        {/**  <Typography variant="h1"> Loading...</Typography>*/}
        <CircularProgress size="200px" />
      </ThemeProvider>
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />

        <Typography variant="h2" style={{ marginTop: "2%", color: "#16A085" }}>
          Past Doctors{" "}
        </Typography>

        <Slide direction="down" in={true} timeout={300}>
          <Grid container spacing={0} style={{ marginTop: "2%" }}>
            <Grid item xs={12}>
              <TableContainer className={classesTable.paper}>
                <Table className={classesTable.table} aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#16A085" }}>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Name
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Address
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Contact
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Email
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Specialization
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h6" style={{ color: "white" }}>
                          Seed
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(rowsPerPage > 0
                      ? oldSeeds.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : oldSeeds
                    ).map((obj) => (
                      <TableRow
                        hover
                        key={obj.name}
                        className={classesTable.row}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                            {obj.Profile.name}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                            {obj.Profile.address}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                            {obj.Profile.contact}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                            {obj.Profile.email}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                            {obj.Profile.specialization}
                          </Typography>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Typography variant="body2">
                          {
                            <EllipsisText
                              text={obj.SEED}
                              length={"15"}
                            />
                          }
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter
                    className={classesTable.row}
                    style={{ maxwidth: "100%" }}
                  >
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={12}
                        count={oldSeeds.length}
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
            </Grid>
          </Grid>
        </Slide>
      </ThemeProvider>
    </div>
  );
}

export default PastDoctors;
