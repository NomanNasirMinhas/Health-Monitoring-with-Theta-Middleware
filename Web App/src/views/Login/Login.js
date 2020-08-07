import React from "react"

import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from "@material-ui/core/Card"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },

    content: {
        display: 'flex',
        padding: theme.spacing(3),
    },
}));

const Login = () => {

    const classes = useStyles();
    return (
        <div className={classes.content}>

        </div>
    )
}

export default Login