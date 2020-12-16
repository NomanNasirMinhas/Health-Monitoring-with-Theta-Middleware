import React from 'react'
import { makeStyles } from "@material-ui/core"
import moment from "moment";

export const useStyles = makeStyles((theme) => ({
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
        background: "linear-gradient(60deg, #66bb6a, #43a047)",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
    },
    HRCard: {
        background: "linear-gradient(60deg, #ffa726, #fb8c00)",
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(255, 152, 0,.4)",
    },
    loadingDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

export const chartOptions = {
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
                    callback: function (value, index, values) {
                        return moment(value, "h:m:s DD:MM:YYYY").format('DD MMM, H:mm:ss');
                    }
                },
            },
        ],
    },
}
