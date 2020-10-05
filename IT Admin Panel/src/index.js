import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import Configure from './Components/Configure';
import Doctors from './Components/Doctors';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Doctors/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
