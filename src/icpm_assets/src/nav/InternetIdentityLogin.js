
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';  
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { DelegationIdentity } from "@dfinity/identity";
import LinearProgress from '@mui/material/LinearProgress';

/// ****** CUSTOM IMPORTS 
import {iiProvider} from '../env/IIprovider';
import FormTextField from '../components/FormTextField';

import AppContext from './AppContext';
import DfinityInfinity from './DfinityInfinity';





const InternetIdentityLogin = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    let authClient  = myContext.authClientName;
    let isAuthed  = myContext.isAuthedName;
    let nextExpirationII  = myContext.nextExpirationIIName;

    let history = useHistory();
    let setLoading = props.setLoading ;

    
    
    //alert (theLoginCode);
    

    const [whoAmI, setWhoAmI] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    
    const maxTimeToLive = 0 ;
    let ExpirationInnerText="";
    let theDelegationJSON="";
    let thePrincipal = "";
    let thisExpirationMin = 0 ;


    const getIIStatus = () => {

      console.log ("Start II getStatus");
      
      
      const identity = authClient.getIdentity();
    
      let thePrincipal = identity.getPrincipal();

      // console.log ("getstatusthePrincipal",thePrincipal);

      if (identity instanceof DelegationIdentity) {

        //setWhoAmI("loggedin");
        myContext.createAuthClient();
        
      } else {

        
      }
      
      // console.log ("2thisExpirationMin",thisExpirationMin);
      
      console.log ("End II getStatus");
      
    }// end getIIStatus

    

    const loginII =(e) => {
      setIsLoading(true);
      
      //console.log ("Start II login");
      if (maxTimeToLive > 0 ) {
        authClient.login({
          identityProvider: iiProvider,
          maxTimeToLive: BigInt(maxTimeToLive),
          onSuccess: getIIStatus
        })
      } else {
        authClient.login({
          identityProvider: iiProvider,
          onSuccess: getIIStatus
        })
      } // end if maxTimeToLive


      //console.log ("End II login");



    }// end onchange

    
    const logoutII  = (e) => {

  
      authClient.logout();
      setWhoAmI("logged out");
      thisExpirationMin = myContext.checkIIStatus();
    
    }
    
      if (isLoading ) {

        return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 2, width: 150 }}>
            <Paper elevation={6}
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
            <DfinityInfinity onClickFunc={loginII}/>
            
          </Paper>
            <LinearProgress sx={{mt:2}}/>
        </Container>
        );


      } else {
        return (

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 150 }}>
          <Tooltip title="Login with Internet Identity" enterNextDelay={300}>
              <Paper elevation={6}
                sx={{
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
              <DfinityInfinity onClickFunc={loginII}/>
              
            {/*    
            <Typography variant="body2" color="text.secondary" align="center">
            {whoAmI.toString()}
            </Typography>
            */}
              
            </Paper>
              </Tooltip>
          </Container>

        );
    } // end if loading
  }// end InternetIdentityLogin

  export default InternetIdentityLogin;
