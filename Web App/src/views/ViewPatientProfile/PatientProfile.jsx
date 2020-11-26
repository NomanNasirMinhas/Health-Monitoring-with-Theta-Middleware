import React, { Fragment, useState, useEffect } from "react"
import {
    Typography,
    makeStyles,
    Grid,
    Button,
    Dialog,
    Slide,
    CircularProgress,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    ThemeProvider,
    Grow,
    IconButton,
} from "@material-ui/core";
import Header from "../../components/Header/Header";
import ButtonDrawer from "../../components/ButtonDrawer/ButtonDrawer";
import theme from "../../assets/theme/theme";
import { Link, useParams } from "react-router-dom";
import VitalsCard from "../../components/VitalsCard/VitalsCard";
import PatientCard from "../../components/PatientCard/PatientCard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const useStyles = makeStyles((theme) => ({
    body: {
        display: "flex",
        flexDirection: "column",
        minHeight: "1vh",
        marginTop: theme.spacing(3),
    },
    CircularProgress: {
        position: "absolute",
        top: "40%",
        left: "46%",
    },
    bottom: {
        position: "fixed",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "3px",
        height: "8vh",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "rgb(240, 248, 255,0.5)",
    },
}));

const PatientProfile = (props) => {
    const classes = useStyles();
    let { address } = useParams();
    const [circularVisible, SetCircularVisible] = useState(true);
    const [openGenerateReport, setOpenGenerateReport] = useState(false);
    const [openDischarge, setOpenDischarge] = useState(false);
    const [dischargeDialogue, SetDischargeDialogue] = useState(false);
    const [visible, setVisible] = useState(false);
    const [LastReading, SetLastReading] = useState();
    const [Empty, SetEmpty] = useState(false);
    const [patient, SetPatient] = useState();
    const seed = localStorage.getItem("seed") || "";

    const redirect = () => {
        SetDischargeDialogue(false);
        props.history.push("/dashboard");
    };

    useEffect(() => {
        async function getProfile() {
            var obj = await fetch(
                `https://thetamiddleware.herokuapp.com/getAddressInfo/${seed}&${address}`
            );
            obj = await obj.json();
            SetPatient(obj.Profile);
            //Returns Hash
            var response = await fetch(
                `https://thetamiddleware.herokuapp.com/getLastTx/${address}&vitals`
            );

            var resObj = await response.json();
            if (resObj !== false) {
                //Passing Hash of transaction
                var responseTx = await fetch(
                    `https://thetamiddleware.herokuapp.com/getTx/${resObj}`
                );
                var resObjTx = await responseTx.json();
                console.log(resObjTx)
                if (resObjTx !== false) {
                    SetEmpty(false);
                    SetCircularVisible(false);
                    SetLastReading(resObjTx.response);
                }
                else {
                    SetEmpty(true);
                    SetCircularVisible(false);
                }
            }
            else {
                SetEmpty(true);
                SetCircularVisible(false);
            }
        }
        getProfile();
    }, []);

    const dischargePatient = async () => {
        setVisible(true);
        var response = await fetch(
            `https://thetamiddleware.herokuapp.com/dropAddress/${seed}&${address}`
        );
        var resObj = await response.json();
        SetDischargeDialogue(resObj);
        setVisible(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />
            {circularVisible ?
                <CircularProgress className={classes.CircularProgress}
                    color="secondary"
                    size={100}
                /> :
                (
                    <Fragment>
                        <Grid container justify="space-around" className={classes.body}>
                            <Grid item xs={12} md={5}>
                                <PatientCard
                                    name={patient.name}
                                    age={patient.age}
                                    gender={patient.gender}
                                    address={patient.address}
                                    AdmissionDate={patient.date}
                                    contact={patient.contact}
                                />
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Typography variant="h5" color="secondary">
                                    Recent Vitals
                                </Typography>

                                <VitalsCard
                                    Empty={Empty}
                                    HR={LastReading?.HR}
                                    Temp={LastReading?.Temp}
                                    SpO2={LastReading?.SpO2}
                                />
                            </Grid>
                            <Grid item>
                                <div className={classes.bottom}>
                                    <Button
                                        style={{ textTransform: "capitalize" }}
                                        size="large"
                                        onClick={() => {
                                            setOpenDischarge(true);
                                        }}
                                        startIcon={<AssignmentTurnedInIcon />}
                                    >
                                        Discharge Patient
                                    </Button>
                                    <Button
                                        style={{ textTransform: "capitalize" }}
                                        size="large"
                                        disabled={Empty}
                                        startIcon={<AssessmentIcon />}
                                    >
                                        Generate Report
                                    </Button>
                                    <Button
                                        style={{ textTransform: "capitalize" }}
                                        component={Link}
                                        to={`/viewhistory/${patient.name}&${patient.age}&${patient.address}`}
                                        size="large"
                                        disabled={Empty}
                                        startIcon={<HistoryIcon />}
                                    >
                                        View History
                                    </Button>
                                    <Button
                                        style={{ textTransform: "capitalize" }}
                                        component={Link}
                                        size="large"
                                        disabled={Empty}
                                        to="/livereadings"
                                        startIcon={<TimelineIcon />}
                                    >
                                        Live Readings
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                        <Dialog
                            fullWidth
                            maxWidth="sm"
                            open={openDischarge}
                            onClose={() => {
                                setOpenDischarge(false);
                            }}
                        >
                            <DialogTitle>Discharge Patient</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to discharge this patient{"?"}
                                </DialogContentText>

                                <DialogActions>
                                    <Button
                                        onClick={dischargePatient}
                                        color="primary"
                                        disabled={visible}
                                    >
                                        {visible ? <CircularProgress /> : "Confirm"}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setOpenDischarge(false);
                                        }}
                                        color="primary"
                                        disabled={visible}
                                    >
                                        Cancel
                                        </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            maxWidth="md"
                            open={dischargeDialogue}
                            onClose={() => SetDischargeDialogue(false)}
                        >
                            <DialogTitle>Notification</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Patient discharged successfully
                                </DialogContentText>

                                <DialogActions>
                                    <Button onClick={redirect} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </Fragment>
                )
            }
        </ThemeProvider >
    )

}

export default PatientProfile;