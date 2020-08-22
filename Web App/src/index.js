import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from "./views/Login/Login"
import CreateAccount from "./views/CreateAccount/CreateAccount"
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import loggedInStatus from './views/Login/Login'
import HomePage from './views/HomePage/HomePage';
// import Header from './components/Header/Header.js'
import ViewPatientProfile from './views/ViewPatientProfile/ViewPatientProfile.js'
import YourProfile from './views/YourProfile/YourProfile'
import LiveReadings from './views/LiveReadings/LiveReadings';
import AddPatient from './views/AddPatient/AddPatient'

// const authentication = {
//   isLoggedIn: false,
//   onAuthentication() {
//     this.isLoggedIn = true
//   },
//   getLoggedInStatus() {
//     return this.isLoggedIn
//   }
// }

function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={data => loggedInStatus ?
        (<props.component {...data} />) :
        (<Redirect to={{ pathname: '/' }} />)
      } />
  )
}
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/createaccount" component={CreateAccount} />
      <SecuredRoute path="/dashboard" component={HomePage}/>
      <Route path="/viewpatientprofile" component={ViewPatientProfile}/>
      <Route path="/yourprofile" component={YourProfile}/>
      <Route path="/livereadings" component={LiveReadings}/>
      <Route path="/addpatient" component={AddPatient}/>

      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
