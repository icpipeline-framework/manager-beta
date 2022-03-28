import React, { useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import 'regenerator-runtime/runtime';
    


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import GridCardListItem from '../../components/GridCardListItem';
import ShowPipeline from '../../components/ShowPipeline';

const ProjectCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const project = props.project;
    console.log ("ProjectCard - Inside my ProjectCard");
    const displayLocation = props.displayLocation;

 
    var theCardTitle = [
      <Title key={1}>
      <AccountTreeIcon sx={{mr:1}}/> {project.name} 
      </Title>

    ];

    if (props.changeStateAgent) {

      if (displayLocation == "dashboard") {

        theCardTitle= [

          <Button key={1} color="primary"  onClick={() => { props.changeStateAgent("dashboard")}} variant="contained" sx={{ mb:2, width:"100%" }}>
                
          <AccountTreeIcon sx={{mr:1}}/> Edit This Project Profile
          </Button>
        ] ;
      } else {

        theCardTitle= [

          <Button key={1} onClick={() => { props.changeStateAgent("dashboard")}} variant="contained" sx={{ mb:2, width:"100%" , justifyContent: "flex-start"}}>
                
          <AccountTreeIcon sx={{mr:1}}/>P: {project.name} 
          
          </Button>
        ] ;
      }// end if displayLocation


    }// end if handle click
    if (displayLocation == "environmentList") {


      return (
        <CardContent sx={{bgcolor:"#ffffff",  borderRadius:2, width:"100%"}}>
          {theCardTitle}
        </CardContent>
      )// end return


      } else if (displayLocation == "environment") {

      var gridItems = [];
      if (project.category) {
        gridItems.push (
          <GridCardListItem key={1} title="Category" value={project.category}/>
        )
      }// end if category 
      if (project.projectRepo) {
        gridItems.push (
          <GridCardListItem key={3} title="Project Repo" value={project.projectRepo} itemType="link-github"/>
        )
      }// end if repor 

      return (
        <CardContent sx={{bgcolor:"#ffffff",  borderRadius:2, width:"100%"}}>
          {theCardTitle}
          <Grid container spacing={0}>
            {gridItems}
          </Grid>
        </CardContent>
      )// end return


    } else {

      var gridItems = [];
      if (project.category) {
        gridItems.push (
          <GridCardListItem key={1} title="Category" value={project.category}/>
        )
      }// end if category 
      if (project.description) {
        gridItems.push (
          <GridCardListItem key={2} title="Description" value={project.description}/>
        )
      }// end if category 
      if (project.projectRepo) {
        gridItems.push (
          <GridCardListItem key={3} title="Project Repo" value={project.projectRepo} itemType="link-github"/>
        )
      }// end if category 
    
      
      
      

    return (
      <CardContent sx={{bgcolor:"#ffffff",  borderRadius:2, width:"100%"}}>
        {theCardTitle}
        <Grid container spacing={0}>
          {gridItems}
          <GridCardListItem title="Create Date" value={project.dateCreated} itemType="date-icNano"/>
          <GridCardListItem title="Last Updated" value={project.lastUpdated} itemType="date-icNano"/>
        </Grid>
        {/*
        <ProjectPipeline /> 
        */}
      </CardContent>
    )// end return
  }// end display location 
} // end function ProjectCard



export default ProjectCard;
