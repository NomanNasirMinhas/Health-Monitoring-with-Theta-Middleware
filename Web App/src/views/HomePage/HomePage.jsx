import React, { useEffect } from "react";
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  CircularProgress,
  Button,
  TableRow,
  Paper,
  Typography,
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

import { Link as link } from "react-router-dom";

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
export default function HomePage() {
  const [Response, SetResponse] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
  const [empty, SetEmpty] = React.useState(false);
  const classes = useStyles();
  useEffect(() => {
    async function getPatient() {
      var seed = localStorage.getItem("seed") || "";
      var obj = await fetch(
        `https://thetamiddleware.herokuapp.com/getAllAddresses/${seed}`
      );
      obj = await obj.json();
      if (obj === false) SetEmpty(true);
      SetResponse(obj);
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
            <Typography
              variant="h2"
              align="center"
              color="secondary"
              className={classes.titletext}
            >
              Current Patients
            </Typography>
            {empty ? (
              <ErrorMessage />
            ) : (
              <Slide direction="up" in={true} timeout={300}>
                <div>
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
                </div>
              </Slide>
            )}
          </Grid>
        </Slide>
      )}
    </ThemeProvider>
  );
}
