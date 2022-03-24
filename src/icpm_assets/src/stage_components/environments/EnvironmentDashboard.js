import React, { useState,useContext, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import CodeIcon from '@mui/icons-material/Code';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 



import AppContext from '../../nav/AppContext';
import PleaseWait from '../../nav/PleaseWait';

import Title from '../../components/Title';
import EnvironmentCardListItem from './EnvironmentCardListItem';
import EnvironmentDeployNow from './EnvironmentDeployNow';
import EnvironmentLatestDeployment from './EnvironmentLatestDeployment';
import WorkerActiveConnect from '../workers/WorkerActiveConnect';
import GetImage from '../../components/GetImage';
import ListCanisters from '../canisters/ListCanisters';


const EnvironmentDashboard = (props) => {
  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  
  let activeEnvironment = myContext.activeEnvironmentName;

  const [completeEnvironment, setCompleteEnvironment] = useState([]);

  let thisEnvironmentId = 0;
  let jumpId = myContext.jumpIdName;

  if (props.activeEnvironment) {
    thisEnvironmentId = props.activeEnvironment.id ;
    activeEnvironment = props.activeEnvironment ;
  } else if (jumpId > 0 ) {
    
    thisEnvironmentId = jumpId;

  } else {
    thisEnvironmentId = activeEnvironment.id;

  }


  console.log ("thisEnvironmentId = " + thisEnvironmentId);
    
  const fetchCompleteEnvironment = async ()  =>  {

    // going to creat call to canister
    console.log ("1- fetchCompleteEnvironment - before await");
    
    
    const fetchData = await icpmDapp.getCompleteEnvironmentMain(apiToken,thisEnvironmentId)
    
    console.log ("2- fetchCompleteEnvironment - after await");
    console.log (fetchData);
    console.log ("3- fetchCompleteEnvironment - after logging return");
    // set the state which should redraw the component

    setCompleteEnvironment (fetchData);
    console.log  ("THE LENGTH  = " + fetchData.msg);
    console.log ("4- fetchCompleteEnvironment - after setstateListData");

    
  } // end fetchCompleteEnvironment
  
  
const manageClick =  () => {
    props.changeStateAgent("manage");
} // end handle click

const backToList = () => {
    props.changeStateAgent ("load");
}// end handleCancel 

  
if (completeEnvironment.responseStatus ) {
  //TODO check status 

  let activeEnvironment = completeEnvironment.environmentObject ;
  var workerButtons = [];


  // now we need to determine if the environment is "active" based on the last touch from the worker
  if (completeEnvironment.workerObject.id > 0 ) {
      // now we calculate how long ago the worker touched
      var today = new Date();
      var lastTouchValueMilliseconds = Number(completeEnvironment.workerObject.lastTouch)/1000000;
      console.log ("lastTouchValueMilliseconds: "+ lastTouchValueMilliseconds.toString());
      var lastTouchDate = new Date(lastTouchValueMilliseconds);
      var diffMs = (today - lastTouchDate);
      console.log ("diffMs: "+ diffMs.toString());
      var lastTouchSecondsValue = Math.round(diffMs/1000);
      console.log ("lastTouchSecondsValue: "+ lastTouchSecondsValue.toString());
      if (lastTouchSecondsValue < 360 ) {
        var workerButtons = [

          <Grid key={1} item xs={12} >
            <Box sx={{ml:1,mr:1, mb:1,p:0}}>
            <WorkerActiveConnect worker={completeEnvironment.workerObject} displayLocation="environmentDashboard"/>
            </Box>
          </Grid>
        ];
      } else {
        var workerButtons = [

          <Grid key={1} item xs={12} >
            
          <ThemeProvider theme={myContext.workersThemeName}>
          <Paper key={1} elevation={2} sx={{bgcolor:"primary.superlight", p:2, m:1, border:"1px solid #9f9f9f"}} >
            
          Awaiting Worker ... been a while since its last uplink ...
          </Paper>
          </ThemeProvider>   
          </Grid>   
          
        ]

      }// end if it has touched in < 2 min (120 secs)


  }// end if we have a worker
  
  var displayIiEnabled = [];
  if (completeEnvironment.workerObject.iiEnabled == "Y" ) {

    displayIiEnabled = [
      <Paper key={1} elevation={4} sx={{bgcolor:"#ffffff", 
      border: '1px solid #9f9f9f',
      mt:0, 
      borderRadius:2,
      height:28
      }}>  
    <Typography variant="subtitle1" align="left" sx={{ml:1, float:'left',}}>
    Internet Identity Enabled 
    </Typography>
    

      <Box sx={{
            p: 0,
            width:40,
            margin:"auto",
            float:'right',
            height:20,
            borderRadius:5,
            m:0,
          }}
          >
        <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
      </Box>
    </Paper>
    ];
  } // end if we have an iiEnabledWorker

  var displayICDeployment = [];

  if (completeEnvironment.environmentObject.identityId > 0 ) { 

    displayICDeployment = [

      <Paper key={1} elevation={4} sx={{bgcolor:"#ffffff", 
      border: '1px solid #9f9f9f',
      borderRadius:2,
      height:30,
      float:"right",
      margin:"auto",
      p:0,
      mb:1,
      }}>  

      <Box sx={{
            p: 0,
            width:40,
            margin:"auto",
            float:'left',
            height:20,
            borderRadius:5,
            m:0,
          }}
          >
        <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
      </Box>
      <Typography variant="subtitle1" align="left" sx={{ml:0, float:'right',pl:1,pr:1,}}>
      IC
      </Typography>
      
        </Paper>
    ] ;


  } // end if ic deployment

  var displayCanisterProfiles  = [
    <Typography key={1} variant="body2" >
      NOTE: Canister Profiles are only relevant in STAGE and PROD environments
    </Typography>
  ] ;

  if ((completeEnvironment.environmentObject.environmentType == "STAGE" || completeEnvironment.environmentObject.environmentType == "PROD"  ) ) {


    if (completeEnvironment.environmentObject.projectId > 0 ) {

      displayCanisterProfiles  = [
            
        <ListCanisters key={1} listOfCanisters={completeEnvironment.canisterProfiles} displayLocation="environmentProfiles" environmentId={completeEnvironment.environmentObject.id} fetchCompleteEnvironment={fetchCompleteEnvironment} completeEnvironment={completeEnvironment}/>
        
        ];
    } else {

      var displayCanisterProfiles  = [
        <Typography key={1} variant="body2" >
          Attached a project to this environment to create Canister Profiles
        </Typography>
      ] ;
    } // end if there is a project
  
  } //end iff stage or prod


  return (
      <>
       
        <Title>
        

            <Grid container justify="space-between">
              <Grid item style={{ flex: 1 }}>
                
                <Box  sx={{ display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      float: 'center'}} >
                  <SettingsSystemDaydreamIcon sx={{mr:1}}/>Environment Dashboard:  {activeEnvironment.name}
                </Box>
              </Grid>

              <Grid item >
                {displayIiEnabled}
                {displayICDeployment}
              </Grid>
            </Grid>
        </Title>
          <Button onClick={() => { backToList()}}  variant="outlined" sx={{ml:1, mr:1 }}>
          <SettingsSystemDaydreamIcon sx={{mr:1}}/>List Environments
          </Button>
          
          <Grid container spacing={1} sx={{mt:1}}>
            {/*IF there is an active worker */}
            {workerButtons}
            {/* Environment Card */}
            <Grid item xs={12} sm={6} md={8} >
            
          
                    
              <EnvironmentCardListItem key={activeEnvironment.id.toString()}  
                changeStateAgent={manageClick} 
                environment={activeEnvironment} 
                displayLocation="dashboard" 
                changeStateAgent={props.changeStateAgent}/>
            
                
            </Grid> 
            <Grid item xs={12} sm={6} md={4} >
              <Grid container spacing={0}>

              <ThemeProvider theme={myContext.deploymentsThemeName}>
                <Grid item xs={12}  >
                    

                  <EnvironmentDeployNow activeEnvironment={activeEnvironment} />
                
                </Grid>
                <Grid item xs={12}  >
                  <EnvironmentLatestDeployment activeEnvironment={activeEnvironment} />
                
                </Grid>
                <Grid item xs={12}  > 
                
                  <Box key={1} sx={{
                    borderRadius:2,
                    border: '1px solid #9f9f9f',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    float: 'center',
                    m:1,
                    mt:2,
                    p:1}} >

                        <Grid container>
                          <Grid item  sx={{display: 'flex'}}>
                            <Box key={1} sx={{
                                flexGrow:1,
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                float: 'center'}} >
                              <CodeIcon sx={{mr:1}}/> {completeEnvironment.canisterProfiles.length > 0 ? "Canister Profiles" : ""}     

                            </Box>
                          </Grid>
                        </Grid>
                    {displayCanisterProfiles}
                </Box>
                
                </Grid>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Grid>
          
          

      </>
      
    ) ;

} else {
  fetchCompleteEnvironment ();

  return (
    <>
      <Title>
      <SettingsSystemDaydreamIcon sx={{mr:1}}/>Environment Dashboard
      </Title>
        
        
      <PleaseWait waitType="query"><SettingsSystemDaydreamIcon sx={{mr:1}}/>Loading Environment</PleaseWait>
        
        

    </>
    
  )

} // end if 

} // end of EnvironmentDashboard

export default EnvironmentDashboard;
