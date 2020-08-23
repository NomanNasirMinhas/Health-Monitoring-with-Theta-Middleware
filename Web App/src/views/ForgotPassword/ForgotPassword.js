import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container, ThemeProvider } from '@material-ui/core';
import { AppBar, Toolbar } from "@material-ui/core"
import theme from "../../assets/theme/theme"

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
        alignItems: "center",
    },
    marginTopAppBar: {
        marginTop: theme.spacing(35)
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    }
}));

export default function ForgotPassword() {
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
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h3" className={classes.title}>
                        FORGOT PASSWORD
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.marginTopAppBar} />
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="enterSeed"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="enterSeed"
                                    label="Enter Seed"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            style={{ fontSize: 20 }}
                            color="primary"
                            className={classes.submit}
                        >
                            Get Password
                        </Button>
                        <Dialog
                            fullWidth
                            maxWidth="sm"
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Password Received</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your Password is: abc123
                                </DialogContentText>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </form>
                </div>
            </Container>
        </ThemeProvider>
    );
}