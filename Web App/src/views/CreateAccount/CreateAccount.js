import React from 'react';
import {
    Button,
    TextField,
    Link,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Grid,
    Typography,
    makeStyles,
    DialogActions,
    Slide,
    ThemeProvider,
    Paper
} from '@material-ui/core';
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"
import QRCode from "qrcode.react"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(1, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTM5OS41IDQwMS44MTJoLTM0N2MtNC4xNDIgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1OCA3LjUgNy41IDcuNWgzNDdjNC4xNDIgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjV6bTAtMzBoLTM0N2MtNC4xNDIgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1OCA3LjUgNy41IDcuNWgzNDdjNC4xNDIgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjV6bTQ1LTk3Ljc0OGMtNC4xNDIgMC03LjUgMy4zNTgtNy41IDcuNXYxNDIuNzQ4YzAgMTIuNDA3LTEwLjA5MyAyMi41LTIyLjUgMjIuNWgtMzc3Yy0xMi40MDcgMC0yMi41LTEwLjA5My0yMi41LTIyLjV2LTIzOS42MjRjMC0xMi40MDcgMTAuMDkzLTIyLjUgMjIuNS0yMi41aDIzNC4zNDVjNC4xNDIgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjVoLTIzNC4zNDVjLTIwLjY3OCAwLTM3LjUgMTYuODIyLTM3LjUgMzcuNXYyMzkuNjI0YzAgMjAuNjc4IDE2LjgyMiAzNy41IDM3LjUgMzcuNWgzNzdjMjAuNjc4IDAgMzcuNS0xNi44MjIgMzcuNS0zNy41di0xNDIuNzQ4YzAtNC4xNDItMy4zNTgtNy41LTcuNS03LjV6bS00MS4zMjctMjIzLjg3NmMtNjAuMDA4IDAtMTA4LjgyOCA0OC44Mi0xMDguODI4IDEwOC44MjcgMCAxMS41NjQgMS44MiAyMi43MDkgNS4xNzYgMzMuMTczaC01Mi4wMjFjLTQuMTQyIDAtNy41IDMuMzU4LTcuNSA3LjVzMy4zNTggNy41IDcuNSA3LjVoNTguMTA3YzIuNjA0IDUuMjUyIDUuNjE1IDEwLjI2OCA5IDE1aC02Ny4xMDdjLTQuMTQyIDAtNy41IDMuMzU4LTcuNSA3LjVzMy4zNTggNy41IDcuNSA3LjVoODAuMDQyYzE5LjU5NiAxOC45NjQgNDYuMjcyIDMwLjY1NSA3NS42MyAzMC42NTUgNjAuMDA3IDAgMTA4LjgyNy00OC44MiAxMDguODI3LTEwOC44MjguMDAxLTYwLjAwNy00OC44MTktMTA4LjgyNy0xMDguODI2LTEwOC44Mjd6bTAgMjAyLjY1NWMtNTEuNzM3IDAtOTMuODI4LTQyLjA5MS05My44MjgtOTMuODI4IDAtNTEuNzM2IDQyLjA5MS05My44MjcgOTMuODI4LTkzLjgyNyA1MS43MzYgMCA5My44MjcgNDIuMDkxIDkzLjgyNyA5My44MjcgMCA1MS43MzctNDIuMDkxIDkzLjgyOC05My44MjcgOTMuODI4em0tMzMwLjg1OCAxMDIuNTUyYzIuMjg2LjYzOCA1Ljc4IDEuMzEzIDEwLjE4NSAxLjQxN2g4OS42MjVjMTkuMDc3LjM3MyAzNy44OTQtMTYuNjY5IDM3LjUtMzcuNXYtODkuNjI0YzAtMjAuNjc4LTE2LjgyMi0zNy41LTM3LjUtMzcuNWgtODkuNjI1Yy0yMC42NzggMC0zNy41IDE2LjgyMi0zNy41IDM3LjV2ODkuNjI0YzAgMTcuMTQ3IDExLjU3MyAzMS42MzMgMjcuMzE1IDM2LjA4M3ptMTEuMDgyLTEzLjU4M2M1Ljk2NS0xOC43NzUgMjMuNjczLTMyLjE3MSA0My45MTUtMzIuMTcxIDIwLjI0MyAwIDM3Ljk1MSAxMy4zOTYgNDMuOTE1IDMyLjE3MXptMTUuMTg4LTc1Ljg5N2MwLTE1Ljg0IDEyLjg4Ny0yOC43MjcgMjguNzI3LTI4LjcyN3MyOC43MjcgMTIuODg3IDI4LjcyNyAyOC43MjctMTIuODg3IDI4LjcyNy0yOC43MjcgMjguNzI3LTI4LjcyNy0xMi44ODgtMjguNzI3LTI4LjcyN3ptLTM4LjU4NS0zNi4yMjdjMC0xMi40MDcgMTAuMDkzLTIyLjUgMjIuNS0yMi41aDg5LjYyNWMxMi40MDcgMCAyMi41IDEwLjA5MyAyMi41IDIyLjV2ODkuNjI0YzAgNy4zODEtMy41NzMgMTMuOTQyLTkuMDc5IDE4LjA0OC01LjEyOS0xNi4yMDYtMTYuODQ1LTI5LjM5Ni0zMS44MDQtMzYuNjQgMTAuNTAxLTcuOTk0IDE3LjI5Ny0yMC42MTkgMTcuMjk3LTM0LjgwNSAwLTI0LjExMS0xOS42MTYtNDMuNzI3LTQzLjcyNy00My43MjdzLTQzLjcyNyAxOS42MTYtNDMuNzI3IDQzLjcyN2MwIDE0LjE4NiA2Ljc5NSAyNi44MTEgMTcuMjk3IDM0LjgwNS0xNC45NTggNy4yNDQtMjYuNjc0IDIwLjQzNC0zMS44MDMgMzYuNjQtNS41MDYtNC4xMDYtOS4wNzktMTAuNjY3LTkuMDc5LTE4LjA0OHptMzgwLjYtOTcuMDAxLTUyLjAzIDUyLjAzYy0uNzI4LjcyNy0xLjkwOS43MjctMi42MzcgMGwtMjAuMTg4LTIwLjE4OGMtMi45MjktMi45MjktNy42NzgtMi45MjktMTAuNjA2IDAtMi45MjkgMi45MjktMi45MjkgNy42NzggMCAxMC42MDZsMjAuMTg4IDIwLjE4OGMzLjI4OCAzLjI4OCA3LjYwNiA0LjkzMiAxMS45MjUgNC45MzJzOC42MzctMS42NDQgMTEuOTI1LTQuOTMybDUyLjAzLTUyLjAzYzIuOTI5LTIuOTI5IDIuOTI5LTcuNjc4IDAtMTAuNjA2LTIuOTMtMi45MjktNy42NzktMi45MjktMTAuNjA3IDB6bS00MS4xIDE3OS4xMjVoLTE1MmMtNC4xNDIgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1OCA3LjUgNy41IDcuNWgxNTJjNC4xNDIgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjV6bTAgMzBoLTE1MmMtNC4xNDIgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1OCA3LjUgNy41IDcuNWgxNTJjNC4xNDIgMCA3LjUtMy4zNTggNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjV6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4=)",
        backgroundColor: "rgb(0, 100, 191)",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    }
}));


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
        if (x[0] === true) {
            SetParsedSeed(x[1])
            actions.setSubmitting(false)
            console.log("Done")
            setOpen(true)
        }
        else {
            alert("Unknown error occured. Try contacting administrator")
        }
        actions.handleReset()
    }

    const handleClose = () => {
        setOpen(false)
        props.history.push('/')
    }

    var displaySeed = parsedSeed
    return (
        <ThemeProvider theme={theme}>
            <Slide direction="right" in={true} timeout={300}>
                <Grid container className={classes.root} >
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5" >
                                Register
                            </Typography>
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
                                    <Form onSubmit={handleSubmit} className={classes.form}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                <TextField
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
                                                    variant="body2">
                                                    Already have an account? Sign in
                                            </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                </Grid>
            </Slide>
        </ThemeProvider>
    );
}