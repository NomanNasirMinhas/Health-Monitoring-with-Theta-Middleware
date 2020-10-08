import React, {useEffect, useState} from "react";
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
  const [seeds, setSeeds] = useState(null)

  useEffect(async ()=>{
    async function getData(){
      const credentials= localStorage.getItem('credentials');
      const data= JSON.parse(credentials);
         const username= data.username;
         const password= data.password;
         const response = await fetch(`https://thetamiddleware.herokuapp.com/getAllSeeds/${username}&${password}`);
        //  console.log("response =",   seeds);
         const fetched_data= await response.json();
         console.log("fetched-data =", fetched_data);
         setSeeds(fetched_data);
  //console.log("Seeds =", seeds);
    }
    await getData()
    
  },[])

  useEffect(()=>{
    console.log(seeds)
  },[seeds])
  // async function getSeeds(){
  //   const credentials= localStorage.getItem('credentails');
  //   const data= JSON.parse(credentials);
  //      const username= data.username;
  //      const password= data.password;
  //      const seeds = await fetch(`https://thetamiddleware.herokuapp.com/getAllSeeds/${username}&${password}`);
  //      console.log("response =",   seeds);
  //      const fetched_data= await seeds.json();
  //      console.log("data =", fetched_data);

  //      return fetched_data;
  //  }
  //  const dataReturned= getSeeds();
   
if (seeds===null){
  return (
    <ThemeProvider>

    <Navbar />

    <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
        <Paper
              elevation={5}
              style={{
                maxWidth: "100%",
                width: "100%",
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
                <b>Doctors</b>
              </Typography>
              </Paper>
              </Grid>
              </Grid>
    

    <Typography variant="h1" > Loading...</Typography>



    </ThemeProvider>
  )};

  return (
    <ThemeProvider>

      <Navbar />

      {/* TABLE START*/}
    
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
        <Paper
              elevation={5}
              style={{
                maxWidth: "100%",
                width: "100%",
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
                <b>Doctors</b>
              </Typography>
          <TableContainer className={classesTable.paper}>
           
              

              <Table className={classesTable.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <strong>Doctor's Name</strong>
                    </TableCell>
                    <TableCell align="left">
                      <strong>Specialization</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Contact</strong>
                    </TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                {seeds.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.ID}
                      </TableCell>
                      <TableCell align="center">{obj.PASSWORD}</TableCell>
                      <TableCell align="center">{obj.SEED}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
        
          </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={3}></Grid>
        {/********************* */}
        </Grid>
    </ThemeProvider>
  );
}
export default Homepage;
