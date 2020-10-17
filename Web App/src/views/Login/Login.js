import React from "react";
import { Typography, withStyles } from "@material-ui/core"
import { makeStyles, Grid, Button, AppBar, Toolbar, TextField, Link, ThemeProvider, Slide, CircularProgress } from '@material-ui/core'
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core'
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginTop: theme.spacing(35),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolBar: {
        minHeight: "180px",
    },
    appBar: {
        alignItems: "center"
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    },
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

const LoginSchema = Yup.object().shape({
    Username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    Password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

const Login = (props) => {

    // const handleClick = async (event) => {
    //     setVisible(true)
    //     var seed = await fetch(`https://thetamiddleware.herokuapp.com/getSeed/${userName}&${password}`);
    //     var parsedSeed = await seed.json();
    //     localStorage.setItem('seedInfo', JSON.stringify(parsedSeed[1]));
    //     if (parsedSeed[0]) {
    //         localStorage.setItem('seed', parsedSeed[1].SEED);
    //         props.history.push('/dashboard')
    //     }
    //     else {
    //         SetOpenError(true)
    //     }
    // }

    const [visible, setVisible] = React.useState(false);
    const [openError, SetOpenError] = React.useState(false);

    const classes = useStyles();
    const forgotPassword = visible ? '#' : '/forgotpassword';
    const createAccount = visible ? '#' : '/createaccount';
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Slide direction="down" in={true} timeout={300}>
                        <Typography variant="h3" className={classes.title}>
                            LOGIN TO PORTAL
                            </Typography>
                    </Slide>
                </Toolbar>
            </AppBar>
            <Slide direction="down" in={true} timeout={300}>
                <main>
                    <div className={classes.paper}>
                        <Formik
                            initialValues={{
                                Username: '',
                                Password: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values) => {
                                setVisible(true)
                                var seed = await fetch(`https://thetamiddleware.herokuapp.com/getSeed/${values.Username}&${values.Password}`);
                                var parsedSeed = await seed.json();
                                localStorage.setItem('seedInfo', JSON.stringify(parsedSeed[1]));
                                if (parsedSeed[0]) {
                                    localStorage.setItem('seed', parsedSeed[1].SEED);
                                    props.history.push('/dashboard')
                                }
                                else {
                                    SetOpenError(true)
                                }
                            }}
                        >
                            {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <CssTextField
                                        variant="outlined"
                                        margin="normal"
                                        disabled={visible}
                                        required
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
                                    <CssTextField
                                        variant="outlined"
                                        // type="password"
                                        margin="normal"
                                        disabled={visible}
                                        required
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
                                        disabled={visible}
                                        variant="contained"
                                        color="primary"
                                        style={{ fontSize: 20 }}
                                        className={classes.submit}
                                    >
                                        {visible ? <CircularProgress color="secondary" /> : 'Log in'}

                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link
                                                component={link}
                                                disabled={visible}
                                                to={forgotPassword}
                                                color="secondary"
                                                variant="body2">
                                                Forgot password?
                                </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link
                                                component={link}
                                                disabled={visible}
                                                to={createAccount}
                                                color="secondary"
                                                variant="body2">
                                                {"Create New Account"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Dialog
                                        maxWidth="md"
                                        open={openError}
                                        onClose={() => { window.location.reload(false) }}
                                    >
                                        <DialogTitle>Invalid Credentials</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Please verify the Username and/or Password
                                    </DialogContentText>
                                            <DialogActions>
                                                <Button onClick={() => { window.location.reload(false) }} color="primary">
                                                    Okay
                                        </Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </main>
            </Slide>
        </ThemeProvider>
    )
}

export default Login