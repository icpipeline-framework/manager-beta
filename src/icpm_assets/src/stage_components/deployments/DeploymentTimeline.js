import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LinearProgress from '@mui/material/LinearProgress';

import { CardActionArea, Typography } from '@mui/material';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import DeploymentCard from './DeploymentCard';

const DeploymentTimeline = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;

    
    const displayLocation = props.displayLocation;
    console.log ("DeploymentCardListItem - Inside my DeploymentCardListItem");
  


    const completeDeployment = props.completeDeployment;
    const activeDeploymentId = props.completeDeployment;
    

    
    if (completeDeployment.responseStatus ) {
        var isDeploying = [];
        if (completeDeployment.deploymentObject.status == "In Progress" || completeDeployment.deploymentObject.status == "Ready") {
            props.reloadTimeline();
            isDeploying.push (
                <Paper elevation={3} key={1} sx={{width:"100%", p:1, borderRadius:2, border: "1px solid #9f9f9f"}}>
                    <Typography variant="body2" align="center" color="text.secondary">
                        Watching Deployment
                    </Typography>
                   <LinearProgress  sx={{ml:2, mr:2}}/>
                </Paper>
            );
        }// end if this running


        // now we sort events based on local time
        var sortedEventObjectsByLocalTime = [...completeDeployment.eventObjects] ;
        //console.log ("BEFORE sortedEventObjectsByLocalTime:", sortedEventObjectsByLocalTime)
        sortedEventObjectsByLocalTime = sortedEventObjectsByLocalTime.sort(function (a, b) {
            //console.log ("Number(a.localTime): ", Number(a.localTime))
            //console.log ("Number(b.localTime): ", Number(b.localTime))
            if (Number(a.localTime) > Number(b.localTime)) return  1;
            if (Number(a.localTime) < Number(b.localTime)) {
            return  -1;
            }
            return 0;
        });
        let eventsLength = sortedEventObjectsByLocalTime.length;

        let theEventList = [];
        if (eventsLength > 0) {
            //console.log ("deploymentEvents - this is the stateListData:")
            

            for (let i = 0; i < eventsLength; i++) {
                if (sortedEventObjectsByLocalTime[i].eventType == "Status" ) {
                    
                    theEventList.push (
                        <TimelineStep key={i} stepTitle={sortedEventObjectsByLocalTime[i].eventText} stepType="completed" />
                    );
                } // end if type Status
            } // end for through the events
            
        } // end if there are eventsfor this deployment
        let firstDeploymentDeconstruct = [];
        // if  (completeDeployment.workerObject.lastDeploymentId > 0  && completeDeployment.workerObject.lastDeploymentId != completeDeployment.deploymentObject.id) {
        //     firstDeploymentDeconstruct.push (
        //         <TimelineStep stepTitle="DEPLOY - DECONSTRUCTING LAST DEPLOYMENT"  completedSteps={sortedEventObjectsByLocalTime }/>
        //     )
        // } // end if there was a deployment

        return (
            <Card elevation={3} sx={{ mb:2, p:1, borderRadius:2,
                border: '1px solid #9f9f9f',
                backgroundColor:"primary.superlight"}}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                            <Grid item xs >
                                <Typography variant="h6" sx={{mb:3}}>
                                <AltRouteIcon sx={{mr:1}}/>Deployment Job Steps: {completeDeployment.deploymentObject.status}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                {isDeploying}
                            </Grid>
                            <TimelineStep stepTitle="JOB START" completedSteps={sortedEventObjectsByLocalTime}/>
                            {firstDeploymentDeconstruct}
                            <TimelineStep stepTitle="DEPLOY - CLONING GIT REPOSITORY"  completedSteps={sortedEventObjectsByLocalTime}/>
                            <TimelineStep stepTitle="DEPLOY - NPM INSTALL"  completedSteps={sortedEventObjectsByLocalTime}/>
                            <TimelineStep stepTitle="DEPLOY - STARTING DFX REPLICA"  completedSteps={sortedEventObjectsByLocalTime}/>
                            <TimelineStep stepTitle="DEPLOY - DFX DEPLOY INITIATED"  completedSteps={sortedEventObjectsByLocalTime}/>
                            <TimelineStep stepTitle="DEPLOY - STARTING WEBPACK DEV SERVER"  completedSteps={sortedEventObjectsByLocalTime}/>
                            <TimelineStep stepTitle="JOB END"  stepType="description" completedSteps={sortedEventObjectsByLocalTime} />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        )// end return
    } else {
        fetchCompleteDeployment ();
        return (
            <Card elevation={5} sx={{m:0, mb:2, borderRadius:2, height:300}}>
                <Typography>
                    Loading ...
                </Typography>
            
            </Card>
        )// end return

    }
} // end function DeploymentTimeline


const TimelineStep = (props) => {
    
    const stepTitle = props.stepTitle;
    const completedSteps = props.completedSteps;
    //console.log (completedSteps)
    
    var isComplete = completedSteps.filter(e => {
                if (e.eventType == "Status" && (e.eventText == stepTitle || e.eventText == (stepTitle + " - II VERSION" ))) {
                    return true
                } else 
                return false
                }   
                );

    if (isComplete.length > 0 ) {

        return (
          
    
            <Grid item xs={12}>
                <Box sx={{border:"2px solid", 
                    borderColor:"success.main", 
                    ml:2,
                    mr:2,
                    mb:1, 
                    borderRadius:2, 
                    backgroundColor: "#ffffff",
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    float: 'center',
                    justifyContent:"center"}} >
                <CheckCircleOutlinedIcon sx={{mr:1}} fontSize="small" />
                <Typography variant="body2"  align="center" color="primary.text">
                {stepTitle}
                </Typography>
                </Box>
            </Grid>
        )
    } else {

        return (
          
    
            <Grid item xs={12}>
                <Box sx={{border:"2px solid #7f7f7f",  ml:2,mr:2,mb:1, borderRadius:2, backgroundColor: "primary.superlight", justifyContent:"center"}} >
                <Typography variant="body2" align="center" color="text.secondary" >
                {stepTitle}
                </Typography>
                </Box>
            </Grid> 
          )
    } // end if step type 
    
    

} // end TimelineStep

export default DeploymentTimeline;
