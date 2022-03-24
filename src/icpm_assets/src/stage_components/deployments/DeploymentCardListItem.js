import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import DeploymentCard from './DeploymentCard';

const DeploymentCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const deployment = props.deployment;
    const displayLocation = props.displayLocation;
    console.log ("DeploymentCardListItem - Inside my DeploymentCardListItem");
 

    let history = useHistory();
    const handleClick =  (thisWhereTo) => {
    
      console.log ("DeploymentCard:" + deployment.id);
      myContext.setActiveDeployment(deployment);
      
        myContext.setNavSection ("Deployments")
        history.push ("/deployments");
        myContext.setWhereTo ("dashboard") ;
        myContext.setJumpId (deployment.id) ;
  
    } // end handle click
    
    return (
        <Card elevation={0} sx={{m:0, mb:2, borderRadius:2}}>
        
        <DeploymentCard changeStateAgent={handleClick} deployment={deployment} short={props.short} displayLocation={displayLocation}/>
        
        </Card>
    )// end return
} // end function DeploymentCardListItem



export default DeploymentCardListItem;
