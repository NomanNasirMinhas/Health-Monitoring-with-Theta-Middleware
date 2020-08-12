import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
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
    }
}));

export default function AddPatient() {
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
        <div className={classes.content}>
            <Typography variant="h2" style={{ color: '#bdbdbd' }}>Add Patient</Typography>
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
                                    type="number"
                                    id="age"
                                    label="Age in year(s)"
                                    name="age"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add Patient
                        </Button>
                        <Dialog
                            fullWidth
                            maxWidth="md"
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Patient Added Successfully</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Kindly keep the Address ID safe. Your Patient's Address is: 29021093123 and the QR is:
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
                    </form>
                </div>
            </Container>
        </div>
    );
}