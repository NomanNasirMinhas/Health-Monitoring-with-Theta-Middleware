import React from 'react';
import { Button, TextField, Link, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container } from '@material-ui/core';
import { AppBar, Toolbar } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    toolBar: {
        minHeight: "180px",
    },
    appBar: {
        alignItems: "center",
        background: '#00a152'
    },
    marginTopAppBar: {
        marginTop: theme.spacing(35)
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleSubmit = () => {
        setOpen(true)
        console.log("Done")
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h3" className={classes.title}>
                        SIGN UP
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.marginTopAppBar} />
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            style={{ background: '#00a152', color: '#FFFFFF' }}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Dialog
                            fullWidth
                            maxWidth="md"
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Account Created Successfully</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Kindly keep the Seed ID safe. Your Seed ID is: 1213213312114214123. Your QR is:
                                </DialogContentText>
                                    <img
                                        src="https://s3.eu-central-1.amazonaws.com/centaur-wp/econsultancy/prod/content/uploads/archive/images/resized/0002/4236/qr_code-blog-third.png" />
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}