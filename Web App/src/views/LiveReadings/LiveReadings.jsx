import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  ThemeProvider,
  Slide,
} from "@material-ui/core";
import ChartistGraph from "react-chartist";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    padding: theme.spacing(3),
  },
  headerText: {
    color: "#9e9e9e",
  },
  labels: {
    padding: theme.spacing(3),
  },
}));

const LiveReadings = () => {
  var biPolarBarChartData = {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  };
  var biPolarBarChartOptions = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
    },
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={classes.content}>
        <Slide direction="down" in={true} timeout={300}>
          <Typography variant="h2" color="secondary" align="center">
            Live Readings
          </Typography>
        </Slide>

        <Slide direction="down" in={true} timeout={300}>
          <Grid container xs={12}>
            <Grid container className={classes.labels}>
              <Grid item>
                <Typography variant="h4" className={classes.headerText}>
                  Patient's Name:
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h4">Wahaj Mustakeem</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.labels}>
              <Grid item>
                <Typography variant="h4" className={classes.headerText}>
                  Patient's Age:
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h4">69</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Slide>

        <Card>
          <CardHeader>
            <p>ECG</p>
          </CardHeader>
          <CardBody>
            <ChartistGraph
              data={biPolarBarChartData}
              options={biPolarBarChartOptions}
              type={"Line"}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <p>BPM</p>
          </CardHeader>
          <CardBody>
            <ChartistGraph
              data={biPolarBarChartData}
              options={biPolarBarChartOptions}
              type={"Line"}
            />
          </CardBody>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default LiveReadings;
