import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListIcon from '@material-ui/icons/List';

import {
  createMuiTheme,
  withStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
//import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStylesTable = makeStyles({
  table: {
    maxWidth: 700,
  },
  paper: {
    maxwidth: 700,
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

const rows = [
  { id: 1, name: "home", assigned_devices: 3 },
  { id: 2, name: "wahaj", assigned_devices: 0 },
  { id: 3, name: "mubeen", assigned_devices: 3 },
  { id: 4, name: "Kltamash", assigned_devices: 3 },
  { id: 5, name: "Dr. Lltamash", assigned_devices: 3 },
  { id: 6, name: "Dr. Vltamash", assigned_devices: 3 },
  { id: 7, name: "Dr. Oltamash", assigned_devices: 3 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  side:{
    marginTop: "2%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ViewPatient() {
  const classesTable = useStylesTable();
  var { SEED } = useParams();
  console.log(SEED);
  const [addresses, setAddresses] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [seeds, setSeeds] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();

  useEffect(() => {
    // console.log("SEED=",SEED);
    //setAddresses(SEED);
    //console.log("NOW ADDRESS",addresses);
    async function getAddresses() {
      const address = await fetch(
        `https://thetamiddleware.herokuapp.com/getAllAddresses/${SEED}`
      );
      console.log("ADDRESSES=", address);
      const address_json = await address.json();
      console.log("address.json=", address_json);
      setAddresses(address_json);

      const len = address_json.length;
      setTotal(len);
    }

    getAddresses();
  }, []);
  console.log("ADDRESS", addresses);

  useEffect(() => {
    async function doctorData() {}
    doctorData();
  }, []);

  if (addresses == null) {
    return (
      <div>
        <Navbar />
        <Typography variant="h2" gutterBottom>
          Fetching...
        </Typography>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Navbar />

      <Grid container spacing={0}>
        <Grid item xs={2} className={classes.side}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>
             <strong> Patients  </strong>
            </Typography>
            <Typography variant="h4" style={{ color: "green" }}>
              <strong>{total}</strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid> 
        {/**ADD TABLE */}
        <Grid xs={6}>
          <Typography
            variant="h2"
            style={{ marginTop: "2%", color: "#B4B4B4", fontWeight: "bold" }}
            gutterBottom
          >
            <strong> Patients </strong>
          </Typography>

          <Paper classNam e={classes.paper}>
            <TableContainer className={classesTable.paper}>
              <Table className={classesTable.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#0ea80e" }}>
                  <TableRow>
                    <TableCell className={classesTable.cell} align="left">
                      <strong>Patient's Name</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="left">
                      <strong>Patient's ID</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Age</strong>
                    </TableCell>
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Contact</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.Profile.name}
                      </TableCell>
                      <TableCell align="center">{obj.ID}</TableCell>
                      <TableCell align="center">{obj.Profile.age}</TableCell>
                      <TableCell align="center">
                        {obj.Profile.contact}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/** END */}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.side}>

        <Paper className={classes.paper}>
        <Typography variant="h3" gutterBottom>
             <strong> Patients  </strong>
            </Typography>
            <Table>
            <TableBody>
                  {addresses.map((obj) => (
                    <TableRow>
                      <TableCell>{obj.Profile.name}</TableCell>
                      <TableCell>

                      <Button
                            className={classesTable.hover}
                            color="inherit"
                           // onClick={() => Patients(props, obj.SEED)}
                            startIcon={
                              <ListIcon
                                fontSize="small"
                               // component={link}
                                //to={`/ViewPatient/${obj.SEED}`}
                              />
                            }
                          >
                            {" "}
                            View
                          </Button>

                      </TableCell>
                    </TableRow> 
      ))}
        </TableBody>
            </Table>
          </Paper>
          </Grid>            

      </Grid>
    </ThemeProvider>
  );
}

export default ViewPatient;
