import React from "react";

import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//grid import
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//Avatar import
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

//import QRCode from "react-qr-code";

//import theme provider
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  useTheme,
} from "@material-ui/core/styles";

import { Typography, Slide,CircularProgress } from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: "3%",
    marginBottom: "3%",
  },
  div: { marginTop: "4%" },
}));

function DoctorProfile() {
  //var { obj} = useParams();

  //var QRCode = require('qrcode.react');

  //var QRCode = require('qrcode.react');

  const classes = useStyles();
  const [name, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [contact, setContact] = React.useState();
  const [email, setEmail] = React.useState();
  const [specialization, setSpecialization] = React.useState();
  const [num_of_pat, setNum_of_pat] = React.useState();
  const [seed, setSeed] = React.useState();
  const [dummy, setDummy]= React.useState();
  const canvas = useRef(null);

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
        //const address = local_seed.seed_obj.Profile.address;
        setAddress(local_seed.seed_obj.Profile.address);
        //const contact = local_seed.seed_obj.Profile.contact;
        setContact(local_seed.seed_obj.Profile.contact);
        //const email = local_seed.seed_obj.Profile.email;
        setEmail(local_seed.seed_obj.Profile.email);
        //const specialization = local_seed.seed_obj.Profile.specialization;
        setSpecialization(local_seed.seed_obj.Profile.specialization);

        //other info
        //const num_of_pat = local_seed.num_of_pat;
        setNum_of_pat(local_seed.num_of_pat);
        const id = local_seed.seed_obj.ID;
        //const seed = local_seed.seed_obj.SEED;
        setSeed(local_seed.seed_obj.SEED);
        setDummy= seed;

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
        //
      } catch (e) {
        console.log("Cannot fetch");
      }
    }

    SeedInfo();
  }, []);

  var QRCode = require("qrcode.react");
  //var dummy=seed.json();
 if(seed==null || seed ==undefined){ 
return(
  <ThemeProvider theme={theme}>
      <Navbar />
<CircularProgress size="200px"/>
</ThemeProvider>
);

 }

if(seed!=null){
  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Grid container spacing={0} style={{ marginTop: "2%" }}>
        <Slide direction="left" in={true} timeout={300}>
          <Grid item xs="4">
            <Paper
              elevation={5}
              style={{
                marginLeft: "3%",
                alignItems: "center",

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
                  style={{ backgroundColor: "#9DA2A4 " }}
                >
                  <Typography variant="h4">{name}</Typography>
                </Avatar>
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
                </div>{" "}
              </div>
            </Paper>{" "}
          </Grid>
        </Slide>

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
                        {/**style={{color:"#2980B9"}} */}
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
      </Grid>
    </ThemeProvider>
  )};
}
export default DoctorProfile;
