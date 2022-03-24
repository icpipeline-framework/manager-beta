import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { ThemeProvider } from '@mui/material/styles';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';

function preventDefault(event) {
  event.preventDefault();
}

const FAQAll = () => {


  // now we get the global context 
  const myContext = useContext(AppContext);


  return (
    <>
    <Grid container>
      <Grid item xs={12} sx={{mb:2}}>
      <WhatIsTheICPM hideHelp={true}/>
      <WhatIsAnEnvironment hideHelp={true} />
      <WhatIsAProject  hideHelp={true}/>
      <WhatIsADeployment  hideHelp={true}/>
      <WhatIsAWorker hideHelp={true} />
      <WhatIsAJob  hideHelp={true}/>
      <WhatIsAnEvent hideHelp={true} />
      </Grid>
    </Grid>
      
    </>
  );
}// end GettingStartedStep1

const FAQMain = (props) => {

  const myContext = useContext(AppContext);
  
  console.log ("props.hideHelp", props.hideHelp )

  var jumpToHelp = [];
  if (!props.hideHelp)  {
    jumpToHelp = [

      <Tooltip  key={1} title="Goto ICPM Help Center" placement="top" enterNextDelay={300}>
      <IconButton sx={{mb:1}} color="inherit" onClick={() => { handleClick("/help")}}>              
        <HelpOutlineIcon />
      </IconButton>
      </Tooltip>

    ];
  } // end if we are in the help section 

  let history = useHistory();
  var stageBox;
  
  const handleClick = () => {
    /// create a blank object 
  


        
    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Help");
    history.push ("/help");

  

    console.log ("handleClick - to Help");
    
  } 



  return (
    <>
    <Box sx={{border: '1px solid #9f9f9f',
              borderRadius:2,
              p:1,
              m:1 }} >

    <ThemeProvider theme={myContext.defaultThemeName}>
      <Title >
      <Box sx={{display: 'flex', m:0}}>

      <Typography variant='h5'  align="left" sx={{
              mt:1,
              p:0, 
              flexgrow:1}}>
       {props.question} 
      </Typography>
        {jumpToHelp}
      </Box>
      </Title>

            {props.children}
      </ThemeProvider>
    </Box>
    
      
    </>
  );
}// end FAQMain


const WhatIsTheICPM = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is the ICPM?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
      The ICPipeline Manager (ICPM) is the only way to manage a pipeline of development environments 
      specifically for the Internet Computer.
      It is truly a catalyst for developers that will remove friction from the development process, 
      provide security and deliver the necessary enterprise level management tools for small and large teams alike.
      </Typography>
    
    </FAQMain>
  );
}// end WhatIsTheICPM



const WhatIsAProject = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is a Project?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
          A Project, in the ICPM, is specfically a label given to a specific GitHub Repo that you would like to test and deploy
          into development, testing, and eventually production environments. Once defined a Project can be attached to any number
          of Environments allowing development teams to collaborate, and product owners to test.
        </Typography>
    
    </FAQMain>
  );
}// end WhatIsAProject



const WhatIsAnEnvironment = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is an Environment?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
        An Environment, in the ICPM, represents a combination of a Worker, a Project and a specific project branch. 
        The Worker contains an Internet Computer replica and the ability to manage any branch in the Project
        repository. This means each Environment can run a 
        specfic iteration of code, manage a separate state, in a shared accessibility model. This reduces friction, 
        time and headaches for teams large and small.
      </Typography>
    
    </FAQMain>
  );
}// end WhatIsAnEnvironment


const WhatIsADeployment = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is a Deployment?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
          A Deployment, in the ICPM, captures Project (repo) and Environment (branch) details and is executed, or deployed, 
          on a Worker. The result is a deployed version of the project in an environment that can be accessed simultaneously
          by developers, product owners and quality assurance testers. 
      </Typography>
    
    </FAQMain>
  );
}// end WhatIsADeployment


const WhatIsAWorker = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is a Worker?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
          Workers are external to the ICPM and hold the necessary software to execute the Jobs assigned.
          Workers are docker instances running an Internet Computer replica and other components. These Workers allow users to 
          deploy projects for development and testing.
        
      </Typography>
    
    </FAQMain>
  );
}// end WhatIsAWorker


const WhatIsAJob = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is a Job?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
          A Job, in the ICPM, is a task that needs to be assigned to a Worker, or executed by the ICPM itself. Jobs hold
          the necessary details required to do the work, such as a deployment for the Worker that it is then assigned to.
        </Typography>
    
    </FAQMain>
  );
}// end WhatIsAJob



const WhatIsAnEvent = (props) => {

  
  console.log ("props.hideHelp", props.hideHelp )

  return (
    <FAQMain question="FAQ: What is an Event?" hideHelp={props.hideHelp}>

      <Typography   align="left" sx={{
              m:0,
              p:0, }}>
          Events, in the ICPM, are a log of the actions that takes place within the ICPipeline framework. 
          This includes "STATUS" type messages during deployments and 
          other Job types. It also allows the platform to capture logs and other "moment in time" data elements.
        </Typography>
    
    </FAQMain>
  );
}// end WhatIsAnEvent

export default FAQAll;
export { WhatIsTheICPM, WhatIsAProject,WhatIsAnEnvironment, WhatIsADeployment, WhatIsAWorker, WhatIsAJob, WhatIsAnEvent};