import React from 'react'
import { Grid, makeStyles, TableCell, withStyles, Typography } from "@material-ui/core"
import Patient from "../../assets/icons/patient";

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontFamily: "Roboto Condensed",
        borderColor: "rgba(255, 255, 255, 0.12)",
        fontWeight: "bold",
    },
    body: {
        backgroundColor: "rgba(60, 60, 70, 1)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        opacity: "100%",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
        fontFamily: "Roboto Condensed",
    },
}))(TableCell);

export const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 700,
        fontFamily: "Roboto Condensed",
    },
    titletext: {
        marginBottom: "40px",
    },
}));

export const ErrorMessage = () => {
    return (
        <>
            <Grid container justify="space-evenly">
                <Grid item md={3}>
                    <Patient style={{ fontSize: "20.5em" }} />
                </Grid>
            </Grid>
            <Grid container justify="space-evenly">
                <Grid item md={6}>
                    <Typography align="center" color="secondary" variant="h5">
                        Currently, there are no patients under your supervision.
          </Typography>
                </Grid>
            </Grid>
        </>
    );
};


export const Options = {
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
                },
            },
        ],
    },
};
