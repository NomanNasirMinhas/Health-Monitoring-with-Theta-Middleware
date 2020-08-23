import React from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, Paper, Link, Typography, Grid } from '@material-ui/core';
import Header from "../../components/Header/Header"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#00a152",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#e3f0d3",
        },
    },
}))(TableRow);

function createData(time, hr, temp, sys, diast) {
    return { time, hr, temp, sys, diast };
}

const rows = [
    createData("08-09-2020/10:00 PM", 82, 90, 81,122),
    createData("08-09-2020/10:05 PM", 80, 91, 83,121),
    createData("08-09-2020/10:10 PM", 84, 89, 81,120),
    createData("08-09-2020/10:15 PM", 83, 88, 82,118),
    createData("08-09-2020/10:20 PM", 81, 93, 83,119),
    createData("08-09-2020/10:25 PM", 80, 92, 80,120),
    createData("08-09-2020/10:30 PM", 79, 90, 84,122),
    createData("08-09-2020/10:35 PM", 86, 91, 83,124),
    createData("08-09-2020/10:40 PM", 84, 93, 82,121),
    createData("08-09-2020/10:45 PM", 86, 94, 79,120),
    createData("08-09-2020/10:50 PM", 84, 92, 78,124),
    createData("08-09-2020/10:55 PM", 82, 91, 81,121),
    createData("08-09-2020/11:00 PM", 81, 90, 80,120),

];

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3)
    },
    table: {
        minWidth: 700,
    },
    headerText: {
        color: '#1AA620'
    },
    labels: {
        padding: theme.spacing(3)
    },
}));

export default function ViewHistory() {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <div className={classes.content}>
                <Typography variant="h2" style={{ color: '#0A7A0F', marginBottom: "40px" }}>Patient's History</Typography>
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
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Timestamp</StyledTableCell>
                                <StyledTableCell align="center">Heart Rate(BPM)</StyledTableCell>
                                <StyledTableCell align="center">Body Temp (F)</StyledTableCell>
                                <StyledTableCell align="center">Systolic BP</StyledTableCell>
                                <StyledTableCell align="center">Diastolic BP</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.time}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {row.time}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.hr}</StyledTableCell>
                                    <StyledTableCell align="center">{row.temp}</StyledTableCell>
                                    <StyledTableCell align="center">{row.sys}</StyledTableCell>
                                    <StyledTableCell align="center">{row.diast}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
