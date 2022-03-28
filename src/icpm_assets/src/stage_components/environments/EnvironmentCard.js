import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import PleaseWait from '../../nav/PleaseWait';
import 'regenerator-runtime/runtime';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import ProjectCardListItem from '../projects/ProjectCardListItem';
import WorkerCardListItem from '../workers/WorkerCardListItem';
import GetImage from '../../components/GetImage';

import GridCardListItem from '../../components/GridCardListItem';






const EnvironmentCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;

    const environment = props.environment;
    const displayLocation = props.displayLocation;

    console.log ("EnvironmentCard - Inside my EnvironmentCard");
    var startCompleteEnvironment =[];

    if (props.completeEnvironment) {
      startCompleteEnvironment = props.completeEnvironment ;

    } 

    const [completeEnvironment, setCompleteEnvironment] = useState(startCompleteEnvironment);

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
    // now we need to see if there is a worker and a project ... if so get the worker and get the project

    const fetchCompleteEnvironment = async (environmentId)  =>  {

      // going to creat call to canister
      console.log ("1- fetchCompleteEnvironment - before await");
      
      
      const fetchData = await icpmDapp.getCompleteEnvironmentMain(apiToken,environmentId).catch(e => { return "ICPM Error: " + e })
      //TODO handle error check 
      //await sleep(500);
      console.log ("2- fetchCompleteEnvironment - after await");
      console.log (fetchData);
      console.log ("3- fetchCompleteEnvironment - after logging return");
      // set the state which should redraw the component
  
      setCompleteEnvironment (fetchData);
      console.log  ("THE LENGTH  = " + fetchData.msg);
      console.log ("4- fetchCompleteEnvironment - after setstateListData");

      
    } // end fetchCompleteEnvironment


    if (completeEnvironment.responseStatus ) {
          
      const assignedProject = completeEnvironment.projectObject.name+" ("+completeEnvironment.environmentObject.projectId.toString()+")" ;
      var recentDeployment = ["No Deployments Yet"];
      var assignedWorker = ["No Worker Assigned"];

      if (completeEnvironment.latestDeploymentObject.id > 0 ) {
        recentDeployment = [completeEnvironment.latestDeploymentObject.id.toString()] ;
      } 
      if (completeEnvironment.environmentObject.workerId > 0 ) {
        assignedWorker = [completeEnvironment.workerObject.name+" ("+completeEnvironment.environmentObject.workerId.toString()+")" ] 
      }


      var theCardTitle = [
        <Title key={1}>
        <SettingsSystemDaydreamIcon sx={{mr:1}}/> {completeEnvironment.environmentObject.name} 
        </Title>
  
      ];
      
        if (props.changeStateAgent) {
          if (displayLocation == "dashboard") {

            theCardTitle= [
      
              <Button key={1} onClick={() => { props.changeStateAgent()}} variant="contained" sx={{ mb:2, width:"100%" }}>
                    
              <SettingsSystemDaydreamIcon sx={{mr:1}}/> Edit This Environment Profile
              
              </Button>
            ] ;
          } else {

            theCardTitle= [
      
              <Button key={1} onClick={() => { props.changeStateAgent()}} variant="contained" sx={{ mb:2, width:"100%", justifyContent: "flex-start" }}>
                    
              <SettingsSystemDaydreamIcon sx={{mr:1}}/>E: {completeEnvironment.environmentObject.name} 
              
              </Button>
            ] ;
          }// end if displayLocation
        } // end if there is changeStateAgent


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
            --network ic
            </Typography>
            
              </Paper>
          ] ;


        } // end if ic deployment
        if (displayLocation == "projectDashboard") { 

              return (
                <CardContent sx={{bgcolor:"#ffffff", 
                border: '1px solid #9f9f9f',
                mt:0, 
                borderRadius:2, width:"100%", overflowX:"auto"}}>
                  {theCardTitle}
                  <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Grid container spacing={0}>
                      <GridCardListItem title="Type" value={completeEnvironment.environmentObject.environmentType}/>
                      <Grid item xs={12}>
                      {displayICDeployment}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={0}>
                      <GridCardListItem title="Repo Branch" value={completeEnvironment.environmentObject.projectRepoBranch}/>
                      <GridCardListItem title="Identity" value={completeEnvironment.identityObject.name}/>
                      <GridCardListItem title="Network" value={completeEnvironment.environmentObject.deploymentNetwork}/>
                    </Grid>
                  </Grid>
                  </Grid>
                  
                  <Typography variant="body2" >
                  (id: {completeEnvironment.environmentObject.id.toString()})
                  </Typography>

                </CardContent>
            )// end return

         } else if (displayLocation == "dashboard") { 
        var theWorker =  [];
        if (completeEnvironment.workerObject.id > 0 ) {
          // now 
          var theWorker = [
            

            <WorkerCardListItem key={1} changeStateAgent={props.changeStateAgent} key={1} worker={completeEnvironment.workerObject} displayLocation="environment"/>
            
          ]

        }
        var showProject = [];
        
        if (completeEnvironment.projectObject.id > 0) {

          showProject.push (
            <Grid item xs={12} key={1} sx={{ display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                mb: 2,
                float: 'center'
                , }}>
            <ProjectCardListItem  changeStateAgent={props.changeStateAgent} key={1} project={completeEnvironment.projectObject} displayLocation="environment"/>
              </Grid>
          ) // end push 
        } else {

          showProject.push (
            <Grid item xs={12} key={1} sx={{ display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                mb: 2,
                float: 'center'}}>
            <AccountTreeIcon  sx={{mr:1}} />  No Project Assigned
            </Grid>
          ) // end push 
            

          }// end if there is a project Object
          var displayGrid = [];

          if (completeEnvironment.environmentObject.description != "" ) {
           displayGrid = [
             <GridCardListItem key={1} title="Description" value={completeEnvironment.environmentObject.description}/>
            ];
          }

        return (
            <CardContent sx={{bgcolor:"#ffffff", 
            border: '1px solid #9f9f9f',
            mt:0, 
            borderRadius:2, width:"100%", overflowX:"auto"}}>
              
              {theCardTitle}
              
              <Grid container spacing={0}>

                <GridCardListItem title="Type" value={completeEnvironment.environmentObject.environmentType}/>
                {displayGrid}
                {/*
                <GridCardListItem title="Create Date" value={completeEnvironment.environmentObject.dateCreated} itemType="date-icNano"/>
                */}
                <GridCardListItem title="Last Updated" value={completeEnvironment.environmentObject.dateCreated} itemType="date-icNano"/>

                <GridCardListItem title="Identity" value={completeEnvironment.identityObject.name} itemType="identity"/>


                {/*
                <GridCardListItem title="Most Recent Deployment" value={recentDeployment}/>
                */}

                <ThemeProvider theme={myContext.projectsThemeName}>
                <Grid container   sx={{m:0, p:1,
                  bgcolor: "primary.superlight", 
                  border: '1px solid #9f9f9f',
                  borderRadius:2,
                  p:2, 
                  mb:2,}}> 

                     {showProject}

                      <ThemeProvider theme={myContext.environmentsThemeName}>
                      <Grid container  component="span" sx={{m:0, p:1,
                        bgcolor: "primary.superlight", 
                        border: '1px solid #9f9f9f',
                        borderRadius:2,
                        p:2, 
                        mb:2,
                        width:"100%"}}> 
                          <GridCardListItem title="Repo Branch" value={completeEnvironment.environmentObject.projectRepoBranch}/>
                          
                          <GridCardListItem title="Identity" value={completeEnvironment.identityObject.name}/>
                          <GridCardListItem title="Network" value={completeEnvironment.environmentObject.deploymentNetwork}/>
                      </Grid>
                      </ThemeProvider>

                </Grid>
                </ThemeProvider>    

                <ThemeProvider theme={myContext.workersThemeName}>
                <Grid container  component="span" sx={{m:0, p:1,
                  bgcolor: "primary.superlight", 
                  border: '1px solid #9f9f9f',
                  borderRadius:2,
                  p:2, 
                  mb:2,
                  width:"100%"}}> 
                    
                  <Box key={1} sx={{bgcolor:"primary.superlight",
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      float: 'center'}} >
                    <WorkspacesIcon sx={{mr:1}}/> {completeEnvironment.workerObject.name ?completeEnvironment.workerObject.name : "No Worker Assigned"} 
                  </Box>
                  {theWorker}

                </Grid>
                </ThemeProvider>    

                {/*
                <GridCardListItem title="Assigned Worker" value={assignedWorker}/>
                <GridCardListItem title="Worker Last Touch" value={completeEnvironment.workerObject.lastTouch} itemType="date-icNano"/>
                */}
              </Grid>
              <Typography variant="body2" >
              (id: {completeEnvironment.environmentObject.id.toString()})
              </Typography>

            </CardContent>
        )// end return

      
      } else {
        
        var theWorker =  [

          <ThemeProvider key={1} theme={myContext.workersThemeName}>
          <Grid item  sx={{ display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor:"primary.superlight",
          border: '1px solid #9f9f9f',
          mt:0, 
          p:1,
          borderRadius:2,
          float: 'center'}}>
           <WorkspacesIcon  sx={{mr:1}} /> {assignedWorker}
          </Grid>
          </ThemeProvider>
        ]
        if (completeEnvironment.workerObject.id > 0 ) {
          var theWorker = [
            <WorkerCardListItem key={1} changeStateAgent={props.changeStateAgent} key={1} worker={completeEnvironment.workerObject} displayLocation="environmentList"/>
          ]

        }
        var showProject = [];
        
        if (completeEnvironment.projectObject.id > 0) {

          showProject.push (
            <Grid item xs={12} key={1} sx={{ display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center', 
                mt:0, mb:1 }}>

            <Button key={1} onClick={() => { props.changeStateAgent("project",completeEnvironment.projectObject.id )}} variant="contained" sx={{ mb:1, width:"100%" , justifyContent: "flex-start" }}>
            
            <AccountTreeIcon sx={{mr:1}}/> P: {completeEnvironment.projectObject.name } 
            
            </Button>
              </Grid>
          ) // end push 
        } else {

          showProject.push (
          <Grid item xs={12} key={1} sx={{ display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center', 
              backgroundColor: 'primary.superlight', 
              border:'1px solid #9f9f9f',
              borderRadius: 2, 
              p:1,
              mt:0, mb:1 }}>

            <AccountTreeIcon sx={{mr:1}}/>No Project Assigned  Yet ...
            </Grid>
        ) // end push 
        } // end if there is a project 
        var showDeployment = [];
        
        if (completeEnvironment.latestDeploymentObject.id > 0) {

          showDeployment.push (
            <Grid item xs={12} key={1} sx={{ display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center', 
                mt:0, mb:1}}>

              <Button key={1} onClick={() => {  props.changeStateAgent("deployment",completeEnvironment.latestDeploymentObject.id )}} variant="contained" sx={{ mb:1 , width:"100%" , justifyContent: "flex-start" }}>
              
              <AltRouteIcon sx={{mr:1}}/>D: {completeEnvironment.latestDeploymentObject.id.toString() } 
              
              </Button>
            </Grid>
          ) // end push 
        } else {

        showDeployment.push (
          <Grid item xs={12} key={1} sx={{ display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center', 
              backgroundColor: 'primary.superlight',
              border:'1px solid #9f9f9f',
              borderRadius: 2, 
              p:1, 
              mt:0, mb:1}}>

            <AltRouteIcon sx={{mr:1}}/>No Deployments Yet ...
            </Grid>
        ) // end push 
      } // end if there is a latest deployment

      // TODO: theWorker is something we might want to add back but 
      // we are going to blank out theWorker
      theWorker = [];
      


          return (
              <CardContent sx={{bgcolor:"#ffffff", 
              border: '1px solid #9f9f9f',
              mt:0, 
              borderRadius:2, width:"100%", overflowX:"auto"}}>
                {theCardTitle}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                  <Grid container spacing={0}>
                    <GridCardListItem title="Type" value={completeEnvironment.environmentObject.environmentType}/>
                    <GridCardListItem title="Worker Last Touch" value={completeEnvironment.workerObject.lastTouch} itemType="date-icNano"/>
                    <GridCardListItem title="Repo Branch" value={completeEnvironment.environmentObject.projectRepoBranch}/>
                    <GridCardListItem title="Identity" value={completeEnvironment.identityObject.name}/>
                    <GridCardListItem title="Network" value={completeEnvironment.environmentObject.deploymentNetwork}/>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} sx={{
              border: '0px solid #9f9f9f',
              mt:0, 
              borderRadius:2, p:0, overflowX:"auto"}}>

                <ThemeProvider theme={myContext.projectsThemeName}>
                {showProject}
                </ThemeProvider>
                <ThemeProvider theme={myContext.deploymentsThemeName}>
                {showDeployment}
                </ThemeProvider>
                {theWorker}
                {displayIiEnabled}
                {displayICDeployment}  
                </Grid>
              </Grid>
                
              <Typography variant="body2" >
              (id: {completeEnvironment.environmentObject.id.toString()})
              </Typography>

              </CardContent>
          )// end return

        }
    } else { 
      fetchCompleteEnvironment (environment.id);

    
      return (
        <>
        
        <PleaseWait waitType="query"><SettingsSystemDaydreamIcon sx={{mr:1}}/>Loading Environment</PleaseWait>

        </>
      )// end return
    } // end if there is a project or worker still to do 
} // end function EnvironmentCard



export default EnvironmentCard;
