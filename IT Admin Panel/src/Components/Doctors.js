import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link as link } from "react-router-dom";
import PropTypes from 'prop-types';

import ListIcon from '@material-ui/icons/List';
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
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
} from "@material-ui/core/styles";

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import SettingsIcon from "@material-ui/icons/Settings";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  primary: {
    main: "#0ea80e",
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Devices_rows = [
  { device_id: 123, name: "Dr. Altamash", seed: "xyz" },
  { device_id: 124, name: "Dr. Altamash", seed: "xyz" },
  { device_id: 125, name: "Dr. Sidq", seed: "xyz" },
  { device_id: 127, name: "Dr. Altamash", seed: "xyz" },
  { device_id: 128, name: "None", seed: "xyz" },
  { device_id: 129, name: "Dr. Altamash", seed: "xyz" },
  { device_id: 130, name: "Dr. Altamash", seed: "xyz" },
];

const useStylesTable = makeStyles({
  table: {
    maxWidth: "100%",
  },
  cell: { color: "white" },
  paper: {
    maxwidth: "100%",
  },
  hover: {
    backgroundColor: "#2FC243",
    color: "white",
    "&:hover": {
      backgroundColor: "#67D977 ",
    },
  },
});

//DIALOGUE BOX------------------------------------
/* TABLE PAGINATION */

function TablePaginationActions(props) {
  const classes = useStyles1();
  //const theme = useTheme();
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




function Homepage(props) {
  const classes = useStyles();
  const classesTable = useStylesTable();
  const [seeds, setSeeds] = useState(null);
  const [arr, setArr] = useState(null);
  let history = useHistory();

  useEffect( ()=>{ 
   
    async function getData() {

      try{
      const data = localStorage.getItem("credentials");
      const abc = JSON.parse(data);
      const username = abc.username;
      //console.log("Parsed_name"+abc)
      //console.log('data'+ credentials)
      const password = abc.password;
      const response = await fetch(
        `https://thetamiddleware.herokuapp.com/getAllSeeds/${username}&${password}`
      );
      //  console.log("response =",   seeds);
      const fetched_data = await response.json();
      //console.log("fetched-data =", fetched_data);
      setSeeds(fetched_data);}
      catch (e){};
      // setArr(seeds.SEED);
      // console.log("SEED=", seeds.SEED);
      //console.log("Seeds =", seeds);
    } 
    
     getData();
  },[]) 

  useEffect(() => {
    console.log("username=", seeds);
    if (seeds != null) {
      console.log("SEED=", seeds.SEED);
    }
  }, [seeds]);
  // async function getSeeds(){
  //   const credentials= localStorage.getItem('credentails');
  //   const data= JSON.parse(credentials);
  //      const username= data.username;
  //      const password= data.password;
  //      const seeds = await fetch(`https://thetamiddleware.herokuapp.com/getAllSeeds/${username}&${password}`);
  //      console.log("response =",   seeds);
  //      const fetched_data= await seeds.json();
  //      console.log("data =", fetched_data);

  //      return fetched_data;
  //  }
  //  const dataReturned= getSeeds();
  function Patients(props, SEED) {
    console.log("anday waala burger");
    props.history.push(`/ViewPatient/${SEED}`);
    
  }

  if (seeds === null) {
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

  return (
    <ThemeProvider>
      <Navbar />
      <Typography
        variant="h3"
        style={{ marginTop: "2%", color: "#B4B4B4", fontWeight: "bold" }}
      >
        Doctors{" "}
      </Typography>

      {/* TABLE START*/}

      <Grid container spacing={1} style={{ alignSelf: "center" }}>
        {/** <Grid item xs={0.5}></Grid> */}

        <Paper
          elevation={5}
          style={{
            maxWidth: "100%",
            width: "100%",
            margin: "auto",
            marginTop: "2%",
            border: "solid grey 0.9px",
          }}
        >
          <Grid item xs={12}>
            {/**   <Typography variant="h3" style={{backgroundColor:"#B4B4B4"}}> </Typography>
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
              </Typography> */}
            <TableContainer className={classesTable.paper}>
              <Table className={classesTable.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#0ea80e" }}>
                  <TableRow>
                    <TableCell className={classesTable.cell} align="left">
                      <strong>Doctor's Name</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="left">
                      <strong>Specialization</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Contact</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Seed</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Patients</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seeds.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.ID}
                      </TableCell>
                      <TableCell align="center">
                        {obj.Profile.specialization}
                      </TableCell>
                      <TableCell align="center">
                        {obj.Profile.contact}
                      </TableCell>
                      <TableCell align="center">{obj.SEED}</TableCell>
                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            onClick={() => Patients(props, obj.SEED)}
                            startIcon={
                              <ListIcon
                                fontSize="small"
                                component={link}
                                //to={`/ViewPatient/${obj.SEED}`}
                              />
                            }
                          >
                            {" "}
                            View Patients
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/**  <Grid item xs={0.5}></Grid>
        {/********************* */}
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
export default Homepage;
