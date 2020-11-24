import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Link as link } from "react-router-dom";

import AssignmentIcon from "@material-ui/icons/Assignment";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Tooltip from "@material-ui/core/Tooltip";

//TOAST MESSAGE
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Slide,
} from "@material-ui/core";
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
import { CopyToClipboard } from "react-copy-to-clipboard";

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

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

function Doctors(props) {
  const classesTable = useStylesTable();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalDoctors, settotalDoctors] = React.useState("");
  const [totalPatients, settotalPatients] = React.useState(0);
  const [PatientCount, setPatientCount] = React.useState([]);
  const [newSeedsArray, setnewSeedsArray] = React.useState([]);
  let NewSeeds = [];
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
        //get patient count

        //settotalDoctors(seeds.length);
      } catch (e) {}
    }

    getData();
  }, []);

  useEffect(() => {
    async function Patient_Count() {
      //const patients=[];
      //const patients_json=[];
      // const
      console.log(seeds.length);

      for (var i = 0; i < seeds.length; i++) {
        console.log("loop =", i);
        let addresses_for = seeds[i].SEED;
        // addresses_for
        const patients = await fetch(
          `https://thetamiddleware.herokuapp.com/getAllAddresses/${addresses_for}`
        );
        //convert to json
        const patients_json = await patients.json();
        if (patients_json == false || patients_json == null) {
          // PatientCount.push(patients_json.length);
          //console.log("patients_json =", PatientCount);
          //console.log("patients_json length=", PatientCount);
          console.log("addresses=", patients_json.length);
          setPatientCount(PatientCount.concat(0));
          NewSeeds.push({ seed_obj: seeds[i], num_of_pat: 0 });
          console.log("patient count if =", PatientCount);
          console.log("New seeds =", NewSeeds);
        } else {
          console.log("addresses=", patients_json.length);
          setPatientCount(PatientCount.concat(patients_json.length));
          NewSeeds.push({
            seed_obj: seeds[i],
            num_of_pat: patients_json.length,
          });

          console.log("patient count else =", PatientCount);
          console.log("New seeds =", NewSeeds);
        }
      }
      setnewSeedsArray(NewSeeds);
    }

    Patient_Count();
  }, [seeds]);

  //console.log("PC=",Patient_Count());

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

  //navigate to doctor profile
  function Profile(obj) {
    //console.log("To Profile", obj);
    localStorage.setItem("seed_obj", JSON.stringify(obj));
    console.log("Sending object", JSON.parse(localStorage.getItem("seed_obj")));
    props.history.push(`/doctor_profile`);
  }

  let p_count = 0;
  //IF FETCHING DATA------>

  if (seeds == false || newSeedsArray ==null) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        {/** <Typography
          variant="h3"
          style={{ marginTop: "2%", color: "#B4B4B4" }}
        >
          Doctors{" "}
        </Typography> */}
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

  // IF DATA IS FETCHED---->
  //if(NewSeeds!=false && NewSeeds!=null){
  let p = PatientCount;
  let loop = 0;

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Typography variant="h2" style={{ marginTop: "2%", color: "#B4B4B4" }}>
        Doctors{" "}
      </Typography>
      <Slide direction="down" in={true} timeout={300}>
        <Grid container spacing={0} style={{ marginTop: "2%" }}>
          <Grid item xs={12}>
            {/**  <Paper
            elevation={5}
            style={{
              width: "100%",
              margin: "auto",
              marginTop: "2%",
              border: "solid grey 0.9px",
            }}
          >/*}
            
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
                      <Typography variant="h6" style={{ color: "white" }}>
                        Username
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Specialization
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Contact
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Seed
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Patients
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" style={{ color: "white" }}>
                        Profile
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? newSeedsArray.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : newSeedsArray
                  ).map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2">
                          {" "}
                          {obj.seed_obj.ID}{" "}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {obj.seed_obj.Profile.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {" "}
                          {obj.seed_obj.Profile.specialization}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Typography variant="body2">
                          {obj.seed_obj.Profile.contact}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {" "}
                        <Typography variant="body2">
                          {
                            <EllipsisText
                              text={obj.seed_obj.SEED}
                              length={"15"}
                            />
                          }

                          <CopyToClipboard text={obj.seed_obj.SEED}>
                            <Tooltip title="Copy" aria-label="add">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  toast("Seed Copied!", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  })
                                }
                              >
                                {" "}
                                {/**style={{color:"#2980B9"}} */}
                                <AssignmentIcon />
                              </IconButton>
                            </Tooltip>
                          </CopyToClipboard>
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            onClick={() => Patients(props, obj.SEED)}
                            startIcon={
                              <PeopleOutlineIcon
                                fontSize="small"
                                // component={link}
                                //to={`/ViewPatient/${obj.SEED}`}
                              />
                            }
                          >
                            {" "}
                            <Typography variant="button">
                              
                                {PatientCount == null &&
                                PatientCount == undefined ? (
                                  <CircularProgress
                                    style={{ color: "white" }}
                                  />
                                ) : (
                                  `${obj.num_of_pat} Patients`
                                )}{" "}
                           
                            </Typography>
                          </Button>
                        }
                      </TableCell>

                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            onClick={() => Profile(obj)}
                            startIcon={
                              <PermIdentityIcon
                                fontSize="small"
                                // component={link}
                                //to={`/ViewPatient/${obj.SEED}`}
                              />
                            }
                          >
                            {" "}
                            <Typography variant="button">View</Typography>
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
          </Grid>
        </Grid>
      </Slide>

      <Grid
        container
        spacing={1}
        style={{ alignSelf: "bottom" }}
        justify="space-between"
      >
        {/**  <Grid item xs={1}></Grid> */}
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Paper
            elevation={5}
            style={{ backgroundColor: "#08A24A", marginTop: "2%" }}
          >
            <Typography
              variant="h4"
              style={{ marginTop: "1%", color: "white", fontWeight: "bold" }}
              startIcon={<FavoriteBorderIcon fontSize="small" />}
            >
              <startIcon></startIcon>
              Registered Doctors{" "}
            </Typography>
            <Typography variant="h5">
              <strong style={{ color: "white" }}>
                {totalPatients == 0 ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  totalDoctors
                )}{" "}
              </strong>
            </Typography>
          </Paper>
        </Grid>
        {/**  <Grid item xs={1}></Grid> */}
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Paper
            elevation={5}
            style={{ backgroundColor: "#2B8FA3", marginTop: "2%" }}
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
                {totalPatients == 0 ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  totalPatients
                )}{" "}
              </strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>

        {/** 
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
              <strong style={{ color: "white" }}>
                {totalPatients == 0 ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "--"
                )}{" "}
              </strong>
            </Typography>
          </Paper>
        </Grid>*/}
      </Grid>

      <ToastContainer />
    </ThemeProvider>
  );
}

export default Doctors;
