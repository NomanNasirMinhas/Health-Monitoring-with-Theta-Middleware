import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css'
import AppRouter from './AppRouter';


ReactDOM.render(<AppRouter />, document.getElementById('root')
);
serviceWorker.unregister();