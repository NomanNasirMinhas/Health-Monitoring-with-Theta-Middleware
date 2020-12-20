import React, { useEffect, useState } from "react"
import Card from "../Card/Card"
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import CardHeader from "../Card/CardHeader";
import { Doughnut, Pie } from "react-chartjs-2"

const useStyles = makeStyles(() => ({
    cardDiv: {
        display: "flex",
        gap: "10px",
    },
    card: { marginTop: "8.4px", background: "rgba(255,255,255,0.18)", height: "24vh", paddingBottom: "3px" },
}));


const PredictionCard = (props) => {
    const classes = useStyles();
    const [Prediction, setPrediction] = useState(0);
    const [Loading, setLoading] = useState(false)

    async function getPrediction() {
        setLoading(true);
        try {
            var response = await fetch(
                `https://thetamiddleware.herokuapp.com/getPrediction/${props.Temp}&${props.HR}&${props.SpO2}`);
            response = await response.json();
            response = response.toFixed(2)
            setPrediction(response);
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getPrediction()
    }, [])


    return (
        <React.Fragment>
            <Typography variant="h5" color="secondary">
                Health Status
            </Typography>
            <div className={classes.cardDiv}>
                <Card chart className={classes.card}>
                    <div style={{ padding: "10px", display: "flex", height: "inherit", alignItems: "center" }}>
                        {Loading ? <CircularProgress style={{ margin: "auto" }} color="secondary" /> : (
                            <Doughnut data={{
                                labels: ['Stability'],
                                datasets: [{
                                    data: [Prediction],
                                    backgroundColor: "#34CACB",
                                    borderColor: "transparent"
                                }],
                            }}
                                options={{
                                    maintainAspectRatio: false, legend: {
                                        display: false,
                                    },
                                    circumference: (Prediction / 100) * 6.29

                                }}
                            />
                        )}
                    </div>
                </Card>
                <Card className={classes.card} style={{ background: "lightblue" }}>
                    <div style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        height: "inherit",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {Loading ? (<CircularProgress style={{ margin: "auto" }} />) : (
                            <>
                                <Typography variant="h3">{Prediction} %</Typography>
                                {Prediction > 50 ? (<Typography style={{ color: "lightseagreen" }} variant="h5">Stable</Typography>)
                                    :
                                    (<Typography style={{ color: "darkred" }} variant="h5">Unstable</Typography>)}
                            </>
                        )
                        }

                    </div>
                </Card>
            </div >
        </React.Fragment >
    )

}

export default PredictionCard;