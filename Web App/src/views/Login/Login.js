import React from "react";
import { Typography, withStyles } from "@material-ui/core"
import { makeStyles, Grid, Button, AppBar, Toolbar, TextField, Link, ThemeProvider, Slide } from '@material-ui/core'
import { OutlinedInput, CircularProgress, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

    const handleClick = async (event) => {
        setVisible(true)
        event.preventDefault();
        var seed = await fetch(`https://thetamiddleware.herokuapp.com/getSeed/${userName}&${password}`);
        var parsedSeed = await seed.json();
        localStorage.setItem('seedInfo', JSON.stringify(parsedSeed[1]));
        if (parsedSeed[0]) {
            localStorage.setItem('seed', parsedSeed[1].SEED);
            props.history.push('/dashboard')
        }
        else {
            alert("Login Failed")
        }
    }

    const [visible, setVisible] = React.useState(false);
    const [userName, SetUserName] = React.useState('');
    const [password, SetPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                        <form className={classes.form} noValidate>
                            <CssTextField
                                variant="outlined"
                                margin="normal"
                                disabled={visible}
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
                            <OutlinedInput
                                variant="outlined"
                                id="standard-adornment-password"
                                disabled={visible}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                style={{ marginTop: "30px" }}
                                onChange={e => { SetPassword(e.target.value) }}
                                color="secondary"
                                fullWidth
                                label="Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            <Button
                                type="submit"
                                fullWidth
                                disabled={visible}
                                variant="contained"
                                color="primary"
                                style={{ fontSize: 20 }}
                                className={classes.submit}
                                onClick={handleClick}
                            >
                                {visible ? <CircularProgress color="secondary"/> : 'Log in'}

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
                        </form>
                    </div>
                </main>
            </Slide>
        </ThemeProvider>
    )
}
export default Login