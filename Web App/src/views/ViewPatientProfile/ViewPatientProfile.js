import React from "react"
import { Typography, makeStyles, Grid, Card, Button, Dialog, Slide } from "@material-ui/core"
import { DialogTitle, DialogContentText, DialogContent, DialogActions, ThemeProvider } from "@material-ui/core"
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import Header from "../../components/Header/Header"
import theme from "../../assets/theme/theme"
import { Link } from "react-router-dom"

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
        marginLeft: "5px",
        fontSize: "30px",
        fontWeight: "normal",
        lineHeight: "35px",
        color: "#959595"
    },
    tileBottomText: {
        position: "relative",
        top: '60px',
        right: "-50%",
        fontSize: "30px",
        fontWeight: "normal",
        lineHeight: "35px",
        color: "rgba(0, 0, 0, 0.57)"
    },
    rightBar: {
        marginTop: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    cardBody: {
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr 1fr',
        flexWrap: 'wrap',
        width: '535px',
        height: '400px',
        left: '67px',
        top: '554px',
        background: '#b7deb8',
        border: '3px solid #FFFFFF',
        boxShadow: ' 0px 0px 7px rgba(0, 0, 0, 0.28)',
        borderRadius: '12px',
    },
    minicard: {
        margin: '26px',
        width: '207px',
        height: '139px',
        left: '89px',
        top: '594px',
        background: '#CEFDD0',
        border: '3px solid #FFFFFF',
        borderRadius: '9px'
    }
}));

const ViewPatientProfile = () => {

    const classes = useStyles();
    const [openGenerateReport, setOpenGenerateReport] = React.useState(false);
    const [openDischarge, setOpenDischarge] = React.useState(false);
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className={classes.content}>
                <Grid container lg={6}>
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
                                    Wahaj Mustakeem
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
                                    69
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
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>Temperature</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>100 F</Typography>
                                </Card>
                                <Card className={classes.minicard}>
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>BPM</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>85</Typography>
                                </Card>

                                <Card className={classes.minicard}>
                                    <Typography variant="h6" style={{ color: '#0A7A0F' }} className={classes.tileTopText}>BP (mm/Hg)</Typography>
                                    <Typography variant="h6" className={classes.tileBottomText}>120/80</Typography>
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
                                to="/viewhistory"
                                variant="outlined"
                                startIcon={<HistoryIcon />}
                                color="primary"
                                className={classes.sideButton}
                            >
                                View History
                        </Button>
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
                    maxWidth="md"
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
                    maxWidth="md"
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