import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from "@material-ui/core/Card"
import { Button } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },

    content: {
        display: 'flex',
        padding: theme.spacing(3)
    },

    toolBar: {
        minHeight: "180px",
    },

    appBar:{
        alignItems: "center",
        background: '#00a152' 
    }
}));

const Login = () => {

    const classes = useStyles();
    return (
        <div className={classes.content}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h3" className={classes.title}>
                        LOGIN TO PORTAL
                    </Typography>
                </Toolbar>
            </AppBar>

            <form className={classes.root}>
                
            </form>
        </div>
    )
}

export default Login