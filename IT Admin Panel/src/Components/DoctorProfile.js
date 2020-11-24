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
  var { obj} = useParams();
  const [seeds, setSeeds]= React.useState();
  console.log("SEED=",JSON.parse(obj));

  //get seed data
  useEffect(() => {
    async function SeedInfo() {
      try {
        
    //    const response = await fetch( `https://thetamiddleware.herokuapp.com/getSeedInfo/${SEED}`);
        //  console.log("response =",   seeds);
      //  const fetched_data = await response.json();
        //console.log("fetched-data =", fetched_data);
        //setSeeds(fetched_data);

        //console.log("Seeds =", seeds);
        //get patient count

        //settotalDoctors(seeds.length);
      } catch (e) {console.log("Cannot fetch")}
    }

    //SeedInfo();
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
