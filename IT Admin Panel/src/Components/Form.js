import React from "react";
import {useState, useEffect} from 'react';
import Header from './Header';
import {
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/EmailSharp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenSharp";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import { makeStyles } from '@material-ui/core/styles';
import { green } from "@material-ui/core/colors";
//import {classes} from "*.module.sass";
//import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
//import { Row } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0ea80e",
    },

    secondary: {
      main: "#ddd",
    },
  },
});


const [logged_in, setLoggedIn] = useState(false);



async function login(){
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log("response =",   response);
  const fetched_data= await response.json();
  console.log("data =", fetched_data);

}


export const Form = () => {
  const classes = useStyles();
  return (
    //#757575
    

    // <input   style={{padding:"10px"}} type="text" placeholder="Enter email"/>
    <ThemeProvider theme={theme}>
     
      <div className={classes.root}>
      
        <Paper
          elevation={7}
          style={{
            width: "30%",
            height: "50%",
            float: "center",
            margin: "auto",
            marginTop: "30px",
          }}
        >
          <form style={{ color: "black", marginTop: "20px" }}>
              <div style={{margin:"auto" ,  textAlign:"center"}}>
            <h2 >Login</h2>
            </div>
            <div style={{ marginLeft: "25%", width: "50%" }}>
              <div>
                <label style={{ padding: "10px" }}>
                  {" "}
                  <EmailIcon fontSize="small"/> <strong>Email</strong>{" "}
                </label>

               
                <br /><br />

                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  color="primary"
                  required
                />
              </div>
              <br />
              <div>
                <label style={{ padding: "10px" }}>
                  {" "}
                  <LockOpenRoundedIcon fontSize="small" /> <strong >Password</strong>{" "}
                </label>
               
                <br /><br />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                />

                <br />
                <a href="www.google.com">Forgot Password?</a>
              </div>
              <br /><br />
             
                <Button
                  variant="contained"
                  color="primary"
        startIcon={<VpnKeyIcon fontSize="small"/> }
        onClick={login}
        style={{marginLeft:"30%"}}
        >
                  
                
                
                 
                  Login
                </Button>
                
              
              
              <br /> <br />
            </div>
          </form>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default Form;