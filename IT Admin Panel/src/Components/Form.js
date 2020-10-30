import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import {
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Slide,
  FormHelperText,
  CircularProgress,
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
import swal from "sweetalert";
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
      main: "#2471A3", //   #2980B9 blue   dark#2471A3  button #1B4F72
    },

    secondary: {
      main: "#2980B9",
    },
  },
});

//const [logged_in, setLoggedIn] = useState(false);

export const Form = () => {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  //routing history
  let history = useHistory();

  function showProgress(){
    return(<CircularProgress color="secondary"/>)
  }
   
  function forgotPassword(){
    history.push("/resetpassword");
  }
  // Login handler
  async function login() {
    //refs.btn.setAttribute("disabled","disbaled");
    showProgress();
    console.log("username =", username);
    console.log("password =", password);
    if (
      username == null ||
      password == null ||
      (username == null && password == null)
    ) {
      swal({
        text: " Please enter your email/password",
        timer: 2000,
        icon: "error",
        buttons: false,
      });
    } else {
      try {
        const response = await fetch(
          `https://thetamiddleware.herokuapp.com/adminLogin/${username}&${password}`
        );
        // console.log("response =",   response);
        const fetched_data = await response.json();
        console.log("data =", fetched_data);

        if (fetched_data == true) {
          const credentials = { username: username, password: password };
          localStorage.setItem("credentials", JSON.stringify(credentials));
          console.log(credentials);
          //swal("Login!", "You clicked the button!", "success");
          swal({
            text: "Success!",
            timer: 2000,
            icon: "success",
            buttons: false,
          });

          history.push("/home");
        } else {
          //alert("Login Failed");
          // setUsername(null);
          // setPassword(null);
          swal({
            text: " Invalid email and password",
            timer: 2000,
            icon: "error",
            buttons: false,
          });
          setUsername('');
          setPassword('');
        }
        //console.log(username);
        //console.log(password);
      } catch (e) {
        swal({
          text: "No response from the server",
          timer: 2000,
          icon: "error",
          buttons: false,
        });
      }
    }
  }

  function getPassword() {
    return <div></div>;
  }
  return (
    //#757575

    // <input   style={{padding:"10px"}} type="text" placeholder="Enter email"/>
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
      <Slide direction="up" in={true} timeout={800}>
        <Paper
          elevation={2}
          style={{
            width: "30%",
            height: "50%",
            float: "center",
            margin: "auto",
            marginTop: "30px",
            backgroundColor:"#FBFCFC"
          }}
        >
          <form style={{ color: "black", marginTop: "20px" }}>
            <div style={{ margin: "auto", textAlign: "center" }}>
              <h2>Login</h2>
            </div>
            <div style={{ marginLeft: "25%", width: "50%" }}>
              <div>
                <label style={{ padding: "10px" }}>
                  {" "}
                  <EmailIcon fontSize="small" /> <strong>Email</strong>{" "}
                </label>

                <br />
                <br />

                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  color="primary"
                  value={username}
                  onChange={changeUsername}
                 
                />
              </div>
              <br />
              <div>
                <label style={{ padding: "10px" }}>
                  {" "}
                  <LockOpenRoundedIcon fontSize="small" />{" "}
                  <strong>Password</strong>{" "}
                </label>

                <br />
                <br />
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
               {/** <Link onClick={forgotPassword}>Forgot Password?</Link> */}
                
              </div>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                startIcon={<VpnKeyIcon fontSize="small" />}
                onClick={login}
              >
                Login
              </Button>
              <br /> <br />
            </div>
          </form>
        </Paper>
        </Slide>
      </div>
    </ThemeProvider>
  );
};

export default Form;
