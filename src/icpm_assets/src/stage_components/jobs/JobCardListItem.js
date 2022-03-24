import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import JobCard from './JobCard';

const JobCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const job = props.job;
    console.log ("ListOfJobs - Inside my ListOfJobs");
 

    const handleClick =  (thisWhereTo) => {
    
      console.log ("JobCard:" + job.id);
      myContext.setActiveJob(job);
      props.changeStateAgent("manage");
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{m:1, border: '1px solid #9f9f9f', borderRadius:2}} onClick={() => { handleClick("new")}}>
        <CardActionArea>
        <JobCard job={job}/>
        </CardActionArea>
        </Card>
    )// end return
} // end function JobCardListItem



export default JobCardListItem;
