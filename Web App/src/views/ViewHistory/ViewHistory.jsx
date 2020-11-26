import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    withStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid,
    ThemeProvider,
    Slide,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';

import Header from "../../components/Header/Header"
import theme from "../../assets/theme/theme"
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#99c1e5",
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3)
    },
    table: {
        minWidth: 700,
    },
    labels: {
        padding: theme.spacing(3)
    },
    CircularProgress: {
        position: "absolute",
        top: "45%",
        left: "46%"
    }
}));

export default function ViewHistory({ history }) {
    const classes = useStyles();
    const [circularVisible, SetCircularVisible] = React.useState(true)
    const [Empty, SetEmpty] = React.useState(false)
    const { name, age, address } = useParams();
    const [historyDate, setHistoryDate] = React.useState(true);
    const [array, setArray] = React.useState();
    let historyArray = [];
    const [date, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format("DD-MM-YYYY"));

    const onDateChange = (date, value) => {
        setDate(value);
        setInputValue(value);
    };
    const getProfile = async () => {
        setHistoryDate(false)
        SetCircularVisible(true)
        try {
            var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${address}&${date}&vitals`);
        } catch (error) {
           alert(error)
        }
        var resObj = await response.json();
        if (!resObj)
            SetEmpty(true)

        // Alert.alert("All Hashes", JSON.stringify(resObj.length));
        for (var i = 0; i < resObj.length; i++) {
            var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${resObj[i].toString()}`);
            var resObjTx = await responseTx.json();
            var parsed = JSON.parse(resObjTx)
            historyArray.push(parsed)
        }
        setArray(historyArray)
        SetCircularVisible(false)
    }
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Dialog
                fullWidth
                disableBackdropClick
                maxWidth="sm"
                open={historyDate}
                onClose={() => { setHistoryDate(false) }}
            >
                <DialogTitle>Enter the date of the day for which the history is required:</DialogTitle>
                <DialogContent align="center">
                    <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk={true}
                            value={date}
                            inputValue={inputValue}
                            onChange={onDateChange}
                            format="dd-MM-yyyy"
                        />
                    </MuiPickersUtilsProvider>
                    <DialogActions>
                        <Button
                            onClick={getProfile}
                            color="primary">
                            Confirm
                        </Button>
                        <Button
                            onClick={() => history.goBack()}
                            color="primary">
                            Go back
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={Empty}
                onClose={() => {
                    SetEmpty(false)
                    setHistoryDate(true)
                }}
            >
                <DialogTitle>There are no values for the desired date.</DialogTitle>
                <DialogContent align="center">
                    <DialogActions>
                        <Button
                            onClick={() => {
                                SetEmpty(false)
                                setHistoryDate(true)
                                console.log("anday waala burger " + circularVisible)
                            }}
                            color="primary">
                            Re-enter Date
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            {circularVisible ? <CircularProgress className={classes.CircularProgress} color="secondary" /> :
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Slide direction="down" in={true} timeout={300}>
                                <Typography
                                    variant="h2"
                                    color="secondary">
                                    Patient's Profile
                        </Typography>
                            </Slide>
                        </Grid>
                    </Grid>
                    <Slide direction="down" in={true} timeout={300}>
                        <Grid container className={classes.labels}>
                            <Grid item>
                                <Typography variant="h4" className={classes.headerText} color="secondary">
                                    Patient's Name:
                            </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" >
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Slide>

                    <Slide direction="down" in={true} timeout={300}>
                        <Grid container className={classes.labels}>
                            <Grid item>
                                <Typography variant="h4" className={classes.headerText} color="secondary">
                                    Patient's Age:
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="h4">
                                    {age}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Slide>
                    {Empty ? "" :
                        <Slide direction="left" in={true} timeout={500}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Timestamp</StyledTableCell>
                                            <StyledTableCell align="center">Heart Rate(BPM)</StyledTableCell>
                                            <StyledTableCell align="center">Body Temp (F)</StyledTableCell>
                                            <StyledTableCell align="center">Systolic BP</StyledTableCell>
                                            <StyledTableCell align="center">Diastolic BP</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {array?.map((row) => (
                                            <StyledTableRow key={row.TimeStamp}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {row.TimeStamp}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.HR}</StyledTableCell>
                                                <StyledTableCell align="center">{row.Temp}</StyledTableCell>
                                                <StyledTableCell align="center">{row.BP.systolic}</StyledTableCell>
                                                <StyledTableCell align="center">{row.BP.diastolic}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Slide>}
                </div>}
        </ThemeProvider>
    );
}
