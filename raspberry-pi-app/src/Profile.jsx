import { Grid, makeStyles, Paper, Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { deepOrange } from "@material-ui/core/colors";
import WcIcon from "@material-ui/icons/Wc";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Hashtag from "./hashtag.js";




const UseStyles = makeStyles((theme) => ({
  paper: {
    height: theme.spacing(30)
  },
  large: {
    margin: "20px",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function Profile() {
  const [name, setName] = useState('Loading...')
  const [age, setAge] = useState('Loading...')
  const [gender, setGender] = useState('Loading...')
  const [address, setAddress] = useState('Loading...')
  const [date, setDate] = useState('Loading...')



  useEffect(() => {
    (async () => {
      const testSeed ='MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ';
      const testAddress ='NTWSWV9CBWVKZXKLWSOHFLCJTDWIAMVSYRD9DFDXWJWFBVPWYUYDJQDOOLEWLPOAPHR9CHQKTMEOYRKDC';
      var response = await fetch(`https://thetamiddleware.herokuapp.com/getAddressInfo/${testSeed}&${testAddress}`);
      var resObj = await response.json();

      if(resObj === false){
        setName("Error")
        setAge("Error")
        setGender("Error")
        setAddress("Error")
        setDate("Error")
      }
      else{
        setName(resObj.Profile.name)
        setAge(resObj.Profile.age)
        setGender(resObj.Profile.gender)
        setAddress(resObj.Profile.address)
        setDate(resObj.Profile.date)
      }
      // console.log(resObj)
    })();
  }, []);
  const classes = UseStyles();
  return (
    <Paper className={classes.paper} variant="elevation" elevation={1}>
      <Grid container>
        <Grid item sm={6} md={4}>
          <Avatar className={classes.large}>aa</Avatar>
        </Grid>
        <Grid item sm={6} md={8}>
          <h4>
            {name},{" "}
            <small>
              <i>{age}</i>
            </small>
          </h4>
          <p>
            <IconButton disabled>
              <Hashtag />
            </IconButton>
            {address}
            <br />
            <IconButton disabled>
              <WcIcon />
            </IconButton>
            {gender.toUpperCase()}
            <br/>
            <IconButton disabled>
              <CalendarTodayIcon/>
            </IconButton>
            {date}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}
