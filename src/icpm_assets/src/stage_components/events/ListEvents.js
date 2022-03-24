import React, { useState,useContext } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import EventCard from './EventCard';
import EventCardListItem from './EventCardListItem';


const ListEvents = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  var listOfEvents =[];
  let displayLocation = props.displayLocation;
  
  if (props.listOfEvents) {
    listOfEvents = props.listOfEvents;
  } else {
    listOfEvents = myContext.listOfEventsName ;
  }// end if we passed a list of events
  
  var sortDisplayDefault = "" ;

  if (listOfEvents.length == 17 ) {
    sortDisplayDefault = "(last 17)" ;

  }
  const [sortDisplay, setSortDisplay] = useState(sortDisplayDefault);
  const [sortTitle, setSortTitle] = useState("(by creation)");
  const [creationVariant, setCreationVariant] = useState("contained");
  const [dateVariant, setDateVariant] = useState("outlined");
  const [nameVariant, setNameVariant] = useState("outlined");
    
  console.log ("ListOfEvents - Inside my ListOfEvents");
  let eventsLength  = listOfEvents.length ;

  const handleClick =  () => {

    /// create a blank object 



      const theEventObject = {
        id: 0,
        eventType: "",
        mainRefType: "",
        environmentId: 0,
        projectId: 0,
        deploymentId: 0,
        workerId: 0,
        eventText: "",
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
      } // end theEventObject

    
        
    console.log ("ListOfEvents-handleClick - start handleClick");
    console.log ("New Event ID:" + theEventObject.id);
    myContext.setActiveEvent(theEventObject);
    props.changeStateAgent ("manage");

  } // end handle click



  // now we build the title
  var listTitle = [
    <Title key={1} ><FormatListBulletedIcon sx={{mr:1}}/>Events {sortDisplay}
    </Title>
  ];

  if (displayLocation == "dashboard") {

    listTitle = [
      
      <Box key={1} sx={{bgcolor:cyan[50],
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          float: 'center'}} >
        <FormatListBulletedIcon sx={{mr:1}}/>Log Events
      </Box>
      
    ];
    
  }


  const sortList =  (sortType) => {

    // now we sort environments based on name
    var theNewList = [...listOfEvents] ;
    var thisSortTitle = "";
    var thisDateVariant = "outlined";
    
    
    
    if (sortType =="localDate") {

      thisDateVariant = "contained";

      if (dateVariant =="outlined") {

        thisSortTitle = "(by local date)";

        theNewList = theNewList.sort(function (a, b) {
              //console.log ("Number(a.localTime): ", Number(a.localTime))
              //console.log ("Number(b.localTime): ", Number(b.localTime))
              if (Number(a.localTime) > Number(b.localTime)) return  1;
              if (Number(a.localTime) < Number(b.localTime)) {
              return  -1;
              }
              return 0;
          });

      } else {
        if (sortTitle == "(by local date-reverse)" ) {
          thisSortTitle = "(by local date)";
        } else {
          thisSortTitle = "(by local date-reverse)";
        }
        theNewList  = theNewList.reverse();

      }// end if outlined

      

    } // end if sortType

    //setSortTitle (thisSortTitle);
    //setDateVariant (thisDateVariant);
    
    

    //myContext.setSetListOfEvents (theNewList);
    return theNewList ;

    

} // end sortList

listOfEvents = sortList ("localDate") ;


  if (eventsLength > 0) {
    //console.log ("listOfEvents - this is the stateListData:")
    //console.log (listOfEvents)
    let theEventList = [];

    for (let i = 0; i < eventsLength; i++) {
        
      theEventList.push (
            <EventCard key={i} changeStateAgent={props.changeStateAgent} event={listOfEvents[i]} displayLocation={displayLocation}/>
        )

    } // end for 
    // most recent on top by reversing 
    theEventList.reverse();
      


      return (
          <>
          {listTitle}
          {/*<Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Event</Button>*/}


           {theEventList}
          
           </>
      ) /// end return
  } else  {
        return (
          <>
          {listTitle}
         {/* <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1 }}>Create New Event</Button>*/}

          
         <Box sx={{ borderBottom: 0, width:"100%", bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Events.  
            </Typography>

          </Box>
          
           </>
        )// end return
      
  }// end if there is any Events  

} // end of ListEvents

export default ListEvents;
