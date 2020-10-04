import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Slide } from '@material-ui/core';
import { Grid, Typography, makeStyles, InputBase, Container, Select, MenuItem, InputLabel, FormControl, ThemeProvider, withStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Header from '../../components/Header/Header';
import theme from "../../assets/theme/theme"
import QRCode from "qrcode.react"

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
    },
    qr: { justifyContent: "center", display: "flex" },
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

const CssSelect = withStyles({
    input: {
        border: '1px solid #FFFFFF',
        color: 'white',
        height: 'auto',

        '& ': {
            color: '#FFFFFF'
        },
        '&:focus': {
            borderColor: '#FFFFFF'
        },
    },
})(InputBase);

export default function AddPatient() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, SetName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, SetGender] = React.useState('');
    const [date, SetDate] = React.useState(new Date('2020-08-18'));
    const [address, SetAddress] = React.useState('');
    const [contact, SetContact] = React.useState('');
    const [DeviceAddress, SetDeviceAddress] = React.useState('');

    const handleDateChange = (date) => {
        SetDate(date);
    };

    const handleSubmit = async () => {
        var profile = {
            name: name,
            age: age,
            gender: gender,
            address: address,
            contact: contact,
            date: date
        }

        var seed = (localStorage.getItem('seed') || '')

        await fetch('http://localhost:5000/addAddress/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seed: seed,
                deviceNum: 11,
                secLevel: 3,
                id: "IDalph20",
                password: "PASSWORD",
                info: profile
            }
            )
        }).then((result) => result.json().then((resp) => SetDeviceAddress(resp)))

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
                                    <Grid item xs={12}>
                                        <CssTextField
                                            autoComplete="name"
                                            name="Name"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            onChange={(event) => { SetName(event.target.value) }}
                                            value={name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CssTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            id="age"
                                            label="Age in year(s)"
                                            name="age"
                                            color="secondary"
                                            onChange={(event) => { setAge(event.target.value) }}
                                            value={age}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                label="Gender"
                                                color="secondary"
                                                input={<CssSelect />}
                                                onChange={(event) => { SetGender(event.target.value) }}
                                                value={gender}
                                            >
                                                <MenuItem value={'male'}>Male</MenuItem>
                                                <MenuItem value={'female'}>Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                            color="secondary"
                                            onChange={(event) => { SetAddress(event.target.value) }}
                                            value={address}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CssTextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            id="contact"
                                            label="Contact Number"
                                            name="contact"
                                            color="secondary"
                                            onChange={(event) => { SetContact(event.target.value) }}
                                            value={contact}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                color="secondary"
                                                style={{ color: '#FFFFFF' }}
                                                format="dd/MM/yyyy"
                                                id="date-picker-inline"
                                                label="Date"
                                                value={date}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
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
                                    maxWidth="md"
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <DialogTitle>Patient Added Successfully</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Kindly keep the Address ID safe. Your Patient's Address is: {DeviceAddress} and the QR is:
                                            <div className={classes.qr}>
                                                <QRCode value={DeviceAddress} />
                                            </div>
                                        </DialogContentText>
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
        </ThemeProvider >
    );
}