import React from 'react';
import logo from './logo.svg';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import RouteConfig from './Route'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Metrophobic',
      'sans-serif',
    ].join(','),
  },});


function App() {
  return (
    <div className="App">
      <RouteConfig />
    </div>
  );
}

export default App;
