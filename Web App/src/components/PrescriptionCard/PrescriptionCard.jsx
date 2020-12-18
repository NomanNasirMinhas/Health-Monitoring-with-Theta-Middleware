import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NoDrugs from "../../assets/icons/NoDrugs";
import AddIcon from '@material-ui/icons/Add';
import * as Yup from "yup";
import moment from "moment";
import { Formik, Form } from "formik";
import {
    Typography,
    CircularProgress,
    makeStyles,
    withStyles,
    TableCell,
    TableBody,
    TableHead,
    Table,
    TableRow,
    TableContainer,
    TextField,
    IconButton,
    Tooltip
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        display: "grid",
        minHeight: "41vh",
        background: "#3C3C46",
        borderRadius: "31px",
        color: "lightcyan"
    },
    circle: {
        margin: "auto"
    },
    table: {
        fontFamily: "Roboto Condensed",
    },
    prescriptionBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "1em"
    },
    errorMessage: {
        display: "flex"
    }
}));

const CssTextField = withStyles({
    root: {
        "& label": {
            color: "white",
        },
        "& label.Mui-focused": {
            color: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
            },
            "& ": {
                color: "white",
            },
            "&:hover fieldset": {
                borderColor: "indianred",
            },
            "&.Mui-focused fieldset": {
                borderColor: "indianred",
            },
        },
    },
})(TextField);


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "indianred",
        color: theme.palette.common.white,
        fontFamily: "Roboto Condensed",
        borderColor: "rgba(255, 255, 255, 0.12)",
        fontWeight: "bold",
    },
    body: {
        backgroundColor: "rgba(60, 60, 70, 1)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        opacity: "100%",
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
        fontFamily: "Roboto Condensed",
    },
}))(TableCell);

const AddPrescriptionSchema = Yup.object().shape({
    Name: Yup.string()
        .min(2, "Invalid name")
        .max(20, "Too Long!")
        .required("Required"),
    Details: Yup.string()
        .min(2, "Not enough description")
        .max(20, "Too Long!")
        .required("Required"),
});

const PrescriptionCard = (props) => {
    const classes = useStyles();
    const [Empty, setEmpty] = useState(true);
    const [Loading, setLoading] = useState(true);
    const seed = localStorage.getItem("seed") || "";
    const ErrorMessage = () => {
        return (
            <div className={classes.errorMessage}>
                <div style={{ margin: "auto" }}>
                    <NoDrugs color="secondary" style={{ paddingTop: "15px", fontSize: "8em" }} />
                </div>
                <div style={{ margin: "auto" }}>
                    <Typography variant="h5" color="inherit">
                        There is no prescription assigned
                </Typography>
                </div>
            </div>
        )
    }
    const [prescriptionArray, setprescriptionArray] = useState([])
    async function getPrescription() {
        setLoading(true);
        let x;
        setprescriptionArray([]);
        var response = await fetch(`https://thetamiddleware.herokuapp.com/getAllHash/${props.Address}&0&prescription`);
        response = await response.json();
        if (response !== false) {
            for (var i = 0; i < response.length; i++) {
                x = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${response[i]}`);
                x = await x.json();
                if (x.response !== false) {
                    setEmpty(false);
                    setprescriptionArray(array => [...array, x]);
                }
            }
        }
        setLoading(false);
        // if (response !== false) {
        //     response = await fetch(`https://thetamiddleware.herokuapp.com/getTx/${response}`);
        //     response = await response.json();
        //     setEmpty(false)
        // }
        // setLoading(false);
        // console.log(response);
    }

    useEffect(() => {
        getPrescription();
    }, [])

    return (
        <Fragment>
            <div className={classes.card}>
                {Loading ? <CircularProgress color="secondary" className={classes.circle} /> :
                    (
                        <div style={{ display: "grid" }}>
                            <div>
                                {Empty ? (<ErrorMessage />) :
                                    <TableContainer style={{ borderRadius: "3px", maxHeight: "30vh" }}>
                                        <Table stickyHeader className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">
                                                        Issued At
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Name
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Details
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {prescriptionArray?.map((row) => (
                                                    <TableRow key={row.TimeStamp}>
                                                        <StyledTableCell align="center">
                                                            {row.response.TimeStamp}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row.response.title}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {row.response.details}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </div>
                            <div className={classes.prescriptionBox}>
                                <Formik
                                    initialValues={{
                                        Name: "",
                                        Details: "",
                                    }}
                                    validationSchema={AddPrescriptionSchema}
                                    onSubmit={async (values, actions) => {
                                        var prescription = {
                                            TimeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                                            details: values.Details,
                                            title: values.Name,
                                        };
                                        prescription = JSON.stringify(prescription);
                                        var response = await fetch(
                                            "https://thetamiddleware.herokuapp.com/sendTx",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    seed: seed,
                                                    address: props.Address,
                                                    txType: "prescription",
                                                    Data: prescription
                                                }),
                                            }
                                        );
                                        console.log(await response.json());
                                        actions.setSubmitting(false);
                                        getPrescription();
                                        console.log("Done");
                                    }}
                                >
                                    {({
                                        errors,
                                        touched,
                                        values,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting,
                                        handleReset,
                                    }) => (
                                        <Form style={{ display: "contents" }} onSubmit={handleSubmit}>
                                            <CssTextField
                                                disabled={isSubmitting}
                                                autoComplete="off"
                                                variant="outlined"
                                                size="small"
                                                id="Name"
                                                label="Name"
                                                value={values.Name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Name ? errors.Name : ""}
                                                error={touched.Name && Boolean(errors.Name)}
                                            />
                                            <CssTextField
                                                disabled={isSubmitting}
                                                autoComplete="off"
                                                variant="outlined"
                                                size="small"
                                                id="Details"
                                                label="Details"
                                                value={values.Details}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={touched.Details ? errors.Details : ""}
                                                error={touched.Details && Boolean(errors.Details)}
                                            />
                                            <IconButton
                                                type="submit"
                                                color="secondary"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <CircularProgress color="secondary" />
                                                ) : (
                                                        <Tooltip arrow title="Add Prescription">
                                                            <AddIcon />
                                                        </Tooltip>
                                                    )}
                                            </IconButton>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

PrescriptionCard.propTypes = {
    address: PropTypes.string,
}
export default PrescriptionCard;