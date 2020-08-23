import React from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { TableRow, Paper, Link, Typography, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header/Header"
import theme from "../../assets/theme/theme"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#e3f0d3",
        },
    },
}))(TableRow);

function createData(id, name, age) {
    return { id, name, age };
}

const rows = [
    createData(1, "Ahmad Bin Suleman", 22),
    createData(2, "Aamna Ahmad", 23),
    createData(3, "Mirza Jamshed", 40),
    createData(4, "Wahaj Mustakeem", 69),
    createData(5, "Inaam Shehzaad", 42),
    createData(6, "Fatima Umar", 34),
    createData(7, "Fatima Malik", 66),
];

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3)
    },
    table: {
        minWidth: 700,
    },
    titletext: {
        marginBottom: "40px"
    }
}));

export default function HomePage() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div className={classes.content}>
                <Typography variant="h2" align="center" color="secondary" className={classes.titletext}>Current Patients</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Patient's ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Age</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.age}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Link
                                            href="/viewpatientprofile"
                                            variant="body2"
                                            style={{ color: '#00a152' }}
                                        >
                                            View Profile
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </ThemeProvider>
    );
}
