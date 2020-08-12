import React from "react"
import { Typography, makeStyles, Grid } from "@material-ui/core"
import ChartistGraph from "react-chartist"
import Card from "../../components/Card/Card"
import CardBody from "../../components/Card/CardBody"
import CardHeader from "../../components/Card/CardHeader"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        padding: theme.spacing(3),
    },
    headerText: {
        color: '#9e9e9e'
    },
    labels: {
        padding: theme.spacing(3)
    },
}));

const LiveReadings = () => {

    var biPolarBarChartData = {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
        series: [
            [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
        ]
    };
    var biPolarBarChartOptions = {
        high: 10,
        low: -10,
        axisX: {
            labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
            }
        }
    }

    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Typography variant="h2" style={{ color: '#bdbdbd' }}>Live Readings</Typography>
            <Grid container xs={12}>
                <Grid container className={classes.labels}>
                    <Grid item>
                        <Typography variant="h4" className={classes.headerText}>
                            Patient's Name:
                    </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4">
                            Wahaj Mustakeem
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container className={classes.labels}>
                    <Grid item>
                        <Typography variant="h4" className={classes.headerText}>
                            Patient's Age:
                    </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4">
                            69
                    </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Card>
                <CardHeader><p>ECG</p></CardHeader>
                <CardBody>
                    <ChartistGraph
                        data={biPolarBarChartData}
                        options={biPolarBarChartOptions}
                        type={'Line'}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader><p>BPM</p></CardHeader>
                <CardBody>
                    <ChartistGraph data={biPolarBarChartData} options={biPolarBarChartOptions} type={'Line'} />
                </CardBody>
            </Card>
        </div>
    )
}

export default LiveReadings