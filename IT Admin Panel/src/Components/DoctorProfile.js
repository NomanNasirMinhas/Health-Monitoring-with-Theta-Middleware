import React from "react";

import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//grid import
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

//Avatar import
import TouchAppIcon from "@material-ui/icons/TouchApp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import StarsIcon from "@material-ui/icons/Stars";
import EllipsisText from "react-ellipsis-text";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//TOAST MESSAGE
import { ToastContainer, toast } from "react-toastify";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
//import QRCode from "react-qr-code";

///**** TABLE ******/
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";

import SettingsIcon from "@material-ui/icons/Settings";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import KeyboardBackspaceTwoToneIcon from "@material-ui/icons/KeyboardBackspaceTwoTone";
import ListIcon from "@material-ui/icons/List";

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

//Dialog box imports
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import swal from "sweetalert";

//import theme provider
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  useTheme,
} from "@material-ui/core/styles";

import { Typography, Slide, CircularProgress } from "@material-ui/core";

// theme set

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

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: "3%",
    marginBottom: "3%",
  },
  div: { marginTop: "4%" },

  hover: {
    backgroundColor: "#018D87", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",
    "&:hover": {
      padding: "10px",
      backgroundColor: "#922B21", //#3498DB
    },
  },

  logs: {
    backgroundColor: "#018D87", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",
    "&:hover": {
      padding: "10px",
      backgroundColor: "#2980B9", //#3498DB
    },
  },

  edit: {
    backgroundColor: "#018D87", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",
    "&:hover": {
      padding: "10px",
      backgroundColor: "#27AE60", //#3498DB
    },
  },

  hoverEdit: {
    backgroundColor: "#018D87", //   #2980B9 blue   dark#2471A3  button #1B4F72
    color: "white",

    "&:hover": {
      padding: "10px",
      backgroundColor: "#3498DB", //#3498DB
    },
  },
}));

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

function DoctorProfile() {
  //var { obj} = useParams();

  //var QRCode = require('qrcode.react');

  //var QRCode = require('qrcode.react');
  const classesTable = useStylesTable();
  let history = useHistory(); // assigning useHistory
  const [open, setOpen] = React.useState(false); //dialog box for deleting doctor
  const [openTwo, setopenTwo] = React.useState(false); // for edit password dialog
  const [editDialog, setEditDialog] = React.useState(false);
  //handle dialog box open
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenTwo = () => {
    setopenTwo(true);
  };

  const handleEditOpen = () => {
    setEditDialog(true);
  };

  //close dialog handle
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTwo = () => {
    setopenTwo(false);
  };

  const handleEditClose = () => {
    setEditDialog(false);
  };

  const classes = useStyles();
  const [name, setName] = React.useState();
  const [subName, setsubName] = React.useState();
  const [address, setAddress] = React.useState();
  const [contact, setContact] = React.useState();
  const [email, setEmail] = React.useState();
  const [specialization, setSpecialization] = React.useState();
  const [num_of_pat, setNum_of_pat] = React.useState();
  const [seed, setSeed] = React.useState();
  const [dummy, setDummy] = React.useState();
  const canvas = useRef(null);

  const [updatedPassword, setUpdatedPassword] = React.useState();
  const [confirmUpdatedPassword, setConfirmUpdatedPassword] = React.useState();
  const [hashes, setHashes] = React.useState();
  const [allLogs, setAllLogs] = React.useState([]);
  const [showLogs, setShowLogs] = React.useState(false);
  let [transactionCircular, setTransactionCirular] = React.useState(false);
  const [updateName, setUpdateName] = React.useState("");
  const [updateSpecialization, setUpdateSpecialization] = React.useState("");
  const [updateAddress, setUpdateAddress] = React.useState("");
  const [updateContact, setUpdateContact] = React.useState("");
  const [updateEmail, setUpdateEmail] = React.useState("");

  //table footer---------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var info;

  //console.log("SEED=",JSON.parse(obj));

  //get seed data
  useEffect(() => {
    async function SeedInfo() {
      try {
        const data = localStorage.getItem("seed_obj");
        const local_seed = JSON.parse(data);
        //localStorage.removeItem("seed_obj");

        //setting doctor object to variables
        //const name=local_seed.seed_obj.Profile.name;
        setName(local_seed.seed_obj.Profile.name);
        setUpdateName(local_seed.seed_obj.Profile.name);
        setsubName(
          local_seed.seed_obj.Profile.name.substring(0, 1).toUpperCase()
        );
        //const address = local_seed.seed_obj.Profile.address;
        setAddress(local_seed.seed_obj.Profile.address);
        setUpdateAddress(local_seed.seed_obj.Profile.address);
        //const contact = local_seed.seed_obj.Profile.contact;
        setContact(local_seed.seed_obj.Profile.contact);
        setUpdateContact(local_seed.seed_obj.Profile.contact);
        //const email = local_seed.seed_obj.Profile.email;
        setEmail(local_seed.seed_obj.Profile.email);
        setUpdateEmail(local_seed.seed_obj.Profile.email);
        //const specialization = local_seed.seed_obj.Profile.specialization;
        setSpecialization(local_seed.seed_obj.Profile.specialization);
        setUpdateSpecialization(local_seed.seed_obj.Profile.specialization);

        //other info
        //const num_of_pat = local_seed.num_of_pat;
        setNum_of_pat(local_seed.num_of_pat);
        const id = local_seed.seed_obj.ID;
        //const seed = local_seed.seed_obj.SEED;
        setSeed(local_seed.seed_obj.SEED);
        console.log(local_seed.seed_obj.SEED);
        setDummy = seed;

        console.log(
          name,
          address,
          contact,
          email,
          specialization,
          num_of_pat,
          id,
          seed
        );

        //setdevStatus(patDetails.response.LogDetails);
        //setlastOnline(patDetails.response.TimeStamp);

        //----------------------------------

        //-----------------Doctor Log ends
      } catch (e) {
        console.log("Cannot fetch");
      }
    }

    //updateProfile();
    SeedInfo();
  }, []);

  //-----------FUNCTION TO SHOW DOCTOR LOGS-----------//

  function doctorLogs() {
    const info = fetch(
      `https://thetamiddleware.herokuapp.com/getAllHash/${seed}&${"0"}&${"docLog"}`
    );
    //const logs = info.json();
    console.log("Logs to fetch:", info);
  }

  async function DocLogs() {
    //-------------------------DOCTOR LOGSS--------------------
    setTransactionCirular(true);
    //------------------deviceLog------------------
    // console.log("REached");
    const response = await fetch(
      `https://thetamiddleware.herokuapp.com/getAlphaAddress/${seed}` // send doctor address,returns transaction
      //insert transaction into getTx
    );
    const alphaAddress = await response.json();
    console.log("AlphTransaction", alphaAddress.ADDRESS);

    const alphaTransaction = await fetch(
      `https://thetamiddleware.herokuapp.com/getAllHash/${alphaAddress.ADDRESS}&0&docLog`
    );
    // console.log("LETS SEE :", alphaTransaction);
    const doctorlogs = await alphaTransaction.json();
    console.log("LETS SEE LOGS:", doctorlogs);
    setHashes(doctorlogs);
    console.log("HASHES ARRAY:", hashes);

    for (var i = 0; i < doctorlogs.length; i++) {
      let pass = doctorlogs[i];
      const transactionData = await fetch(
        `https://thetamiddleware.herokuapp.com/getTx/${pass}`
      );
      console.log("FOR:", doctorlogs[i]);

      const check = await transactionData.json();
      console.log("TEST:", check.response);
      if (check.response !== false) {
        //setAllLogs.push(check.response);
        setAllLogs((array) => [...array, check.response]);
      }
    }

    console.log("ALL Transaction:", allLogs);
    setTransactionCirular(false);
    setShowLogs(true);
    //   var patLog = await fetch(
    // `https://thetamiddleware.herokuapp.com/getLastTx/${seed}&docLog`
    // );
    //var patLogObj = await patLog.json();
    //console.log("docLOGS= ", patLogObj);

    //if (patLogObj != false) {
    //var patLogDetails = await fetch(
    // `https://thetamiddleware.herokuapp.com/getTx/${patLogObj}`
    // );
    //var docDetails = await patLogDetails.json();
    //console.log("Doctor details:", docDetails);
    // }
  }
  //DocLogs();
  //doctorLogs();
  //}, [seed]);

  //---FUNCTION TO EDIT PASSWORD

  function editPassword() {
    setopenTwo(true);
  }

  const toSend = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seed: seed, password: updatedPassword }),
  };
  function updatePassword() {
    //var sendingObject ={seed: seed, password: updatedPassword }
    //console.log("Objetc to send",sendingObject)

    if (updatedPassword != undefined) {
      console.log("NEW PASSWORD:", updatedPassword);
      if (updatedPassword.length < 8) {
        swal({
          text: "Password length must be at least 8",
          timer: 4000,
          icon: "warning",
          buttons: false,
        });
      } else if (updatedPassword != confirmUpdatedPassword) {
        swal({
          text: "Confirmed password does not match!",
          timer: 4000,
          icon: "warning",
          buttons: false,
        });
      } else if (updatedPassword == confirmUpdatedPassword) {
        fetch(
          `https://thetamiddleware.herokuapp.com/updateSeedPassword/`,
          toSend
        );

        //swal alert
        swal({
          text: "Password Successfully UPDATED!",
          timer: 4000,
          icon: "success",
          buttons: false,
        });
        // history.push(`/home`);
        setopenTwo(false);
      } // if for password==confrimPassword
    } else {
      swal({
        text: "PLEASE ENTER A PASSWORD!",
        timer: 4000,
        icon: "error",
        buttons: false,
      });
    }
  }

  const profileData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      seed: seed,
      info: {
        name: updateName,
        specialization: updateSpecialization,
        address: updateAddress,
        contact: updateContact,
        email: updateEmail,
      },
    }),
  };

  function updateProfile() {
    //info = { name: updateName, specialization: updateSpecialization,
    //  address: updateAddress, contact: updateContact, email: updateEmail };
    console.log("OBJECT TO PASS:", info);
    fetch(`https://thetamiddleware.herokuapp.com/updateSeedInfo/`, profileData);

    swal({
      text: "PROFILE UPDATED SUCCESSFULLY!",
      timer: 4000,
      icon: "success",
      buttons: false,
    });
    setEditDialog(false);
    // history.push(`/home`);
  }

  function Delete(seedReceived) {
    //console.log("going back from:", seed)

    //Open Dialog Box
    handleClickOpen();
  }

  const changePassword = (event) => {
    setUpdatedPassword(event.target.value);
  };

  const changeUpdatePassword = (event) => {
    setConfirmUpdatedPassword(event.target.value);
  };

  const changeName = (event) => {
    setUpdateName(event.target.value);
  };

  const changeSpecialization = (event) => {
    setUpdateSpecialization(event.target.value);
  };

  const changeAddress = (event) => {
    setUpdateAddress(event.target.value);
  };

  const changeContact = (event) => {
    setUpdateContact(event.target.value);
  };

  const changeEmail = (event) => {
    setUpdateEmail(event.target.value);
  };
  var QRCode = require("qrcode.react");
  //var dummy=seed.json();
  if (seed == null || seed == undefined) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <CircularProgress size="200px" />
      </ThemeProvider>
    );
  }

  if (transactionCircular) {
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

  //-----------SHOW DOCTOR LOGS-----------------------//
  if (showLogs) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />

        <div style={{ float: "left", marginLeft: "1%", marginTop: "1%" }}>
          <Button
            className={classesTable.hover}
            style={{ marginBottom: "2%", marginTop: "2%" }}
            color="inherit"
            startIcon={<KeyboardBackspaceTwoToneIcon fontSize="small" />}
            onClick={() => {
              setShowLogs(false);
            }}
          ></Button>
        </div>
        <Typography variant="h2" style={{ marginTop: "2%", color: "#2471A3" }}>
          {" "}
          {/**#B4B4B4 */}
          {name}'s Log Details
        </Typography>

        {allLogs.length == 0 ? (
          <Typography
            variant="h2"
            style={{ marginTop: "2%", color: "#B4B4B4" }}
          >
            No logs to show{" "}
          </Typography>
        ) : (
          <Slide direction="down" in={true} timeout={300}>
            <Grid container spacing={0} style={{ marginTop: "2%" }}>
              <Grid item xs={12}>
                <TableContainer className={classesTable.paper}>
                  <Table
                    className={classesTable.table}
                    aria-label="simple table"
                  >
                    <TableHead style={{ backgroundColor: "#2980B9" }}>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            LogType
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" style={{ color: "white" }}>
                            Time Stamp
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/**BODY HERE */}
                      {(rowsPerPage > 0
                        ? allLogs.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : allLogs
                      ).map((obj) => (
                        <TableRow
                          hover
                          key={obj.name}
                          className={classesTable.row}
                        >
                          <TableCell align="center">
                            {" "}
                            <Typography variant="body2">
                              {obj.LogDetails}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            {" "}
                            <Typography variant="body2">
                              {obj.LogType}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            {" "}
                            <Typography variant="body2">
                              {obj.TimeStamp}
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
                          count={allLogs.length}
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
        )}
      </ThemeProvider>
    );
  }

  if (seed != null) {
    return (
      <ThemeProvider theme={theme}>
        <Navbar />
        <Typography variant="h2" style={{ marginTop: "2%", color: "#2471A3" }}>
          {" "}
          {/**#B4B4B4 */}
          {name}'s Profile
        </Typography>

        <Grid container spacing={0} style={{ marginTop: "2%" }}>
          <Grid item xs="4"></Grid>
          <Slide direction="left" in={true} timeout={300}>
            <Grid item xs="4">
              <Paper
                elevation={5}
                style={{
                  marginLeft: "3%",
                  alignItems: "center",
                  backgroundColor: "#EDFFFE",
                  justifyContent: "center",
                  maxHeight: "100%",
                }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Avatar
                    className={classes.large}
                    style={{ backgroundColor: "#018D87", zIndex: "1" }}
                  >
                    <Typography variant="h4">{subName}</Typography>
                  </Avatar>
                </div>

                <div>
                  <Divider variant="middle" />
                </div>
                <div className={classes.div}>
                  <Typography variant="h6">
                    {" "}
                    <HomeIcon fontSize="small" /> {address}
                  </Typography>
                  <div className={classes.div}>
                    <Typography variant="h6">
                      <PhoneIcon fontSize="small" /> {contact}
                    </Typography>
                  </div>
                  <div className={classes.div}>
                    <Typography variant="h6">
                      <MailIcon fontSize="small" /> {email}
                    </Typography>
                  </div>
                  <div className={classes.div}>
                    <Typography variant="h6">
                      <StarsIcon fontSize="small" /> {specialization}
                    </Typography>
                  </div>

                  <div>
                    {" "}
                    <Typography variant="h6">
                      <Tooltip title="Edit Password" aria-label="add">
                        <IconButton
                          style={{ marginBottom: "3%", marginTop: "3%" }}
                          className={classes.hoverEdit}
                          color="primary"
                          onClick={() => {
                            console.log("CLICKED");
                            editPassword();
                          }}
                        >
                          {" "}
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </div>
                </div>
              </Paper>{" "}
            </Grid>
          </Slide>
          <Grid item xs="4"></Grid>
        </Grid>

        <div style={{ marginBottom: "2%", marginTop: "2%" }}>
          <Tooltip title="Delete Profile" aria-label="add">
            <Button
              style={{ marginRight: "0%" }}
              className={classes.hover}
              onClick={() => handleClickOpen()}
              startIcon={<DeleteIcon fontSize="small" />}
            >
              <Typography variant="button"> Delete</Typography>
            </Button>
          </Tooltip>

          <Tooltip title="View Logs" aria-label="add">
          <Button
            style={{ marginLeft: "3%", marginRight:"3%" }}
            className={classes.logs}
            onClick={() => DocLogs()}
            startIcon={<TouchAppIcon fontSize="small" />}
          >
            <Typography variant="button"> Logs</Typography>
          </Button></Tooltip>


          <Tooltip title="Edit Profile" aria-label="add">
          <Button
            style={{ marginLeft: "0%" }}
            className={classes.edit}
            onClick={() => setEditDialog(true)}
            startIcon={<EditIcon fontSize="small" />}
          >
            <Typography variant="button">Profile</Typography>
          </Button>
          </Tooltip>
        </div>

        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Divider variant="middle" />
        </div>

        <Typography variant="h2" style={{ marginTop: "2%", color: "#2471A3" }}>
          {" "}
          {/**#B4B4B4 */}
          QR Code
        </Typography>

        <Grid
          container
          spacing={0}
          style={{ marginTop: "2%", marginBottom: "2%" }}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <div>
              <Paper
                elevation={5}
                component={"div"}
                style={{ backgroundColor: "#EDFFFE" }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    backgroundColor: "#018D87",
                    color: "white",
                  }}
                >
                  <Typography variant="h5" style={{ marginTop: "2%" }}>
                    Doctor's Seed : <EllipsisText text={seed} length={"20"} />
                  </Typography>
                </div>

                <div>
                  <QRCode
                    value={seed}
                    includeMargin="true"
                    size="400"
                    bgColor="#EDFFFE"
                  />
                </div>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        {/**

        <Slide direction="right" in={true} timeout={300}>
       
          <Grid item xs="8">
          <Paper elevaion={5} style={{ marginRight: "2%" , marginLeft:"2%"}}>
           
              <div>             
                 <div
                style={{
                  height: "80px",
                  width: "100%",
                  maxWidth: "100%",
                  backgroundColor: "#2980B9",
                }}
              ></div>

              <Typography variant="h2" style={{ color: "#B4B4B4" }}>
                Total Patients
              </Typography>
              <div
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  backgroundColor: "#B4B4B4",
                }}
              >
                <Slide direction="left" in={true} timeout={300}>
                  <Typography variant="h3" style={{ color: "white" }}>
                    {num_of_pat}
                  </Typography>
                </Slide>
              </div>
              <Typography variant="h2" style={{ color: "#B4B4B4" }}>
                SEED
              </Typography>
              <div
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  backgroundColor: "#B4B4B4",
                }}
              >
                <Typography variant="body2" style={{ color: "black" }}>
              {seed}
              
                  </Typography>
                  <CopyToClipboard text={seed}>
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
                      
                        <AssignmentIcon />
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
               
              </div>

              <QRCode
                value={seed}
                includeMargin="true"
                size="400"
              />
              </div>

            </Paper>
          </Grid>
        </Slide>
      </Grid> */}
        <Dialog
          open={editDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Update your profile info"}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={name}
              variant="outlined"
              onChange={changeName}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={specialization}
              variant="outlined"
              onChange={changeSpecialization}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={address}
              variant="outlined"
              onChange={changeAddress}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={contact}
              variant="outlined"
              onChange={changeContact}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue={email}
              variant="outlined"
              onChange={changeEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleEditClose();
                swal({
                  text: "Terminated",
                  timer: 2000,
                  icon: "success",
                  buttons: false,
                });
              }}
              color="primary"
            >
              Close!
            </Button>

            <Button
              onClick={() => {
                updateProfile();
              }}
              color="primary"
            >
              Confirm Change!
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure you want to delete?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6">Name: {name}</Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography variant="h6">Email: {email}</Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography variant="h6">Contact: {contact}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                swal({
                  text: "Terminated",
                  timer: 2000,
                  icon: "success",
                  buttons: false,
                });
              }}
              color="primary"
            >
              NO!
            </Button>

            <Button
              onClick={() => {
                fetch(`https://thetamiddleware.herokuapp.com/dropSeed/${seed}`);
                //swal alert
                swal({
                  text: "Doctor Profile Deleted!",
                  timer: 2000,
                  icon: "success",
                  buttons: false,
                });
                history.push(`/home`);
              }}
              color="primary"
            >
              YES! Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openTwo}
          onClose={handleCloseTwo}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Please Update Password for following entry!"}
          </DialogTitle>

          <DialogContent>
            <FormControl disabled>
              <InputLabel htmlFor="component-disabled">Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={name}
                label="Name"
              />
            </FormControl>
            <Divider orientation="vertical" />
          </DialogContent>

          <DialogContent>
            <FormControl disabled>
              <InputLabel htmlFor="component-disabled">Email</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={email}
                label="Name"
              />
            </FormControl>
          </DialogContent>

          <DialogContent>
            <FormControl disabled>
              <InputLabel htmlFor="component-disabled">Contact</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={contact}
                label="Name"
              />
            </FormControl>
          </DialogContent>

          <DialogContent>
            <TextField
              id="outlined-basic"
              label="New Password"
              placeholder="Password"
              type="password"
              variant="outlined"
              helperText="Must be at least 8 characters"
              required={true}
              size="medium"
              color="primary"
              value={updatedPassword}
              onChange={changePassword}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Confirm New Password"
              placeholder="Confirm New Password"
              type="password"
              variant="outlined"
              required={true}
              size="medium"
              color="primary"
              value={confirmUpdatedPassword}
              onChange={changeUpdatePassword}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                handleCloseTwo();
                swal({
                  text: "Terminated",
                  timer: 2000,
                  icon: "success",
                  buttons: false,
                });
              }}
              color="primary"
            >
              Close!
            </Button>

            <Button
              onClick={() => {
                updatePassword();
              }}
              color="primary"
            >
              Confirm Change !
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}
export default DoctorProfile;
