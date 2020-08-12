import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header.js'
import ViewPatientProfile from './views/ViewPatientProfile/ViewPatientProfile.js'
import HomePage from "./views/HomePage/HomePage"
import Login from "./views/Login/Login"
import YourProfile from './views/YourProfile/YourProfile'
import CreateAccount from "./views/CreateAccount/CreateAccount"
import LiveReadings from './views/LiveReadings/LiveReadings';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import AddPatient from './views/AddPatient/AddPatient'
ReactDOM.render(
  <Router>
    <Header />
      {/* <ViewPatientProfile/>
      <Login/> */}
    <Switch>
      <Route path="/" component={AddPatient} />
      {/* <Route path="/myprofile" component={MyProfile} /> */}
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
