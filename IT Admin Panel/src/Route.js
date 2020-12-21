import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import Login from './Components/Login';
  import Homepage from './Components/Homepage';
  import Configure from './Components/Configure';
  import Doctors from './Components/Doctors';
  import Add from './Components/Add';
  import ViewPatient from './Components/ViewPatient';
  import DoctorProfile from './Components/DoctorProfile';
  import PatientProfile from './Components/PatientProfile';
  import PastDoctors from './Components/PastDoctors';
  
  import ResetPassword from './Components/ResetPassword';
 
  //import Dashboard from './Components/Dashboard';

// import {TransactionContext, TransactionProvider} from './cartContext';

function RouteConfig() {
  return (
    <div>

      <Router>
        {/* <NavBar/> */}
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/resetpassword" component={ResetPassword}></Route>
          <Route exact path="/home" component={Homepage}></Route>
          <Route exact path="/configure" component={Configure}></Route>
          
          <Route exact path="/doctors" component={Doctors}></Route>
          <Route exact path="/add_device" component={Add}></Route>
          <Route exact path="/doctor_profile" component={DoctorProfile}></Route>
          <Route exact path="/patient_profile" component={PatientProfile}></Route>
          <Route exact path="/ViewPatient/:SEED"  component={ViewPatient}></Route>
          <Route path="/adminprofile" component={PastDoctors}></Route>
         {/**   <Route exact path="/Dashboard" component={Dashboard}></Route> */}
         
          {/* <Route exact path="*" component={NotFound}></Route> */}
        </Switch>

    </Router>


    </div>
  );
}

export default RouteConfig;