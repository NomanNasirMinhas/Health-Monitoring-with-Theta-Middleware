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
    TablePagination,
    TableRow,
    Grow,
    Paper,
    Backdrop,
    Grid,
    ThemeProvider,
    Slide,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Hidden
} from '@material-ui/core';
import Thermometer from "../../assets/icons/thermometer";
import Oxygen from "../../assets/icons/oxygen";
import Frequency from "../../assets/icons/frequency";
import Header from "../../components/Header/Header"
import HistoryIcon from '@material-ui/icons/History';
import theme from "../../assets/theme/theme"
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import PatientCard from '../../components/PatientCard/PatientCard';

const StyledTableCell = withStyles((theme) => ({
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

const useStyles = makeStyles((theme) => ({
    pagination: {
        background: "darkgray"
    },
    container: {
        maxHeight: 440,
    },
    content: {
        padding: theme.spacing(3)
    },
    table: {
        minWidth: 700,
    },
    labels: {
        padding: theme.spacing(3)
    },
    historyIcon: {
        fontSize: "13.4rem",
        color: "white",
    },
}));

export default function ViewHistory({ history }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [circularVisible, SetCircularVisible] = React.useState(true)
    const [Empty, SetEmpty] = React.useState(false)
    const { name, gender, admissionDate, address } = useParams();
    const [historyDate, setHistoryDate] = React.useState(true);
    const [array, setArray] = React.useState();
    let historyArray = [];
    const [date, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format("DD-MM-YYYY"));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
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
            if (resObjTx.response !== false) {
                console.log(resObjTx.response)
                historyArray.push(resObjTx.response)
            }
        }
        if (historyArray.length === 0)
            SetEmpty(true)
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
            {circularVisible ? <Backdrop open={circularVisible}><CircularProgress color="secondary" /></Backdrop> :
                <div className={classes.content}>
                    <Slide in={true}>
                        <Grid container justify="space-between">
                            <Grid item xs={12} md={5}>
                                <PatientCard
                                    name={name}
                                    gender={gender}
                                    AdmissionDate={admissionDate}
                                />
                            </Grid>
                            <Hidden smDown>
                                <Grid item md={5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div>
                                        <HistoryIcon className={classes.historyIcon} />
                                    </div>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Slide>
                    {Empty ? "NIL" :
                        <Grow in={true}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        History Log
                                </Typography>
                                    <Paper>
                                        <TableContainer className={classes.container}>
                                            <Table stickyHeader aria-label="sticky table" className={classes.table}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">Timestamp</StyledTableCell>
                                                        <StyledTableCell align="center"><IconButton disabled><Frequency className={classes.wrapIcon} /></IconButton>Heart Rate(BPM)</StyledTableCell>
                                                        <StyledTableCell align="center"><IconButton disabled><Thermometer className={classes.wrapIcon} /></IconButton>Body Temp (F)</StyledTableCell>
                                                        <StyledTableCell align="center"><IconButton disabled><Oxygen className={classes.wrapIcon} /></IconButton>SpO<small>2</small></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {array?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.TimeStamp}>
                                                                <StyledTableCell align="center" component="th" scope="row">
                                                                    {row.TimeStamp}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{row.HR}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.Temp}</StyledTableCell>
                                                                <StyledTableCell align="center">{row.SpO2}</StyledTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            className={classes.pagination}
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={array?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grow>

                    }
                </div>}
        </ThemeProvider>
    );
}
