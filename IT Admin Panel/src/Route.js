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

// import {TransactionContext, TransactionProvider} from './cartContext';

function RouteConfig() {
  return (
    <div>

      <Router>
        {/* <NavBar/> */}
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/home" component={Homepage}></Route>
          <Route exact path="/configure" component={Configure}></Route>
          <Route exact path="/doctors" component={Doctors}></Route>
          {/* <Route exact path="*" component={NotFound}></Route> */}
        </Switch>

    </Router>


    </div>
  );
}

export default RouteConfig;