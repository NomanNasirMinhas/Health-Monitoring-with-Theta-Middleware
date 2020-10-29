import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Slide, Paper, TextField, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
//import Slide from 'material-ui/Slide;'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0ea80e",
    },

    secondary: {
      main: "#ddd",
    },
  },
});

export default function ResetPassword() {
  const [seed, setSeed] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Slide direction="up" in={true} timeout={800}>
          <Paper
            elevation={2}
            style={{
              width: "35%",
              height: "50%",
              float: "center",
              margin: "auto",
              marginTop: "8%",
            }}
          >
            <form onSubmit={fetch}>
              <Typography variant="h5">
                <strong>FORGOT PASSWORD</strong>
              </Typography>
              <br />
              <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <TextField
                   
                    color="primary"
                    variant="outlined"
                    required
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    fullWidth
                    label="Enter Username"
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <br />
                <br />
                <br /> <br />
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <Button type="submit" variant="contained" color="primary">
                    {" "}
                    Get Password
                  </Button>
                </Grid>
                <Grid item xs={4}></Grid>
                <br />
                <br />
                <br /> <br />
              </Grid>
            </form>
          </Paper>
        </Slide>
      </ThemeProvider>
    </div>
  );
}
