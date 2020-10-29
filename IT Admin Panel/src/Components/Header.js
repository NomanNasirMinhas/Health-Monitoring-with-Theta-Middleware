import React from 'react';
import {Card, CardActions, CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      
      textAlign: 'center',
      backgroundColor: '#2471A3',
      color: 'white',
      height: '110px'
    },

    text: {
      fontSize: '60px',
    
    }
});

export const Header =() =>{
    const classes = useStyles();
    
    return(
        <Card className={classes.root} variant="outlined">
        <CardContent className={classes.text}>
       
         <strong>Admin Portal</strong>
        
        </CardContent>
         </Card>


        );

}
export default Header;