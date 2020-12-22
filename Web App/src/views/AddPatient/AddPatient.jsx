import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Slide,
  CircularProgress,
  Grid,
  Typography,
  makeStyles,
  Container,
  MenuItem,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
// import { InputBase } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Header from "../../components/Header/Header";
import theme from "../../assets/theme/theme";
import QRCode from "qrcode.react";
import moment from "moment";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { PatientListContext } from "../../PatientListContext";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
  qr: { justifyContent: "center", display: "flex" },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  toolBar: {
    minHeight: "180px",
  },
  appBar: {
    alignItems: "center",
    background: "#00a152",
  },
  marginTopAppBar: {
    marginTop: theme.spacing(35),
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    height: "70px",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "cyan",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "cyan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "& ": {
        color: "white",
      },
      "&:hover fieldset": {
        borderColor: "cyan",
      },
      "&.Mui-focused fieldset": {
        borderColor: "cyan",
      },
    },
  },
})(TextField);

const AddPatientSchema = Yup.object().shape({
  Name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "No special characters or numbers allowed")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  CNIC: Yup.number()
    .required("Required"),
  Age: Yup.number()
    .positive("Age is invalid")
    .max(150, "Too Long!")
    .required("Required"),
  Gender: Yup.string().required("Please specify your gender"),
  Address: Yup.string().required("Please state your address"),
  Contact: Yup.string()
    .required("Please state your contact number")
    .test(
      "len",
      "Invalid contact detail",
      (val) => val && val.toString().length === 10
    ),
});

// const CssSelect = withStyles({
//     input: {
//         border: '1px solid #FFFFFF',
//         color: 'white',
//         height: 'auto',

//         '& ': {
//             color: '#FFFFFF'
//         },
//         '&:focus': {
//             borderColor: '#FFFFFF'
//         },
//     },
// })(InputBase);

export default function AddPatient() {
  //{$seed}&{address}
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, SetDate] = useState(moment().format("DD-MM-YYYY"));
  const [DeviceAddress, SetDeviceAddress] = useState("");
  const { patientList, setPatientList } = useContext(PatientListContext);
  const seed = localStorage.getItem("seed") || "";
  const onDateChange = (date, value) => {
    SetDate(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveQR = () => {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('qr-canvas').toDataURL();
    link.click();
    setOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={classes.content}>
        <Slide direction="down" in={true} timeout={300}>
          <Typography variant="h2" align="center" color="secondary">
            Add Patient
          </Typography>
        </Slide>

        <Slide direction="down" in={true} timeout={300}>
          <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
              <Formik
                initialValues={{
                  CNIC: "",
                  Name: "",
                  Age: "",
                  Gender: "",
                  Address: "",
                  Contact: "",
                }}
                validationSchema={AddPatientSchema}
                onSubmit={async (values, actions) => {
                  var profile = {
                    name: values.Name,
                    age: values.Age,
                    gender: values.Gender,
                    address: values.Address,
                    contact: values.Contact,
                    date: date,
                  };
                  await fetch(
                    "https://thetamiddleware.herokuapp.com/addAddress/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        seed: seed,
                        deviceNum: patientList,
                        secLevel: 3,
                        id: values.CNIC,
                        password: "PASSWORD",
                        info: profile,
                      }),
                    }
                  ).then((result) =>
                    result.json().then((resp) => {
                      if (resp[0] === true) {
                        SetDeviceAddress(resp[1]);
                        setOpen(true);
                        setPatientList(prevState => prevState + 1);
                        console.log(patientList)
                      } else {
                        alert(
                          "Issue occured while adding patient. Contact administrator"
                        );
                        window.location.reload(false);
                      }
                    })
                  );

                  actions.setSubmitting(false);
                  actions.handleReset();
                  console.log("Done");
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  handleReset,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <CssTextField
                          disabled={isSubmitting}
                          autoComplete="off"
                          variant="outlined"
                          fullWidth
                          id="Name"
                          label="Full Name"
                          value={values.Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.Name ? errors.Name : ""}
                          error={touched.Name && Boolean(errors.Name)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CssTextField
                          disabled={isSubmitting}
                          variant="outlined"
                          fullWidth
                          type="number"
                          id="CNIC"
                          label="CNIC"
                          color="secondary"
                          value={values.CNIC}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched.CNIC ? errors.CNIC : ""
                          }
                          error={
                            touched.CNIC &&
                            Boolean(errors.CNIC)
                          }
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CssTextField
                          variant="outlined"
                          disabled={isSubmitting}
                          fullWidth
                          type="number"
                          id="Age"
                          label="Age in year(s)"
                          color="secondary"
                          value={values.Age}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.Age ? errors.Age : ""}
                          error={touched.Age && Boolean(errors.Age)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CssTextField
                          select
                          fullWidth
                          variant="outlined"
                          disabled={isSubmitting}
                          id="Gender"
                          label="Gender"
                          color="secondary"
                          value={values.Gender}
                          onChange={handleChange("Gender")}
                          onBlur={handleBlur("Gender")}
                          helperText={touched.Gender ? errors.Gender : ""}
                          error={touched.Gender && Boolean(errors.Gender)}
                          autoComplete="off"
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </CssTextField>
                      </Grid>
                      <Grid item xs={12}>
                        <CssTextField
                          disabled={isSubmitting}
                          variant="outlined"
                          fullWidth
                          id="Address"
                          label="Address"
                          color="secondary"
                          value={values.Address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.Address ? errors.Address : ""}
                          error={touched.Address && Boolean(errors.Address)}
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CssTextField
                          disabled={isSubmitting}
                          variant="outlined"
                          fullWidth
                          type="number"
                          id="Contact"
                          label="Contact Number"
                          color="secondary"
                          value={values.Contact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.Contact ? errors.Contact : ""}
                          error={touched.Contact && Boolean(errors.Contact)}
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider
                          libInstance={moment}
                          utils={DateFnsUtils}
                        >
                          <KeyboardDatePicker
                            disabled={isSubmitting}
                            fullWidth
                            maxDate={new Date()}
                            id="admissionDate"
                            color="secondary"
                            inputVariant="outlined"
                            autoOk={true}
                            format="dd-MM-yyyy"
                            label="Admission Date"
                            inputValue={date}
                            onChange={onDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      fullWidth
                      variant="contained"
                      style={{ fontSize: 20 }}
                      color="primary"
                      className={classes.submit}
                    >
                      {isSubmitting ? (
                        <CircularProgress color="secondary" />
                      ) : (
                          "Add Patient"
                        )}
                    </Button>
                    <Dialog
                      maxWidth="md"
                      open={open}
                      onClose={() => {
                        handleReset();
                        handleClose();
                      }}
                    >
                      <DialogTitle>Patient Added Successfully</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Kindly keep the Address ID safe. Your Patient's
                          Address is: {DeviceAddress} and the QR is:
                          <div className={classes.qr}>
                            <QRCode id="qr-canvas" value={`${seed}&${DeviceAddress}`} />
                          </div>
                        </DialogContentText>
                        <DialogActions>
                          <Button onClick={saveQR} color="primary">
                            Save QR
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              handleReset();
                            }}
                            color="primary"
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </Slide>
      </div>
    </ThemeProvider>
  );
}
