import React from "react";
//import logo from './logo.svg';

//import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from "react-bootstrap";
import "./App.css";
import { Header } from "./components/Header";
import {Form} from './components/Form';
function App() {
  return (
    <div className="App">
      
       <div className="head">
      
         <Header />
      
      <Form/>

      </div>
  
    </div>
  );
}

export default App;
