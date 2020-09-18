import React from "react";
//import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
//import { Row } from "react-bootstrap";


export const Form = () => {
  return (

    //#757575
      <form style={{backgroundColor:"#EFEFEF", color:"black", border:"solid  green ", width:"30%", marginLeft:"35%", marginTop:"7.5%"}}>
         <h2 >Login</h2>
      
    <div style={{marginLeft:"25%" ,width:"50%", backgroundColor:"#EFEFEF"}}>
                  
          <div  > 
            
             <label style={{padding:"10px"}}><strong>Email</strong> </label>
             <br/><br/>
            
            <input   style={{padding:"10px"}} type="text" placeholder="Enter email"/> 

            
            
          </div>

          <br/>
          <div  >
             
            <label  style={{padding:"10px"}} ><strong>Password</strong> </label>
           <br/><br/> 
            <input  style={{padding:"10px"}} type="password" placeholder="Enter pasword"/> 
           <br/>
            <a href="www.google.com">Forgot Password?</a>

          </div>

        <br/>

        <button style={{backgroundColor:"green" , height:"32px",width:"70px", color:"white" , padding:"2px ",border:"none"}}> Login </button>
        <br/> <br/>

        </div>

      </form>
     
  );
};
