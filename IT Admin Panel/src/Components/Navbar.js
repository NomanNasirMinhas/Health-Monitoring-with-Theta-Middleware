import React from "react";
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
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { configure } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
    
  },
}));

const theme = createMuiTheme({
  primary: {
    main: "#0ea80e",
  },
});

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
    history.push("/add_device");
  }
  function Logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        style={{ marginLeft: "0%", backgroundColor: "#2471A3" }} 
        //   #2980B9 blue   dark#2471A3
      >
        <Toolbar>
          <Typography variant="h4" className={classes.title} style={{marginLeft:"0%"}}>
            <ArrowForwardIcon />
            <strong style={{marginLeft:"0%"}}>Welcome Admin </strong>
          </Typography>
    <div style={{position: "absolute", right:"0px"}}>
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
            Patients
          </Button>

          <Button
            color="inherit"
            startIcon={<AddCircleOutlineIcon fontSize="small" />}
            onClick={goAdd}
          >
            {" "}
            Manage Devices
          </Button>
          <Button
            color="inherit"
            startIcon={<ExitToAppIcon fontSize="small" />}
            onClick={Logout}
          >
            {" "}
            logout
         
          </Button></div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
