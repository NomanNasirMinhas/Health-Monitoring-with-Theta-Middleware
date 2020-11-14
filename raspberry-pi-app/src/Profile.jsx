import { Grid, makeStyles, Paper, Avatar, IconButton } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import WcIcon from "@material-ui/icons/Wc";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Hashtag from "./hashtag.js";
const UseStyles = makeStyles((theme) => ({
  paper: {
    height: theme.spacing(30)
  },
  large: {
    margin: "20px",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const profile = () => {
  const classes = UseStyles();
  return (
    <Paper className={classes.paper} variant="elevation" elevation={1}>
      <Grid container>
        <Grid item sm={6} md={4}>
          <Avatar className={classes.large}>aa</Avatar>
        </Grid>
        <Grid item sm={6} md={8}>
          <h4>
            Hasnain Khawaja,{" "}
            <small>
              <i>22</i>
            </small>
          </h4>
          <p>
            <IconButton disabled>
              <Hashtag />
            </IconButton>
            HASDJLAJsdnbaAJKSDJK
            <br />
            <IconButton disabled>
              <WcIcon />
            </IconButton>
            male
            <br/>
            <IconButton disabled>
              <CalendarTodayIcon/>
            </IconButton>
            22-12-2020
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default profile;
