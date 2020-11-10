import React from "react";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  withStyles,
  ThemeProvider,responsiveFontSizes,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
let theme = createMuiTheme({
  
  typography: {
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
      
    },

    fontFamily: ["Metrophobic", "sans-serif"].join(","),
  },
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,

    textAlign: "center",
    backgroundColor: "#2471A3",
    color: "white",
    height: "110px",
  },

  text: {
    fontSize: "60px",
  },
});
//Adjuts font size
theme = responsiveFontSizes(theme);
export const Header = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.text}>
          <Grid conatiner>
            <Grid item md={12} >
              <Typography component="h1" variant="h2">
                Admin Portal
              </Typography>
            </Grid>
            </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default Header;
