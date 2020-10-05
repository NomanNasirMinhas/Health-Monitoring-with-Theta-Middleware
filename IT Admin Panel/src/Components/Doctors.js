import React from 'react';
import Navbar from "./Navbar";

function Doctors(){

return (
<Grid item xs={6} style={{ flaot: "right" }}>
          <TableContainer className={classesTable.paper}>
            <Paper
              elevation={5}
              style={{
                width: 650,
                margin: "auto",
                marginTop: "5%",
                border: "solid grey 0.9px",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                style={{
                  textAlign: "center",
                  backgroundColor: "#0ea80e",
                  color: "white",
                  alignSelf: "center",
                }}
              >
                <b>Doctors</b>
              </Typography>

              <Table className={classesTable.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <strong>Doctors ID</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Assigned Devices</strong>
                    </TableCell>

                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((obj) => (
                    <TableRow hover key={obj.name}>
                      <TableCell component="th" scope="row">
                        {obj.id}
                      </TableCell>
                      <TableCell align="center">{obj.name}</TableCell>
                      <TableCell align="center">
                        {obj.assigned_devices}
                      </TableCell>

                      <TableCell align="center">
                        {
                          <Button
                            className={classesTable.hover}
                            color="inherit"
                            startIcon={<SettingsIcon fontSize="small" />}
                          >
                            {" "}
                            Configure
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <br />
);
                    };