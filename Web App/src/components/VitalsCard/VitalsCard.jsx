import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Thermometer from "../../assets/icons/thermometer";
import Oxygen from "../../assets/icons/oxygen";
import Frequency from "../../assets/icons/frequency";
import PropTypes from 'prop-types'
const useStyles = makeStyles((theme) => ({
  tileTopText: {
    fontSize: "1.1rem",
    textAlign: "right",
    lineHeight: "2",
    marginRight: "5%",
    fontFamily: "'Open Sans'",
    fontWeight: "bolder",
    // color: "#FFFFFF",
  },
  icon: {
    fontSize: "3.5rem"
  },
  flexBox: {
    display: "flex",
    margin: "auto",
    fontSize: "3.5rem",
  },
  flexBoxBottom: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  tileBottomText: {
    marginRight: "5%",
    fontFamily: "system-ui",
    fontWeight: "400",
    // color: "rgba(0, 0, 0, 0.57)",
  },
  cardBody: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    flexWrap: "wrap",
    borderRadius: "4px",
  },
  secondRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  },
  minicard: {
    display: "grid",
    height: "0%",
    gridTemplateColumns: "1fr 1fr",
    paddingBottom: "5px",
    margin: "2%",
    color: "white",
    borderRadius: "4px",
  },
}));

const ErrorMessage = () => {
  return (
    <div style={{ fontSize: "2rem", color: "#000000" }}>
      <Typography variant="h3">Currently, there are no readings</Typography>
    </div>
  );
};

const VitalsCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.cardBody}>
      {props.Empty ? (
        <ErrorMessage />
      ) : (
          <>
            <div className={classes.minicard} style={{ background: "#E8413E" }}>
              <div className={classes.flexBox}><Thermometer fontSize="inherit" /></div>
              <div className={classes.secondRow}>
                <div>
                  <h6 className={classes.tileTopText}>
                    Temperature
                  </h6>
                </div>
                <div className={classes.flexBoxBottom}>
                  <h2 className={classes.tileBottomText}>
                    {props.Temp} <small>F</small>
                  </h2>
                </div>
              </div>
            </div>

            <div className={classes.minicard} style={{ background: "#fc940c" }}>
              <div className={classes.flexBox}><Frequency fontSize="inherit" /></div>
              <div className={classes.secondRow}>
                <div>
                  <h6 className={classes.tileTopText}>
                    Heart Rate
                  </h6>
                </div>
                <div className={classes.flexBoxBottom}>
                  <h2 className={classes.tileBottomText}>
                    {props.HR} <small>BPM</small>
                  </h2>
                </div>
              </div>
            </div>

            <div className={classes.minicard} style={{ background: "#50aa54" }}>
              <div className={classes.flexBox}><Oxygen fontSize="inherit" /></div>
              <div className={classes.secondRow}>
                <div>
                  <h6 className={classes.tileTopText}>
                    Oxygen Level
                  </h6>
                </div>
                <div className={classes.flexBoxBottom}>
                  <h2 className={classes.tileBottomText}>
                    {props.SpO2}<small> SpO<small>2</small></small>
                  </h2>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

VitalsCard.propTypes = {
  Empty: PropTypes.bool.isRequired,
  Temp: PropTypes.string.isRequired,
  HR: PropTypes.string.isRequired,
  SpO2: PropTypes.string.isRequired,

}

export default VitalsCard;
