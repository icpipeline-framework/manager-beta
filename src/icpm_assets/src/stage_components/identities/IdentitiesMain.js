import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadIdentities from './LoadIdentities';
import ListIdentities from './ListIdentities';
import ManageIdentities from './ManageIdentity';

const IdentitiesMain = () => {

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

  const fetchIdentitiesList = async ()  =>  {

      // going to creat call to canister
      console.log ("1- fetchIdentitiesList - before await");
      
      const fetchData = await icpmDapp.getListOfIdentities(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      //await sleep(500);
      console.log ("2- fetchIdentitiesList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
        
        console.log (fetchData);
        console.log ("3- fetchIdentitiesList - after logging return");
        // set the appContext which should redraw the component

        setWhereTo ("list");
        myContext.setListOfIdentities (fetchData);
        console.log ("4-  fetchIdentitiesList - after setstateListData");
      } // end if error 
      
  } // end fetchIdentitiesList

    

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
      <IdentitiesNav  fetchIdentitiesList={fetchIdentitiesList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const IdentitiesNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageIdentities whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageIdentities whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchIdentitiesList = props.fetchIdentitiesList;
    fetchIdentitiesList();


    return (
        <>
        <LoadIdentities whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListIdentities whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end IdentitiesMain

export default IdentitiesMain;
