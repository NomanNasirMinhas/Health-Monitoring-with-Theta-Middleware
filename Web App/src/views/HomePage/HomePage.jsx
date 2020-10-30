import React, { useEffect } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  CircularProgress,
  Button,
  TableRow,
  Paper,
  ThemeProvider,
  Slide,
  TableContainer,
  Grid,
} from "@material-ui/core";
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
import BP from "../../assets/icons/BP";
import Frequency from "../../assets/icons/frequency";
import { Link as link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { max } from "moment";

const useStyle = makeStyles(styles);

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
  content: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 700,
    fontFamily: "Roboto Condensed",
  },
  titletext: {
    marginBottom: "40px",
  },
  CircularProgress: {
    position: "absolute",
    top: "45%",
    left: "46%",
  },
}));
const ErrorMessage = () => {
  return (
    <div style={{ fontSize: "2rem", color: "#6af2fd" }}>
      Currently, there are no patients under your supervision
    </div>
  );
};

const Options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          fontColor: "#FFFFFF",
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "#FFFFFF",
        },
      },
    ],
  },
};
const StackedOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          fontColor: "#FFFFFF",
        },
        stacked: true,
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: "#FFFFFF",
        },
        stacked: true,
      },
    ],
  },
};

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
    for (var i = 0; i < prop.length; i++) {
      var hash = await fetch(
        `https://thetamiddleware.herokuapp.com/getLastTx/${prop[i].ADDRESS}`
      );
      hash = await hash.json();
      var tx = await fetch(
        `https://thetamiddleware.herokuapp.com/getTx/${hash}`
      );
      tx = await tx.json();
      if (tx !== false) {
        info = {
          name: prop[i].Profile.name,
          Temp: JSON.parse(tx).Temp,
          HR: JSON.parse(tx).HR,
          BP: JSON.parse(tx).BP,
        };
        transaction.push(info);
      }
      //console.log(JSON.parse(tx).Temp);
      //transaction.push({name: tx.name, value: tx.value})
    }
    //[{name: "Fatima Umar", temp: '100'},{name: "Noman", bp: "120/80"},{name: 'Usman', bpm: "80"}]
    return transaction;
  };

  const maxValues = (props) => {
    //[ {name: "Fatima Umar", Temp: '100', BP: {sys: '100', dia:'80'}, Temp: '100'},
    //  {name: "Fatima Umar", Temp: '100', BP: {sys: '100', dia:'80'}, Temp: '100'},
    //  {name: "Fatima Umar", Temp: '100', BP: {sys: '100', dia:'80'}, Temp: '100'},
    //]
    let maxTemp = 0,
      maxBPM = 0;
    let maxBP = {
      systolic: 0,
      diastolic: 0,
    };
    let maxTemp_Name, maxBP_Name, maxBPM_Name;
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (prop.Temp > maxTemp) {
        maxTemp = prop.Temp;
        maxTemp_Name = prop.name;
      }
      if (prop.HR > maxBPM) {
        maxBPM = prop.HR;
        maxBPM_Name = prop.name;
      }
      if (
        prop.BP.systolic > maxBP.systolic &&
        prop.BP.diastolic > maxBP.diastolic
      ) {
        maxBP.systolic = prop.BP.systolic;
        maxBP.diastolic = prop.BP.diastolic;
        maxBP_Name = prop.name;
      }
    }

    const x = [
      { name: maxTemp_Name, value: maxTemp },
      {
        name: maxBP_Name,
        value: { sys: maxBP.systolic, diastolic: maxBP.diastolic },
      },
      { name: maxBPM_Name, value: maxBPM },
    ];
    console.log(x);
    return x;
  };

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
        SetResponse(obj);
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
        <CircularProgress
          className={classes.CircularProgress}
          color="secondary"
          size={100}
        />
      ) : (
        <Slide direction="down" in={true} timeout={300}>
          <Grid container className={classes.content}>
            <Grid container justify="space-between" spacing={4}>
              <Grid item md={4} xs={12}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="danger">
                      <Thermometer color="primary" />
                    </CardIcon>
                    <p className={Class.cardCategory}>Record Temperature</p>
                    <h3 className={Class.cardTitle}>
                      {maximumValues && maximumValues[0].value} <small>F</small>
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
                    <p className={Class.cardCategory}>Record BPM</p>
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
                      <BP />
                    </CardIcon>
                    <p className={Class.cardCategory}>Record Blood Pressure</p>
                    <h3 className={Class.cardTitle}>
                      {maximumValues &&
                        `${maximumValues[1].value.diastolic}/${maximumValues[1].value.sys}`}{" "}
                      <small>mm/Hg</small>
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={Class.stats}>{maximumValues[1].name}</div>
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
                        labels: Response.map((rows) => {
                          return rows.Profile.name;
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
                        labels: Response.map((rows) => {
                          return rows.Profile.name;
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
                    <h4 className={Class.cardTitle}>Beats Per Minute</h4>
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
                    <BP />
                    <Bar
                      data={{
                        labels: Response.map((rows) => {
                          return rows.Profile.name;
                        }),
                        datasets: [
                          {
                            label: "Systolic",
                            //systolic
                            //diastolic
                            data: transactions.map((rows) => {
                              return rows.BP.systolic;
                            }),
                            backgroundColor: "rgba(88, 214, 141, 0.8)",
                            borderColor: "rgba(88, 214, 141, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(88, 214, 141, 1)",
                            hoverBorderColor: "rgba(88, 214, 141, 1)",
                          },
                          {
                            //systolic
                            label: "Diastolic",
                            data: transactions.map((rows) => {
                              return rows.BP.diastolic;
                            }),
                            backgroundColor: " rgba(255, 255, 255, 0.8)",
                            borderColor: " rgba(255, 255, 255, 1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 255, 255, 1)",
                            hoverBorderColor: "rgba(255, 255, 255, 1)",
                          },
                        ],
                      }}
                      options={StackedOptions}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={Class.cardTitle}>Blood Pressure</h4>
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
            {empty ? (
              <ErrorMessage />
            ) : (
              <Slide direction="up" in={true} timeout={300}>
                <Grid item xs={12}>
                  <TableContainer className={classes.fonts} component={Paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Patient's ID
                          </StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Age</StyledTableCell>
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
                              {row.Profile.date}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.Profile.contact}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button
                                component={link}
                                color="secondary"
                                disableElevation
                                variant="outlined"
                                to={`/viewpatientprofile/${row.ADDRESS}`}
                                startIcon={<VisibilityIcon />}
                              >
                                View Profile
                              </Button>
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Slide>
            )}
          </Grid>
        </Slide>
      )}
    </ThemeProvider>
  );
}
