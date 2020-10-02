import React from 'react';
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";


  import AppBar from "@material-ui/core/AppBar";
  import Toolbar from "@material-ui/core/Toolbar";
  import Typography from "@material-ui/core/Typography";
  import Button from "@material-ui/core/Button";
  import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
  import ExitToAppIcon from "@material-ui/icons/ExitToApp";
  import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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
    return(
        <ThemeProvider theme={theme}>
        <AppBar position="static" style={{ backgroundColor: "#0ea80e" }}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <ArrowForwardIcon />
              <strong>Welcome Admin </strong>
            </Typography>
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