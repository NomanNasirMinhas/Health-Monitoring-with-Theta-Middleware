import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./views/Login/Login"
import CreateAccount from "./views/CreateAccount/CreateAccount"
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import HomePage from './views/HomePage/HomePage';
import ViewHistory from './views/ViewHistory/ViewHistory'
import ViewPatientProfile from './views/ViewPatientProfile/ViewPatientProfile'
import YourProfile from './views/YourProfile/YourProfile'
import LiveReadings from './views/LiveReadings/LiveReadings';
import AddPatient from './views/AddPatient/AddPatient'
import './App.css'

// const authentication = {
//   isLoggedIn: false,
//   onAuthentication() {
//     this.isLoggedIn = true
//   },
//   getLoggedInStatus() {
//     return this.isLoggedIn
//   }
// }

// function SecuredRoute(props) {
//   return (
//     <Route
//       path={props.path}
//       render={data => loggedInStatus ?
//         (<props.component {...data} />) :
//         (<Redirect to={{ pathname: '/' }} />)
//       } />
//   )
// }
ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/"
                exact component={Login} />
            <Route path="/forgotpassword"
                component={ForgotPassword} />
            <Route path="/createaccount"
                component={CreateAccount} />
            <Route path="/dashboard"
                component={HomePage} />
            <Route path="/viewpatientprofile/:address"
                component={ViewPatientProfile} />
            <Route path="/yourprofile"
                component={YourProfile} />
            <Route path="/livereadings"
                component={LiveReadings} />
            <Route path="/addpatient"
                component={AddPatient} />
            <Route path="/viewhistory/:name&:age&:address"
                component={ViewHistory} />
            <Route path="*"
                component={() => "404 NOT FOUND"} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();