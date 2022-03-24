import React, { useContext, useRef, useState, useEffect} from 'react';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import 'regenerator-runtime/runtime';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import GridCardListItem from '../../components/GridCardListItem';
import RefButton from '../../components/RefButton';
import { Typography } from '@mui/material';


const EventCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const displayLocation = props.displayLocation
    
    var [isOverflow, setIsOverflow] = useState(false);

    const elementEventRef = useRef();

    useEffect(() => {

      if (event.eventType != "Status") {

        const textElement = elementEventRef.current;
        //console.log(textElement.clientHeight); // logs <div>I'm an element</div>
        if (textElement.clientHeight > 502 && !isOverflow) {
          
          
          setIsOverflow (true) ;
        }
      }// end if this is not a status view

    }, []);

    const event = props.event;
    console.log ("EventCard - Inside my EventCard");
    var refButton = [] ;
    var refTitle = [] ;

      if (event.deploymentId > 0 ) {

        if (displayLocation != "dashboard") {

          if (event.deploymentId > 0 ) {
            refButton.push (
              <RefButton key={1} whereTo="deployment" refId={event.deploymentId} />
            ) ;
          }// end if 
          if (event.environmentId > 0 ) {
            refButton.push (
              <RefButton key={2} whereTo="environment" refId={event.environmentId} />
            ) ;
          }// end if 
          if (event.projectId > 0 ) {
            refButton.push (
            <RefButton key={3} whereTo="project" refId={event.projectId} />
            ) ;
          } // end if 
        } // end if dash 
        
        refTitle = [
          `(id: ${event.deploymentId})`
        ] ;
            
        
      } // end build of the button
    if (event.eventType == "Status") {

      return (
        <CardContent sx={{border: "1px #9f9f9f solid", bgcolor:"#FFFFFF", borderRadius:2, mb:2,width:"100%"}}>
        
          <Grid container sx={{bgcolor: cyan[50],p:1, mr:1 ,border: "1px #9f9f9f solid",borderRadius:2 }}>
          
          <GridCardListItem title="Date" value={event.dateCreated} itemType="date-icNano"/>
          <GridCardListItem title="Local Date" value={event.localTime} itemType="date-icNano"/>
          
           <Grid item  sx={{display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                minWidth:350,
                float: 'center'}} >
              <Box >
                <FormatListBulletedIcon sx={{mr:1}}/> : {event.eventType} / {event.mainRefType} {refTitle} - {event.eventText}
                </Box>
           </Grid>
            <Grid item  align="right" sx={{ mr:2, justifyContent:"right", flexGrow:1}}>
              {refButton}
            </Grid>
          </Grid>
          
          ({(event.id != 0) ? event.id.toString() : "New"})
          
        </CardContent>
      )// end return
    } else {


        return (
          <CardContent sx={{border: "1px #9f9f9f solid", bgcolor:"#FFFFFF", borderRadius:2, mb:2,width:"100%"}}>
          
            <Grid container sx={{bgcolor: cyan[50],p:1, mr:1 ,border: "1px #9f9f9f solid",borderRadius:2 }}>
            <Grid container sx={{width: "100%"}} >
            <GridCardListItem title="Date" value={event.dateCreated} itemType="date-icNano"/>
            <GridCardListItem title="Local Date" value={event.localTime} itemType="date-icNano"/>
            </Grid>
            <Grid item sx={{display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexGrow:1,
                float: 'center'}} >
            <FormatListBulletedIcon sx={{mr:1}}/> : {event.eventType} / {event.mainRefType} {refTitle}
            </Grid>
            <Grid item align="right"  sx={{flexGrow: 1, mr:2, justifyContent:"right",}}>
              {refButton}
            </Grid>
            </Grid>
            <Grid container sx={{ p:1 }}>
            <Grid item sx={{width: "100%", overflow:"auto", fontSize:"12px", 
                      maxHeight: 500 ,
                      border: "1px #CFCFCF solid",
                      borderRadius:2 ,
                      p:1
                      }} >
            
            <pre ref={elementEventRef}>{event.eventText}</pre>
            
            </Grid>
            </Grid>
              <Typography variant="subtitle2" align="right"  color="text.secondary" sx={{fontStyle: 'italic' }}>
              {isOverflow ? "Please Scroll to View Complete Log" : ""}
              </Typography>
              ({(event.id != 0) ? event.id.toString() : "New"})
          </CardContent>
        )// end return
}// end if Status message
} // end function EventCard



export default EventCard;
