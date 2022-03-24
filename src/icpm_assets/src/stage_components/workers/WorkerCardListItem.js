import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import WorkerCard from './WorkerCard';

const WorkerCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const displayLocation = props.displayLocation;

    const worker = props.worker;
    console.log ("ListOfWorkers - Inside my ListOfWorkers");
 

    const handleClick =  (thisWhereTo) => {
    
      console.log ("WorkerCard:" + worker.id);
      myContext.setActiveWorker(worker);
      props.changeStateAgent("manage");
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{ mb:0,  borderRadius:2}}>
        
        <WorkerCard worker={worker} displayLocation={displayLocation}/>
        
        </Card>
    )// end return
} // end function WorkerCardListItem



export default WorkerCardListItem;
