import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ThemeProvider } from '@mui/material/styles';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Chart from './Chart';
import RecentDeployments from './RecentDeployments';
import Orders from './Environments';
import Copyright from '../../nav/Copyright';


const DashboardMain = () => {

  const myContext = useContext(AppContext);

  const whereTo = myContext.whereToName;
  const jumpId = myContext.jumpIdName;
  const setWhereTo = myContext.setWhereTo;

  
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

  // this resets the scroll inside of the stage box on every render
  const stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  } else {
    console.log ("stageBox: "+stageBox)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Grid container spacing={3}>
        {/* environments */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >

           
          <ThemeProvider theme={myContext.environmentsThemeName}>
          <Typography variant="h5" color="text.secondary" align="center" sx={{m:2,p:2,
              border: '1px solid #9f9f9f',
              borderRadius:2, }}>
            4 Environments
            </Typography>
           <Button onClick={() => { handleClick("/environments")}}  variant="contained" sx={{ width:"100%", height:"100%"}}>
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
              height: 240,
            }}
          >
            
          <ThemeProvider theme={myContext.projectsThemeName}>
          <Typography variant="h5" color="text.secondary" align="center" sx={{m:2,p:2,
              border: '1px solid #9f9f9f',
              borderRadius:2, }}>
            6 Projects
            </Typography>
           <Button onClick={() => { handleClick("/projects")}}  variant="contained" sx={{ width:"100%", height:"100%"}}>
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
              height: 240,
            }}
          >
            
          <ThemeProvider theme={myContext.eventsThemeName}>
          <Typography variant="h5" color="text.secondary" align="center" sx={{m:2,p:2,
              border: '1px solid #9f9f9f',
              borderRadius:2, }}>
            4 Recent Events (30 min)
            </Typography>
           <Button onClick={() => { handleClick("/events")}}  variant="contained" sx={{ width:"100%", height:"100%"}}>
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
              height: 240,
            }}
          >
            
          <ThemeProvider theme={myContext.deploymentsThemeName}>
          <Typography variant="h5" color="text.secondary" align="center" sx={{m:2,p:2,
              border: '1px solid #9f9f9f',
              borderRadius:2, }}>
              1 Recent Deployment (30 min)
            </Typography>
           <Button onClick={() => { handleClick("/deployments")}}  variant="contained" sx={{ width:"100%", height:"100%"}}>
          <AltRouteIcon sx={{mr:1}}/>Deployments
          </Button>
          </ThemeProvider>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
);
  
  // return (
  //         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
  //           <Grid container spacing={3}>
  //             {/* Chart */}
  //             <Grid item xs={12} md={8} lg={9}>
  //               <Paper
  //                 sx={{
  //                   p: 2,
  //                   display: 'flex',
  //                   flexDirection: 'column',
  //                   height: 240,
  //                 }}
  //               >
  //                 <Chart />
  //               </Paper>
  //             </Grid>
  //             {/* Recent Deployments */}
  //             <Grid item xs={12} md={4} lg={3}>
  //               <Paper
  //                 sx={{
  //                   p: 2,
  //                   display: 'flex',
  //                   flexDirection: 'column',
  //                   height: 240,
  //                 }}
  //               >
  //                 <RecentDeployments />
  //               </Paper>
  //             </Grid>
  //             {/* Recent Orders */}
  //             <Grid item xs={12}>
  //               <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
  //                 <Orders />
  //               </Paper>
  //             </Grid>
  //           </Grid>
  //           <Copyright sx={{ pt: 4 }} />
  //         </Container>
  // );

}

export default DashboardMain;