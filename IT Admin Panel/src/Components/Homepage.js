import React from "react";
import Navbar from "./Navbar";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

//**** TABLE ******/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";

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


const Devices_rows = [
  { device_id: 123, name: "Dr. Altamash", seed: 'xyz' },
  { device_id: 124, name: "Dr. Altamash" , seed: 'xyz' },
  { device_id: 125, name: "Dr. Sidq", seed: 'xyz'  },
  { device_id: 127, name: "Dr. Altamash", seed: 'xyz' },
  { device_id: 128, name: "None" , seed: 'xyz' },
  { device_id: 129, name: "Dr. Altamash" , seed: 'xyz' },
  { device_id: 130, name: "Dr. Altamash", seed: 'xyz' },
];

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
function Homepage() {
  const classes = useStyles();
  const classesTable = useStylesTable();
  return (
    <ThemeProvider>

      <Navbar />

      {/* TABLE START*/}

      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TableContainer className={classesTable.paper}>
            <Paper
              elevation={5}
              style={{
                width: 400,
                margin: "auto",
                marginTop: "7%",
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
                <b>Devices</b>
              </Typography>

              <Table className={classesTable.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Device ID</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Assigned to</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Seed</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Devices_rows.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.device_id}
                      </TableCell>
                      <TableCell align="center">{obj.name}</TableCell>
                      <TableCell align="center">{obj.seed}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>

        <Grid item xs={3}></Grid>
        {/********************* */}
        </Grid>
    </ThemeProvider>
  );
}
export default Homepage;
