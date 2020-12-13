import React, { Fragment, useState, useEffect, useContext } from "react"
import {
    Typography,
    makeStyles,
    Grid,
    Button,
    Dialog,
    Backdrop,
    CircularProgress,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    ThemeProvider,
    Grow,
    Hidden,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";
import { Link, useParams } from "react-router-dom";
import VitalsCard from "../../components/VitalsCard/VitalsCard";
import PatientCard from "../../components/PatientCard/PatientCard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import PrescriptionCard from "../../components/PrescriptionCard/PrescriptionCard";
import { UserContext } from "../../Context";
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { AccountCircle } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    body: {
        display: "flex",
        minHeight: "1vh",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(9),
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
    const { Empty } = useContext(UserContext);
    const [patient, SetPatient] = useState();
    const seed = localStorage.getItem("seed") || "";
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirect = () => {
        SetDischargeDialogue(false);
        props.history.push("/dashboard");
    };

    async function getProfile() {
        var obj = await fetch(
            `https://thetamiddleware.herokuapp.com/getAddressInfo/${seed}&${address}`
        );
        obj = await obj.json();
        SetPatient(obj.Profile);
        SetCircularVisible(false);
    }

    useEffect(() => {
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
                <Backdrop open={circularVisible}>
                    <CircularProgress color="secondary" />
                </Backdrop>
                :
                (
                    <Fragment>
                        <Grow in={true} timeout={200}>
                            <Grid container justify="space-around" className={classes.body} >
                                <Grid item xs={12}>
                                    <Hidden mdUp>
                                        <div>
                                            <IconButton
                                                onClick={handleMenu}
                                                color="secondary"
                                            >
                                                <ListOutlinedIcon />
                                            </IconButton>

                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => {
                                                    setOpenDischarge(true);
                                                }}>
                                                    <ListItemIcon>
                                                        <AssignmentTurnedInIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        Discharge Patient
                                                    </ListItemText>
                                                </MenuItem>
                                                <MenuItem >
                                                    <ListItemIcon>
                                                        <AssessmentIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        Generate Report
                                                </ListItemText>
                                                </MenuItem>
                                                <MenuItem component={Link}
                                                    to={`/viewhistory/${patient.name}&${patient.gender}&${patient.date}&${address}`}>
                                                    <ListItemIcon>
                                                        <HistoryIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        View History
                                                    </ListItemText>
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem to={`/livereadings/${address}`}>
                                                    <ListItemIcon>
                                                        <TimelineIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        Live Readings
                                                </ListItemText>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </Hidden>
                                </Grid>
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
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        Prescription
                                </Typography>
                                    <PrescriptionCard
                                        Address={address}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h5" color="secondary">
                                        Recent Vitals
                                    </Typography>
                                    <VitalsCard
                                        Address={address}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        Appointments
                                    </Typography>
                                    <AppointmentCard />
                                </Grid>
                            </Grid>
                        </Grow>
                        <Hidden smDown>
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
                                    to={`/viewhistory/${patient.name}&${patient.gender}&${patient.date}&${address}`}
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
                                    to={`/livereadings/${address}`}
                                    startIcon={<TimelineIcon />}
                                >
                                    Live Readings
                                    </Button>
                            </div>
                        </Hidden>
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