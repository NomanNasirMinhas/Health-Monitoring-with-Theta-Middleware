import React, { useEffect } from "react"
import { Typography, makeStyles, Grid, Card, Button, Dialog, Slide } from "@material-ui/core"
import { DialogTitle, DialogContentText, DialogContent, DialogActions, ThemeProvider } from "@material-ui/core"
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import Header from "../../components/Header/Header"
import theme from "../../assets/theme/theme"
import { Link, useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        display: 'flex',
        padding: theme.spacing(3),
    },
    labels: {
        padding: theme.spacing(3)
    },
    sideButton: {
        fontSize: "large",
        marginRight: "20px",
        width: "361px",
        height: "107px",
        background: "#FFFFFF",
        boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.28)",
        borderRadius: "12px",
    },
    tileTopText: {
        marginTop: "5px",
        marginLeft: "10px",
        fontSize: "25px",
        fontWeight: "normal",
        lineHeight: "35px",
        color: "#959595"
    },
    tileBottomText: {
        textAlign: "right",
        marginTop: "60px",
        marginRight: "10px",
        fontSize: "30px",
        fontWeight: "normal",
        lineHeight: "30px",
        color: "rgba(0, 0, 0, 0.57)"
    },
    rightBar: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-end"
    },
    cardBody: {
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr 1fr',
        flexWrap: 'wrap',
        width: '530px',
        height: '400px',
        background: '#b7deb8',
        border: '2px solid #6fbf73',
        boxShadow: ' 0px 0px 7px rgba(0, 0, 0, 0.28)',
        borderRadius: '12px',
    },
    minicard: {
        position: "relative",
        margin: '11%',
        background: '#CEFDD0',
        borderRadius: '6px'
    }
}));

const ViewPatientProfile = () => {
    let { address } = useParams();
    const [Response, SetResponse] = React.useState();
    const [LastReading, SetLastReading] = React.useState();
    const [name, SetName] = React.useState()
    const [age, SetAge] = React.useState()

    const dischargePatient = async () => {

    }

    useEffect(() => {
        async function getProfile() {
            var seed = (localStorage.getItem('seed') || '')
            var obj = await fetch(`https://thetamiddleware.herokuapp.com/getAddressInfo/${seed}&${address}`)
            obj = await obj.json()
            SetName(obj.Profile.name)
            SetAge(obj.Profile.age)
            //Returns Hash
            var response = await fetch(`https://thetamiddleware.herokuapp.com/getLastTx/${address}`);
            var resObj = await response.json();
            if (resObj !== false) {
                //Passing Hash of transaction
                var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${resObj}`);
                var resObjTx = await responseTx.json();
                resObjTx = JSON.parse(resObjTx)
                if (resObjTx !== null) {
                    SetLastReading(resObjTx)
                    SetResponse(obj)
                }
            }
            else {
                console.log("anday waala burger")
            }
        }
        getProfile()
    }, [])

    useEffect(() => {
    }, [Response])

    const [openGenerateReport, setOpenGenerateReport] = React.useState(false);
    const [openDischarge, setOpenDischarge] = React.useState(false);
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className={classes.content}>
                <Grid container>
                    <Grid container spacing={3}>
                        <Grid item>
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
                                <Typography variant="h4">
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

                    <Slide direction="right" in={true} timeout={300}>
                        <Grid item>
                            <Typography variant="h2" color="secondary" className={[classes.headerText, classes.labels].join(' ')}>Vitals</Typography>
                        </Grid>
                    </Slide>
                    <Slide direction="right" in={true} timeout={300}>
                        <Grid container>
                            <Card className={classes.cardBody}>
                                <Card className={classes.minicard}>
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>Heart Rate</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>{LastReading?.HR} BPM</Typography>
                                </Card>
                                <Card className={classes.minicard}>
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>Temperature</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>{LastReading?.Temp} F</Typography>
                                </Card>

                                <Card className={classes.minicard}>
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>BP (mm/Hg)</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>{`${LastReading?.BP.diastolic}/${LastReading?.BP.systolic}`}</Typography>
                                </Card>
                            </Card>
                        </Grid>
                    </Slide>
                </Grid>
                <Slide direction="left" in={true} timeout={500}>
                    <Grid container className={classes.rightBar}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<AssessmentIcon />}
                                className={classes.sideButton}
                                color="primary"
                                onClick={() => { setOpenGenerateReport(true) }}>
                                Generate Report</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<AssignmentTurnedInIcon />}
                                className={classes.sideButton}
                                color="primary"
                                onClick={() => { setOpenDischarge(true) }}>
                                Discharge</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to={`/viewhistory/${Response?.Profile.name.toString()}&${Response?.Profile.age.toString()}&${address}`}
                                variant="outlined"
                                startIcon={<HistoryIcon />}
                                color="primary"
                                className={classes.sideButton}>
                                View History</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to="/livereadings"
                                variant="outlined"
                                startIcon={<TimelineIcon />}
                                style={{ backgroundColor: '#00a152', color: '#FFFFFF' }}
                                className={classes.sideButton}>
                                Live Statistics
                    </Button>
                        </Grid>
                    </Grid>
                </Slide>

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openGenerateReport}
                    onClose={() => { setOpenGenerateReport(false) }}
                >
                    <DialogTitle>Generate Report</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Temperature: 100F
                            {<br />}
                            BPM: 85
                            {<br />}
                            Blood Pressure: 120/80
                        </DialogContentText>

                        <DialogActions>
                            <Button onClick={() => { setOpenGenerateReport(false) }} color="primary">
                                Download Report
                            </Button>
                            <Button onClick={() => { setOpenGenerateReport(false) }} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openDischarge}
                    onClose={() => { setOpenDischarge(false) }}
                >
                    <DialogTitle>Discharge Patient</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to discharge this patient{"?"}
                        </DialogContentText>

                        <DialogActions>
                            <Button onClick={() => { setOpenDischarge(false) }} color="primary">
                                Confirm
                            </Button>
                            <Button onClick={() => { setOpenDischarge(false) }} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        </ThemeProvider>
    )
}

export default ViewPatientProfile