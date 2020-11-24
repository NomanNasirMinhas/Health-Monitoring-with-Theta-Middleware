import React from 'react';

import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

//import theme provider
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
    responsiveFontSizes,
    useTheme,
  } from "@material-ui/core/styles";
  

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




function DoctorProfile(){
var { SEED } = useParams();
console.log("SEED=",SEED);

return(
<ThemeProvider theme={theme}>
    <Navbar/>
    </ThemeProvider>
)
}
export default DoctorProfile;