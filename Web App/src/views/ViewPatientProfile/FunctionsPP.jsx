import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    body: {
        display: "flex",
        minHeight: "1vh",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(9),
    },
    bottom: {
        position: "fixed",
        zIndex: "2",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "3px",
        height: "8vh",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "rgb(240, 248, 255,0.8)",
    },
}));

export default useStyles;