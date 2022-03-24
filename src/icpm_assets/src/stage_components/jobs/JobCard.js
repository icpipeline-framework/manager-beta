import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ConstructionIcon from '@mui/icons-material/Construction';
import 'regenerator-runtime/runtime';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';

/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import RefButton from '../../components/RefButton';
import GridCardListItem from '../../components/GridCardListItem';
import WatchingJob from './WatchingJob';

const JobCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const displayLocation  = props.displayLocation ;
    var [job, setJob] = useState(props.job);
    

    let history = useHistory();
    const location = useLocation();
  

//    const job = props.job;
    console.log ("JobCard - Inside my JobCard");

    var displayJobType = job.jobType;
    if (job.jobType == "Install II")
      displayJobType = "Install Internet Identity";

    var cardTitle = [
      <Title key={1}>
         <ConstructionIcon sx={{mr:1}}/> Job: {displayJobType}
        </Title>
    ];
  
    if (displayLocation == "deployment") {
  
      cardTitle = [
        
      ];
      
    }
      

    var refButton = [] ;

    if (displayLocation != "deployment") {
        
      if (job.refType == "Deployment" && job.refId > 0 ) {
        refButton.push (
          <Grid item xs key={1} sx={{display: 'flex', mb:2}}>
          <RefButton displayLocation="job"  whereTo="deployment" refId={job.refId} />
          </Grid>
        ) ;
      }// end if 
      if (job.environmentId > 0 ) {
        refButton.push (

          <Grid item xs key={2} sx={{display: 'flex', mb:2}}>
          <RefButton displayLocation="job" whereTo="environment" refId={job.environmentId} />
          </Grid>
        ) ;
      }// end if 
    }// end if this is for the deployment 

    var displayIsDeploying = [];
    if ((job.jobType == "Install II" || job.jobType == "Enable ttyd Bash HTTPS" || job.jobType == "Disable ttyd Bash HTTPS" )  && (job.status == "Ready" || job.status == "Assigned" || job.status == "Running")) {
      
        displayIsDeploying.push (
          <WatchingJob key={1} job={job} setJob={setJob} />
        );
    }// end if this running





    return (
      <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
        {cardTitle}
        <Grid container spacing={0} >
        {refButton}
        {displayIsDeploying}
        
        </Grid>
        <Grid container spacing={0}>
            <GridCardListItem title="Status" value={job.status}/>
            <GridCardListItem title="Last Updated" value={job.dateCreated}  itemType="date-icNano"/>
            <GridCardListItem title="Reference" value={job.refType}/>
            <GridCardListItem title="Reference Identifier" value={job.refId.toString()}/>
            <GridCardListItem title="Worker" value={job.workerId.toString()}/>
            <GridCardListItem title="Environment" value={job.environmentId.toString()}/>
            <GridCardListItem title="Create Date" value={job.dateCreated}  itemType="date-icNano"/>
          </Grid>
          ({(job.id != 0) ? job.id.toString() : "New"})
      </CardContent>
    )// end return
} // end function JobCard



export default JobCard;
