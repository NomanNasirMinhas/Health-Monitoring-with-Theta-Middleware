import React from "react";

import { Typography, withStyles } from "@material-ui/core"
import { makeStyles, Grid, Button, AppBar, Toolbar, TextField, Link, ThemeProvider, Slide } from '@material-ui/core'
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"

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


const Login = (props) => {
    // const authentication = {
    //     isLoggedIn: false,
    //     onAuthentication() {
    //         this.isLoggedIn = true
    //     },
    //     getLoggedInStatus() {
    //         return this.isLoggedIn
    //     }
    // }

    const handleClick = async (event) => {
        //setLoggedInStatus(true)
        event.preventDefault();
        var seed = await fetch(`https://thetamiddleware.herokuapp.com/getSeed/${userName}&${password}`);
        //getSeed("Username1", "Password1")
        var parsedSeed = await seed.json();
        //alert((parsedSeed).toString().length)
        if ((parsedSeed.SEED).toString().length === 81) {
            localStorage.setItem('seed', parsedSeed.SEED);
            props.history.push('/dashboard')
        }
        else {
            alert("Login Failed")
            //  alert(parsedSeed)
        }
        // alert(loggedInStatus)
    }

    const [userName, SetUserName] = React.useState('');
    const [password, SetPassword] = React.useState('');

    const classes = useStyles();
    return (
        <div className={classes.content}>
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
                            <form className={classes.form} noValidate>
                                <CssTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={userName}
                                    onChange={e => {
                                        SetUserName(e.target.value)
                                    }}
                                    autoComplete="off"
                                />
                                <CssTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={e => {
                                        SetPassword(e.target.value)
                                    }}
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={{ fontSize: 20 }}
                                    className={classes.submit}
                                    onClick={handleClick}
                                >
                                    Log In
                         </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link
                                            component={link}
                                            to="/forgotpassword"
                                            color="secondary"
                                            variant="body2">
                                            Forgot password?
                                </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            component={link}
                                            to="/createaccount"
                                            color="secondary"
                                            variant="body2">
                                            {"Create New Account"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </main>
                </Slide>
            </ThemeProvider>
        </div>
    )
}
export default Login