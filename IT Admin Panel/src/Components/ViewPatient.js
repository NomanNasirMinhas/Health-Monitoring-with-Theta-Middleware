import React from "react";

import Navbar from "./Navbar";
import "./body.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import swal from "sweetalert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DatePicker from "react-datepicker";
import GroupIcon from "@material-ui/icons/Group";

import {
  createMuiTheme,
  withStyles,
  ThemeProvider,
  useTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import EllipsisText from "react-ellipsis-text";

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
import KeyboardBackspaceTwoToneIcon from "@material-ui/icons/KeyboardBackspaceTwoTone";

import TextField from "@material-ui/core/TextField";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  CircularProgress,
} from "@material-ui/core";

let theme = createMuiTheme({
  body: { backgroundColor: "#F6FFF8" },
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
      padding: "10px",
      backgroundColor: "#2980B9", //#3498DB
    },
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

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
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
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

function ViewPatient(props) {
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

  async function getInfo(address) {
    console.log("Address to find", address);
    //setName(name);

    const info = await fetch(
      `https://thetamiddleware.herokuapp.com/getAllHash/${address}&${"26-11-2020"}&${"vitals"}`
    );
    const to_json = await info.json();

    console.log("To json", to_json);
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
    } catch (e) {
      swal({
        text: "404 Not Found",
        timer: 4000,
        icon: "error",
        buttons: false,
      });
    }
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
          <br /> <br />
          <CircularProgress size="200px" />
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

  function Profile(obj) {
    //console.log("To Profile", obj);
    localStorage.setItem("patient_profile", JSON.stringify(obj));
    console.log(
      "Sending object",
      JSON.parse(localStorage.getItem("patient_profile"))
    );
    props.history.push(`/patient_profile`);
  }
  function goBack() {
    props.history.push(`/home`);
  }

  if (Show) {
    return (
      //  <Slide direction="up" in={true} timeout={800}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div style={{ float: "left", marginLeft: "1%", marginTop: "1%" }}>
          <Button
            className={classesTable.hover}
            style={{ marginBottom: "2%", marginTop: "2%" }}
            color="inherit"
            startIcon={<KeyboardBackspaceTwoToneIcon fontSize="small" />}
            onClick={() => {
              setShow(false);
            }}
          ></Button>
        </div>
        <Slide direction="down" in={true} timeout={300}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Paper
                elevation={2}
                className={classes.paper}
                style={{
                  backgroundColor: "#F6FFF8",
                  marginLeft: "2%",
                  marginTop: "12%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h4" style={{ color: "#2980B9" }}>
                  {Transactions.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={9}>
              <Paper
                elevation={2}
                className={classes.paper}
                style={{
                  backgroundColor: "#F6FFF8",
                  marginTop: "4%",
                  marginLeft: "2%",
                  marginRight: "1%",
                }}
              >
                <div style={{ backgroundColor: "#2980B9", color: "white" }}>
                  <Typography
                    variant="h4"
                    style={{ backgroundColor: "#2980B9", color: "white" }}
                  >
                    Transactions for {Name}
                  </Typography>
                </div>
                <TableContainer className={classesTable.paper}>
                  <Table
                    className={classesTable.table}
                    style={{ backgroundColor: "#F6FFF8" }}
                    aria-label="simple table"
                  >
                    {Transactions.map((obj) => (
                      <TableRow>
                        <TableCell align="center">
                          <Typography>{obj}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Slide>
      </ThemeProvider>
    );
  }

  if (addresses != null) {
    return (
      <ThemeProvider theme={theme} style={{ backgroundColor: "#F2FDFF" }}>
        <Navbar />
        <div style={{ float: "left", marginLeft: "1%", marginTop: "1%" }}>
          <Button
            className={classesTable.hover}
            style={{ marginTop: "2%", marginLeft: "0" }}
            color="inherit"
            startIcon={<KeyboardBackspaceTwoToneIcon fontSize="small" />}
            onClick={() => {
              goBack();
            }}
          ></Button>
        </div>

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
        {/** 
          
          <Grid item xs={2} className={classes.side}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>
                 Patients 
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
                            /** onClick={()=>{setopenDialogue(true); sethistoryAddress(obj.ADDRESS)}} 
                            onClick={() =>
                              getInfo(obj.ADDRESS, obj.Profile.name)
                            }
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
        */}

        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid xs={10} style={{ marginBottom: "3%" }}>
            <Typography
              variant="h2"
              style={{
                marginTop: "2%",
                color: "#B4B4B4",
                fontWeight: "bold",
              }}
              gutterBotto
            >
              <GroupIcon fontSize="large" />
              {total} Patients
            </Typography>
            <Slide direction="right" in={true} timeout={300}>
              <Paper className={classes.paper}>
                <TableContainer
                  className={classesTable.paper}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Table
                    className={classesTable.table}
                    aria-label="simple table"
                  >
                    <TableHead style={{ backgroundColor: "#2980B9" }}>
                      <TableRow>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Patient's Name
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Patient's ID
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Age
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Contact
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Address
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Transactions
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Transaction Type
                          </Typography>
                        </TableCell>
                        <TableCell className={classesTable.cell} align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Profile
                          </Typography>
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
                            <Typography variant="body2">
                              {obj.Profile == null ? "empty" : obj.Profile.name}{" "}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2"> {obj.ID}</Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2">
                              {obj.Profile == null ? "empty" : obj.Profile.age}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2">
                              {" "}
                              {obj.Profile == null
                                ? "empty"
                                : obj.Profile.contact}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2">
                              <EllipsisText text={obj.ADDRESS} length={"30"} />
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              className={classesTable.hover}
                              color="inherit"
                              /** onClick={()=>{setopenDialogue(true); sethistoryAddress(obj.ADDRESS)}} */
                              onClick={() => getInfo(obj.ADDRESS)}
                              startIcon={
                                <ListIcon
                                  fontSize="small"
                                  // component={link}
                                  //to={`/ViewPatient/${obj.SEED}`}
                                />
                              }
                            >
                              {" "}
                              <Typography variant="button"> View</Typography>
                            </Button>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">Vitals</Typography>
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

                    <TableFooter
                      className={classesTable.row}
                      style={{ maxwidth: "100%" }}
                    >
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            10,
                            { label: "All", value: -1 },
                          ]}
                          colSpan={12}
                          count={addresses.length}
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
            </Slide>

            {/** END */}
          </Grid>
          <Grid item xs={1}></Grid>
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
}

export default ViewPatient;
