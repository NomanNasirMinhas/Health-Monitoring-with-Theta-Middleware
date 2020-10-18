import React from 'react';
import { Button, TextField, Link, Dialog, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container, DialogActions, Slide, ThemeProvider, withStyles } from '@material-ui/core';
import { AppBar, Toolbar } from "@material-ui/core"
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"
import QRCode from "qrcode.react"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    toolBar: {
        minHeight: "180px",
    },
    appBar: {
        alignItems: "center"
    },
    marginTopAppBar: {
        marginTop: theme.spacing(24)
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    }
}));

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: 'cyan',
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: 'cyan',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '& ': {
                color: 'white'
            },
            '&:hover fieldset': {
                borderColor: 'cyan',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'cyan',
            },
        },
    },
})(TextField);

const SignUpSchema = Yup.object().shape({
    Name: Yup.string()
        .matches(/^[A-Za-z ]+$/, 'No special characters or numbers allowed')
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    Specialization: Yup.string()
        .matches(/^[A-Za-z ]+$/, 'No special characters or numbers allowed')
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    Email: Yup.string()
        .email("Please enter a valid e-mail address")
        .required("Please enter e-mail address"),
    Address: Yup.string().required("Please state your address"),
    Contact: Yup.string()
        .required("Please state your contact number")
        .test('len', 'Invalid contact detail', val => val && val.toString().length === 10),
    Username: Yup.string()
        .required("Please enter your desired username")
        .matches(/^[A-Za-z]+$/, 'No special characters or numbers allowed')
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    Password: Yup.string()
        .required("Enter your password")
        .min(8, "Password must contain at least 8 characters"),
    confirmPassword: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("Password")], "Password does not match")
});

export default function SignUp(props) {
    const classes = useStyles();
    const [visible, setVisible] = React.useState(false);
    const [parsedSeed, SetParsedSeed] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const signIn = visible ? '#' : '/';

    const handleSubmit = async (values, actions) => {
        setVisible(true)
        var profile = {
            name: values.Name,
            specialization: values.Specialization,
            address: values.Address,
            contact: values.Contact,
            email: values.Email
        }
        console.log("anday waala burger")
        var seed = await fetch('https://thetamiddleware.herokuapp.com/addSeed/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: values.Username,
                password: values.Password,
                info: profile
            }
            )
        });
        var x = await seed.json()
        console.log(x)
        SetParsedSeed(x) 
        actions.setSubmitting(false)
        console.log("Done")
        setOpen(true)
        actions.handleReset()
    }

    const handleClose = () => {
        setOpen(false)
        props.history.push('/')
    }

    var displaySeed = parsedSeed
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Slide direction="down" in={true} timeout={300}>
                        <Typography variant="h3" className={classes.title}>
                            SIGN UP
                        </Typography>
                    </Slide>
                </Toolbar>
            </AppBar>
            <div className={classes.marginTopAppBar} />
            <Slide direction="down" in={true} timeout={300}>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <Formik
                            initialValues={{
                                Name: '',
                                Age: '',
                                Email: '',
                                Specialization: '',
                                Address: '',
                                Contact: '',
                                Username: '',
                                Password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={SignUpSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting, handleReset }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                id="Name"
                                                label="Full Name"
                                                value={values.Name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Name ? errors.Name : ""}
                                                error={touched.Name && Boolean(errors.Name)}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                id="Specialization"
                                                label="Specialization"
                                                value={values.Specialization}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Specialization ? errors.Specialization : ""}
                                                error={touched.Specialization && Boolean(errors.Specialization)}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                id="Email"
                                                label="Email Address"
                                                autoComplete="email"
                                                value={values.Email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Email ? errors.Email : ""}
                                                error={touched.Email && Boolean(errors.Email)}
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
                                                value={values.Contact}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Contact ? errors.Contact : ""}
                                                error={touched.Contact && Boolean(errors.Contact)}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                id="Address"
                                                label="Address"
                                                value={values.Address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Address ? errors.Address : ""}
                                                error={touched.Address && Boolean(errors.Address)}
                                                autoComplete="off"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                label="Username"
                                                id="Username"
                                                value={values.Username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Username ? errors.Username : ""}
                                                error={touched.Username && Boolean(errors.Username)}
                                                autoComplete="off"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                id="Password"
                                                value={values.Password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Password ? errors.Password : ""}
                                                error={touched.Password && Boolean(errors.Password)}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                variant="outlined"
                                                fullWidth
                                                label="Confirm Password"
                                                type="password"
                                                id="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                autoComplete="off"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={{ fontSize: 20 }}
                                        className={classes.submit}
                                    >
                                        {isSubmitting ? <CircularProgress color="secondary" /> : 'Sign Up'}
                                    </Button>
                                    <Dialog
                                        maxWidth="md"
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <DialogTitle>Account Created Successfully</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Kindly keep the Seed ID safe. Your Seed ID is: {displaySeed}. Your QR is:
                                            </DialogContentText>
                                            <QRCode value={displaySeed} />
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    Save QR
                                                </Button>
                                                <Button onClick={handleClose} color="primary">
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Link
                                                to={signIn}
                                                component={link}
                                                color="secondary"
                                                variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </Slide>
        </ThemeProvider>
    );
}