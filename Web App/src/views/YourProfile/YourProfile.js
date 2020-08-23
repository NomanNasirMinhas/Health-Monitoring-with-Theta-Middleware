import React from 'react'
import { Typography, makeStyles, ThemeProvider } from "@material-ui/core"
import Card from '../../components/Card/Card'
import CardAvatar from '../../components/Card/CardAvatar'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import Divider from "@material-ui/core/Divider/Divider"
import PhoneIcon from '@material-ui/icons/Phone'
import Header from "../../components/Header/Header"
import BusinessIcon from '@material-ui/icons/Business'
import EmailIcon from '@material-ui/icons/Email';
import theme from "../../assets/theme/theme"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    headerText: {
        marginBottom: "75px"
    },
    card: {
        padding: theme.spacing(3),
    },
    content: {
        padding: theme.spacing(3),
    },
}));

const YourProfile = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className={classes.content}>
                <Typography variant="h2" align="center" color="secondary" className={classes.headerText}>Your Profile</Typography>
                <main>
                    <Card profile>
                        <CardAvatar profile>
                            <img
                                src="https://www.publicdomainpictures.net/pictures/210000/velka/doctor-1490804718D0I.jpg"
                                alt="Avatar" />
                        </CardAvatar>
                        <CardHeader profile>
                            <Typography
                                variant="h4"
                            >
                                Dr. Gia Adams
                        </Typography>
                        </CardHeader>
                        <Divider />
                        <CardBody profile>
                            <Typography>
                                Dermatologist, Laser Specialist
                            </Typography>
                            <div className={classes.card}>
                                <PhoneIcon fontSize="large" />
                                <Typography variant="h6">0334-121212</Typography>
                                <BusinessIcon fontSize="large" />
                                <Typography variant="h6">Room no. 7, Bahria Hospital, Rawalpindi</Typography>
                                <EmailIcon fontSize="large" />
                                <Typography variant="h6">gia@gmail.com</Typography>
                            </div>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </ThemeProvider>
    )
}
export default YourProfile