
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/// ****** CUSTOM IMPORTS 

import AppContext from './AppContext';


const PiplineManagerNavTitle = (props) => {

  const myContext = useContext(AppContext);

  const handleClick =  () => {
        
    console.log ("PiplineManagerNavTitle-handleClick - start handleClick");


    console.log ("PiplineManagerNavTitle-handleClick - end handleClick");

  } // end handle click


    return (
    <> 
     
     
     <Box  component="span" sx={{ p: 1, mb:0, mt:0, mr:0
       , border: '0px solid #ffffff', borderRadius:2,
       bgcolor: 'primary',
       fontWeight: 'bold',
       }}>
         <Grid container>
           <Grid item xs={12}>
             <Typography align="center" sx={{fontWeight: 'bold',p:0,pt:2, m:0, lineHeight:.7}} component="h1" variant="h6">
               ICPM :
             </Typography>
           </Grid>
           <Grid item xs={12}>
             <Typography align="center" sx={{fontSize:"0.5em",p:0, m:0}} variant="subtitle2">
               (beta)
             </Typography>
           </Grid>
         </Grid>
     </Box> 


    <Box  sx={{ p: 0, pr:1,pl:1, ml:1, mr:1, mb:0, mt:0,
      borderBottomStyle: 'solid',
      borderBottomSize: '4px', 
      borderBottomColor: 'secondary', 
      borderRadius:0,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      float: 'center',
      bgcolor: 'secondary', }}>
        
      {props.children}
    </Box>

    </>
    );
  }// end PiplineManagerNavTitle

  export default PiplineManagerNavTitle ;
  