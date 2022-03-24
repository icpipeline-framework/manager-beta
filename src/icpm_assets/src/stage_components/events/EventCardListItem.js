import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import EventCard from './EventCard';

const EventCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const event = props.event;
    console.log ("ListOfEvents - Inside my ListOfEvents");
 

    const handleClick =  (thisWhereTo) => {
    
      console.log ("EventCard:" + event.id);
      myContext.setActiveEvent(event);
      props.changeStateAgent("manage");
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{m:1, border: '1px solid #9f9f9f', borderRadius:2}} onClick={() => { handleClick("new")}}>
        <CardActionArea>
        <EventCard event={event}/>
        </CardActionArea>
        </Card>
    )// end return
} // end function EventCardListItem



export default EventCardListItem;
