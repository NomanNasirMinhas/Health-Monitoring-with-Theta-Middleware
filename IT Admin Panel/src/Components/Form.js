import React from "react";
import {useState, useEffect} from 'react';
import Header from './Header';
import { useHistory } from "react-router-dom";
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
import swal from 'sweetalert';
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


//const [logged_in, setLoggedIn] = useState(false);






export const Form = () => {
  const classes = useStyles();
  const [username, setUsername ] = useState(null);
  const [password, setPassword ] = useState(null);
  

 const changePassword =(event) =>{
   setPassword(event.target.value);
 }

 const changeUsername= (event) => {
   setUsername(event.target.value);
 }
 //routing history 
 let history = useHistory();

 // Login handler
  async function login(){
    // console.log(username);
    // console.log(password);
    
    const response = await fetch(`https://thetamiddleware.herokuapp.com/adminLogin/${username}&${password}`);
    // console.log("response =",   response);
    const fetched_data= await response.json();
     console.log("data =", fetched_data);

    if(fetched_data==true){
      const credentials ={"username": username, "password": password};
      localStorage.setItem('credentials', JSON.stringify(credentials));
      console.log(credentials);
      //swal("Login!", "You clicked the button!", "success");
      swal({text: "Success!", timer: 2000, icon:"success",
     buttons:false
      });
     
      history.push("/home")

    }
    else{
     //alert("Login Failed");
     swal({text:" Invalid email and password", timer: 2000, icon: "error" , buttons:false});
    }
    //console.log(username);
    //console.log(password);
    
  }

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
                  value={username}
                  onChange={changeUsername}
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
                  value={password}
                  onChange={changePassword}

                  
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