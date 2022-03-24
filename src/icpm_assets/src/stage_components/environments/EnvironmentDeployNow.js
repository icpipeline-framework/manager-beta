import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { green, teal } from '@mui/material/colors';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import DeploymentCardListItem from '../deployments/DeploymentCardListItem';
import PleaseWait from '../../nav/PleaseWait';
import { TextClass } from '@dfinity/candid/lib/cjs/idl';


const EnvironmentDeployNow = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeEnvironment = props.activeEnvironment;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("EnvironmentDeployment-activeEnvironment.id = " + activeEnvironment.id);
    
    const backToList = () => {
        props.changeStateAgent ("list");
    }// end handleCancel 


  return (
      <>




        <DeployNow activeEnvironment={activeEnvironment} icpmDapp={icpmDapp} apiToken={apiToken} />
        

      </>
      
    )
} // end of EnvironmentDeployment

export default EnvironmentDeployNow;




const DeployNow = (props) => {
  // now we need to get the projects
  
  
  // we are going to get a list of projects
  const icpmDapp = props.icpmDapp;
  const apiToken = props.apiToken;

  
  const [clickedDeploy, setClickedDeploy] = useState(false);
  const [loadedDeployment, setLoadedDeployment] = useState(false);
  const [createDeploymentResponse, setCreateDeploymentResponse] = useState([]);
  

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchCreateDeployment = async ()  =>  {

        
      // going to creat call to canister
      console.log ("1- fetchCreateDeployment - before await");
      await sleep(500);
      const fetchData = await icpmDapp.createDeploymentMain(apiToken, props.activeEnvironment)
      
      console.log ("2- fetchCreateDeployment - after await");
      console.log (fetchData);
      console.log ("3- fetchCreateDeployment - after logging return");
      // set the appContext which should redraw the component

      //setWhereTo ("list");
      setLoadedDeployment (true);
      setCreateDeploymentResponse(fetchData);
      console.log ("4- fetchCreateDeployment - after setstateListData");
      
      
  } // end fetchCreateDeployment

    const manageClick =  () => {
        fetchCreateDeployment ();
        setClickedDeploy (true);

    } // end handle click


    if (!loadedDeployment && !clickedDeploy) {
        if (props.activeEnvironment.workerId >  0 ) { 
                return (
                    <Box  component="span" sx={{m:0, p:1,
                        bgcolor: "primary.superlight", 
                        border: '1px solid #9f9f9f',
                        display:"flex", 
                        justifyContent: "center", 
                        alignItems: "", 
                        borderRadius:2,
                        p:2, 
                        mr:1,
                        ml:1, 
                        mb:2}}> 

                            <Button onClick={() => { manageClick()}}  variant="contained" sx={{ width:"100%"}}>
                            <AltRouteIcon sx={{mr:1}}/>Deploy Now
                            </Button>

                    </Box>
                )// end return

            } else {

                return (
                    
                    <Box  component="span" sx={{m:0, p:1,
                        bgcolor: "primary.superlight", 
                        border: '1px solid #9f9f9f',
                        display:"flex", 
                        justifyContent: "center", 
                        alignItems: "", 
                        borderRadius:2,
                        p:2, 
                        mr:1,
                        ml:1, 
                        mb:2}}> 
                        <Grid container >
                            <Grid item xs={12} >

                            <Button onClick={() => { manageClick()}} disabled={true} variant="contained" sx={{ width:"100%"}}>
                            <AltRouteIcon sx={{mr:1}}/>Deploy Now
                            </Button>

                            </Grid>
                            <Grid item xs={12} >
                            <Typography variant="subtitle2" >
                            You can create a Deployment once a Worker has registered.

                            </Typography>
                            </Grid>
                        </Grid>


                        
                    </Box>

                            

                )// end return
                

            } // end if there is a work assigned 

        } else if (!loadedDeployment && clickedDeploy) {
        
        return (
            
            <Box  component="span" sx={{m:0, p:1,
                bgcolor: "#FFFFFF", 
                border: '1px solid #9f9f9f',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2,
                p:2, 
                mr:1,
                ml:1, 
                mb:2}}> 
                
                <PleaseWait><AltRouteIcon sx={{mr:1}}/> Creating ...</PleaseWait>

            </Box>
        )// end return
    } else {

        if (createDeploymentResponse.msg != "" ) {


            return (
                <>
    
                
                <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                    backgroundColor: "primary.superlight", 
                    display:"flex", 
                    justifyContent: "center", 
                    alignItems: "", 
                    borderRadius:2,
                    mr:1,ml:1, 
                    mb:3,
                    pt:2}}> 
                    {createDeploymentResponse.msg}
                </Box>
                </>
            ) // end return
        } else {


        return (

            <Box  component="span" sx={{m:0, p:1,
                backgroundColor: "primary.superlight",
                border: '1px solid #9f9f9f',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2,
                p:2, 
                mb:2}}> 

                <Grid container sx={{ color: "#000000", backgroundColor:"primary.superlight"}}>
                    <Grid item xs={12} sm={12} lg={12}>
                    <Typography  gutterBottom >
                    <AltRouteIcon sx={{mr:1}}/>Deployment Initiated:
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                    <DeploymentCardListItem deployment={createDeploymentResponse.deploymentObject} short={true} />
                    </Grid>
                </Grid>
                
            </Box>
        ) // end return
        }; // end if there was a msg
    }// end if we loaded the canister data yet
} // end ProjectListForm


