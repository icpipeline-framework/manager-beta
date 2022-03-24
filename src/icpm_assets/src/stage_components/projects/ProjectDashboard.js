import React, { useState,useContext, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
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
import ProjectCardListItem from './ProjectCardListItem';
import ListEnvironments from '../environments/ListEnvironments';
import ShowPipeline from '../../components/ShowPipeline';


const ProjectDashboard = (props) => {
  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  
  let activeProject = myContext.activeProjectName;

  const [completeProject, setCompleteProject] = useState([]);
  const [listOfEnvironments, setListOfEnvironments] = useState([]);
  const [envEnvironmentType, setEnvEnvironmentType] = useState("All");
  
  
  let activeProjectId = 0;
  let jumpId = myContext.jumpIdName;

  if (props.activeProject) {
    activeProjectId = props.activeProject.id ;
  }
  if (jumpId > 0 ) {
    
    activeProjectId = jumpId;

  }
  if (activeProjectId == 0 ){

    activeProjectId = activeProject.id;

  }

  console.log ("activeProjectId = " + activeProjectId);
    
  const fetchCompleteProject = async ()  =>  {

    // going to creat call to canister
    console.log ("1- fetchCompleteProject - before await");
    
    
    var theError = "";

    const fetchData = await icpmDapp.getCompleteProjectMain(apiToken,activeProjectId)
        .catch(e => { theError = e  });
      
    
    console.log ("2- fetchCompleteProject - after await");
    if (theError || fetchData.msg ) {
      if (fetchData.msg ){

        theError+= fetchData.msg ;

      } // end if msg in data 
      console.log (fetchData);
      myContext.displayError("" +theError);
      
    } else {
    console.log (fetchData);
    console.log ("3- fetchCompleteProject - after logging return");
    // set the state which should redraw the component

    setCompleteProject (fetchData);
    setListOfEnvironments (fetchData.environmentObjects);
    
    
    console.log  ("THE LENGTH  = " + fetchData.msg);
    console.log ("4- fetchCompleteProject - after setstateListData");
    } // end if there was an error

    
  } // end fetchCompleteProject
  
  
  
if (completeProject.responseStatus ) {
  
  
  
  const backToList = () => {
    props.changeStateAgent ("load");
  }// end handleCancel 

  const environmentsSort = (environmentTypeSort) => {
    console.log ("environmentsSort", environmentTypeSort);
    let thisList = completeProject.environmentObjects.filter(e => e.environmentType == environmentTypeSort)
    setListOfEnvironments (thisList );
    setEnvEnvironmentType (environmentTypeSort );

  }// end environmentsSort 
  
  
  return (
      <>
       
        <Title>
        <AccountTreeIcon sx={{mr:1}}/>Project Dashboard: {completeProject.projectObject.name}
        </Title>
        <Button onClick={backToList}  variant="outlined" sx={{ml:1, mr:1, mb:2 }}>List Projects</Button>
        <ProjectCardListItem  project={completeProject.projectObject} changeStateAgent={props.changeStateAgent} displayLocation="dashboard"/>


        <ShowPipeline environmentObjects={completeProject.environmentObjects} environmentsSort={environmentsSort} />
          
        <ThemeProvider theme={myContext.environmentsThemeName}>
        <Box sx={{bgcolor:"primary.superlight", 
          borderRadius:2,
          border: '1px solid #9f9f9f',
          p:1}} >

         <ListEnvironments listOfEnvironments={listOfEnvironments} envEnvironmentType={envEnvironmentType} displayLocation="projectDashboard"/>
         
         <Typography variant="body2" color="primary.main" align="center" sx={{mt:2}}>
         {completeProject.environmentObjects.length} Total Environments Associated to this Project
        </Typography>
        </Box>
        </ThemeProvider>
          

      </>
      
    )

} else {
  fetchCompleteProject ();

  return (
    <>
      <Title>
      <AccountTreeIcon sx={{mr:1}}/>Project Dashboard:
      </Title>
        
        
      <PleaseWait waitType="query"><AccountTreeIcon sx={{mr:1}}/>Loading Project</PleaseWait>
        
        

    </>
    
  )

} // end if 

} // end of ProjectDashboard

export default ProjectDashboard;
