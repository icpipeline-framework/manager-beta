import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import CanisterCard from './CanisterCard';


const ListCanisters = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const displayLocation  = props.displayLocation ;
  const completeEnvironment  = props.completeEnvironment ;
  var listOfCanisters = [] ;

  let history = useHistory();

  if (props.listOfCanisters) {
    listOfCanisters = props.listOfCanisters;
  } else {
    listOfCanisters = myContext.listOfCanistersName ;
  }// end if we passed a list of events
  
    
  console.log ("ListOfCanisters - Inside my ListOfCanisters");
  let canistersLength  = listOfCanisters.length ;
  

  const handleClick =  () => {

    /// create a blank object 
    

    const theCanisterObject = {
      id: 0,
      name:"",
      category: "",
      description: "",
      dfxJson: "",
      canisterName: "",
      canisterType: "",
      canisterNetwork: "",
      canisterId: "",
      identityId: 0,
      projectId: 0,
      environmentId: 0,
      lastDeploymentId: 0,
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theCanisterObject
    
        
    console.log ("ListOfCanisters-handleClick - start handleClick");
    console.log ("New Canister ID:" + theCanisterObject.id);
    myContext.setActiveCanister(theCanisterObject);
    props.changeStateAgent ("manage");


  } // end handle click

  const createProfile =  () => {

    /// create a blank object 
    

    const theCanisterObject = {
      id: 0,
      name:"",
      category: "profile",
      description: "",
      dfxJson: "",
      canisterName: "",
      canisterType: "",
      canisterNetwork: "ic",
      canisterId: "",
      identityId: completeEnvironment.identityObject.id,
      projectId: completeEnvironment.projectObject.id,
      environmentId: completeEnvironment.environmentObject.id,
      lastDeploymentId: 0,
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theCanisterObject
    
        
    console.log ("ListOfCanisters-CreateProfile - start handleClick");
    console.log ("completeEnvironment.environmentObject.id: " + completeEnvironment.environmentObject.id);
    myContext.setActiveCanister(theCanisterObject);

    myContext.setWhereTo ("manage") ;
    myContext.setNavSection ("Canisters");
    history.push ("/canisters");


  } // end handle click
  var titleDisplay = [
    <Title key={1} >
    <CodeIcon sx={{mr:1, }}/>Canisters
    </Title>
   ];
   var footerDisplay = [];

   
   if (displayLocation == "environmentProfiles") {

    titleDisplay = [];

    footerDisplay = [
      <Box key={1} sx={{flexGrow:1, display:"flex"}}>
      <Button onClick={() => { createProfile()}}  variant="contained" sx={{flexGrow:1,ml:1, mr:1, mb:2}}>Create New Profile</Button>
      </Box>
     ];
  
   
   } else if (displayLocation == "deployment") {

    titleDisplay = [];

  }

  if (canistersLength > 0) {
    console.log ("listOfCanisters - this is the stateListData:")
    console.log (listOfCanisters)
    let theCanisterList = [];

    for (let i = 0; i < canistersLength; i++) {
        
      theCanisterList.push (
            
            <CanisterCard displayLocation={displayLocation} changeStateAgent={props.changeStateAgent} key={listOfCanisters[i].id.toString()} canister={listOfCanisters[i]} fetchCompleteEnvironment={props.fetchCompleteEnvironment}/>
            
        )

    } // end for 
    // most recent on top by reversing
    theCanisterList.reverse();

      return (
          <Box sx={{  flexGrow:1}}>
          {titleDisplay}
          {theCanisterList}
          {footerDisplay}
          
           </Box>
      ) /// end return
  } else  {
    if (displayLocation == "environmentProfiles") {
      return (
        <Box sx={{ flexGrow:1}}>
        {titleDisplay}  
        <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
          <Typography variant="h5" color="text.secondary" align="center" >
          {/* No Profiles. */}
          </Typography>

        </Box>
        {footerDisplay}
         </Box>
      )// end return
    } else { 
        return (
          <>
          {titleDisplay}  
         <Box sx={{ borderBottom: 0, width:"100%", bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Canisters.  
            </Typography>

          </Box>
          
           </>
        )// end return
    } // end display 
      
  }// end if there is any Canisters  

} // end of ListCanisters

export default ListCanisters;
