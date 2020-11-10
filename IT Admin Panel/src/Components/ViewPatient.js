import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import swal from "sweetalert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DatePicker from "react-datepicker";
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
import TextField from "@material-ui/core/TextField";
import { Dialog, DialogContent, DialogTitle, Slide } from "@material-ui/core";
const useStylesTable = makeStyles({
  table: {
    maxWidth: 700,
  },
  paper: {
    maxwidth: 700,
  },
  cell: { color: "white" },
  hover: {
    backgroundColor: "#1B4F72", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",
    "&:hover": {
      backgroundColor: "#2980B9",
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
    main: " #2980B9", //   #2980B9 blue   dark#2471A3  button #1B4F72
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
  side: {
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
  let [date, setdate] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [openDialogue, setopenDialogue] = React.useState(false);
  let [historyAddress, sethistoryAddress] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [seeds, setSeeds] = useState([]);
  let [Transactions, setTransactions] = React.useState("");
  let [Show, setShow] = React.useState(false);
  let [Name, setName] = React.useState("");

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

  async function getInfo(address, name) {
    console.log("Address to find", address);
    setName(name);

    const info = await fetch(
      `https://thetamiddleware.herokuapp.com/getAllHash/${address}&${"29-10-2020"}`
    );
    const to_json = await info.json();

    console.log(to_json);
    // if transactions fetched
    try {
      if (to_json != false) {
        setTransactions(to_json);
        setShow(true);
      } else {
        // display SWEET ALERT
        swal({
          text: "No Transactions made",
          timer: 4000,
          icon: "error",
          buttons: false,
        });
      }
    } catch (e) {}
    console.log("Transactions=", Transactions);
  }

  function handleClose() {
    console.log("date=", date);
    setopenDialogue(false);
  }
  function getDate(address) {}
  {
    /**
      const { value: date } =  swal({
        title: 'Select Date',
      
        input : <DatePicker/>,
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
        
      })
       <div>
       <DatePicker 
       value={v}/></div>
      getInfo(address,v);
  
    }
    
  */
  }

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

  if (addresses == false) {
    return (
      <div>
        <Navbar />
        <Typography variant="h2" style={{ color: "#B4B4B4", margin: "auto" }}>
          <strong>No Patient added </strong>
        </Typography>
      </div>
    );
  }

  /*  function showTransactions(){
      return(
        <Slide direction="up" in={true} timeout={800}>
        <Paper elevation={2}
          style={{
            width: "40%",
            height: "50%",
            float: "center",
            margin: "auto"}}>
              
              <TableBody>
                
         {Transactions.map((obj)=>(
           <TableRow>
             <TableCell>{obj}</TableCell>
           </TableRow>

         ))};
              

              </TableBody>
            
               </Paper>
               <Button onClick={()=>{setShow(false)}}>Close</Button>
        </Slide>         

      );
    }*/

  if (Show) {
    return (
      //  <Slide direction="up" in={true} timeout={800}>
      <ThemeProvider>
        <Navbar />
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                <strong> Total Transactions </strong>
              </Typography>
              <Typography variant="h4" style={{ color: "#2980B9" }}>
                <strong>{Transactions.length + 1}</strong>
              </Typography>
              <Button
                className={classesTable.hover}
                color="inherit"
                startIcon={<ArrowBackIosIcon fontSize="small" />}
                onClick={() => {
                  setShow(false);
                }}
              >
                Go Back
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              className={classes.paper}
              style={{ marginTop: "4%" }}
            >
              <div style={{ backgroundColor: "#2980B9", color: "white" }}>
                <Typography
                  variant="h5"
                  style={{ backgroundColor: "#2980B9", color: "white" }}
                >
                  Transactions for {Name}
                </Typography>
              </div>
              <TableContainer className={classesTable.paper}>
                <Table className={classesTable.table} aria-label="simple table">
                  {Transactions.map((obj) => (
                    <TableRow>
                      <TableCell>
                        <strong>{obj}</strong>
                      </TableCell>
                    </TableRow>
                  ))}
                  ;
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Navbar />

      <Grid container spacing={3}>
        {/**  <Grid item xs={2} className={classes.side}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              <strong> Patients </strong>
            </Typography>
            <Typography variant="h4" style={{ color: "#2980B9" }}>
              <strong>{total}</strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid> */}
        {/**ADD TABLE */}

        <Grid item xs={2} className={classes.side}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom>
              <strong> Patients </strong>
            </Typography>
            <Typography variant="h4" style={{ color: "#2980B9" }}>
              <strong>{total}</strong>
            </Typography>
          </Paper>

          <Paper className={classes.paper}>
            <Grid item xs={2} className={classes.side}>
              <Typography variant="h3" gutterBottom>
                <strong> History </strong>
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
                          /** onClick={()=>{setopenDialogue(true); sethistoryAddress(obj.ADDRESS)}} */
                          onClick={() => getInfo(obj.ADDRESS, obj.Profile.name)}
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
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={10}>
          <Paper classNam e={classes.paper}>
            <Typography
              variant="h2"
              style={{ marginTop: "2%", color: "#B4B4B4", fontWeight: "bold" }}
              gutterBottom
            >
              <strong> Patients </strong>
            </Typography>

            <TableContainer className={classesTable.paper}>
              <Table className={classesTable.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#2980B9" }}>
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
                    <TableCell className={classesTable.cell} align="center">
                      <strong>Address</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        //style={{ color: "green" }}
                      >
                        <strong>{obj.Profile.name} </strong>
                      </TableCell>
                      <TableCell align="center">{obj.ID}</TableCell>
                      <TableCell align="center">{obj.Profile.age}</TableCell>
                      <TableCell align="center">
                        {obj.Profile.contact}
                      </TableCell>
                      <TableCell align="center">{obj.ADDRESS}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/** END */}
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialogue}
        //onChange={()=>{}}
        onClose={handleClose}
      >
        <DialogTitle>Select date</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            onChange={(date) => setdate(date)}
            format="yyyy-MM-dd"
            max="2020-10-30"
            min="2017-05-11"
            value={date}
            defaultValue="2019-05-24"
          ></TextField>
          {/** <DatePicker  onChange={date => setdate(date)} />*/}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default ViewPatient;
