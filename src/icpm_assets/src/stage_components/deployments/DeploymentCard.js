import React, { useContext,useState } from 'react';
import { useHistory } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import GridCardListItem from '../../components/GridCardListItem';

const DeploymentCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const [short, setShort] = useState(props.short);

    let deployment = props.deployment;
    let completeDeployment  = props.completeDeployment;
    let displayLocation = props.displayLocation;
    

    let history = useHistory();
    
    if (completeDeployment) {
      deployment = completeDeployment.deploymentObject;

    }
    console.log ("DeploymentCard - Inside my DeploymentCard" + deployment.id);

    const handleClick =  (thisWhereTo) => {
    
      console.log ("DeploymentCard - click for short:" + deployment.id);
      setShort(!short);
  
    } // end handle click
    
    const jumpToDash =  (refWhereTo) => {
    
      console.log ("refWhereTo:" + refWhereTo);
      if (refWhereTo == "environment" && deployment.environmentId > 0) {
    
          myContext.setNavSection ("Environments")
          history.push ("/environments");
          myContext.setWhereTo ("dashboard") ;
          myContext.setJumpId (deployment.environmentId) ;

      } if (refWhereTo == "project" && deployment.projectId > 0) {
    
          myContext.setNavSection ("Projects")
          history.push ("/projects");
          myContext.setWhereTo ("dashboard") ;
          myContext.setJumpId (deployment.projectId) ;
      } // end if refWhereTo
  
    } // end jumpToDash

    var theCardTitle  = [
      <Title key={1}>
      <AltRouteIcon sx={{mr:1}}/> Deployment - {deployment.id.toString()} 
      </Title>
    ] ;

    if (props.changeStateAgent) {
      if (displayLocation != "dashboard") {
        
        theCardTitle= [
          <ThemeProvider key={1} theme={myContext.deploymentsThemeName}>

          <Tooltip title="Deployment Dashboard" placement="top" enterNextDelay={300}>
          <Button onClick={() => { props.changeStateAgent()}} variant="contained" sx={{ mb:2, width:"100%", justifyContent: "flex-start" }}>
                
          <AltRouteIcon sx={{mr:1}}/>D: {deployment.id.toString()} 
          
          </Button>
          </Tooltip>
          </ThemeProvider>
        ] ;
      }// end if displayLocation
    } // end if there is changeStateAgent

    if (displayLocation == "dashboard" ){
      theCardTitle  = [] ;
    }

    if (short) {

        return (
          <CardContent sx={{bgcolor:"#ffffff", border: "1px #9f9f9f solid"
                , borderRadius:2, borderRadius:2, width:"100%", mb:0}}>
            {theCardTitle}
            
            <Grid container spacing={0}>
              <GridCardListItem title="Status" value={deployment.status}/>
              <GridCardListItem title="Last Updated" value={deployment.lastUpdated} itemType="date-icNano"/>
            </Grid>
              {/*<Button onClick={() => { handleClick("new")}}>Click for complete card </Button>*/}
              <Typography  color="text.secondary" gutterBottom>
              

              
              </Typography>
          </CardContent>
        )// end return

    } else {

      let buttonContent = [
        <Grid key={1} container spacing={3} sx={{mb:2}}>
          <Grid item xs={6} >

          <ThemeProvider theme={myContext.environmentsThemeName}>
            
          <Tooltip title="Environment Dashboard" placement="top" enterNextDelay={300}>
          <Button onClick={() => { jumpToDash("environment")}}  variant="contained" sx={{ width:"100%" }}>
          <SettingsSystemDaydreamIcon sx={{mr:1}}/>E: {(completeDeployment.environmentObject.name) ? completeDeployment.environmentObject.name : "Blank"}
          </Button>
          </Tooltip>
          </ThemeProvider>
          </Grid>
          <Grid item xs={6} >
          <ThemeProvider theme={myContext.projectsThemeName}>
          <Tooltip title="Project Dashboard" placement="top" enterNextDelay={300}>
          <Button onClick={() => { jumpToDash("project")}}  variant="contained" sx={{width:"100%" }}>
          <AccountTreeIcon sx={{mr:1}}/>P: {(completeDeployment.projectObject.name) ? ""+completeDeployment.projectObject.name : "Blank"}  
          </Button>
          </Tooltip>
          </ThemeProvider>
          </Grid>
        </Grid>
      ]
      if (displayLocation == "environment" ){
        buttonContent  = [] ;
      }
      return  (
          <CardContent sx={{bgcolor:"#ffffff", border: "1px #9f9f9f solid",
            borderRadius:2, width:"100%", overflowX:"auto",
            mb:2}}>
           {theCardTitle}
            <Grid container spacing={0}>
              {buttonContent}
              <GridCardListItem title="Status" value={deployment.status}/>
              <GridCardListItem title="Last Updated" value={deployment.lastUpdated} itemType="date-icNano"/>
              <GridCardListItem title="dfx Identity Id" value={deployment.identityId.toString()}/>
              <GridCardListItem title="Deployment Notes" value={deployment.deploymentNotes}/>
              <GridCardListItem title="Repo" value={deployment.projectRepo} />
              <GridCardListItem title="Branch" value={deployment.projectRepoBranch}/>
              <GridCardListItem title="Start" value={deployment.executeStartTime} itemType="date-icNano"/>
              <GridCardListItem title="Finish" value={deployment.executeFinishTime} itemType="date-icNano"/>
              <GridCardListItem title="Create Date" value={deployment.dateCreated} itemType="date-icNano"/>
            </Grid>

          
          </CardContent>

          );

    }

} // end function DeploymentCard



export default DeploymentCard;
