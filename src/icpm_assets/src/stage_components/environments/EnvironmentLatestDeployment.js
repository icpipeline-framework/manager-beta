import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import PleaseWait from '../../nav/PleaseWait';
import 'regenerator-runtime/runtime';
import { green, teal } from '@mui/material/colors';

/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import DeploymentCardListItem from '../deployments/DeploymentCardListItem';




const EnvironmentLatestDeployment = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;

    const activeEnvironment = props.activeEnvironment;
    console.log ("EnvironmentCard - Inside my EnvironmentCard");

    const [completeEnvironment, setCompleteEnvironment] = useState([]);

    // now we need to see if there is a worker and a project ... if so get the worker and get the project

    const fetchCompleteEnvironment = async (environmentId)  =>  {

      // going to creat call to canister
      console.log ("1- fetchCompleteEnvironment - before await");
      
      
      const fetchData = await icpmDapp.getCompleteEnvironmentMain(apiToken,environmentId).catch(e => { return "ICPM Error: " + e })
      //TODO check for error
      
      console.log ("2- fetchCompleteEnvironment - after await");
      console.log (fetchData);
      console.log ("3- fetchCompleteEnvironment - after logging return");
      // set the state which should redraw the component
  
      setCompleteEnvironment (fetchData);
      console.log  ("THE LENGTH  = " + fetchData.msg);
      console.log ("4- fetchCompleteEnvironment - after setstateListData");

      
    } // end fetchCompleteEnvironment

    if (completeEnvironment.responseStatus ) {
          

      if (completeEnvironment.latestDeploymentObject.id > 0 ) { 

        return (

          <Box  component="span" sx={{m:0, p:1,
          bgcolor: "primary.superlight", 
          border: '1px solid #9f9f9f',
          display:"flex", 
          justifyContent: "center", 
          alignItems: "", 
          borderRadius:2,
          mr:1,
          ml:1, 
          p:2}}> 

          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
            <Typography  gutterBottom sx={{ color: "#000000",  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float: 'center'}} >
            <AltRouteIcon  sx={{mr:1}} /> Last Deployment:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
            <DeploymentCardListItem deployment={completeEnvironment.latestDeploymentObject} short={true}/>
            </Grid>
          </Grid>
          </Box>

        )// end return
      } else {
        return (
        
          <Box  component="span" sx={{m:0, p:1,
            bgcolor: "primary.superlight", 
            display:"flex", 
            justifyContent: "center", 
            border: '1px solid #9f9f9f',
            alignItems: "", 
            borderRadius:2,
            mr:1,
            ml:1, 
            p:2}}> 

            <Typography gutterBottom align="left" sx={{ color: "#000000"}} >
              There have been no deployments in this Environment as of yet.
            </Typography>
            </Box>
        );

      } // end if there was a deploymnet 
    } else { 
      fetchCompleteEnvironment (activeEnvironment.id);

    
      return (
        <>
        
        <PleaseWait><SettingsSystemDaydreamIcon sx={{mr:1}}/>Loading Environment</PleaseWait>

        </>
      )// end return
    } // end if there is a project or worker still to do 
} // end function EnvironmentLatestDeployment



export default EnvironmentLatestDeployment;
