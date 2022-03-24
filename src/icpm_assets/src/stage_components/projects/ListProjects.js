import React, { useState,useContext } from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import ProjectCardListItem from './ProjectCardListItem';


const ListProjects = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const listOfProjects = myContext.listOfProjectsName ;
  

    
  console.log ("ListProjects - Inside my ListProjects");
  let projectsLength  = listOfProjects.length ;
  
  const handleClick =  () => {

    /// create a blank object 
    
      const theProjectObject = {
        id: 0,
        name: "",
        category: "",
        description: "",
        projectRepo: "",
        dfxIdentities: [],
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
    }

    
        
    console.log ("ListProjects-handleClick - start handleClick");
    console.log ("New Project ID:" + theProjectObject.id);
    myContext.setActiveProject(theProjectObject);
    props.changeStateAgent ("manage");

  } // end handle click

  const createDemoProject =  () => {

    /// create a blank object 
    
      const theProjectObject = {
        id: 0,
        name: "Hello Pipeline 1 - Demo",
        category: "demo",
        description: "This is the demo Project created by the ICPipeline team from the Dfinity hello project.",
        projectRepo: "https://github.com/icpipeline-framework/hellopipeline1-pub.git",
        dfxIdentities: [],
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
    }

    
        
    console.log ("ListProjects-handleClick - start handleClick");
    console.log ("New Project ID:" + theProjectObject.id);
    myContext.setActiveProject(theProjectObject);
    props.changeStateAgent ("manage");

  } // end createDemoProject

  if (projectsLength > 0) {
    console.log ("ListProjects - this is the stateListData:")
    console.log (listOfProjects)
    let theProjectList = [];

    for (let i = 0; i < projectsLength; i++) {
        
      theProjectList.push (
            <ProjectCardListItem changeStateAgent={props.changeStateAgent} key={listOfProjects[i].id.toString()} project={listOfProjects[i]}/>
        )

    } // end for 
      


      return (
          <>
          <Title><AccountTreeIcon sx={{mr:1}}/>Projects
          
         
          
          </Title>
          <Button onClick={() => { handleClick()}}  variant="outlined" sx={{ml:1, mr:1, mb:2 }}>Create New Project</Button>


           {theProjectList}
          
           </>
      ) /// end return
  } else  {
        return (
          <>
          <Title><AccountTreeIcon sx={{mr:1}}/>Projects
          
         
          
          </Title>
          <Button onClick={() => { handleClick()}}  variant="outlined" sx={{ml:1, mr:1 }}>Create New Project</Button>

          <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4, display:"flex", flexDirection:"column"}}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Projects.            
            </Typography>
            
            <Box  sx={{borderRadius:2, border:"1px solid #9f9f9f", m:3, mt:3, p:1, display:"flex"}}>
              <Grid container >
                <Grid item xs={12}>
                  <Typography variant="h7" color="text.secondary" align="left" sx={{display:"block", flexGrow:1}} >
                  ICPipeline provides a basic DFX project repo, originated from the Dfinity "hello" project, and available for your use.
                  Use this button to get started with a quick-start project example on the ICPipeline framework.
                  Or, you can substitute your own project repo. 
                  </Typography>
                  
                </Grid>
                <Grid item xs={12} sx={{display:"flex"}}>
                  <Tooltip title={`Click to create a new project from  the example`} placement="top" enterNextDelay={300}>
                  <Button onClick={() => { createDemoProject()}}  variant="contained" sx={{m:2, flexGrow:1}}>Auto-Configure Demo Hello Project</Button>
                  </Tooltip>
                  
                </Grid>
              </Grid>
            </Box>
              
          </Box>
          
           </>
        )// end return
      
  }// end if there is any Projects  

} // end of ListProjects

export default ListProjects;
