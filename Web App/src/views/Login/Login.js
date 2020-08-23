import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Grid, Button, AppBar, Toolbar, TextField, Link, ThemeProvider } from '@material-ui/core'
import theme from "../../assets/theme/theme"
import {Link as link} from "react-router-dom"

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
    const handleClick = () => {
        setLoggedInStatus(true)
        props.history.push('/dashboard')
        // alert(loggedInStatus)
    }
    const [loggedInStatus, setLoggedInStatus] = React.useState(false);

    const classes = useStyles();
    return (
        <div className={classes.content}>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Typography variant="h3" className={classes.title}>
                            LOGIN TO PORTAL
                    </Typography>
                    </Toolbar>
                </AppBar>

                <main>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="off"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{fontSize: 20 }}
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
                                        variant="body2">
                                        Forgot password?
                                </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        component={link}
                                        to="/createaccount"
                                        variant="body2">
                                        {"Create New Account"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </main>
            </ThemeProvider>
        </div>
    )
}

export default Login