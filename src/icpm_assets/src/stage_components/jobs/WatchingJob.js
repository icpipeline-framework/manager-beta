

import React, { useContext, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CardActionArea from '@mui/material/CardActionArea';
import { PortableWifiOff, StayPrimaryLandscape } from '@mui/icons-material';

/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';


const WatchingJob = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  var [completeJob, setCompleteJob] = useState("");
  var [isFetching, setIsFetching] = useState(false);
  var job = props.job ;



  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchCompleteJob = async ()  =>  {
    await myContext.sleep (6000) ;
    console.log ("Waiting for Job start timer");
    

    if (!isFetching) {
      // going to creat call to canister
      console.log ("1- fetchCompleteJob - before await");
      
      
      const fetchData = await icpmDapp.getCompleteJobMain(apiToken,job.id)
      
      console.log ("2- fetchCompleteJob - after await");
      console.log (fetchData);
      console.log ("3- fetchCompleteJob - after logging return");
      // set the state which should redraw the component
      
      
       props.setJob (fetchData.jobObject);
      
      console.log  ("3.5- fetchCompleteJob - THE Msg  = " + fetchData.msg);
      console.log ("4- fetchCompleteJob - after setstateListData");

    } else {

     console.log ("**** ACTIVELY FETCHING *****");
    }
  } // end fetchCompleteJob
  
  console.log ("Waiting for Job Begin ");
  
  if (!completeJob.responseStatus) {
   
   fetchCompleteJob();
  }
    



  const handleClick =  () => {
        
    console.log ("Watching Installation-handleClick - start handleClick");


    console.log ("Watching Installation-handleClick - end handleClick");

  } // end handle click

    return (
    <> 

      <Paper elevation={3} key={1} sx={{width:"100%", p:1, mb:2,borderRadius:2, border: "1px solid #9f9f9f"}}>
          <Typography variant="body2" align="center" color="text.secondary">
              Watching Job {job.id.toString()}
          </Typography>
          <LinearProgress  sx={{ml:2, mr:2}}/>
      </Paper>          

    </>
    );
  }// end WatchingJob

  export default WatchingJob ;
  