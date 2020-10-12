import React from 'react';
import { Button, TextField, Link, Dialog, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container, DialogActions, Slide, ThemeProvider, withStyles } from '@material-ui/core';
import { AppBar, Toolbar } from "@material-ui/core"
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"
import QRCode from "qrcode.react"

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


export default function SignUp(props) {
    const classes = useStyles();
    const [visible, setVisible] = React.useState(false);
    const [parsedSeed, SetParsedSeed] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [userName, SetUserName] = React.useState('');
    const [password, SetPassword] = React.useState('');
    const [name, SetName] = React.useState('');
    const [specialization, SetSpecialization] = React.useState('');
    const [address, SetAddress] = React.useState('');
    const [contact, SetContact] = React.useState('');
    const [email, SetEmail] = React.useState('');
    const signIn = visible ? '#' : '/';

    const handleSubmit = async () => {
        setVisible(true)
        var profile = {
            name: name,
            specialization: specialization,
            address: address,
            contact: contact,
            email: email
        }

        var seed = await fetch('https://thetamiddleware.herokuapp.com/addSeed/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userName,
                password: password,
                info: profile
            }
            )
        });
        var x = await seed.json()
        SetParsedSeed(x)

        console.log(parsedSeed)
        setOpen(true)
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
                        <form className={classes.form} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CssTextField
                                        name="name"
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        value={name}
                                        onChange={e => {
                                            SetName(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="specialization"
                                        label="Specialization"
                                        name="specialization"
                                        value={specialization}
                                        onChange={e => {
                                            SetSpecialization(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => {
                                            SetEmail(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        id="number"
                                        label="Contact Number"
                                        name="number"
                                        value={contact}
                                        onChange={e => {
                                            SetContact(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        value={address}
                                        onChange={e => {
                                            SetAddress(e.target.value)
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        id="username"
                                        value={userName}
                                        onChange={e => {
                                            SetUserName(e.target.value)
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <CssTextField
                                        disabled={visible}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={e => {
                                            SetPassword(e.target.value)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                disabled={visible}
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ fontSize: 20 }}
                                className={classes.submit}
                            >
                                {visible ? <CircularProgress color="secondary"/> : 'Sign Up'}
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
                        </form>
                    </div>
                </Container>
            </Slide>
        </ThemeProvider>
    );
}