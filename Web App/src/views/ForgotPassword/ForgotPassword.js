import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    CircularProgress,
    Grid,
    Typography,
    makeStyles,
    Container,
    ThemeProvider,
    Slide,
    AppBar,
    Toolbar,
} from '@material-ui/core';

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
        minHeight: "130px",

    },
    appBar: {
        alignItems: "center",
        borderRadius: '15px',
        border: '2px solid #FFFFFF',
    },
    marginTopAppBar: {
        marginTop: theme.spacing(35)
    },
    submit: {
        textTransform: "none",
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    }
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const [visible, setVisible] = React.useState(false);
    const [seed, SetSeed] = useState('')
    const [Password, SetPassword] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault()
        setVisible(true)
        var obj = await fetch(`https://thetamiddleware.herokuapp.com/forgotPassword/${seed}`);
        setOpen(true)
        var newObj = await obj.json();
        SetPassword(newObj.password)
        console.log(newObj.password)
    }

    const handleClose = () => {
        setOpen(false)
        window.location.reload(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Slide direction="down" in={true} timeout={300}>
                        <Typography variant="h5">
                            FORGOT PASSWORD
                         </Typography>
                    </Slide>
                </Toolbar>
            </AppBar>
            <div className={classes.marginTopAppBar} />
            <Slide direction="down" in={true} timeout={300}>
                <Container component="main" maxWidth="sm">
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fname"
                                        color="secondary"
                                        name="enterSeed"
                                        variant="outlined"
                                        required
                                        value={seed}
                                        onChange={e => SetSeed(e.target.value)}
                                        fullWidth
                                        id="enterSeed"
                                        label="Enter Seed"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                disabled={visible}
                                variant="contained"
                                style={{ fontSize: 20 }}
                                color="primary"
                                className={classes.submit}
                            >
                                {visible ? <CircularProgress color="secondary" /> : 'Get Password'}
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
                                        {Password !== undefined ? `Your Password is: ${Password}` : 'Invalid Seed'}
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
            </Slide>
        </ThemeProvider>
    );
}