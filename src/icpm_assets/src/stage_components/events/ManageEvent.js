import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import EventCard from './EventCard';

const ManageEvent = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeEvent = myContext.activeEventName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeEvent.id = " + activeEvent.id);
    
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [eventTypeText, setEventTypeValue] = useState(activeEvent.eventType);
  const [mainRefTypeText, setMainRefTypeValue] = useState(activeEvent.mainRefType);
  const [eventTextText, setEventTextValue] = useState(activeEvent.eventText);
  

/*
  const theEventObject = {
    id: activeEvent.id,
    eventType: eventTypeText,
    mainRefType: mainRefTypeText,
    environmentId: activeEvent.id,
    projectId: activeEvent.id,
    deploymentId: activeEvent.id,
    workerId: activeEvent.id,
    eventText: eventTextText,
    creatorId: activeEvent.creatorId,
    dateCreated: activeEvent.dateCreated,
    lastUpdated: activeEvent.lastUpdated,
  } // end theEventObject

  */


  const onEventTypeChange = (e) => setEventTypeValue(e.target.value);
  const onMainRefTypeChange = (e) => setMainRefTypeValue(e.target.value);
  const onEventTextChange = (e) => setEventTextValue(e.target.value);
  
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

      e.preventDefault();

      if (pending) return;

      setwhereTo ("pleaseWait");
      setPending(true);

      // first we submit to the updatEvent 
      // (eventually this will be add or update)


      const theEventObject = {
        id: activeEvent.id,
        eventType: eventTypeText,
        mainRefType: mainRefTypeText,
        environmentId: activeEvent.environmentId,
        projectId: activeEvent.projectId,
        deploymentId: activeEvent.deploymentId,
        workerId: activeEvent.workerId,
        eventText: eventTextText,
        creatorId: activeEvent.creatorId,
        dateCreated: activeEvent.dateCreated,
        lastUpdated: activeEvent.lastUpdated,
      } // end theEventObject




      
      let newIcUpdateResponse = await icpmDapp.manageEventMain(apiToken,theEventObject);

      setIcUpdateRresponse(icUpdateResponse);
      console.log(icUpdateResponse);
      if (newIcUpdateResponse != "done") {

          alert ("there was an issue" );
          alert (newIcUpdateResponse);

      } else {
          myContext.setActiveEvent (theEventObject);
          let listOfEvents = await icpmDapp.getListOfEvents(apiToken,"");
          myContext.setListOfEvents (listOfEvents);
          console.log(listOfEvents);
          //props.changeStateAgent ("list ");

            setwhereTo ("returnToList");
      } 
      

      setPending(false);
      console.log(eventTypeText);
      
      return false;

      
  }// end handleSubmit


    const handleReset = () => {
        setEventTypeValue("");
        setMainRefTypeValue("");
        setEventTextValue("");
        
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handle reset 
    const handleCancel = () => {
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handleCancel 

  
  return (
      <>
        <Title>
        <FormatListBulletedIcon sx={{mr:1}}/>Manage Event 
          </Title>
          
          <ManageEventNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onEventTypeChange={onEventTypeChange} 
                eventTypeText={eventTypeText}
                onMainRefTypeChange={onMainRefTypeChange}
                mainRefTypeText={mainRefTypeText}
                onEventTextChange={onEventTextChange}
                eventTextText={eventTextText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeEvent={activeEvent}/>
          
          

      </>
      
    )
} // end of ManageEvent

export default ManageEvent;

const ManageEventNav = (props) => {
    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageEventForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeEvent.id != 0) ? "updated this": "created a new"} Event.
            </Typography>
            <Button onClick={() => { props.parentchangeStateAgent ("list")}}  variant="contained" disabled={props.pending} sx={{ml:2, mr:2}}>Return to List of Events</Button>
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <EventCard key={props.activeEvent.id.toString()} event={props.activeEvent}/>
            </Box>

            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><FormatListBulletedIcon sx={{mr:1}}/>{(props.activeEvent.id != 0) ? "Updating": "Creating New"} Event</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageEventNav


const ManageEventForm = (props) => {


    return (
      <>



      <Typography variant="body" >
      {(props.theProps.activeEvent.id != 0) ? "Update Event: ": "Create Event: "}Please fill out this form
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <FormTextField 
          onChange={props.theProps.onEventTypeChange}
          value={props.theProps.eventTypeText}
          label={"Event Type"} //optional
          helperText="This is the event type (Log, Alert, Warning, Error) "
      />  
      <FormTextField
          onChange={props.theProps.onMainRefTypeChange}
          value={props.theProps.mainRefTypeText}
          label={"Main Ref Type"} //optional
          helperText="Main reference category for this event (Environment, Project, Deployment, Worker, App)"
      />
      <FormTextField
          onChange={props.theProps.onEventTextChange}
          value={props.theProps.eventTextText}
          label={"Event Message Text"} //optional
          helperText="This is the actual message in the Event"
          multiline={true}
          rows={2}
      />
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeEvent.id != 0) ? "("+props.theProps.activeEvent.id +")": "(New)"}
      </>
    ) // end return


} // end ManageEventForm

