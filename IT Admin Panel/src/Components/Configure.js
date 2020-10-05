
import React from 'react';
import Navbar from './Navbar';

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import {Typography, Button} from '@material-ui/core';



import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider
  } from "@material-ui/core/styles";

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
  

  const useStylesTable = makeStyles({
    table: {
      maxWidth: 650,
    },
    paper: {
      maxwidth: 650,
    },
    hover: {
      backgroundColor: "#2FC243",
      color: "white",
      "&:hover": {
        backgroundColor: "#67D977 ",
      },
    },
  });

  const rows = [
    { id: 1, name: "Dr. Altamash", assigned_devices: 3 },
    { id: 2, name: "Dr. Altamash", assigned_devices: 0 },
    { id: 3, name: "Dr. Altamash", assigned_devices: 3 },
    { id: 4, name: "Dr. Altamash", assigned_devices: 3 },
    { id: 5, name: "Dr. Altamash", assigned_devices: 3 },
    { id: 6, name: "Dr. Altamash", assigned_devices: 3 },
    { id: 7, name: "Dr. Altamash", assigned_devices: 3 },
  ];
  


  const theme = createMuiTheme({
    primary: {
      main: "#0ea80e",
    },
  });

function Configure(){
    const classes = useStyles();
    const classesTable = useStylesTable();
    return(
        <ThemeProvider>
            <Navbar/>


         {/* TABLE START*/}

      <TableContainer className={classesTable.paper}>
        <Paper
          elevation={5}
          style={{
            width: 650,
            margin: "auto",
            marginTop: "5%",
            border: "solid grey 0.9px",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            style={{
              textAlign: "center",
              backgroundColor: "#0ea80e",
              color: "white",
              alignSelf: "center",
            }}
          >
            <b>Doctors</b>
          </Typography>

          <Table className={classesTable.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <strong>Doctors ID</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Assigned Devices</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((obj) => (
                <TableRow hover key={obj.name}>
                  <TableCell component="th" scope="row">
                    {obj.id}
                  </TableCell>
                  <TableCell align="center">{obj.name}</TableCell>
                  <TableCell align="center">{obj.assigned_devices}</TableCell>

                  <TableCell align="center">
                    {
                      <Button
                        className={classesTable.hover}
                        color="inherit"
                        startIcon={<SettingsIcon fontSize="small" />}
                      >
                        {" "}
                        Configure
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TableContainer>

      <br />
      <br />

        </ThemeProvider>
        
    );
};

export default Configure;