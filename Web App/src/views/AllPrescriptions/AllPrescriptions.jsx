import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Backdrop, CircularProgress, Table, Container, Grid, Grow, makeStyles, Paper, Slide, TableBody, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider, Typography } from '@material-ui/core';
import Header from '../../components/Header/Header';
import PatientCard from '../../components/PatientCard/PatientCard';
import theme from '../../assets/theme/theme';
import { ErrorMessage, StyledTableCell, useStyles } from "../HomePage/FunctionsHomePage"
import { set } from 'date-fns';
const useStyle = makeStyles((theme) => ({
    container: {
        maxHeight: 440,
    },
    content: {
        padding: theme.spacing(3)
    },
    pagination: {
        background: "darkgray"
    },
    container: {
        maxHeight: 440,
    },
    table: {
        minWidth: 700,
    },
}))
const AllPrescriptions = () => {
    const classes = useStyle();
    const tableClass = useStyles();
    const [Loading, setLoading] = useState(false);
    const [Empty, setEmpty] = useState(true);
    const [Array, setArray] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { name, gender, admissionDate, address } = useParams();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getAllPrescriptions = async () => {
        setLoading(true);
        var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllDisabledHash/${address}&0&prescription`);
        response = await response.json();
        if (response.length !== 0) {
            setEmpty(false);
            response.forEach(async element => {
                var responseTx = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${element}`);
                responseTx = await responseTx.json();
                setArray(array => [...array, responseTx]);
            });
        }
        else
            setEmpty(true);
        setLoading(false);
    }
    useEffect(() => {
        getAllPrescriptions()
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.content}>
                <Header />
                {Loading ? (<Backdrop open={Loading}> <CircularProgress color="secondary" /> </Backdrop>) :
                    <Container maxWidth="xl">
                        <Slide in={true}>
                            <Grid container justify="center">
                                <Grid item md={6}>
                                    <PatientCard
                                        name={name}
                                        gender={gender}
                                        AdmissionDate={admissionDate}
                                    />
                                </Grid>
                            </Grid>
                        </Slide>

                        {Empty ? "NIL" : (
                            <Grow in={true}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom variant="h5" color="secondary">
                                            All Prescriptions
                                        </Typography>
                                        <Paper>
                                            <TableContainer className={classes.container}>
                                                <Table stickyHeader aria-label="sticky table" className={classes.table}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell align="center">TimeStamp</StyledTableCell>
                                                            <StyledTableCell align="center">Details</StyledTableCell>
                                                            <StyledTableCell align="center">Title</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {Array?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                            return (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.response.TimeStamp}>
                                                                    <StyledTableCell align="center" component="th" scope="row">
                                                                        {row.response.TimeStamp}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">{row.response.details}</StyledTableCell>
                                                                    <StyledTableCell align="center">{row.response.title}</StyledTableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                className={classes.pagination}
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={Array?.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>

                            </Grow>
                        )}

                    </Container>
                }
            </div>
        </ThemeProvider>
    )
}

export default AllPrescriptions