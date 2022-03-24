import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { useHistory } from "react-router-dom";


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import ProjectCard from './ProjectCard';

const ProjectCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const project = props.project;
    console.log ("ProjectCardListItem - Inside my ProjectCardListItem");
    const displayLocation = props.displayLocation;

    let history = useHistory();
    const handleClick =  (thisWhereTo) => {
    
      if (displayLocation == "environment") {

        myContext.setNavSection ("Projects")
        history.push ("/projects");
        myContext.setWhereTo ("dashboard") ;
        myContext.setJumpId (project.id) ;

      } else if (displayLocation == "dashboard") {

        console.log ("ProjectCard:" + project.id);
        myContext.setNavSection ("Projects")
        history.push ("/projects");
        myContext.setActiveProject(project);
        props.changeStateAgent("manage");
        myContext.setJumpId (project.id) ;

      } else {
        console.log ("ProjectCard:" + project.id);
        myContext.setNavSection ("Projects")
        history.push ("/projects");
        myContext.setActiveProject(project);
        props.changeStateAgent("dashboard");
        myContext.setJumpId (project.id) ;
      }
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{m:0, mt:0, mb:2, border: '1px solid #9f9f9f', borderRadius:2, flexGrow:1}}>
        
        <ProjectCard project={project} changeStateAgent={handleClick} displayLocation={displayLocation} />
        
        </Card>
    )// end return
} // end function ProjectCardListItem



export default ProjectCardListItem;
