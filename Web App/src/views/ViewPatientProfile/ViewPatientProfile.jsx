import React, { useEffect } from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  Button,
  Dialog,
  Slide,
  CircularProgress,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  ThemeProvider,
} from "@material-ui/core";

import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    display: "flex",
    padding: theme.spacing(3),
  },
  labels: {
    padding: theme.spacing(3),
  },
  sideButton: {
    position: "relative",
    justifyContent: "space-between",
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
    color: "#FFFFFF",
  },
  tileBottomText: {
    textAlign: "right",
    marginTop: "60px",
    marginRight: "10px",
    fontSize: "30px",
    fontWeight: "normal",
    lineHeight: "30px",
    color: "rgba(0, 0, 0, 0.57)",
  },
  rightBar: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  cardBody: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    flexWrap: "wrap",
    width: "530px",
    height: "400px",
    background: "#08696b",
    border: "2px solid #23adc1",
    boxShadow: " 0px 0px 7px rgba(0, 0, 0, 0.28)",
    borderRadius: "12px",
  },
  minicard: {
    position: "relative",
    margin: "11%",
    background: "#23adc1",
    borderRadius: "6px",
  },
  CircularProgress: {
    position: "absolute",
    top: "40%",
    left: "46%",
  },
}));

const ErrorMessage = () => {
  return (
    <div style={{ fontSize: "2rem", color: "#FFFFFF" }}>
      <Typography variant="h3">Currently, there are no readings</Typography>
    </div>
  );
};

const ViewPatientProfile = (props) => {
  let { address } = useParams();
  const [circularVisible, SetCircularVisible] = React.useState(true);
  const [openGenerateReport, setOpenGenerateReport] = React.useState(false);
  const [openDischarge, setOpenDischarge] = React.useState(false);
  const [dischargeDialogue, SetDischargeDialogue] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [LastReading, SetLastReading] = React.useState();
  const [name, SetName] = React.useState();
  const [age, SetAge] = React.useState();
  const [Empty, SetEmpty] = React.useState(false);
  const seed = localStorage.getItem("seed") || "";

  const dischargePatient = async () => {
    setVisible(true);
    var response = await fetch(
      `https://thetamiddleware.herokuapp.com/dropAddress/${seed}&${address}`
    );
    var resObj = await response.json();
    SetDischargeDialogue(resObj);
    setVisible(false);
  };
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
      SetName(obj.Profile.name);
      SetAge(obj.Profile.age);
      //Returns Hash
      var response = await fetch(
        `https://thetamiddleware.herokuapp.com/getLastTx/${address}`
      );

      var resObj = await response.json();
      if (resObj !== false) {
        //Passing Hash of transaction
        var responseTx = await fetch(
          `https://thetamiddleware.herokuapp.com/getTx/${resObj}`
        );
        var resObjTx = await responseTx.json();
        resObjTx = JSON.parse(resObjTx);

        if (resObjTx !== false) {
          SetEmpty(false);
          SetCircularVisible(false);
          SetLastReading(resObjTx);
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

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {circularVisible ? (
        <CircularProgress
          className={classes.CircularProgress}
          color="secondary"
          size={100}
        />
      ) : (
        <div className={classes.content}>
          <Grid container>
            <Grid container spacing={3}>
              <Grid item>
                <Slide direction="down" in={true} timeout={300}>
                  <Typography variant="h4">Patient's Profile</Typography>
                </Slide>
              </Grid>
            </Grid>
            <Slide direction="down" in={true} timeout={300}>
              <Grid container className={classes.labels}>
                <Grid item>
                  <Typography
                    variant="h4"
                    className={classes.headerText}
                    color="secondary"
                  >
                    Patient's Name:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">{name}</Typography>
                </Grid>
              </Grid>
            </Slide>
            <Slide direction="down" in={true} timeout={300}>
              <Grid container className={classes.labels}>
                <Grid item>
                  <Typography
                    variant="h4"
                    className={classes.headerText}
                    color="secondary"
                  >
                    Patient's Age:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">{age}</Typography>
                </Grid>
              </Grid>
            </Slide>

            <Slide direction="right" in={true} timeout={300}>
              <Grid item>
                <Typography
                  variant="h2"
                  color="secondary"
                  className={[classes.headerText, classes.labels].join(" ")}
                >
                  Vitals
                </Typography>
              </Grid>
            </Slide>
            <Slide direction="right" in={true} timeout={300}>
              <Grid container>
                <Card className={classes.cardBody}>
                  {Empty ? (
                    <ErrorMessage />
                  ) : (
                    <>
                      <Card className={classes.minicard}>
                        <Typography
                          variant="h6"
                          className={classes.tileTopText}
                        >
                          Heart Rate
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.tileBottomText}
                        >
                          {LastReading?.HR} <small>BPM</small>
                        </Typography>
                      </Card>

                      <Card className={classes.minicard}>
                        <Typography
                          variant="h6"
                          className={classes.tileTopText}
                        >
                          Temperature
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.tileBottomText}
                        >
                          {LastReading?.Temp} <small>F</small>
                        </Typography>
                      </Card>

                      <Card className={classes.minicard}>
                        <Typography
                          variant="h6"
                          className={classes.tileTopText}
                        >
                          BP (mm/Hg)
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.tileBottomText}
                        >
                          {`${LastReading?.BP.diastolic}/${LastReading?.BP.systolic}`}
                        </Typography>
                      </Card>
                    </>
                  )}
                </Card>
              </Grid>
            </Slide>
          </Grid>
          <Slide direction="left" in={true} timeout={500}>
            <Grid container className={classes.rightBar}>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon style={{ fontSize: 40 }} />}
                  className={classes.sideButton}
                  disabled={Empty}
                  color="primary"
                  onClick={() => {
                    setOpenGenerateReport(true);
                  }}
                >
                  Generate Report
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={
                    <AssignmentTurnedInIcon style={{ fontSize: 40 }} />
                  }
                  className={classes.sideButton}
                  color="primary"
                  onClick={() => {
                    setOpenDischarge(true);
                  }}
                >
                  Discharge
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to={`/viewhistory/${name}&${age}&${address}`}
                  variant="outlined"
                  disabled={Empty}
                  startIcon={<HistoryIcon style={{ fontSize: 40 }} />}
                  color="primary"
                  className={classes.sideButton}
                >
                  View History
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  disabled={Empty}
                  to="/livereadings"
                  variant="outlined"
                  startIcon={<TimelineIcon style={{ fontSize: 40 }} />}
                  className={classes.sideButton}
                >
                  Live Statistics
                </Button>
              </Grid>
            </Grid>
          </Slide>

          <Dialog
            fullWidth
            maxWidth="sm"
            open={openGenerateReport}
            onClose={() => {
              setOpenGenerateReport(false);
            }}
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
                <Button
                  onClick={() => {
                    setOpenGenerateReport(false);
                  }}
                  color="primary"
                >
                  Download Report
                </Button>
                <Button
                  onClick={() => {
                    setOpenGenerateReport(false);
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

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
        </div>
      )}
    </ThemeProvider>
  );
};

export default ViewPatientProfile;
