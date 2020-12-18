import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NoDrugs from "../../assets/icons/NoDrugs";
import AddIcon from '@material-ui/icons/Add';
import moment from "moment";
import {
    Typography,
    CircularProgress,
    makeStyles,
    withStyles,
    TableCell,
    TableBody,
    TableHead,
    Table,
    TableRow,
    TableContainer,
    TextField,
    IconButton,
    Tooltip,
    Button
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    card: {
        display: "grid",
        minHeight: "41vh",
        background: "#3C3C46",
        borderRadius: "31px",
        color: "lightcyan"
    },
    circle: {
        margin: "auto"
    },
    table: {
        fontFamily: "Roboto Condensed",
    },
    appointmentBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "1em"
    },
    errorMessage: {
        display: "flex"
    }
}));

const CssTextField = withStyles({
    root: {
        "& label": {
            color: "white",
        },
        "& label.Mui-focused": {
            color: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
            },
            "& ": {
                color: "white",
            },
            "&:hover fieldset": {
                borderColor: "indianred",
            },
            "&.Mui-focused fieldset": {
                borderColor: "indianred",
            },
        },
    },
})(TextField);


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "lightslategrey",
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

const AppointmentCard = (props) => {
    const classes = useStyles();
    const [Empty, setEmpty] = useState(true);
    const [Loading, setLoading] = useState(true);
    const [Details, setDetails] = useState("")
    const [date, SetDate] = useState(moment().format(moment.HTML5_FMT.DATETIME_LOCAL));
    const [AppointmentArray, setAppointmentArray] = useState([])
    const [Submitting, setSubmitting] = useState(false)
    const seed = localStorage.getItem("seed") || "";

    const ErrorMessage = () => {
        return (
            <div className={classes.errorMessage}>
                <div style={{ margin: "auto" }}>
                    <NoDrugs color="secondary" style={{ paddingTop: "15px", fontSize: "8em" }} />
                </div>
                <div style={{ margin: "auto" }}>
                    <Typography variant="h5" color="inherit">
                        There are no appointments assigned
                </Typography>
                </div>
            </div>
        )
    }
    async function getAppointments() {
        setLoading(true);
        let x;
        setAppointmentArray([]);
        var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${props.Address}&0&docNotification`);
        response = await response.json();
        if (response !== false) {
            for (var i = 0; i < response.length; i++) {
                x = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${response[i]}`);
                x = await x.json();
                if (x.response !== false) {
                    setEmpty(false);
                    setAppointmentArray(array => [...array, x]);
                }
            }
        }
        setLoading(false);
        // if (response !== false) {
        //     response = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${response}`);
        //     response = await response.json();
        //     setEmpty(false)
        // }
        // setLoading(false);
        // console.log(response);
    }

    useEffect(() => {
        getAppointments();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        var appointment = {
            TimeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            details: moment(date).format('MMMM Do YYYY, h:mm:ss a'),
            title: Details,
        };
        appointment = JSON.stringify(appointment);
        var response = await fetch(
            "https://thetamiddleware.herokuapp.com/sendTx",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    seed: seed,
                    address: props.Address,
                    txType: "docNotification",
                    Data: appointment
                }),
            }
        );
        console.log(await response.json());
        setSubmitting(false);
        getAppointments();
        console.log("Done");
    }

    return (
        <Fragment>
            <div className={classes.card}>
                {Loading ? <CircularProgress color="secondary" className={classes.circle} /> :
                    (
                        <div style={{ display: "grid" }}>
                            <div>
                                {Empty ? (<ErrorMessage />) :
                                    <TableContainer style={{ borderRadius: "3px", maxHeight: "30vh" }}>
                                        <Table stickyHeader className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">
                                                        Issued At
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Name
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Details
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {AppointmentArray?.map((row) => (
                                                    <TableRow key={row.TimeStamp}>
                                                        <StyledTableCell align="center">
                                                            {row.response.TimeStamp}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row.response.title}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row.response.details}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </div>
                            <div className={classes.appointmentBox}>
                                <form style={{ display: "contents" }} onSubmit={handleSubmit}>
                                    <CssTextField
                                        variant="outlined"
                                        disabled={Submitting}
                                        size="small"
                                        color="secondary"
                                        id="DateTime"
                                        label="Next appointment"
                                        type="datetime-local"
                                        value={date}
                                        onChange={(e) => { SetDate(e.target.value) }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <CssTextField
                                        disabled={Submitting}
                                        autoComplete="off"
                                        variant="outlined"
                                        size="small"
                                        id="Details"
                                        label="Details"
                                        value={Details}
                                        onChange={(e) => { setDetails(e.target.value) }}
                                    />
                                    <IconButton
                                        id="appointmentSubmit"
                                        type="submit"
                                        color="secondary"
                                        disabled={Submitting}
                                    >
                                        {Submitting ? (
                                            <CircularProgress color="secondary" />
                                        ) : (
                                                <Tooltip arrow title="Add Appointment">
                                                    <AddIcon />
                                                </Tooltip>
                                            )}
                                    </IconButton>
                                </form>
                    
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

AppointmentCard.propTypes = {
    address: PropTypes.string,
}
export default AppointmentCard;