import React from "react";
import {
    Typography,
    Grid,
    Button,
    Paper,
    TextField,
    Link,
    ThemeProvider,
    Slide,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions
} from '@material-ui/core'
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom";
import moment from "moment";
import { Formik, Form } from 'formik';
import { useStyles, LoginSchema } from "./Functions"
const Login = (props) => {

    const [visible, setVisible] = React.useState(false);
    const [openError, SetOpenError] = React.useState(false);

    const classes = useStyles();
    const forgotPassword = visible ? '#' : '/forgotpassword';
    const createAccount = visible ? '#' : '/createaccount';
    return (
        <ThemeProvider theme={theme}>
            <Slide direction="left" in={true} timeout={300}>
                <Grid container className={classes.root}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5" >
                                Log in
                            </Typography>
                            <Formik
                                initialValues={{
                                    Username: '',
                                    Password: '',
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={async (values, actions) => {
                                    setVisible(true)
                                    var seed =
                                        await
                                            fetch(`https://thetamiddleware.herokuapp.com/getSeed/${values.Username}&${values.Password}`);
                                    var parsedSeed = await seed.json();
                                    if (parsedSeed[0]) {
                                        localStorage.setItem('seed', parsedSeed[1].SEED);
                                        localStorage.setItem('seedInfo', JSON.stringify(parsedSeed[1]));
                                        var doctorAddress = await fetch(`https://thetamiddleware.herokuapp.com/getAlphaAddress/${parsedSeed[1].SEED}`);
                                        doctorAddress = await doctorAddress.json();
                                        localStorage.setItem('doctorAddress', doctorAddress.ADDRESS);
                                        var data = {
                                            TimeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                            LogType: 0,
                                            LogDetails: "Doctor Online",
                                        }
                                        data = JSON.stringify(data);
                                        var response = await fetch(
                                            "https://thetamiddleware.herokuapp.com/sendTx",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    seed: parsedSeed[1].SEED,
                                                    address: doctorAddress.ADDRESS,
                                                    txType: "docLog",
                                                    Data: data
                                                }),
                                            }
                                        );
                                        response = await response.json();
                                        props.history.push('/dashboard')
                                        actions.setSubmitting(false)
                                    }
                                    else {
                                        SetOpenError(true)
                                    }
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
                                    handleReset }) => (
                                    <Form onSubmit={handleSubmit} className={classes.form}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            disabled={isSubmitting}
                                            fullWidth
                                            id="Username"
                                            label="Username"
                                            value={values.Username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.Username ? errors.Username : ""}
                                            error={touched.Username && Boolean(errors.Username)}
                                            autoComplete="off"
                                        />
                                        <TextField
                                            variant="outlined"
                                            type="password"
                                            margin="normal"
                                            disabled={isSubmitting}
                                            fullWidth
                                            id="Password"
                                            label="Password"
                                            value={values.Password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.Password ? errors.Password : ""}
                                            error={touched.Password && Boolean(errors.Password)}
                                            autoComplete="off"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={isSubmitting}
                                            variant="contained"
                                            color="primary"
                                            style={{ fontSize: 20 }}
                                            className={classes.submit}
                                        >
                                            {isSubmitting ? <CircularProgress color="secondary" /> : 'Log in'}
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link
                                                    component={link}
                                                    disabled={visible}
                                                    to={forgotPassword}
                                                    variant="body2">
                                                    Forgot password?
                                            </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link
                                                    component={link}
                                                    disabled={visible}
                                                    to={createAccount}
                                                    variant="body2">
                                                    {"Create New Account"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Dialog
                                            maxWidth="md"
                                            open={openError}
                                            onClose={() => {
                                                SetOpenError(false)
                                                handleReset()
                                            }}
                                        >
                                            <DialogTitle>Invalid Credentials</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Please verify the Username and/or Password
                                            </DialogContentText>
                                                <DialogActions>
                                                    <Button
                                                        onClick={() => {
                                                            SetOpenError(false);
                                                            handleReset()
                                                        }}
                                                        color="primary">
                                                        Okay
                                                </Button>
                                                </DialogActions>
                                            </DialogContent>
                                        </Dialog>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Grid>
                </Grid>
            </Slide>
        </ThemeProvider>
    )
}

export default Login