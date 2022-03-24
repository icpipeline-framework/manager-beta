import React, { useState,useContext } from 'react';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import WorkerCard from './WorkerCard';


const ListWorkers = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const listOfWorkers = myContext.listOfWorkersName ;
  

    
  console.log ("ListOfWorkers - Inside my ListOfWorkers");
  let workersLength  = listOfWorkers.length ;

  const handleClick =  () => {

    /// create a blank object 

    

      const theWorkerObject = {
        id: 0,
        name: "",
        status: "",
        category: "",
        description: "",
        lastDeploymentId: 0,
        uniqueId: "",
        publicIp: "",
        privateIp: "",
        iiEnabled: "",
        dfxReplicaType: "",
        ttydHttpsEnabled: "",
        ttydHttpsCount: 0,
        lastTouch: 0,
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
      } // end theWorkerObject

    
        
    console.log ("ListOfWorkers-handleClick - start handleClick");
    console.log ("New Worker ID:" + theWorkerObject.id);
    myContext.setActiveWorker(theWorkerObject);
    props.changeStateAgent ("manage");

  } // end handle click

  if (workersLength > 0) {
    console.log ("listOfWorkers - this is the stateListData:")
    console.log (listOfWorkers)
    // we want to sort this list by last touch

    let theWorkerList = [];

    for (let i = 0; i < workersLength; i++) {
        
      theWorkerList.push (
            <WorkerCard changeStateAgent={props.changeStateAgent} key={listOfWorkers[i].id.toString()} worker={listOfWorkers[i]}/>
        )

    } // end for 
    // most recent on top by reversing

      theWorkerList.reverse();

    
      return (
          <>

          <Title><WorkspacesIcon sx={{mr:1}}/>Workers (by lastTouch)
          
         
          
          </Title>
         {/* <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Worker</Button>*/}


           {theWorkerList}

           </>
      ) /// end return
  } else  {
        return (
          <>
          <Title><WorkspacesIcon sx={{mr:1}}/>List of Workers
          
         
          
          </Title>
          {/*<Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Worker</Button>*/}

          <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            Awaiting Worker Registration.
            </Typography>

          </Box>
          
           </>
        )// end return
      
  }// end if there is any Workers  

} // end of ListWorkers

export default ListWorkers;
