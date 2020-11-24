import React from "react";

import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//grid import 
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//import theme provider
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  useTheme,
} from "@material-ui/core/styles";

import{
    Typography
}  from "@material-ui/core";


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

function DoctorProfile() {
  //var { obj} = useParams();
  //const [name, setName]= React.useState();

  const [seeds, setSeeds]= React.useState();
  //console.log("SEED=",JSON.parse(obj));

  //get seed data
  useEffect(() => {
    async function SeedInfo() {
      try {
        const data= localStorage.getItem("seed_obj");
        const local_seed = JSON.parse(data);  
        //localStorage.removeItem("seed_obj");

        //setting doctor object to variables
        const name=local_seed.seed_obj.Profile.name;
        const address=local_seed.seed_obj.Profile.address;
        const contact=local_seed.seed_obj.Profile.contact;
        const email=local_seed.seed_obj.Profile.email;
        const specialization=local_seed.seed_obj.Profile.specialization;

        //other info
        const num_of_pat = local_seed.num_of_pat;
        const id= local_seed.seed_obj.ID;
        const seed= local_seed.seed_obj.SEED;
        
        console.log( name, address, contact, email, specialization,  num_of_pat, id, seed);
    //  
      } catch (e) {console.log("Cannot fetch")}
    }

    SeedInfo();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <Grid container spacing={3} style={{ marginTop: "2%" }}>
        
      <Grid item xs="8" >
        <Paper elevaion={5} style={{ marginLeft:"2%"}} >
        <div style={{height:"80px",width: "100%", maxWidth:"100%", backgroundColor:"#2980B9"}}></div>
          
              
  <Typography variant="h2"> {}</Typography>
          
        </Paper></Grid>

        <Grid item xs="4">
        <Paper elevation={5} style={{ marginRight:"3%"}} >
        <div style={{height:"80px",width: "100%", maxWidth:"100%", backgroundColor:"#2980B9"}}></div>   
        
          {" "}TESTING
       
        </Paper> </Grid>

        
      </Grid>
    </ThemeProvider>
  );
}
export default DoctorProfile;
