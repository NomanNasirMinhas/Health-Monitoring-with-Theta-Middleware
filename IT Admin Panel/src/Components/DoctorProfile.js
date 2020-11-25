import React from "react";

import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//grid import
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//Avatar import
import Avatar from "@material-ui/core/Avatar";

//import theme provider
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  useTheme,
} from "@material-ui/core/styles";

import { Typography, Slide } from "@material-ui/core";

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
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginTop: "3%", marginBottom:"3%"
    
  },
  div:{marginTop:"2%", marginBottom:"2%"}
}));

function DoctorProfile() {
  //var { obj} = useParams();
  const classes = useStyles();
  const [name, setName] = React.useState();
  const [address, setAddress]= React.useState();
  const [contact,setContact]= React.useState();
  const [seeds, setSeeds] = React.useState();
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
        const email = local_seed.seed_obj.Profile.email;
        const specialization = local_seed.seed_obj.Profile.specialization;

        //other info
        const num_of_pat = local_seed.num_of_pat;
        const id = local_seed.seed_obj.ID;
        const seed = local_seed.seed_obj.SEED;

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

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Grid container spacing={3} style={{ marginTop: "2%" }}>
        

        <Slide direction="left" in={true} timeout={300}>
          <Grid item xs="4">
            <Paper
              elevation={5}
              style={{
                marginLeft: "3%",
                alignItems: "center",
               
                justifyContent: "center",
                maxHeight:"100%"
              }}
            >
              <div style={{justifyContent: "center",  alignItems: "center", display:"flex"}}>
              <Avatar
                className={classes.large}
                style={{ backgroundColor: "#9DA2A4 ", }}
              >
                <Typography variant="h6">{name}</Typography>
              </Avatar> 
              </div>
            <div className={classes.div}><Typography variant="h6">{address}</Typography></div>

            <div className={classes.div}><Typography variant="h6">{contact}</Typography></div>
              
            </Paper>{" "}
          </Grid>
        </Slide>

        <Slide direction="right" in={true} timeout={300}>
          <Grid item xs="8">
            <Paper elevaion={5} style={{ marginRight: "2%" }}>
              <div
                style={{
                  height: "80px",
                  width: "100%",
                  maxWidth: "100%",
                  backgroundColor: "#2980B9",
                }}
              ></div>

              <Typography variant="h2"> {}</Typography>
            </Paper>
          </Grid>
        </Slide>

      </Grid>
    </ThemeProvider>
  );
}
export default DoctorProfile;
