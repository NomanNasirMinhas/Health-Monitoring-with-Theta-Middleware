import React from 'react';
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

import db from '../Config';


function AdminProfile(){
    var dummy=["wahaj"];
           // const data= firebase.firestone().collection("profile");
           //const data= firebase.database().collection("profile"); 
           useEffect(() => {
               function getData(){
                   console.log("in fucntion");
           db.collection("profile").get().then(querySnapshot =>{
               const data= querySnapshot.docs.map(doc=> doc.data());
               console.log("data=",data);
           });

        };
        getData();  
    },[]);

           console.log("DATA:",dummy);

           return(<div>
               <Navbar/>
               OMG FIREBASE LAG GYE 

           </div>)
}

export default AdminProfile;