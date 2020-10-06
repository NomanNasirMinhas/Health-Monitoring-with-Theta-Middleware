import React from 'react';
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useHistory } from "react-router-dom";

//******* HEADER ******/
  import AppBar from "@material-ui/core/AppBar";
  import Toolbar from "@material-ui/core/Toolbar";
  import Typography from "@material-ui/core/Typography";
  import Button from "@material-ui/core/Button";
  import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
  import ExitToAppIcon from "@material-ui/icons/ExitToApp";
  import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
  import HomeIcon from '@material-ui/icons/Home';
  import PersonIcon from '@material-ui/icons/Person';
import { configure } from '@testing-library/react';
   

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  const theme = createMuiTheme({
    primary: {
      main: "#0ea80e",
    },
  });
  

function Navbar(){
    const classes = useStyles();
    let history = useHistory();

  function Doctors(){
    history.push("/Doctors")
  }

  function goHome(){
    history.push("/home");
  }
  function Logout(){
    localStorage.clear();
    history.push("/")
  }

  
    return(
        <ThemeProvider theme={theme}>
        <AppBar position="static" style={{marginLeft:"0%", backgroundColor: "#0ea80e" }}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <ArrowForwardIcon />
              <strong>Welcome Admin </strong>
            </Typography>

            <Button
              color="inherit"
              startIcon={<HomeIcon fontSize="small" />}
              onClick={goHome}
            >
              {" "}
              Home
            </Button>

            <Button
              color="inherit"
              startIcon={<PersonIcon fontSize="small" />}
              onClick={Doctors}
            >
              {" "}
              Doctors
            </Button>

            <Button
              color="inherit"
              startIcon={<AddCircleOutlineIcon fontSize="small" />}
            >
              {" "}
              Add Device
            </Button>
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon fontSize="small" />}
              onClick={Logout}
            >
              {" "}
              logout
            </Button>
          </Toolbar>
        </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;