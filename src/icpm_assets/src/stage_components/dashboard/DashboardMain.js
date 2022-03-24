import React, { useState,useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


import BarChartIcon from '@mui/icons-material/BarChart';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ThemeProvider } from '@mui/material/styles';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";


import AppContext from '../../nav/AppContext';
import PleaseWait from '../../nav/PleaseWait';
import Title from '../../components/Title';
import GetImage from '../../components/GetImage';

import Copyright from '../../nav/Copyright';
import { GettingStartedStep1,GettingStartedStep2,GettingStartedStep3,GettingStartedStep4 } from '../help/GettingStarted';
import { WhatIsTheICPM } from '../help/FAQ';


const DashboardMain = (props) => {
  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  const [dashboardStats, setDashboardStats] = useState([]);

  let activeDeploymentId = 0;
  let jumpId = myContext.jumpIdName;

  if (props.activeDeployment) {
    activeDeploymentId = props.activeDeployment.id ;
  }
  if (jumpId > 0 ) {
    
    activeDeploymentId = jumpId;

  }
  var stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  }


    
  const fetchDashboardStats = async ()  =>  {

    // going to creat call to canister
    console.log ("1- fetchDashboardStats - before await");
    
    var theError = "";

    const fetchData = await icpmDapp.getCompleteDashboardStats(apiToken).catch(e => { theError = e })
    
    console.log ("2- fetchDashboardStats - after await");

    console.log (fetchData);
    function isString(value) {
      return typeof value === 'string' || value instanceof String;
    }
    if (theError ) {
    

        console.log (fetchData);
        myContext.displayError("" +theError);
        
      } else {
            
        console.log ("3- fetchDashboardStats - after logging return");
        // set the state which should redraw the component

        setDashboardStats (fetchData);
        console.log  ("THE LENGTH  = " + fetchData.msg);
        console.log ("4- fetchDashboardStats - after setstateListData");
      
    }// end if error 

    
  } // end fetchDashboardStats
  
  
  let history = useHistory();

  const handleClick =  (whereTo) => {
        
    console.log ("NavItems-handleClick - start handleClick");
    console.log (whereTo);
    history.push (whereTo);
    if ( whereTo == "/dashboard") 
      myContext.setNavSection ("Dashboard")
    else if ( whereTo == "/environments") 
      myContext.setNavSection ("Environments")
    else if ( whereTo == "/workers") 
      myContext.setNavSection ("Workers")
    else if ( whereTo == "/projects") 
      myContext.setNavSection ("Projects")
    else if ( whereTo == "/deployments") 
      myContext.setNavSection ("Deployments")
    else if ( whereTo == "/events") {
      myContext.setNavSection ("Events") 
      myContext.setEventsType ("")
    } else if ( whereTo == "/jobs") {
      myContext.setNavSection ("Jobs") 
    } else if ( whereTo == "/settings") 
      myContext.setNavSection ("Settings")
      

    myContext.setWhereTo ("load") ;

    stageBox = (document).querySelector(
      '#stage-box',
    );
    if (stageBox) {
    stageBox.scrollTop="0";
    } else {
      console.log ("stageBox: "+stageBox)
    }
  

    console.log ("NavItems-handleClick - end handleClick");

  } // end handle click
  
  
if (dashboardStats.responseStatus ) {
  var frontDisplay =  [
    <WhatIsTheICPM key={1}/>
  ]
  if (dashboardStats.environmentsCount == 0 && dashboardStats.projectsCount == 0 ){
    frontDisplay = [
      <GettingStartedStep1 key={1} handleClick={handleClick}/>
    ]
  } else if (dashboardStats.environmentsCount == 0 && dashboardStats.projectsCount > 0 ){
      frontDisplay = [
        <GettingStartedStep2 key={1} handleClick={handleClick}/>
      ]
  } else if (dashboardStats.environmentsCount > 0 && dashboardStats.projectsCount > 0 && dashboardStats.environmentsActive == 0  && dashboardStats.deploymentsCount == 0 ){
      frontDisplay = [
        <GettingStartedStep3 key={1} handleClick={handleClick}/>
      ]
  } else if (dashboardStats.environmentsCount > 0 && dashboardStats.projectsCount > 0  && dashboardStats.environmentsActive > 0 && dashboardStats.deploymentsCount == 0 ){
      frontDisplay = [
        <GettingStartedStep4 key={1} handleClick={handleClick}/>
      ]
  } // end what stage they are at.

  return (

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} sx={{}}>
            <Paper elevation={0}
              sx={{
                p: 1,
                justifyContent: "center", 
              }}
            >
            <Grid container direction="row" spacing={3}>
              {/*
              <Grid item xs={12} md={4} sx={{}}>
                <Box sx={{width:"250px"}} >
                  <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
                </Box>
              </Grid>
              */}
              <Grid item xs={12} sx={{}}>
              {frontDisplay}
              </Grid>
            </Grid>
            </Paper>
          </Grid>
          {/* environments */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
  
             
            <ThemeProvider theme={myContext.environmentsThemeName}>
            <Typography variant="h5" color="text.secondary" align="center" sx={{
                ml:1, mr:1,
                mt:1, mb:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.environmentsCount.toString()} Environments
              </Typography>
              <Typography variant="body" color="text.secondary" align="center" sx={{
                m:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.environmentsActive.toString()} alive (with active Workers)
              </Typography>
             <Button onClick={() => { handleClick("/environments")}}  variant="contained" sx={{mt:1, width:"100%", height:"100%"}}>
            <SettingsSystemDaydreamIcon sx={{mr:1}}/>Environments
            </Button>
            </ThemeProvider>
            
            </Paper>
          </Grid>
          {/* projects */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              
            <ThemeProvider theme={myContext.projectsThemeName}>
            <Typography variant="h5" color="text.secondary" align="center" sx={{
                ml:1, mr:1,
                mt:1, mb:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.projectsCount.toString()} Projects
              </Typography>
              <Typography variant="body" color="text.secondary" align="center" sx={{
                m:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.projectsActive.toString()} active (in Environments)
              </Typography>
             <Button onClick={() => { handleClick("/projects")}}  variant="contained" sx={{mt:1, width:"100%", height:"100%"}}>
            <AccountTreeIcon sx={{mr:1}}/>Projects
            </Button>
            </ThemeProvider>
            </Paper>
          </Grid>
          {/* projects */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              
            <ThemeProvider theme={myContext.eventsThemeName}>
            <Typography variant="h5" color="text.secondary" align="center" sx={{
                ml:1, mr:1,
                mt:1, mb:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.eventsCount.toString()} Events
              </Typography>
              <Typography variant="body" color="text.secondary" align="center" sx={{
                m:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.eventsCountLast30.toString()} (last 30 min)
              </Typography>
             <Button onClick={() => { handleClick("/events")}}  variant="contained" sx={{ mt:1,width:"100%", height:"100%"}}>
            <FormatListBulletedIcon sx={{mr:1}}/>Events
            </Button>
            </ThemeProvider>
            </Paper>
          </Grid>
          {/* projects */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              
            <ThemeProvider theme={myContext.deploymentsThemeName}>
            
            <Typography variant="h5" color="text.secondary" align="center" sx={{
                ml:1, mr:1,
                mt:1, mb:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.deploymentsCount.toString()} Deployments
              </Typography>
              <Typography variant="body" color="text.secondary" align="center" sx={{
                m:1,
                p:1,
                border: '1px solid #9f9f9f',
                borderRadius:2, }}>
              {dashboardStats.deploymentsCountLastDay.toString()} (last 24 hours)
              </Typography>
             <Button onClick={() => { handleClick("/deployments")}}  variant="contained" sx={{ mt:1,width:"100%", height:"100%"}}>
            <AltRouteIcon sx={{mr:1}}/>Deployments
            </Button>
            </ThemeProvider>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
      
    )

} else {
  fetchDashboardStats ();

  return (
    <>
    
        
    <Paper
              sx={{
                p: 2,
                m:2, 
                mt:5,
                
              }}
            >
        
      <PleaseWait ><BarChartIcon sx={{mr:1}}/></PleaseWait>
    </Paper>
        

    </>
    
  )

} // end if 

} // end of DashboardMain

export default DashboardMain;
