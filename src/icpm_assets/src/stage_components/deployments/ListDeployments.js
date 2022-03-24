import React, { useState,useContext } from 'react';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import DeploymentCardListItem from './DeploymentCardListItem';
import DeploymentCard from './DeploymentCard';


const ListDeployments = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const listOfDeployments = myContext.listOfDeploymentsName ;
  

    
  console.log ("ListDeployments - Inside my ListDeployments");
  let deploymentsLength  = listOfDeployments.length ;

  const handleClick =  () => {

    /// create a blank object 
    

      const theDeploymentObject = {
        id: 0,
        status: "Created",
        environmentId: 0,
        projectId: 0,
        identityId: 0,
        deploymentNotes: "",
        projectRepo: "",
        projectRepoBranch: "",
        executeStartTime: 0,
        executeFinishTime: 0,
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
    }

    
        
    console.log ("ListDeployments-handleClick - start handleClick");
    console.log ("New Deployment ID:" + theDeploymentObject.id);
    myContext.setActiveDeployment(theDeploymentObject);
    props.changeStateAgent ("manage");

  } // end handle click

  if (deploymentsLength > 0) {
    console.log ("ListDeployments - this is the stateListData:")
    console.log (listOfDeployments)
    let theDeploymentList = [];

    for (let i = 0; i < deploymentsLength; i++) {
        
      theDeploymentList.push (
            
            <DeploymentCardListItem short={true} changeStateAgent={props.changeStateAgent} key={listOfDeployments[i].id.toString()} deployment={listOfDeployments[i]}/>
            
        )

    } // end for 
    // most recent on top by reversing
    theDeploymentList.reverse();
    let last30 = "";  
    if (deploymentsLength > 2 ) {
      last30 = " - last 30"
    }


      return (
          <>
          <Title><AltRouteIcon sx={{mr:1}}/>Deployments (by creation{last30})
          
         
          
          </Title>
          {/*<Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Deployment</Button>*/}


           {theDeploymentList}
          
           </>
      ) /// end return
  } else  {
        return (
          <>
          <Title><AltRouteIcon sx={{mr:1}}/>List of Deployments
          
         
          
          </Title>
           {/*<Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Deployment</Button>*/}

          <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Deployments.  
            </Typography>

          </Box>
          
           </>
        )// end return
      
  }// end if there is any Deployments  

} // end of ListDeployments

export default ListDeployments;
