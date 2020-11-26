// import React, { useEffect } from "react";
// import {
//   Typography,
//   makeStyles,
//   Grid,
//   Button,
//   Dialog,
//   Slide,
//   CircularProgress,
//   DialogTitle,
//   DialogContentText,
//   DialogContent,
//   DialogActions,
//   ThemeProvider,
//   Grow,
// } from "@material-ui/core";

// import AssessmentIcon from "@material-ui/icons/Assessment";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// import HistoryIcon from "@material-ui/icons/History";
// import TimelineIcon from "@material-ui/icons/Timeline";
// import Header from "../../components/Header/Header";
// import theme from "../../assets/theme/theme";
// import VitalsCard from "../../components/VitalsCard/VitalsCard";
// import { Link, useParams } from "react-router-dom";
// import PatientCard from "../../components/PatientCard/PatientCard";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   content: {
//     display: "flex",
//     padding: theme.spacing(3),
//   },
//   labels: {
//     padding: theme.spacing(3),
//   },
//   sideButton: {
//     position: "relative",
//     justifyContent: "space-between",
//     fontSize: "large",
//     marginRight: "20px",
//     width: "361px",
//     height: "107px",
//     background: "#FFFFFF",
//     boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.28)",
//     borderRadius: "12px",
//   },
//   rightBar: {
//     marginTop: "20px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-evenly",
//     alignItems: "flex-end",
//   },
//   CircularProgress: {
//     position: "absolute",
//     top: "40%",
//     left: "46%",
//   },
// }));

// const ViewPatientProfile = (props) => {
//   let { address } = useParams();
//   const [circularVisible, SetCircularVisible] = React.useState(true);
//   const [openGenerateReport, setOpenGenerateReport] = React.useState(false);
//   const [openDischarge, setOpenDischarge] = React.useState(false);
//   const [dischargeDialogue, SetDischargeDialogue] = React.useState(false);
//   const [visible, setVisible] = React.useState(false);
//   const [LastReading, SetLastReading] = React.useState();
//   const [name, SetName] = React.useState();
//   const [age, SetAge] = React.useState();
//   const [patient, SetPatient] = React.useState();
//   const [Empty, SetEmpty] = React.useState(false);
//   const seed = localStorage.getItem("seed") || "";

//   const dischargePatient = async () => {
//     setVisible(true);
//     var response = await fetch(
//       `https://thetamiddleware.herokuapp.com/dropAddress/${seed}&${address}`
//     );
//     var resObj = await response.json();
//     SetDischargeDialogue(resObj);
//     setVisible(false);
//   };
//   const redirect = () => {
//     SetDischargeDialogue(false);
//     props.history.push("/dashboard");
//   };
//   useEffect(() => {
//     async function getProfile() {
//       var obj = await fetch(
//         `https://thetamiddleware.herokuapp.com/getAddressInfo/${seed}&${address}`
//       );
//       obj = await obj.json();
//       SetPatient(obj.Profile);
//       SetName(obj.Profile.name);
//       SetAge(obj.Profile.age);
//       //Returns Hash
//       var response = await fetch(
//         `https://thetamiddleware.herokuapp.com/getLastTx/${address}&vitals`
//       );

//       var resObj = await response.json();
//       if (resObj !== false) {
//         //Passing Hash of transaction
//         var responseTx = await fetch(
//           `https://thetamiddleware.herokuapp.com/getTx/${resObj}`
//         );
//         var resObjTx = await responseTx.json();
//         resObjTx = JSON.parse(resObjTx);
//         console.log(resObjTx)

//         if (resObjTx !== false) {
//           SetEmpty(false);
//           SetCircularVisible(false);
//           SetLastReading(resObjTx);
//         } else {
//           SetEmpty(true);
//           SetCircularVisible(false);
//         }
//       } else {
//         SetEmpty(true);
//         SetCircularVisible(false);
//       }
//     }
//     getProfile();
//   }, []);

//   const classes = useStyles();
//   return (<>
//     <Header />
//     {circularVisible ? (
//       <CircularProgress
//         className={classes.CircularProgress}
//         color="secondary"
//         size={100}
//       />
//     ) : (
//         <div className={classes.content}>
//           <Typography variant="h4">Patient's Profile</Typography>
//           <PatientCard
//             name={patient.name}
//             age={patient.age}
//             gender={patient.gender}
//             address={patient.address}
//             AdmissionDate={patient.date}
//             contact={patient.contact} />

//           <Typography
//             variant="h2"
//             color="secondary"
//             className={[classes.headerText, classes.labels].join(" ")}
//           >
//             Vitals
//             </Typography>

//           <VitalsCard
//             Empty={Empty}
//             HR={LastReading?.HR}
//             Temp={LastReading?.Temp}
//             BP={LastReading?.BP}
//           />

//             // <Button
//             //     variant="outlined"
//             //     startIcon={<AssessmentIcon style={{ fontSize: 40 }} />}
//             //     className={classes.sideButton}
//             //     disabled={Empty}
//             //     color="primary"
//             //     onClick={() => {
//             //       setOpenGenerateReport(true);
//             //     }}
//             //   >
//             //     Generate Report
//             //   </Button>
//             //   <Button
//             //     variant="outlined"
//             //     startIcon={
//             //       <AssignmentTurnedInIcon style={{ fontSize: 40 }} />
//             //     }
//             //     className={classes.sideButton}
//             //     color="primary"
//             //     onClick={() => {
//             //       setOpenDischarge(true);
//             //     }}
//             //   >
//             //     Discharge
//             //   </Button>
//             //   <Button
//             //     component={Link}
//             //     to={`/viewhistory/${name}&${age}&${address}`}
//             //     variant="outlined"
//             //     disabled={Empty}
//             //     startIcon={<HistoryIcon style={{ fontSize: 40 }} />}
//             //     color="primary"
//             //     className={classes.sideButton}>

//             //     View History
//             //   </Button>

//             //   <Button
//             //     component={Link}
//             //     disabled={Empty}
//             //     to="/livereadings"
//             //     variant="outlined"
//             //     startIcon={<TimelineIcon style={{ fontSize: 40 }} />}
//             //     className={classes.sideButton}
//             //   >
//             //     Live Statistics
//             //   </Button>

//             <Dialog
//                 fullWidth
//             maxWidth="sm"
//             open={openGenerateReport}
//             onClose={() => {
//               setOpenGenerateReport(false);
//             }}
//           >
//             <DialogTitle>Generate Report</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Temperature: 100F
//                   {<br />}
//                   BPM: 85
//                   {<br />}
//                   Blood Pressure: 120/80
//                 </DialogContentText>

//               <DialogActions>
//                 <Button
//                   onClick={() => {
//                     setOpenGenerateReport(false);
//                   }}
//                   color="primary"
//                 >
//                   Download Report
//                   </Button>
//                 <Button
//                   onClick={() => {
//                     setOpenGenerateReport(false);
//                   }}
//                   color="primary"
//                 >
//                   Cancel
//                   </Button>
//               </DialogActions>
//             </DialogContent>
//             </Dialog>

//           <Dialog
//             fullWidth
//             maxWidth="sm"
//             open={openDischarge}
//             onClose={() => {
//               setOpenDischarge(false);
//             }}
//           >
//             <DialogTitle>Discharge Patient</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Are you sure you want to discharge this patient{"?"}
//               </DialogContentText>

//               <DialogActions>
//                 <Button
//                   onClick={dischargePatient}
//                   color="primary"
//                   disabled={visible}
//                 >
//                   {visible ? <CircularProgress /> : "Confirm"}
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     setOpenDischarge(false);
//                   }}
//                   color="primary"
//                   disabled={visible}
//                 >
//                   Cancel
//                 </Button>
//               </DialogActions>
//             </DialogContent>
//           </Dialog>

//           <Dialog
//             maxWidth="md"
//             open={dischargeDialogue}
//             onClose={() => SetDischargeDialogue(false)}
//           >
//             <DialogTitle>Notification</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Patient discharged successfully
//               </DialogContentText>

//               <DialogActions>
//                 <Button onClick={redirect} color="primary">
//                   Close
//                 </Button>
//               </DialogActions>
//             </DialogContent>
//           </Dialog>
//         </div>
//       )}
//   </>
//   );
// };

// export default ViewPatientProfile;
