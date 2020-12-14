import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Line } from "react-chartjs-2";
import clsx from 'clsx';
import Card from "../../components/Card/Card"
import Thermometer from "../../assets/icons/thermometer"
import { makeStyles, Backdrop, Typography, ThemeProvider, Grid, IconButton } from "@material-ui/core"
import CustomizedCircularProgress from "../../components/CustomizedCircularProgress/CustomizedCircularProgress"
import Header from '../../components/Header/Header';
import theme from '../../assets/theme/theme';
import Oxygen from "../../assets/icons/oxygen";
import Frequency from "../../assets/icons/frequency";
import moment from "moment";
import wearable from "../../assets/icons/wearable.svg"
import PatientCard from '../../components/PatientCard/PatientCard';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3)
    },
    card: {
        padding: "3px",
        borderRadius: "6px",
        height: "35vh",
    },
    temperatureCard: {
        background: "linear-gradient(60deg, #ef5350, #e53935)",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(244, 67, 54,.4)",
    },
    oxygenCard: {
        background: "linear-gradient(60deg, #ffa726, #fb8c00)",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(255, 152, 0,.4)",
    },
    HRCard: {
        background: "linear-gradient(60deg, #66bb6a, #43a047)",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
    },
    loadingDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const chartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
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
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    fontColor: "#FFFFFF",
                    // callback: function (value, index, values) {
                    //     return moment(value, "HH:M:S DD:MM:YYYY").format('MMM Do YY, h:mm:ss a');
                    // }
                },
            },
        ],
    },

}

const ViewReport = () => {
    const classes = useStyles();
    const { name, gender, admissionDate, address } = useParams();
    const [TimeStamp, setTimeStamp] = useState([]);
    const [HR, setHR] = useState([]);
    const [SpO2, setSpO2] = useState([]);
    const [Temperature, setTemperature] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [loadingValue, setloadingValue] = useState(0);

    const getTransactions = async () => {
        setLoading(true);
        let x, hash, load;
        var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${address}&0&vitals`);
        try {
            response = await response.json();
            load = 100 / response.length;
            for (hash of response) {
                x = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${hash}`);
                x = await x.json();
                x = x.response;
                if (x !== false) {
                    setTimeStamp(array => [...array, x.TimeStamp]);
                    setHR(array => [...array, x.HR]);
                    setSpO2(array => [...array, x.Temp]);
                    setTemperature(array => [...array, x.SpO2]);
                }
                setloadingValue(prevCount => prevCount + load)
            }
        }
        catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.content}>
                <Header />
                {Loading ?
                    <Backdrop open={Loading}>
                        <div className={classes.loadingDiv}>
                            <CustomizedCircularProgress size={70} value={loadingValue} color="secondary" />
                            <br />
                            <Typography display="block" color="secondary">Hold on. This may take a while.</Typography>
                        </div>
                    </Backdrop> :
                    <Grid container>
                        <Grid container justify="space-between">
                            <Grid item xs={12} md={5}>
                                <PatientCard
                                    name={name}
                                    gender={gender}
                                    AdmissionDate={admissionDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <img src={wearable} style={{ width: "auto", height: "29vh" }} />
                                    <Typography
                                        variant="h5"
                                        color="secondary"
                                        align="center"
                                        display="inline">
                                        History from <br />
                                        <small style={{ color: "mediumseagreen" }}>{moment(TimeStamp[0], "HH:MM:SS DD-MM-YYYY").format('MMMM Do YYYY h:mm:ss a')}</small>
                                        <br /> to <br />
                                        <small style={{ color: "mediumseagreen" }} > {moment(TimeStamp[TimeStamp.length - 1], "HH:MM:SS DD-MM-YYYY").format('MMMM Do YYYY h:mm:ss a')}</small>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton disabled>
                                    <Thermometer />
                                </IconButton>
                                <Typography variant="h5" display="inline" color="secondary">Temperature</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={clsx(classes.temperatureCard, classes.card)}>
                                    <Line data={{
                                        labels: TimeStamp.map((timestamp) => {
                                            return timestamp;
                                        }),
                                        datasets: [
                                            {
                                                fill: false,
                                                data: Temperature,
                                                borderColor: " rgba(255, 255, 255, 1)",
                                                borderWidth: 1,
                                                hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                                hoverBorderColor: "rgba(255, 255, 255, 1",
                                            },
                                        ],
                                    }}
                                        options={chartOptions}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton disabled>
                                    <Oxygen />
                                </IconButton>
                                <Typography variant="h5" display="inline" color="secondary">Oxygen Level</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={clsx(classes.oxygenCard, classes.card)}>
                                    <Line data={{
                                        labels: TimeStamp.map((timestamp) => {
                                            return timestamp;
                                        }),
                                        datasets: [
                                            {
                                                fill: false,
                                                data: SpO2,
                                                borderColor: " rgba(255, 255, 255, 1)",
                                                borderWidth: 1,
                                                hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                                hoverBorderColor: "rgba(255, 255, 255, 1",
                                            },
                                        ],
                                    }}
                                        options={chartOptions}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton disabled>
                                    <Frequency />
                                </IconButton>
                                <Typography variant="h5" display="inline" color="secondary">Heart Rate</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={clsx(classes.HRCard, classes.card)}>
                                    <Line data={{
                                        labels: TimeStamp.map((timestamp) => {
                                            return timestamp;
                                        }),
                                        datasets: [
                                            {
                                                fill: false,
                                                data: HR,
                                                borderColor: " rgba(255, 255, 255, 1)",
                                                borderWidth: 1,
                                                hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                                hoverBorderColor: "rgba(255, 255, 255, 1",
                                            },
                                        ],
                                    }}
                                        options={chartOptions}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                }

            </div>
        </ThemeProvider>
    )
}

export default ViewReport;