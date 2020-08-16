import React from 'react'
import { Typography, makeStyles } from "@material-ui/core"
import Card from '../../components/Card/Card'
import CardAvatar from '../../components/Card/CardAvatar'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import Divider from "@material-ui/core/Divider/Divider"
import PhoneIcon from '@material-ui/icons/Phone'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    card: {
        padding: theme.spacing(3)
    },
    content: {
        padding: theme.spacing(3),
    },

}));

const YourProfile = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Typography variant="h2" style={{ color: '#bdbdbd' }}>Your Profile</Typography>
            <main>
                <Card profile>
                    <CardAvatar profile>
                        <img src="https://www.publicdomainpictures.net/pictures/210000/velka/doctor-1490804718D0I.jpg" />
                    </CardAvatar>
                    <CardHeader profile>
                        <Typography
                            variant="h4"
                        >
                            Dr. Gia
                        </Typography>
                    </CardHeader>
                    <Divider />
                    <CardBody profile>
                        <Typography>
                            Cardiologist
                        </Typography>
                        <div className={classes.card}>
                            <PhoneIcon fontSize="large" />
                            <Typography variant="h6">0334-121212</Typography>
                        </div>
                    </CardBody>
                </Card>
            </main>
        </div>
    )
}
export default YourProfile