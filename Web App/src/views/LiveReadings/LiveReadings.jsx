import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  ThemeProvider,
  Slide,
  IconButton,
  Grow,
} from "@material-ui/core";
import Card from "../../components/Card/Card";
import clsx from 'clsx';
import CardBody from "../../components/Card/CardBody";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";
import { useParams } from "react-router-dom";
import Thermometer from "../../assets/icons/thermometer"
import Oxygen from "../../assets/icons/oxygen";
import Frequency from "../../assets/icons/frequency";
import PatientCard from "../../components/PatientCard/PatientCard";
import moment from "moment";
import { useStyles } from "../ViewReport/FunctionsViewReport"
import { Line } from "react-chartjs-2"
import '@taeuk-gang/chartjs-plugin-streaming';
import { Fragment } from "react";

const Mam = require("@iota/mam");
const { asciiToTrytes, trytesToAscii } = require("@iota/converter");
const mode = "public";
const provider = "https://nodes.devnet.iota.org:443";
const seed = localStorage.getItem("seed") || "";

const LiveReadings = () => {
  const classes = useStyles();
  const { name, gender, admissionDate, address } = useParams();
  var Temp, HR, SpO2;
  var Time;
  var t;
  const TempchartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'realtime',
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#FFFFFF",
            // callback: function (value, index, values) {
            //     return moment(value, "HH:M:S DD:MM:YYYY").format('MMM Do YY, h:mm:ss a');
            // }
          },
          realtime: {
            onRefresh: function (chart) {
              chart.data.datasets.forEach(function (dataset) {
                dataset.data.push({
                  x: Date.now(),
                  y: Temp,
                });

              });
            },
            delay: 2000,
            duration: 20000,
            refresh: 500
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            fontColor: "#FFFFFF",
          },
        },
      ],

    },
  }

  const SpO2chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'realtime',
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#FFFFFF",
            // callback: function (value, index, values) {
            //     return moment(value, "HH:M:S DD:MM:YYYY").format('MMM Do YY, h:mm:ss a');
            // }
          },
          realtime: {
            onRefresh: function (chart) {
              chart.data.datasets.forEach(function (dataset) {
                dataset.data.push({
                  x: Date.now(),
                  y: SpO2
                });

              });

            },
            delay: 2000,
            duration: 20000,
            refresh: 500
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            fontColor: "#FFFFFF",
          },
        },
      ],

    },
  }

  const HRchartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'realtime',
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#FFFFFF",
            // callback: function (value, index, values) {
            //     return moment(value, "HH:M:S DD:MM:YYYY").format('MMM Do YY, h:mm:ss a');
            // }
          },
          realtime: {
            onRefresh: function (chart) {
              chart.data.datasets.forEach(function (dataset) {
                dataset.data.push({
                  x: Date.now(),
                  y: HR
                });

              });

            },
            delay: 2000,
            duration: 20000,
            refresh: 500
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            fontColor: "#FFFFFF",
          },
        },
      ],

    },
  }


  async function fetchMam() {
    var root = await fetch(
      `https://thetamiddleware.herokuapp.com/getMAMroot/${seed}&${address}`
    );
    root = await root.json();
    console.log("Root is ", root);

    let mamState = Mam.init(provider);

    const logData = (data) => {
      var parsedData = JSON.parse(trytesToAscii(data));
      // console.log("Fetched and parsed", parsedData, "\n");
      Time = moment(parsedData.timestamp, "MM/DD/YYYY, hh:mm:ss A").toISOString();
      t = new Date(Time)
      t = t.getTime()
      var message = JSON.parse(parsedData.message);
      Temp = message.Temp;
      console.log(SpO2)
      HR = message.HR;
      SpO2 = message.SpO2;
      // setMamReadings(mamReadings.push(JSON.stringify(parsedData)));
      // setMamReadings(array => [...array, JSON.stringify(parsedData)]);
    };
    while (true)
      await Mam.fetch(root, mode, null, logData);
  }

  useEffect(() => {
    fetchMam();
  }, []);

  // console.log("MAM Array ", mamReadings);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.content}>
        <Header />
        <Fragment>
          <Slide in={true}>
            <Grid container justify="center">
              <Grid item md={6}>
                <PatientCard
                  name={name}
                  gender={gender}
                  AdmissionDate={admissionDate}
                />
              </Grid>
            </Grid>
          </Slide>

          <Grow in={true}>
            <Grid container>
              <Grid item>
                <Typography variant="h5" color="secondary">Live Readings</Typography>
              </Grid>
              <Grid container justify="space-between" spacing={3}>
                <Grid item md={4} xs={12}>
                  <Card chart className={clsx(classes.temperatureCard, classes.card)}>
                    <CardBody>
                      <Line
                        data={{
                          datasets: [{
                            fill: false,
                            borderColor: " rgba(255, 255, 255, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                            hoverBorderColor: "rgba(255, 255, 255, 1",
                            lineTension: 0,
                          }]
                        }}
                        options={TempchartOptions} />
                    </CardBody>
                    <div>
                      <IconButton disabled>
                        <Thermometer fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" display="inline" color="secondary">Temperature</Typography>
                    </div>
                  </Card>
                </Grid>

                <Grid item md={4} xs={12}>
                  <Card chart className={clsx(classes.HRCard, classes.card)}>
                    <CardBody>
                      <Line
                        data={{
                          datasets: [{
                            fill: false,
                            borderColor: " rgba(255, 255, 255, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                            hoverBorderColor: "rgba(255, 255, 255, 1",
                            lineTension: 0,
                          }]
                        }}
                        options={HRchartOptions} />
                    </CardBody>
                    <div>
                      <IconButton disabled>
                        <Frequency fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" display="inline" color="secondary">Heart Rate</Typography>
                    </div>
                  </Card>
                </Grid>

                <Grid item md={4} xs={12}>
                  <Card chart className={clsx(classes.oxygenCard, classes.card)}>
                    <CardBody>
                      <Line
                        data={{
                          datasets: [{
                            fill: false,
                            borderColor: " rgba(255, 255, 255, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                            hoverBorderColor: "rgba(255, 255, 255, 1",
                            lineTension: 0,
                          }]
                        }}
                        options={SpO2chartOptions} />
                    </CardBody>
                    <div>
                      <IconButton disabled>
                        <Oxygen fontSize="small" />
                      </IconButton>
                      <Typography variant="h6" display="inline" color="secondary">Oxygen Level</Typography>
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grow>
        </Fragment>
      </div>
    </ThemeProvider>
  );
};

export default LiveReadings;
