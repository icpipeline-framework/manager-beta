  import React, { useContext,useState } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadEnvironments from './LoadEnvironments';
import ListEnvironments from './ListEnvironments';
import EnvironmentDashboard from './EnvironmentDashboard';
import ManageEnvironments from './ManageEnvironment';


const EnvironmentsMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const apiToken = myContext.apiTokenName;
  const authClient = myContext.authClientName;
  const icpmDapp = myContext.icpmDappName;
  var whereTo = myContext.whereToName;
  const jumpId = myContext.jumpIdName;
  const setWhereTo = myContext.setWhereTo
  if (whereTo == "" ) {
    //setWhereTo ("load");
    whereTo= "load";
  }  
  console.log ("Environments Main: ",whereTo);




  let history = useHistory();
  

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchEnvironmentsList = async ()  =>  {

      
      // going to creat call to canister
      console.log ("1- fetchEnvironmentsList - before await");
      
      const fetchData = await icpmDapp.getListOfEnvironments(apiToken,"").catch(e => { return "ICPM Error: " + e })
      //await sleep(500);
      console.log ("2- fetchEnvironmentsList - after await");

      console.log ("fetchData.toString:",fetchData.toString());

      if (typeof fetchData == "string") {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        

      } else {

        console.log (fetchData);
        console.log ("3- fetchEnvironmentsList - after logging return");
        // set the appContext which should redraw the component

        console.log ("4- fetchEnvironmentsList - after setstateListData");

        setWhereTo ("list");
        myContext.setSetListOfEnvironments (fetchData);
      }// end if error
      
  } // end fetchEnvironmentsList

  const handleClick =  (thisWhereTo) => {
        
    console.log ("EnviromentsMain-handleClick - start handleClick");

    console.log (whereTo);
    setwhereTo (thisWhereTo);

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
      
      <EnvironmentsNav myContext={myContext} fetchEnvironmentsList={fetchEnvironmentsList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const EnvironmentsNav = (props) => {
  const whereTo = props.whereTo ;
  const myContext = props.myContext ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageEnvironments whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageEnvironments whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="dashboard") {
    return (
        <>
        <EnvironmentDashboard whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
   
  } else if (whereTo =="load") {
    const fetchEnvironmentsList = props.fetchEnvironmentsList;
    fetchEnvironmentsList();
    return (
        <>
        <LoadEnvironments whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if

  return (
      <>
        <ListEnvironments whereTo={whereTo}  changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end EnvironmentsMain

export default EnvironmentsMain;
