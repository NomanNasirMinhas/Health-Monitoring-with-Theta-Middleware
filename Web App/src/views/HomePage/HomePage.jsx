import React, { useEffect } from "react";
import {
  makeStyles,
  Table,
  Typography,
  TableBody,
  TableHead,
  CircularProgress,
  TableRow,
  ThemeProvider,
  Slide,
  TableContainer,
  Grid,
  IconButton,
  Backdrop,
  Tooltip,
} from "@material-ui/core";
import { ErrorMessage, Options, StyledTableCell, useStyles } from "./FunctionsHomePage"
import VisibilityIcon from "@material-ui/icons/Visibility";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import styles from "../../assets/jss/dashboardStyle";
import Thermometer from "../../assets/icons/thermometer";
import Oxygen from "../../assets/icons/oxygen";
import Patient from "../../assets/icons/patient";
import Frequency from "../../assets/icons/frequency";
import { Link as link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const useStyle = makeStyles(styles);

export default function HomePage() {
  const [Response, SetResponse] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
  const [empty, SetEmpty] = React.useState(false);
  const [transactions, SetTransactions] = React.useState("");
  const [maximumValues, SetMaximumValues] = React.useState([]);
  const classes = useStyles();
  const Class = useStyle();

  const LastTransaction = async (prop) => {
    let transaction = [];
    let info = {};
    try {
      for (var i = 0; i < prop.length; i++) {
        if (prop[i].Profile !== null) {
          var hash = await fetch(
            `https://thetamiddleware.herokuapp.com/getLastTx/${prop[i].ADDRESS}&vitals`
          );
          hash = await hash.json();

          if (hash !== false) {
            var tx = await fetch(
              `https://thetamiddleware.herokuapp.com/getTx/${hash}`
            );
            tx = await tx.json();


            if (tx !== false) {
              info = {
                name: prop[i].Profile.name,
                Temp: tx.response.Temp,
                HR: tx.response.HR,
                SpO2: tx.response.SpO2,
              };
              transaction.push(info);
            }

          }
        }
        //console.log(JSON.parse(tx).Temp);
        //transaction.push({name: tx.name, value: tx.value})
      }
    }
    catch (error) {
      console.error(error);
    }
    //[{name: "Fatima Umar", temp: '100'},{name: "Noman", bp: "120/80"},{name: 'Usman', bpm: "80"}]
    return transaction;
  };

  const maxValues = (props) => {
    //[ {name: "Fatima Umar", Temp: '100', SpO2: 100, HR: '100'},
    //  {name: "Fatima Umar", Temp: '100', SpO2: 100, HR: '100'},
    //  {name: "Fatima Umar", Temp: '100', SpO2: 100, HR: '100'},
    //]
    let maxTemp = 0,
      maxHR = 0,
      maxSpO2 = 0;
    let maxTemp_Name, maxSpO2_Name, maxHR_Name;
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (prop.Temp > maxTemp) {
        maxTemp = prop.Temp;
        maxTemp_Name = prop.name;
      }
      if (prop.HR > maxHR) {
        maxHR = prop.HR;
        maxHR_Name = prop.name;
      }
      if (
        prop.SpO2 > maxSpO2) {
        maxSpO2 = prop.SpO2;
        maxSpO2_Name = prop.name;
      }
    }

    const x = [
      { name: maxTemp_Name, value: maxTemp },
      {
        name: maxSpO2_Name,
        value: maxSpO2,
      },
      { name: maxHR_Name, value: maxHR },
    ];
    return x;
  };

  const doctorAddress = (patientList) => {
    try {
      for (var i = 0; i < patientList.length; i++) {
        if (patientList[i].Profile !== null) {
          SetResponse(array => [...array, patientList[i]])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getPatient() {
      var seed = localStorage.getItem("seed") || "";
      var obj = await fetch(
        `https://thetamiddleware.herokuapp.com/getAllAddresses/${seed}`
      );
      obj = await obj.json();
      if (obj === false) {
        SetEmpty(true);
      } else {
        doctorAddress(obj);
        //SetResponse(obj);
        const x = await LastTransaction(obj);
        SetTransactions(x);
        SetMaximumValues(maxValues(x));
      }
      setVisible(false);
    }
    getPatient();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {visible ? (
        <Backdrop open={visible}>
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : (
          <Slide direction="down" in={true} timeout={300}>
            <Grid container className={classes.content}>
              {empty ? (
                <ErrorMessage />
              ) : (
                  <>
                    <Grid container justify="space-between" spacing={4}>
                      <Grid item md={4} xs={12}>
                        <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="danger">
                              <Thermometer color="primary" />
                            </CardIcon>
                            <p className={Class.cardCategory}>Record Temperature</p>
                            <h3 className={Class.cardTitle}>
                              {maximumValues && maximumValues[0].value}{" "}
                              <small>F</small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={Class.stats}>
                              {maximumValues && maximumValues[0].name}
                            </div>
                          </CardFooter>
                        </Card>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Card>
                          <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                              <Frequency />
                            </CardIcon>
                            <p className={Class.cardCategory}>Record Heart Rate</p>
                            <h3 className={Class.cardTitle}>
                              {maximumValues && maximumValues[2].value}{" "}
                              <small>BPM</small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={Class.stats}>
                              {maximumValues && maximumValues[2].name}
                            </div>
                          </CardFooter>
                        </Card>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Card>
                          <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                              <Oxygen />
                            </CardIcon>
                            <p className={Class.cardCategory}>
                              Record Oxygen Level
                            </p>
                            <h3 className={Class.cardTitle}>
                              {maximumValues && maximumValues[1].value}{" "}
                              <small>SpO<small>2</small></small>
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={Class.stats}>
                              {maximumValues && maximumValues[1].name}
                            </div>
                          </CardFooter>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" color="secondary">
                        Recent Statistics
                  </Typography>
                    </Grid>
                    {/* ------------------------------------------------------------------------------------- */}
                    <Grid container justify="space-around" spacing={3}>
                      <Grid item md={4} xs={12}>
                        <Card chart>
                          <CardHeader color="danger">
                            <Thermometer />
                            <Bar
                              data={{
                                labels: transactions.map((rows) => {
                                  return rows.name;
                                }),
                                datasets: [
                                  {
                                    data: transactions.map((rows) => {
                                      return rows.Temp;
                                    }),
                                    backgroundColor: " rgba(255, 255, 255, 0.8)",
                                    borderColor: " rgba(255, 255, 255, 1)",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                    hoverBorderColor: "rgba(255, 255, 255, 1",
                                  },
                                ],
                              }}
                              options={Options}
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className={Class.cardTitle}>Temperature</h4>
                            {/* <p className={Class.cardCategory}>
                      <span className={Class.successText}>55%</span> increase in
                      today sales.
                    </p> */}
                          </CardBody>
                          {/* <CardFooter chart>
                    <div className={Class.stats}>updated 4 minutes ago</div>
                  </CardFooter> */}
                        </Card>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Card chart>
                          <CardHeader color="warning">
                            <Frequency />
                            <Bar
                              data={{
                                labels: transactions.map((rows) => {
                                  return rows.name;
                                }),
                                datasets: [
                                  {
                                    data: transactions.map((rows) => {
                                      return rows.HR;
                                    }),
                                    backgroundColor: " rgba(255, 255, 255, 0.8)",
                                    borderColor: " rgba(255, 255, 255, 1)",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                    hoverBorderColor: "rgba(255, 255, 255, 1",
                                  },
                                ],
                              }}
                              options={Options}
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className={Class.cardTitle}>Heart Rate</h4>
                            {/* <p className={Class.cardCategory}>
                      <span className={Class.successText}>55%</span> increase in
                      today sales.
                    </p> */}
                          </CardBody>
                          {/* <CardFooter chart>
                    <div className={Class.stats}>updated 4 minutes ago</div>
                  </CardFooter> */}
                        </Card>
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <Card chart>
                          <CardHeader color="success">
                            <Oxygen />
                            <Bar
                              data={{
                                labels: transactions.map((rows) => {
                                  return rows.name;
                                }),
                                datasets: [
                                  {
                                    data: transactions.map((rows) => {
                                      return rows.SpO2;
                                    }),
                                    backgroundColor: " rgba(255, 255, 255, 0.8)",
                                    borderColor: " rgba(255, 255, 255, 1)",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                                    hoverBorderColor: "rgba(255, 255, 255, 1",
                                  },
                                ],
                              }}
                              options={Options}
                            />
                          </CardHeader>
                          <CardBody>
                            <h4 className={Class.cardTitle}>Oxygen Level</h4>
                            {/* <p className={Class.cardCategory}>
                      <span className={Class.successText}>55%</span> increase in
                      today sales.
                    </p> */}
                          </CardBody>
                          {/* <CardFooter chart>
                    <div className={Class.stats}>updated 4 minutes ago</div>
                  </CardFooter> */}
                        </Card>
                      </Grid>
                    </Grid>
                    <Slide direction="up" in={true} timeout={300}>
                      <Grid item xs={12}>
                        <TableContainer style={{ borderRadius: "6px", maxHeight: "300px" }}>
                          <Table stickyHeader className={classes.table}>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="center">
                                  Patient's ID
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Name
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Age
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Gender
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Date of Admission
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Contact
                            </StyledTableCell>
                                <StyledTableCell align="center">
                                  Action
                            </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Response.map((row) => (
                                <TableRow key={row.ID}>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {row.ID}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.Profile.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.Profile.age}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.Profile.gender}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {moment(row.Profile.date, "DD-MM-YYYY").format("MMMM Do YYYY")}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.Profile.contact}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Tooltip arrow title="View Patient's Profile">
                                      <IconButton
                                        component={link}
                                        color="secondary"
                                        to={`/viewpatientprofile/${row.ADDRESS}`}

                                      >
                                        <VisibilityIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </StyledTableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Slide>
                  </>
                )}
            </Grid>
          </Slide>
        )}
    </ThemeProvider>
  );
}
