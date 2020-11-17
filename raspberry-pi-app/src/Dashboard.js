import { AppBar, Toolbar, Typography, Grid, makeStyles, Card, Paper, Box } from "@material-ui/core"
import Profile from "./Profile"
import { Line } from 'react-chartjs-2';
import Switch from '@material-ui/core/Switch';
import React, {useState, useEffect} from 'react';

const UseStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  card: {

    height: theme.spacing(25),
    backgroundColor: "#F0F0F0",
    // marginBottom: "30px",
    // marginTop: "30px",
    // borderRadius: "6px",
    // width: "100%",

    // position: "relative",
    // display: "flex",
    // flexDirection: "column",
    // minWidth: "0",
    // wordWrap: "break-word",
    // fontSize: ".875rem"
  },


}));


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function Dashboard() {
  const classes = UseStyles();
  const [offline, setOffline] = useState(false);

  const handleChange = (event) => {
    setOffline(event.target.checked);
    console.log(offline)
    if(!offline)
    {
      while(!offline)
      {
        console.log("Online")
      }
    }
  };



  return (
    <>

      <Grid container>
        <Grid item xs={12}>
        </Grid>
        <div className={classes.appBarSpacer} />
        <Grid container justify="space-evenly" spacing={3}>
          <Grid container justify="center">
            <Grid item md={6} xs={12} >
              <Profile />
            </Grid>
          </Grid>
          <br />
          <Grid container justify="center">
            <Grid item md={6} xs={12} >
            <Switch
            checked={offline}
            onChange={handleChange}
            color="primary"
            name="checkedB"
          />
            </Grid>
          </Grid>
          <br/>
          <Grid item md={4} xs={12}>
            <Card className={classes.card} square variant="outlined">
              Temperature
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card} square variant="outlined">
              Heart Rate
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card className={classes.card} square variant="outlined">
              SPO<small>2</small>
            </Card>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Stream
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.card}>
              <Line data={data} className={classes.chart} options={{ maintainAspectRatio: false }} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.card}>
              <Line data={data} className={classes.chart} options={{ maintainAspectRatio: false }} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.card}>
              <Line data={data} className={classes.chart} options={{ maintainAspectRatio: false }} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
