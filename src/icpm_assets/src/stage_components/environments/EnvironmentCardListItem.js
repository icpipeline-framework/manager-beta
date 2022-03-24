import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { useHistory } from "react-router-dom";
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import EnvironmentCard from './EnvironmentCard';

const EnvironmentCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const environment = props.environment;
    const displayLocation = props.displayLocation;
    console.log ("EnvironmentCardListItem - Inside my ListOfEnvironments");
 

    let history = useHistory();
    const handleClick =  (whereToClick, whereToClickJumpId) => {
    


      console.log ("EnvironmentCardListItemClick:" + environment.id);
      if (whereToClick == "project" ) {

        myContext.setNavSection ("Projects")
        history.push ("/projects");
        myContext.setWhereTo ("dashboard") ;
        myContext.setJumpId (environment.projectId) ;
      } else if (whereToClick == "deployment" ) {

          myContext.setNavSection ("Deployments")
          history.push ("/deployments");
          myContext.setWhereTo ("dashboard") ;
          myContext.setJumpId (whereToClickJumpId ) ;

      } else {
          myContext.setActiveEnvironment(environment);
          if (displayLocation == "projectDashboard" ) { 

            myContext.setNavSection ("Environments")
            history.push ("/environments");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (environment.id) ;

          } else if (displayLocation == "dashboard" ){
            props.changeStateAgent("manage");
          } else {
            props.changeStateAgent("dashboard");
          }

          
          myContext.setJumpId (environment.id) ;
      } // end whereToClick
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{mr:0,ml:0,  mb:2, borderRadius:2}}>
        <EnvironmentCard environment={environment} changeStateAgent={handleClick} displayLocation={displayLocation}/>
        
      </Card>
    )// end return
} // end function EnvironmentCardListItem



export default EnvironmentCardListItem;
