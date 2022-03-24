import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import LoadEvents from './LoadEvents';
import ListEvents from './ListEvents';
import ManageEvents from './ManageEvent';

const EventsMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  var whereTo = myContext.whereToName;
  const setWhereTo = myContext.setWhereTo
  if (whereTo == "" ) {
    //setWhereTo ("load");
    whereTo="load";
  }  


  let history = useHistory();
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchEventsList = async ()  =>  {

      // going to creat call to canister
      console.log ("1- fetchEventsList - before await");
      
      const fetchData = await icpmDapp.getListOfEvents(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      //await sleep(500);
      console.log ("2- fetchEventsList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
        
        console.log (fetchData);
        console.log ("3- fetchEventsList - after logging return");
        // set the appContext which should redraw the component

        setWhereTo ("list");
        myContext.setListOfEvents (fetchData);
        console.log ("4- fetchEventsList - after setstateListData");
      } // end if error 

      
  } // end fetchEventsList

    

  const handleClick =  (thisWhereTo) => {
        
    console.log ("EnviromentsMain-handleClick - start handleClick");

    console.log (whereTo);
    setWhereTo (thisWhereTo);

    console.log ("EnviromentsMain-handleClick - end handleClick");

  } // end handle click
  
  // this resets the scroll inside of the stage box on every render
    // this resets the scroll inside of the stage box on every render
  const stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  }

  return (
    <>
      <EventsNav  fetchEventsList={fetchEventsList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const EventsNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageEvents whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageEvents whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchEventsList = props.fetchEventsList;
    fetchEventsList();


    return (
        <>
        <LoadEvents whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListEvents whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end EventsMain

export default EventsMain;
