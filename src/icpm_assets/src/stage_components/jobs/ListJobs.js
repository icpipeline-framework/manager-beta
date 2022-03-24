import React, { useState,useContext } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import JobCard from './JobCard';


const ListJobs = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const listOfJobs = myContext.listOfJobsName ;

    
  console.log ("ListOfJobs - Inside my ListOfJobs");
  let jobsLength  = listOfJobs.length ;
  

  const handleClick =  () => {

    /// create a blank object 



    const theJobObject = {
      id: 0,
      status:"",
      jobType: "",
      refType: "",
      refId: 0,
      workerId: 0,
      environmentId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theJobObject
    
        
    console.log ("ListOfJobs-handleClick - start handleClick");
    console.log ("New Job ID:" + theJobObject.id);
    myContext.setActiveJob(theJobObject);
    props.changeStateAgent ("manage");

  } // end handle click

  if (jobsLength > 0) {
    console.log ("listOfJobs - this is the stateListData:")
    console.log (listOfJobs)
    let theJobList = [];

    for (let i = 0; i < jobsLength; i++) {
        
      theJobList.push (
            
            <JobCard changeStateAgent={props.changeStateAgent} key={listOfJobs[i].id.toString()} job={listOfJobs[i]}/>
            
        )

    } // end for 
    // most recent on top by reversing
    theJobList.reverse();

      


      return (
          <>
          <Title><ConstructionIcon sx={{mr:1}}/>Jobs
          
         
          
          </Title>
          {/*<Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Job</Button>*/}


           {theJobList}
          
           </>
      ) /// end return
  } else  {
        return (
          <>
          <Title><ConstructionIcon sx={{mr:1}}/>Jobs
          
         
          
          </Title>
         {/* <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Job</Button>*/}

         <Box sx={{ borderBottom: 0, width:"100%", bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Jobs.   
            </Typography>

          </Box>
          
           </>
        )// end return
      
  }// end if there is any Jobs  

} // end of ListJobs

export default ListJobs;
