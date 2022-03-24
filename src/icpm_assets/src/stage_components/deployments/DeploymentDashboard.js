import React, { useState,useContext, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';
import CodeIcon from '@mui/icons-material/Code';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";


import AppContext from '../../nav/AppContext';
import PleaseWait from '../../nav/PleaseWait';

import Title from '../../components/Title';
import FullScreenBackdrop from '../../components/FullScreenBackdrop';

import DeploymentCard from './DeploymentCard';
import DeploymentTimeline from './DeploymentTimeline';

import ListEvents from '../events/ListEvents';
import ListCanisters from '../canisters/ListCanisters';
import WorkerActiveConnect from '../workers/WorkerActiveConnect';
import WorkerCard from '../workers/WorkerCard';

import JobCard from '../jobs/JobCard';
import RefButton from '../../components/RefButton';
import GetImage from '../../components/GetImage';
import { display } from '@mui/system';


const DeploymentDashboard = (props) => {
  // now we get the global context 
  const myContext = useContext(AppContext);  
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  const [completeDeployment, setCompleteDeployment] = useState([]);
  var [reloadToggle, setReloadToggle] = useState(true);

  let activeDeploymentId = 0;
  let jumpId = myContext.jumpIdName;

  if (props.activeDeployment) {
    activeDeploymentId = props.activeDeployment.id ;
  }
  if (jumpId > 0 ) {
    
    activeDeploymentId = jumpId;

  }

  console.log ("activeDeploymentId = " + activeDeploymentId);
    
  const fetchCompleteDeployment = async ()  =>  {

    // going to creat call to canister
    console.log ("1- fetchCompleteDeployment - before await");
    
    
    const fetchData = await icpmDapp.getCompleteDeploymentMain(apiToken,activeDeploymentId)
    
    console.log ("2- fetchCompleteDeployment - after await");
    console.log (fetchData);
    console.log ("3- fetchCompleteDeployment - after logging return");
    // set the state which should redraw the component

    setCompleteDeployment (fetchData);
    console.log  ("THE LENGTH  = " + fetchData.msg);
    console.log ("4- fetchCompleteDeployment - after setstateListData");

    
  } // end fetchCompleteDeployment
  

  const reloadDash =  () => {
    //setReloadToggle(false);
    fetchCompleteDeployment();

  } // end handle click
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
    
  const reloadTimeline =  async () => {
    await sleep(5000);
    console.log ("time is up");
    fetchCompleteDeployment();

  }
  
if (completeDeployment.responseStatus && completeDeployment.deploymentObject.id == activeDeploymentId) {
  
  // now we sort events based on local time
  var thisEventsArray = [...completeDeployment.eventObjects] ;
  var logEventsOnly = thisEventsArray.filter(e => e.eventType == "Log")
  var workerButtons = [];

  if (completeDeployment.jobObject.workerId > 0 ) { 
    // first we need to see if this deployment is the last one this worker deployed
    // if not we do not want to display links as that might be confusing
    if (completeDeployment.workerObject.lastDeploymentId != completeDeployment.deploymentObject.id  ) { 

      workerButtons = [

        <Grid key={1} item xs={12} >
        <Paper elevation={3} sx={{mb:2, p:2,
          border: "1px solid #9f9f9f",
          borderRadius:2,
          backgroundColor:"primary.superlight"}}>
        The last deployment (id: {completeDeployment.workerObject.lastDeploymentId.toString()}) on this worker does not match this deployment (id: {completeDeployment.deploymentObject.id.toString()}) ... go here to see the active deployment on this worker:
        <RefButton displayLocation="deployment"  whereTo="deployment" refId={completeDeployment.workerObject.lastDeploymentId} />

        </Paper>
        </Grid>

      ]

    } else { 
      // now we calculate how long ago the worker touched
      var today = new Date();
      var lastTouchValueMilliseconds = Number(completeDeployment.workerObject.lastTouch)/1000000;
      console.log ("lastTouchValueMilliseconds: "+ lastTouchValueMilliseconds.toString());
      var lastTouchDate = new Date(lastTouchValueMilliseconds);
      var diffMs = (today - lastTouchDate);
      console.log ("diffMs: "+ diffMs.toString());
      var lastTouchSecondsValue = Math.round(diffMs/1000);
      console.log ("lastTouchSecondsValue: "+ lastTouchSecondsValue.toString());
  if (lastTouchSecondsValue < 300 ) {
    workerButtons = [
      <Grid key={1} item xs={12} >
      <Box sx={{ml:1, mr:1, mb:2}}>
      <WorkerActiveConnect worker={completeDeployment.workerObject} displayLocation="deploymentDashboard"/>
      </Box>
      </Grid>
    ];
  } else {

    workerButtons = [
      <Grid key={1} item xs={12} >
      <ThemeProvider theme={myContext.workersThemeName}>
      <Paper key={1} elevation={2} sx={{bgcolor:"primary.superlight", p:2, m:1, border:"1px solid #9f9f9f"}} >
      Worker has not touched in a while and may be defunct. Visit the worker section for more options.
      </Paper>
      </ThemeProvider>
      </Grid>
    ];
  }// end if it has touched in < 2 min (120 secs)
  } // end if this is the last deployment on this worker

}// end if we have a worker

//console.log ("AFTER sortedEventObjectsByLocalTime:", sortedEventObjectsByLocalTime)
let theWorker;

if (completeDeployment.workerObject.id > 0 ) {
   theWorker = [
    <WorkerCard key={1} worker={completeDeployment.workerObject} displayLocation="deployment"/>
  ]

}
var displayICDeployment = [];

  if (completeDeployment.deploymentObject.identityId > 0 ) { 

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
      <Typography variant="subtitle1" align="left" sx={{ml:1, float:'right',pl:1,pr:1,}}>
      Internet Computer Deployment
      </Typography>
      
        </Paper>
    ] ;


  } // end if ic deployment


  return (
      <>
       
        <Title> 


          <Grid container>
            <Grid item xs={6}>
              <Box key={1} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float: 'center'}} >
                <AltRouteIcon sx={{mr:1}}/>Deployment Dashboard: {activeDeploymentId.toString()}

              </Box>
            </Grid>
            <Grid item xs={6} sx={{justifyContent:"right"}}>
              <Box key={1} sx={{
                  display: 'flex',
                  alignItems: 'right',
                  flexWrap: 'wrap',
                  float: 'right'}} >
              {displayICDeployment}    
              </Box>
            </Grid>
          </Grid>
        </Title>
        {/*
        <FullScreenBackdrop >Hello</FullScreenBackdrop>
        */}
        
        {/*
        <Button key={1} onClick={() => { reloadDash()}}  variant="outlined" sx={{ml:1, mr:1, mb:2 }}>
        <AltRouteIcon sx={{mr:1}}/>
        Reload Deployment Dashboard
        </Button>
        */}
        <DeploymentTimeline reloadTimeline={reloadTimeline} completeDeployment={completeDeployment} />
        
        <ThemeProvider theme={myContext.workersThemeName}>
        {workerButtons}
        </ThemeProvider>
        <DeploymentCard  completeDeployment={completeDeployment} displayLocation="dashboard"/>

        <Grid container spacing={2}>

        <Grid item xs={12} md={12} >
              <Box sx={{bgcolor:cyan[50],
              borderRadius:2,
              border: '1px solid #9f9f9f',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              mt:0,
              mb:0,
              p:1}} >

                  <Grid container>
                    <Grid item xs={6}>
                      <Box key={1} sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          float: 'center'}} >
                        <CodeIcon sx={{mr:1}}/> {completeDeployment.canisterObjects.length > 0 ? "Deployed Canisters" : "Waiting for Canisters"}     

                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{justifyContent:"right"}}>
                      <Box key={1} sx={{
                          display: 'flex',
                          alignItems: 'right',
                          flexWrap: 'wrap',
                          float: 'right'}} >
                      {displayICDeployment}    
                      </Box>
                    </Grid>
                  </Grid>
                  
                  
                
                
              <ListCanisters listOfCanisters={completeDeployment.canisterObjects} displayLocation="deployment" deploymentId={completeDeployment.deploymentObject.id}/>
              </Box>
            </Grid>
        <ThemeProvider theme={myContext.jobsThemeName}>
          <Grid item xs={12} md={6} >
            
            <Box sx={{bgcolor:"primary.superlight",
              borderRadius:2,
              border: '1px solid #9f9f9f',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              p:1}} >

              <Box key={1} sx={{bgcolor:"primary.superlight",
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float: 'center'}} >
                <ConstructionIcon sx={{mr:1}}/>Job: {completeDeployment.jobObject.jobType} 
              </Box>
            
            <JobCard job={completeDeployment.jobObject} displayLocation="deployment"/>
            </Box>
          </Grid>
        </ThemeProvider>    
        <ThemeProvider theme={myContext.workersThemeName}>
          <Grid item xs={12} md={6} >
            <Box sx={{bgcolor:"primary.superlight",
              borderRadius:2,
              border: '1px solid #9f9f9f',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              p:1}} >

              <Box key={1} sx={{bgcolor:"primary.superlight",
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float: 'center'}} >
                <ConstructionIcon sx={{mr:1}}/> {completeDeployment.workerObject.name ?completeDeployment.workerObject.name : "No Worker Assigned"} 
              </Box>
            
            
              {theWorker}
            </Box>
          </Grid>          
        </ThemeProvider>    

            <Grid item xs={12} md={12} >
              <Box sx={{bgcolor:cyan[50],
              borderRadius:2,
              border: '1px solid #9f9f9f',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              mt:0,
              mb:2,
              p:1}} >
              <ListEvents listOfEvents={logEventsOnly} displayLocation="dashboard"/>
              </Box>
            </Grid>

        </Grid>

          
          

      </>
      
    )

} else {
  fetchCompleteDeployment ();

  return (
    <>
      <Title>
      <AltRouteIcon sx={{mr:1}}/>Deployment Dashboard: {activeDeploymentId.toString()}
      </Title>
        
        
      <PleaseWait waitType="query"><AltRouteIcon sx={{mr:1}}/>Loading Deployment</PleaseWait>
        
        

    </>
    
  )

} // end if 

} // end of DeploymentDashboard

export default DeploymentDashboard;
