import React, { useEffect } from 'react';
import { withStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, Link } from '@material-ui/core';
import { TableRow, Paper, Typography, ThemeProvider, Slide } from '@material-ui/core';
import Header from "../../components/Header/Header"
import theme from "../../assets/theme/theme"
import { Link as link } from "react-router-dom"

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
    useEffect(() => {
        async function getPatients() { 
            var seed = (localStorage.getItem('seed') || '')
            // var seed = 'VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY'
            var addresses = await fetch(`http://localhost:5000/getAllAddresses/${seed}`);
            var response = await addresses.json()
            console.log(response[0])
        }
        getPatients()
    }, [])
    

    // const patients = async () => {
    //     var seed = (localStorage.getItem('seed') || '')
    //     var addresses = await fetch(`http://localhost:5000/getAddress/${seed}`);
    //     alert(addresses[0])
    // }

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Slide direction="down" in={true} timeout={300}>
                <div className={classes.content}>
                    <Typography variant="h2" align="center" color="secondary" className={classes.titletext}>Current Patients</Typography>
                    <Slide direction="up" in={true} timeout={300}>
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
                                                    component={link}
                                                    to="/viewpatientprofile"
                                                    variant="body2"
                                                >
                                                    View Profile
                                        </Link>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Slide>
                </div>
            </Slide>
        </ThemeProvider>
    );
}
