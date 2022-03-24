import React, {useState,  useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import Tooltip from '@mui/material/Tooltip';
import 'regenerator-runtime/runtime';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';

/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import RefButton from '../../components/RefButton';
import GridCardListItem from '../../components/GridCardListItem';

import GetImage from '../../components/GetImage';
import PleaseWait from '../../nav/PleaseWait';

const CanisterCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;
    const displayLocation  = props.displayLocation ;
    

    const [removeConfirmed, setRemoveConfirmed] = useState(false);
    const [removeProcessing, setRemoveProcessing] = useState(false);
    
    const canister = props.canister;
    console.log ("CanisterCard - Inside my CanisterCard");


    var cardTitle = [
      <Box key={1} sx={{mb:1, display:"block"}}>
        <Title>
         <CodeIcon sx={{mr:1}}/> Canister: {canister.canisterName} ({canister.id.toString()})
         </Title>

          <Box key={1} sx={{mb:1, display:"flex"}}>
          <RefButton whereTo="deployment" refId={canister.lastDeploymentId} />
          </Box>
        </Box>
    ];
    if (canister.lastDeploymentId < 0 ) {
      // then it was deleted

        var cardTitle = [
          
          <Title key={1}>
            <CodeIcon sx={{mr:1}}/> 
            <Typography color="error">REMOVED PROFILE: {canister.canisterName} ({canister.id.toString()})</Typography>
            
          
          </Title>
        ];

    } else if (canister.lastDeploymentId == 0 ) {


      var cardTitle = [
        <Title key={1}>
          <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1, mb:2, flexGrow:1 , justifyContent: "flex-start"}}>
           <CodeIcon sx={{mr:1}}/> Canister Profile: {canister.canisterName} ({canister.id.toString()})
           </Button>
          </Title>
      ];
    
    }// end if deleted

    const launchCanister =  () => {
    
      console.log ("canister.canisterId:" + canister.canisterId);
      console.log ("canister.canisterNetwork:" + canister.canisterNetwork);
      
      if (canister.canisterNetwork == "ic") {
        window.open(`https://${canister.canisterId}.raw.ic0.app/`, '_blank');
      } else {
        
        window.open(`http://localhost:9000?canisterId=${canister.canisterId}`, '_blank');
        
      }

    } // end handle click

    var launchDisplay = [
      ];

    var displayIcOrLocal = ":9000";
    var displayWorker9000Text = [    
      <Grid key={1} item xs={12}>    
        <Box  sx={{display:"flex"}}>
          <Typography variant="body2" sx={{fontSize: '.7rem', mb:1, mt:1}}>
          NOTE: First SSH “w/port forwarding” for this to work on local port 9000.
          </Typography>
        </Box>
      </Grid>
    ];

        
    
    if (canister.canisterNetwork == "ic") {
      displayIcOrLocal = "IC";
      displayWorker9000Text = [    
        <Grid key={1} item xs={12}>    
          <Box  sx={{display:"flex"}}>
            <Typography variant="body2" sx={{fontSize: '.7rem', mb:1, mt:1}}>
            NOTE: This will launch a new window and connect to the IC deployed canister (raw.ic0.app).
            </Typography>
          </Box>
        </Grid>
      ];
    }  // end display for button


    if (canister.canisterType == "assets" || canister.canisterType == "candid_ui" || (canister.canisterType == "custom" && canister.canisterName == "internet_identity") ) {
      var iiWebpackDisplay =[] ;

      // if (canister.canisterType == "custom" && canister.canisterName == "internet_identity")  {
      //     iiWebpackDisplay =[
      //       <Grid item key={1} xs={12} sx={{display:"flex"}}>
      //       <Tooltip title={`connect to the replica directly`} placement="top" enterNextDelay={300}>
      //         <Button onClick={() => {launchCanister()}} variant="contained" sx={{ml:1, mr:1, flexGrow:1}}>
      //         <CodeIcon sx={{mr:1}}/> Open II Webpack :9090
      //         </Button>
      //       </Tooltip>
      //       </Grid>   
      //     ] ;
      //     iiWebpackDisplay.push (
      //       <Grid key={2} item xs={12}>    
      //         <Box  sx={{display:"flex"}}>
      //           <Typography variant="body2" sx={{fontSize: '.7rem', mb:1, mt:1}}>
      //           NOTE: First SSH “w/port forwarding” for this to work on local port 9090.
      //           </Typography>
      //         </Box>
      //       </Grid>
      //       )
      // }

      launchDisplay = [
                  <Grid key={1} item xs={12}  >
                    <Box sx={{display:"flex", border: "1px solid #9f9f9f", borderRadius:2, p:1}}>
                      <Grid container sx={{flexGrow:1 }}>
                        <Grid item xs={12} sx={{display:"flex"}}>
                        <Tooltip title={`connect to the replica directly`} placement="top" enterNextDelay={300}>
                          <Button onClick={() => {launchCanister()}} variant="outlined" sx={{ml:1, mr:1, flexGrow:1}}>
                          <CodeIcon sx={{mr:1}}/> Open ({displayIcOrLocal})
                          </Button>
                        </Tooltip>
                        </Grid>
                          
                    {displayWorker9000Text}

                    {iiWebpackDisplay}
                      </Grid>
                    </Box>

                  </Grid>
                  ] ; // end launchDisplay

    } else {
      
    if (canister.canisterNetwork != "ic") {
        
        launchDisplay = [
          <Grid key={1} item xs={12}  >
            <Box sx={{display:"flex", border: "1px solid #9f9f9f", borderRadius:2, p:1}}>
              
              <Typography variant="body2" sx={{fontSize: '.7rem', mb:1, mt:1}}>
              NOTE: You can use the locally deployed Canidid UI to interact with this canister, or connect to the worker to do CLI canister calls using dfx.
              </Typography>
            </Box>

          </Grid>
        ];
        
      } // end if local deployment
    } // end if an asset canister


    if (displayLocation == "manage") {
        cardTitle = [
          <Title key={1}>
            
              <CodeIcon sx={{mr:1}}/> Canister: {canister.canisterName} ({canister.id.toString()})
            
            </Title>
        ];
    
      } else if (displayLocation == "environmentProfiles") {

        if (canister.canisterNetwork == "ic" ) {

          cardTitle = [];
            
        } else {

          cardTitle = [];
            
        } // end if internet commputer
      } else if (displayLocation == "deployment") {
  
      if (canister.canisterNetwork == "ic" ) {

        cardTitle = [];
          
      } else {

        cardTitle = [];
          
      } // end if internet commputer
    } // end if display location
    
    const handleClick =  (thisWhereTo) => {
    
      console.log ("CanisterCard:" + canister.id);
      myContext.setActiveCanister(canister);
      props.changeStateAgent("manage");
  
    } // end handle click

    


    const removeConfirm =  () => {
    
      console.log ("Need to Confirm Removal");
      setRemoveConfirmed(true);
      
  
    } // end removeConfirm

    const removeProfile = async (thisCanisterName) => {
    
      console.log ("thisCanisterName: ", thisCanisterName);
      setRemoveProcessing(true);

      // first we submit to the updatCanister 
      // (canisterually this will be add or update)

      const theCanisterObject = {
        id: canister.id,
        name: canister.name,
        category: canister.category,
        description: canister.description,
        dfxJson: canister.dfxJson,
        canisterName: canister.canisterName,
        canisterType: canister.canisterType,
        canisterNetwork: canister.canisterNetwork,
        canisterId: canister.canisterId,
        identityId:canister.identityId ,
        projectId: canister.projectId,
        environmentId: canister.environmentId,
        lastDeploymentId: -1,
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
      }; // end theCanisterObject




        
        let newIcUpdateResponse = await icpmDapp.manageCanisterMain(apiToken,theCanisterObject);

        console.log(newIcUpdateResponse);

        if (newIcUpdateResponse.msg != "") {

            alert ("there was an issue"+ newIcUpdateResponse.msg);
            console.log (newIcUpdateResponse);

        } else {
          
          
            console.log("success removal of Profile ");
            props.fetchCompleteEnvironment() ;

            
        } 
        

        console.log("done with removal");

      
    } // end removeProfile

    var removeDisplay = [];

    removeDisplay = [
      <Grid key={1} item xs={12} sx={{display:"flex"}} >
      <Button onClick={() => {removeConfirm()}} color="error" variant="outlined" sx={{ml:1, mr:1, flexGrow:1 , justifyContent: "flex-start"}}>
      <CodeIcon sx={{mr:1}}/> Remove Profile
      </Button> 
      </Grid>
    ] ; // end removeDisplay

    if (removeConfirmed == true) {

      removeDisplay = [
        <Grid  key={1} item xs={12} sx={{display:"flex"}} >
        <Button onClick={() => {removeProfile()}} color="error" variant="outlined" sx={{ml:1, mr:1, flexGrow:1 , justifyContent: "flex-start"}}>
        <CodeIcon sx={{mr:1}}/> Sure?
        </Button> 
        </Grid>
      ] ; // end removeDisplay


    } // end if an asset canister

    if (removeProcessing == true) {

      removeDisplay = [
        <Grid  key={1} item xs={12} sx={{display:"flex"}} >
        <Button onClick={() => {removeConfirm()}} variant="outlined" sx={{ml:1, mr:1, flexGrow:1 , justifyContent: "flex-start"}}>
        <CodeIcon sx={{mr:1}}/> Removing
        </Button> 
        </Grid>
      ] ; // end removeDisplay


    } // end if an asset canister
    
    if (displayLocation == "environmentProfiles") {
      return (
        <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
          {cardTitle}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={0}>
                <GridCardListItem title="Name" value={canister.canisterName}/>
                <GridCardListItem title="Type" value={canister.canisterType}/>
                <GridCardListItem title="canisterId" value={canister.canisterId}/>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper key={1} elevation={4} sx={{bgcolor:"#ffffff", 
                border: '1px solid #9f9f9f',
                borderRadius:2,
                margin:0,
                width:"100%",
                display:"flex",
                p:1,
                mb:1,
                }}>  
                <Grid container spacing={1}>
                  {launchDisplay}
                  {removeDisplay}
                </Grid>
              </Paper>
            </Grid>
          </Grid>

        </CardContent>
      )// end return

    } else if (displayLocation == "deployment") {

      return (
        <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
          {cardTitle}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={0}>
                <GridCardListItem title="canisterName" value={canister.canisterName}/>
                <GridCardListItem title="Type" value={canister.canisterType}/>
                <GridCardListItem title="canisterId" value={canister.canisterId}/>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container sx={{display:'flex'}}>
                {launchDisplay}
              </Grid>
            </Grid>
          </Grid>

        </CardContent>
      )// end return

    } else {
        // now we are in the list

        if (canister.lastDeploymentId == 0 ) {

          return (
            <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
              {cardTitle}
              <Grid container spacing={0}>
                  <GridCardListItem title="Category" value={canister.category}/>
                  <GridCardListItem title="Type" value={canister.canisterType}/>
                  <GridCardListItem title="canisterName" value={canister.canisterName}/>
                  <GridCardListItem title="Last Updated" value={canister.lastUpdated}  itemType="date-icNano"/>
                  {/*
                  <GridCardListItem title="Description" value={canister.description}/>
                  */}
                  <GridCardListItem title="dfxJson" value={canister.dfxJson}/>
                  <GridCardListItem title="canisterNetwork" value={canister.canisterNetwork}/>
                  <GridCardListItem title="canisterId" value={canister.canisterId}/>
                  <GridCardListItem title="identityId" value={canister.identityId.toString()}/>
                  <GridCardListItem title="projectId" value={canister.projectId.toString()}/>
                  <GridCardListItem title="environmentId" value={canister.environmentId.toString()}/>
                  <GridCardListItem title="Create Date" value={canister.dateCreated}  itemType="date-icNano"/>
                </Grid>
                ({(canister.id != 0) ? canister.id.toString() : "New"})
            </CardContent>
          )// end return

        } else {

          return (
            <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
              {cardTitle}
              <Grid container spacing={0}>
                  <GridCardListItem title="Category" value={canister.category}/>
                  <GridCardListItem title="Type" value={canister.canisterType}/>
                  <GridCardListItem title="canisterName" value={canister.canisterName}/>
                  <GridCardListItem title="Last Updated" value={canister.lastUpdated}  itemType="date-icNano"/>
                  {/*
                  <GridCardListItem title="Description" value={canister.description}/>
                  */}
                  <GridCardListItem title="dfxJson" value={canister.dfxJson}/>
                  <GridCardListItem title="canisterNetwork" value={canister.canisterNetwork}/>
                  <GridCardListItem title="canisterId" value={canister.canisterId}/>
                  <GridCardListItem title="identityId" value={canister.identityId.toString()}/>
                  <GridCardListItem title="projectId" value={canister.projectId.toString()}/>
                  <GridCardListItem title="environmentId" value={canister.environmentId.toString()}/>
                  <GridCardListItem title="lastDeploymentId" value={canister.lastDeploymentId.toString()}/>
                  <GridCardListItem title="Create Date" value={canister.dateCreated}  itemType="date-icNano"/>
                </Grid>
                ({(canister.id != 0) ? canister.id.toString() : "New"})
            </CardContent>
          )// end return

        } // end if this is a profile

      }// end if displayLocation

} // end function CanisterCard



export default CanisterCard;
