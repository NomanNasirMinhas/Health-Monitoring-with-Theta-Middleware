import React from "react";
import {
    Typography,
    makeStyles,
    Grid,
    Button,
    Paper,
    TextField,
    Link,
    ThemeProvider,
    Slide,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions
} from '@material-ui/core'
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTUwMiA5Mi40MTZoLTE0OS4yNDZjLTQwLjY5MiAwLTc1LjczNiAyNy4zOS04NS4yMjEgNjYuNjA3LS4wMDUuMDE5LS4wMDkuMDM3LS4wMTQuMDU2bC0xLjUyIDYuNDQ0di01MS4zMTVjMjIuNTEyLTQuODE0IDM5LjQzNS0yNC43MTUgMzkuNDM1LTQ4LjQ2MyAwLTI3LjMzNS0yMi40Mi00OS41NzMtNDkuOTc4LTQ5LjU3M3MtNDkuOTc2IDIyLjIzOS00OS45NzYgNDkuNTc0YzAgMjQuMTI5IDE3LjQ2OCA0NC4yODYgNDAuNTIgNDguNjgzdjUxLjA5NGwtMS41Mi02LjQ0NGMtLjAwNS0uMDE5LS4wMDktLjAzNy0uMDE0LS4wNTYtOS40ODQtMzkuMjE3LTQ0LjUyOC02Ni42MDctODUuMjIxLTY2LjYwN2gtMTQ5LjI0NWMtNS41MjMgMC0xMCA0LjQ3Ny0xMCAxMHY4LjE2MmMwIDE5LjY1NiAxMS4xNSAzNi43NzUgMjcuNTA5IDQ1LjQ2M3Y0LjIzMmMwIDE5LjY1NCAxMS4xNTIgMzYuNzc0IDI3LjUwOCA0NS40NjN2NC4yMzJjMCAyOC40MTYgMjMuMzA5IDUxLjUzNCA1MS45NTggNTEuNTM0aDEzOS4wMjV2MzEuNTQ0aC01MS40NzJjLTE5Ljk3NyAwLTM2LjIzIDE2LjI3NC0zNi4yMyAzNi4yNzhzMTYuMjUzIDM2LjI3OCAzNi4yMyAzNi4yNzhoNTEuNDcydjMyLjA5aC00OS41NjFjLTE3LjU3NCAwLTMxLjg3MSAxNC4zMTUtMzEuODcxIDMxLjkxMnMxNC4yOTcgMzEuOTEyIDMxLjg3MSAzMS45MTJoNDkuNTYxdjI0LjMxMmMwIDUuNTIzIDQuNDc3IDEwIDEwIDEwIDUuNTIyIDAgMTAtNC40NzcgMTAtMTB2LTI0LjMxMmg3OC43ODZjNS41MjIgMCAxMC00LjQ3NyAxMC0xMHMtNC40NzgtMTAtMTAtMTBoLTc4Ljc4NnYtMjMuODIzaDUyLjc4OWMxOS44NDkgMCAzNS45OTctMTYuMTcgMzUuOTk3LTM2LjA0NXMtMTYuMTQ4LTM2LjA0NS0zNS45OTctMzYuMDQ1aC01Mi43ODl2LTMyLjU1Nmg1My4wNjFjMTkuNjk4IDAgMzUuNzI1LTE2LjA0NyAzNS43MjUtMzUuNzcyIDAtNS42OTQtMS4zMDMtMTEuMDM4LTMuNjQyLTE1Ljc3Mmg1My44ODFjMjguNjQ5IDAgNTEuOTU4LTIzLjExOCA1MS45NTgtNTEuNTM0di00LjIzMmMxNi4zNTUtOC42ODkgMjcuNTA4LTI1LjgwOSAyNy41MDgtNDUuNDYzdi00LjIzMmMxNi4zNTktOC42ODkgMjcuNTA5LTI1LjgwOSAyNy41MDktNDUuNDY0di04LjE2MmMwLTUuNTIzLTQuNDc4LTEwLTEwLTEwem0tMjc2LjUyLTI2LjY3YzAtMTYuMzA3IDEzLjQ0Ny0yOS41NzMgMjkuOTc3LTI5LjU3M3MyOS45NzggMTMuMjY3IDI5Ljk3OCAyOS41NzMtMTMuNDQ4IDI5LjU3My0yOS45NzggMjkuNTczLTI5Ljk3Ny0xMy4yNjctMjkuOTc3LTI5LjU3M3ptLTExOC41MDUgMTc1Ljc1N2MtMTYuOTk3IDAtMzAuOTM4LTEzLjE1OS0zMS45MDQtMjkuNjk2aDY5Ljg3NGM1LjUyMiAwIDEwLTQuNDc3IDEwLTEwcy00LjQ3OC0xMC0xMC0xMGgtNjUuNDc4Yy0xNi45OTcgMC0zMC45MzctMTMuMTYtMzEuOTA0LTI5LjY5NmgzLjU3Yy4xNzkuMDEuMzU5LjAxNS41NDEuMDE1aDkyLjMzNmM1LjUyMiAwIDEwLTQuNDc3IDEwLTEwcy00LjQ3OC0xMC0xMC0xMGgtOTEuNTFjLS4xNzktLjAwOS0uMzU5LS4wMTUtLjU0MS0uMDE1LTE2Ljk5NyAwLTMwLjkzOC0xMy4xNTktMzEuOTA0LTI5LjY5NWgxMzkuMTkyYzMxLjQxNSAwIDU4LjQ1OCAyMS4wODQgNjUuNzc0IDUxLjI3OWwxOC4zNDggNzcuODA4em0xMzkuMDI1IDIwMC4wMTNoLTQ5LjU2MWMtNi41NDYgMC0xMS44NzEtNS4zNDQtMTEuODcxLTExLjkxMnM1LjMyNS0xMS45MTIgMTEuODcxLTExLjkxMmg0OS41NjF6bTcyLjc4OS03NS45MTNjOC44MjEgMCAxNS45OTcgNy4xOTggMTUuOTk3IDE2LjA0NXMtNy4xNzYgMTYuMDQ1LTE1Ljk5NyAxNi4wNDVoLTUyLjc4OXYtMzIuMDl6bS03Mi43ODktMjBoLTUxLjQ3MmMtOC45NDkgMC0xNi4yMy03LjMwMi0xNi4yMy0xNi4yNzhzNy4yOC0xNi4yNzggMTYuMjMtMTYuMjc4aDUxLjQ3MnptODguNzg2LTY4LjMyOGMwIDguNjk3LTcuMDU0IDE1Ljc3Mi0xNS43MjUgMTUuNzcyaC01My4wNjF2LTMxLjU0NGg1MS45NzdjOS41ODMgMCAxNi44MDkgNi43OCAxNi44MDkgMTUuNzcyem0xMjUuMjU2LTEzNS4xNjRjLS4xODEgMC0uMzYyLjAwNS0uNTQuMDE1aC00Ny45NjhjLTUuNTIyIDAtMTAgNC40NzctMTAgMTBzNC40NzggMTAgMTAgMTBoNTIuOTAzYy0uOTc0IDE2LjUyOS0xNC45MTEgMjkuNjgxLTMxLjkwMyAyOS42ODFoLTY1LjQ3OGMtNS41MjIgMC0xMCA0LjQ3Ny0xMCAxMHM0LjQ3OCAxMCAxMCAxMGg2OS44NzRjLS45NjcgMTYuNTM3LTE0LjkwNyAyOS42OTYtMzEuOTA0IDI5LjY5NmgtMTM2LjM5NGwxOC4zNDgtNzcuODA4YzcuMzE2LTMwLjE5NSAzNC4zNTktNTEuMjc5IDY1Ljc3NC01MS4yNzloMTM5LjE5MmMtLjk2NyAxNi41MzYtMTQuOTA3IDI5LjY5NS0zMS45MDQgMjkuNjk1eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIGQ9Im0zNjAuNTkgMTYwLjQ0YzMuNTM1IDIuMzU2IDguMjU5IDIuMTgzIDExLjYzNy0uMzc5IDMuMjc0LTIuNDgzIDQuNjc4LTYuOTE3IDMuNDgzLTEwLjg0MS0xLjIwOS0zLjk3My00Ljg3Ni02Ljg2MS05LjAyOS03LjA4LTQuMTk2LS4yMjEtOC4xNTkgMi4yODUtOS43NyA2LjE2LTEuNzk5IDQuMzI1LS4yNiA5LjU2MiAzLjY3OSAxMi4xNHoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4=)",
        backgroundColor: "rgb(0, 100, 191)",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    submit: {
        margin: theme.spacing(6, 0, 2),
        height: "70px"
    },
}));

const LoginSchema = Yup.object().shape({
    Username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    Password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

const Login = (props) => {

    const [visible, setVisible] = React.useState(false);
    const [openError, SetOpenError] = React.useState(false);

    const classes = useStyles();
    const forgotPassword = visible ? '#' : '/forgotpassword';
    const createAccount = visible ? '#' : '/createaccount';
    return (
        <ThemeProvider theme={theme}>
            <Slide direction="left" in={true} timeout={300}>
                <Grid container className={classes.root}>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5" >
                                Log in
                            </Typography>
                            <Formik
                                initialValues={{
                                    Username: '',
                                    Password: '',
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={async (values, actions) => {
                                    setVisible(true)
                                    var seed =
                                        await
                                            fetch(`https://thetamiddleware.herokuapp.com/getSeed/${values.Username}&${values.Password}`);
                                    var parsedSeed = await seed.json();
                                    localStorage.setItem('seedInfo', JSON.stringify(parsedSeed[1]));
                                    if (parsedSeed[0]) {
                                        localStorage.setItem('seed', parsedSeed[1].SEED);
                                        props.history.push('/dashboard')
                                        actions.setSubmitting(false)
                                    }
                                    else {
                                        SetOpenError(true)
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    values,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    handleReset }) => (
                                        <Form onSubmit={handleSubmit} className={classes.form}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                disabled={isSubmitting}
                                                fullWidth
                                                id="Username"
                                                label="Username"
                                                value={values.Username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Username ? errors.Username : ""}
                                                error={touched.Username && Boolean(errors.Username)}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                variant="outlined"
                                                // type="password"
                                                margin="normal"
                                                disabled={isSubmitting}
                                                fullWidth
                                                id="Password"
                                                label="Password"
                                                value={values.Password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Password ? errors.Password : ""}
                                                error={touched.Password && Boolean(errors.Password)}
                                                autoComplete="off"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="primary"
                                                style={{ fontSize: 20 }}
                                                className={classes.submit}
                                            >
                                                {isSubmitting ? <CircularProgress color="secondary" /> : 'Log in'}
                                            </Button>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Link
                                                        component={link}
                                                        disabled={visible}
                                                        to={forgotPassword}
                                                        variant="body2">
                                                        Forgot password?
                                            </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link
                                                        component={link}
                                                        disabled={visible}
                                                        to={createAccount}
                                                        variant="body2">
                                                        {"Create New Account"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            <Dialog
                                                maxWidth="md"
                                                open={openError}
                                                onClose={() => {
                                                    SetOpenError(false)
                                                    handleReset()
                                                }}
                                            >
                                                <DialogTitle>Invalid Credentials</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Please verify the Username and/or Password
                                            </DialogContentText>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => {
                                                                SetOpenError(false);
                                                                handleReset()
                                                            }}
                                                            color="primary">
                                                            Okay
                                                </Button>
                                                    </DialogActions>
                                                </DialogContent>
                                            </Dialog>
                                        </Form>
                                    )}
                            </Formik>
                        </div>
                    </Grid>
                </Grid>
            </Slide>
        </ThemeProvider>
    )
}

export default Login