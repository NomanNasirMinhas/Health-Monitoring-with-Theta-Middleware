import React from "react";
import { blue } from "@material-ui/core/colors";
import { Avatar, Box, Divider, makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "grid",
        padding: "30px",
        background: "rgb(255,255,255,0.2)",
        borderRadius: "3px",
        justifyContent: "space-around",
        gridTemplateColumns: "20fr 5fr 20fr",
        textAlign: "auto",
    },
    p: {
        //fontFamily: "Commissioner",
        fontWeight: "bold",
        color: "rgb(0,0,0,0.5)"
    },
    content: {
        fontSize: "1.1rem",
        // textAlign: "right",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "1.6",
        color: "lightcyan",
    },
    large: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: "50px"
    },
    avatarBox: {
    }
}))

const PatientCard = (props) => {
    const classes = useStyles();

    const Initials = (name) => {

        var initials = name.match(/\b\w/g) || [];
        return initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    }

    return (
        <Box className={classes.box}>
            <div className={classes.avatarBox}>
                <Avatar className={classes.large}>{Initials(props.name)}</Avatar>
            </div>
            <div>
                <Divider variant="fullWidth" light orientation="vertical" />
            </div>
            <div className={classes.content}>
                {props.name ? (
                    <>
                        <p className={classes.p}>Name</p>
                        <h4>{props.name}</h4>
                    </>)
                    : ""}
                {props.age ? (
                    <>
                        <p className={classes.p}>Age</p>
                        <h4>{props.age}</h4>
                    </>)
                    : ""}
                {props.gender ? (
                    <>
                        <p className={classes.p}>Gender</p>
                        <h4>{props.gender}</h4>
                    </>)
                    : ""}

                {props.address ? (
                    <>
                        <p className={classes.p}>Address</p>
                        <h4>{props.address}</h4>
                    </>)
                    : ""}

                {props.AdmissionDate ? (
                    <>
                        <p className={classes.p}>Admission Date</p>
                        <h4>{moment(props.AdmissionDate, "DD-MM-YYYY").format("MMMM Do YYYY")}</h4>
                    </>)
                    : ""}

                {props.contact ? (
                    <>
                        <p className={classes.p}>Contact</p>
                        <h4>{props.contact}</h4>
                    </>)
                    : ""}
            </div>

        </Box>
    )
};
export default PatientCard;
