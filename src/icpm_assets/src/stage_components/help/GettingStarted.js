import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { ThemeProvider } from '@mui/material/styles';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpIcon from '@mui/icons-material/Help';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';

function preventDefault(event) {
  event.preventDefault();
}

const GettingStartedAllSteps = () => {


  // now we get the global context 
  const myContext = useContext(AppContext);


  return (
    <>
    <Grid container>
      <Grid item xs={12} sx={{mb:2}}>
      <GettingStartedStep1 />
      </Grid>
      <Grid item xs={12} sx={{mb:2}}>
      <GettingStartedStep2 />
      </Grid>
      <Grid item xs={12} sx={{mb:2}}>
      <GettingStartedStep3 />
      </Grid>
      <Grid item xs={12} sx={{mb:2}}>
      <GettingStartedStep4 />
      </Grid>
    </Grid>
      
    </>
  );
}// end GettingStartedStep1

const GettingStartedStep1 = (props) => {

  const myContext = useContext(AppContext);

  var jumpToHelp = [];
  if (myContext.navSectionName != "Help" )  {
    jumpToHelp = [

      <IconButton key={1} sx={{mb:1}} color="inherit" onClick={() => { history.push("/help")}}>              
        <HelpOutlineIcon />
      </IconButton>

    ];
  } // end if we are in the help section 


  let history = useHistory();
  var stageBox;
  
  const handleClick = () => {
    /// create a blank object 
    
    const theProjectObject = {
      id: 0,
      name: "",
      category: "",
      description: "",
      projectRepo: "",
      dfxIdentities:[],
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    }


        
    console.log ("GettingStarted-handleClick - start handleClick");
    myContext.setActiveProject(theProjectObject);

    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Projects");
    history.push ("/projects");

  

    console.log ("GettingStarted-handleClick - end handleClick");
    
  } 

  return (
    <>
    <Box sx={{border: '1px solid #9f9f9f',
              borderRadius:2,
              p:1,
              m:1 }} >

    <ThemeProvider theme={myContext.projectsThemeName}>
      <Title >
      <Box sx={{display: 'flex'}}>

      <Typography variant='h5'  align="left" sx={{
              mt:1,
              p:0, 
              flexgrow:1}}>
       Getting Started: Step 1 - Create a Project
      </Typography>
        {jumpToHelp}
      </Box></Title>

      <Typography   align="left" sx={{
              m:1,
              p:1, }}>
      First things first, you will need to create a project. A project will consist of a GitHub repository 
      where the dfx project lives. Each project can have multiple environments for testing and development 
      and eventually can be deployed on the IC for stage testing and eventually production deployment. 
      Click below to go to the project section and create a new project.
      </Typography>
      <Box sx={{display: 'flex'}}>
      <Button onClick={() => { handleClick("/projects")}}  variant="contained" sx={{m:1, flexGrow:1}}>
      <AccountTreeIcon sx={{mr:1}}/>Create Your First ICPipeline Project  
      </Button>
      </Box>
      </ThemeProvider>
    </Box>
    
      
    </>
  );
}// end GettingStartedStep1

const GettingStartedStep2 = (props) => {

  const myContext = useContext(AppContext);

  let history = useHistory();
  var stageBox;
  
  const handleClick = () => {
    /// create a blank object 
    
    const theProjectObject = {
      id: 0,
      name: "",
      category: "",
      description: "",
      projectRepo: "",
      dfxIdentities:[],
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    }


        
    console.log ("GettingStarted-handleClick - start handleClick");
    myContext.setActiveProject(theProjectObject);

    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Environments");
    history.push ("/environments");

  

    console.log ("GettingStarted-handleClick - end handleClick");
    
  }  // end handleClick

  var jumpToHelp = [];
  if (myContext.navSectionName != "Help" )  {
    jumpToHelp = [

      <IconButton key={1} sx={{mb:1}} color="inherit" onClick={() => { history.push("/help")}}>              
        <HelpOutlineIcon />
      </IconButton>

    ];
  } // end if we are in the help section 


  return (
    <>
    <Box sx={{border: '1px solid #9f9f9f',
              borderRadius:2,
              p:1,
              m:1 }} >

    <ThemeProvider theme={myContext.environmentsThemeName}>
      <Title >
      <Box sx={{display: 'flex'}}>

      <Typography variant='h5'  align="left" sx={{
              mt:1,
              p:0, 
              flexgrow:1}}>
       Getting Started: Step 2 - Create an Environment
      </Typography>
        {jumpToHelp}
      </Box>
      </Title>

      <Typography  align="left" sx={{
              m:0,
              p:1, }}>
        Now that you have at least one project, you will need to create an environment to deploy your work into. 
        Projects can have multiple environments (QA1, QA2, Dev1, UAT1, etc.). An environment hosts a specific branch. 
        Users can test a specific branch of the configured project.
        Once you have created an environment, attached a project and chosen a branch, you will be ready 
        assign a deployment to a registered worker.
      </Typography>
      <Box sx={{display: 'flex'}}>
      <Button onClick={() => { handleClick("/environments")}}  variant="contained" sx={{m:1, flexGrow:1}}>
      <SettingsSystemDaydreamIcon sx={{mr:1}}/>Environments
      </Button>
      </Box>
      </ThemeProvider>
    </Box>
    
      
    </>
  );
}// end GettingStartedStep2

const GettingStartedStep3 = (props) => {

  const myContext = useContext(AppContext);
  let history = useHistory();
  var stageBox;
  
  const handleClick = () => {
    /// create a blank object 
    
    const theProjectObject = {
      id: 0,
      name: "",
      category: "",
      description: "",
      projectRepo: "",
      dfxIdentities:[],
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    }


        
    console.log ("GettingStarted-handleClick - start handleClick");
    myContext.setActiveProject(theProjectObject);

    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Workers");
    history.push ("/workers");

  

    console.log ("GettingStarted-handleClick - end handleClick");
    
  } 
  var jumpToHelp = [];
  if (myContext.navSectionName != "Help" )  {
    jumpToHelp = [

      <IconButton key={1} sx={{mb:1}} color="inherit" onClick={() => { history.push("/help")}}>              
        <HelpOutlineIcon />
      </IconButton>

    ];
  } // end if we are in the help section 


  return (
    <>
    <Box sx={{border: '1px solid #9f9f9f',
              borderRadius:2,
              p:1,
              m:1 }} >

    <ThemeProvider theme={myContext.workersThemeName}>
      <Title >
        
      <Box sx={{display: 'flex'}}>

      <Typography variant='h5'  align="left" sx={{
              mt:1,
              p:0, 
              flexgrow:1}}>
        Getting Started: Step 3 - Confirm Workers are alive.
      </Typography>
        {jumpToHelp}
      </Box>

      </Title>

      <Typography  align="left" sx={{
              m:1,
              p:1, }}>
      Workers are IC replica instances running in dockers. You will need to make sure 
      that there is a worker available and attached to your environment.  Your network adminstrator
      can read how to launch and manage Workers in the ReadMe of the GitHub repository, or at icpipeline.com. You can use 
      the button here to see if there are any active workers talking to this ICPM. If so, then check your environment dashboard. 
      You will not be able to deploy any branches from your project to an environment without an active Worker attached.
      </Typography>
      <Box sx={{display: 'flex'}}>
      <Button onClick={() => { handleClick("/workers")}}  variant="contained" sx={{m:1, flexGrow:1}}>
      <WorkspacesIcon sx={{mr:1}}/>Workers
      </Button>
      </Box>
      </ThemeProvider>
    </Box>
    
      
    </>
  );
}// end GettingStartedStep3

const GettingStartedStep4 = (props) => {

  const myContext = useContext(AppContext);
  let history = useHistory();
  var stageBox;
  

  const handleClick = () => {
    /// create a blank object 
    
    const theProjectObject = {
      id: 0,
      name: "",
      category: "",
      description: "",
      projectRepo: "",
      dfxIdentities:[],
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    }


        
    console.log ("GettingStarted-handleClick - start handleClick");
    myContext.setActiveProject(theProjectObject);

    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Environments");
    history.push ("/environments");

  

    console.log ("GettingStarted-handleClick - end handleClick");
    
  }  // end handleClick
  
  var jumpToHelp = [];
  if (myContext.navSectionName != "Help" )  {
    jumpToHelp = [

      <IconButton key={1} sx={{mb:1}} color="inherit" onClick={() => { history.push("/help")}}>              
        <HelpOutlineIcon />
      </IconButton>

    ];
  } // end if we are in the help section 


  return (
    <>
    <Box sx={{border: '1px solid #9f9f9f',
              borderRadius:2,
              p:1,
              m:1 }} >

    <ThemeProvider theme={myContext.environmentsThemeName}>
      <Title >
      <Box sx={{display: 'flex'}}>

      <Typography variant='h5'  align="left" sx={{
              mt:1,
              p:0, 
              flexgrow:1}}>
       Getting Started: Step 4 - Create a Deployment
      </Typography>
        {jumpToHelp}
      </Box>
      </Title>

      <Typography  align="left" sx={{
              m:1,
              p:1, }}>
      At this point you have created a project and assigned it to an environment,
      and there is an active worker ready to deploy. 
      You will need to go to the environment dashboard and press <b>DEPLOY NOW</b>. That will create a new deployment
      and give you a button to monitor it. After a few minutes the newly deployed project should be available to you. 
      That is, assuming you have network access to the worker, of course. 
      Contact your network administrator if you have questions. If you are the network administator and have questions, 
      consult the ICPipeline documentation or reach out to us. Happy to help if we can, and happy coding :) .
      </Typography>

      <Box sx={{display: 'flex'}}>
      <Button onClick={() =>  handleClick("/environments")}  variant="contained" sx={{m:1, flexGrow:1}}>
      <SettingsSystemDaydreamIcon sx={{mr:1}}/>Environments
      </Button>
      </Box>
      </ThemeProvider>
    </Box>
    
      
    </>
  );
}// end GettingStartedStep4
export default GettingStartedAllSteps;
export { GettingStartedStep1, GettingStartedStep2, GettingStartedStep3, GettingStartedStep4};