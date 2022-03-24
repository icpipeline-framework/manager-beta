import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadDeployments from './LoadDeployments';
import ListDeployments from './ListDeployments';
import DeploymentDashboard from './DeploymentDashboard';

const DeploymentsMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  var whereTo = myContext.whereToName;
  const jumpId = myContext.jumpIdName;
  const setWhereTo = myContext.setWhereTo
  if (whereTo == "" ) {
    //setWhereTo ("load");
    whereTo= "load";
  }  



  let history = useHistory();
  

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchDeploymentsList = async ()  =>  {

      // going to creat call to canister
      console.log ("1- fetchDeploymentsList - before await");
      
      const fetchData = await icpmDapp.getListOfDeployments(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      //await sleep(500);
      console.log ("2- fetchDeploymentsList - after await");


      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
        
        console.log (fetchData);
        console.log ("3- fetchDeploymentsList - after logging return");
        // set the appContext which should redraw the component

        console.log ("4- fetchDeploymentsList - after setstateListData");
        myContext.setListOfDeployments (fetchData);
        setWhereTo ("list");
      } // end if error

      
  } // end fetchDeploymentsList


  // this resets the scroll inside of the stage box on every render
  
  const stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  }

  return (
    <>
      <DeploymentsNav fetchDeploymentsList={fetchDeploymentsList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const DeploymentsNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="dashboard") {
    return (
        <>
         <DeploymentDashboard whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {

    const fetchDeploymentsList = props.fetchDeploymentsList;
    fetchDeploymentsList();

    return (
        <>
        <LoadDeployments whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListDeployments whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end DeploymentsMain

export default DeploymentsMain;
