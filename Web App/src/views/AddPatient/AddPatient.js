import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Slide } from '@material-ui/core';
import { Grid, Typography, makeStyles, Container, Select, MenuItem, InputLabel, FormControl, ThemeProvider } from '@material-ui/core';
import Header from '../../components/Header/Header';
import theme from "../../assets/theme/theme"

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
    },
}));

export default function AddPatient() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleSubmit = () => {
        setOpen(true)
        console.log("Done")
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className={classes.content}>
                <Slide direction="down" in={true} timeout={300}>
                    <Typography variant="h2" align="center" color="secondary">Add Patient</Typography>
                </Slide>

                <Slide direction="down" in={true} timeout={300}>
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
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={(event) => { setAge(event.target.value) }}
                                                value={age}
                                                label="Gender"
                                            >
                                                <MenuItem value={'male'}>Male</MenuItem>
                                                <MenuItem value={'female'}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            id="contact"
                                            label="Contact Number"
                                            name="contact"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="date"
                                            label="Admission Date"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            fullWidth
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                            src="https://s3.eu-central-1.amazonaws.com/centaur-wp/econsultancy/prod/content/uploads/archive/images/resized/0002/4236/qr_code-blog-third.png"
                                            alt="QR Code" />
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
                </Slide>
            </div>
        </ThemeProvider>
    );
}