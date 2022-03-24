import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadWorkers from './LoadWorkers';
import ListWorkers from './ListWorkers';
import ManageWorkers from './ManageWorker';

const WorkersMain = () => {

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

  const fetchWorkersList = async (listOfWorkers)  =>  {

      // going to creat call to canister
      console.log ("1- fetchWorkersList - before await");
      
      const fetchData = await icpmDapp.getListOfWorkers(apiToken,"").catch(e => { return "ICPM Error: " + e });
      
      //await sleep(500);
      
      console.log ("2- fetchWorkersList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
      } else {
        console.log (fetchData);
        console.log ("3- fetchWorkersList - after logging return");
        // set the appContext which should redraw the component

        setWhereTo ("list");
        myContext.setListOfWorkers (fetchData);
        console.log ("4- fetchWorkersList - after setstateListData");
      } // end if error 
      
  } // end fetchWorkersList


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
      <WorkersNav fetchWorkersList={fetchWorkersList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const WorkersNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageWorkers whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageWorkers whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchWorkersList = props.fetchWorkersList ;
    fetchWorkersList();

    return (
        <>
        <LoadWorkers whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListWorkers whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end WorkersMain

export default WorkersMain;
