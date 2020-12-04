import React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
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
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Box from '@material-ui/core/Box';

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
//import { configure } from "@testing-library/react";

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
  buttons:{ right: 0}
}));

/*const theme = createMuiTheme({
  primary: {
    main: "#0ea80e",
  },
});*/

function Navbar() {
  const classes = useStyles();
  let history = useHistory();

  function Doctors() {
    history.push("/doctors");
  }

  function goHome() {
    history.push("/home");
  }
  function goAdd() {
    history.push("/adminprofile");
  }
  function Logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
      {/** <div style={{ position: "absolute", right: "0px" }}></div>*/}
      <div className={classes.root}>    
        <AppBar
        position="static"
        style={{ backgroundColor: "#2471A3" }}
        //   #2980B9 blue   dark#2471A3
      >
        <Toolbar>
          <Typography
            variant="h4"
            className={classes.title}
                      >
            {/** <ArrowForwardIcon /> */}
            Welcome Admin
          </Typography>
         
                     <Button
              color="inherit"
              startIcon={<HomeIcon fontSize='large'/>}
              onClick={goHome}
            >
              {" "}
              <Typography variant="subtitle2">Home</Typography>
            </Button>

            <Button
              color="inherit"
              startIcon={<AddCircleOutlineIcon fontSize='inherit' />}
              onClick={Doctors}
            >
              {" "}
              <Typography variant="subtitle2">Patients</Typography>
            </Button>

            <Button
              color="inherit"
              startIcon={< PersonIcon fontSize='inherit'/>}
              onClick={goAdd}
            >
              {" "}
              <Typography variant="subtitle2">Profile</Typography>
            </Button>

         
                     <Button
              color="inherit"
              startIcon={<ExitToAppIcon fontSize='large' />}
              onClick={Logout}
              className={classes.buttons}
            >
              {" "}
              <Typography variant="subtitle2">logout</Typography>
            </Button>
            
        </Toolbar>
      </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Navbar;
