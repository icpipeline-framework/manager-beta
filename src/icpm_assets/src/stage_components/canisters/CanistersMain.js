import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadCanisters from './LoadCanisters';
import ListCanisters from './ListCanisters';
import ManageCanisters from './ManageCanister';

const CanistersMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  var whereTo = myContext.whereToName;
  const setWhereTo = myContext.setWhereTo
  if (whereTo == "" ) {
    //setWhereTo ("load");
    whereTo = "load";
  }  


  let history = useHistory();
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchCanistersList = async ()  =>  {

      // going to creat call to canister
      console.log ("1- fetchCanistersList - before await");
      
      const fetchData = await icpmDapp.getListOfCanisters(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      //await sleep(500);
      console.log ("2- fetchCanistersList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
        
        console.log (fetchData);
        console.log ("3- fetchCanistersList - after logging return");
        // set the appContext which should redraw the component

        setWhereTo ("list");
        myContext.setListOfCanisters (fetchData);
        console.log ("4-  fetchCanistersList - after setstateListData");
      } // end if error 
      
  } // end fetchCanistersList

    

  const handleClick =  (thisWhereTo) => {
        
    console.log ("EnviromentsMain-handleClick - start handleClick");

    console.log (whereTo);
    setWhereTo (thisWhereTo);

    console.log ("EnviromentsMain-handleClick - end handleClick");

  } // end handle click
  
  // this resets the scroll inside of the stage box on every render
  const stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  }

  return (
    <>
      <CanistersNav  fetchCanistersList={fetchCanistersList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const CanistersNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageCanisters whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageCanisters whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchCanistersList = props.fetchCanistersList;
    fetchCanistersList();


    return (
        <>
        <LoadCanisters whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListCanisters whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end CanistersMain

export default CanistersMain;
