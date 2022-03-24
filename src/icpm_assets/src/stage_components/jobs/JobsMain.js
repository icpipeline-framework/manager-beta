import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";



/// ****** CUSTOM IMPORTS 


import AppContext from '../../nav/AppContext';
import LoadJobs from './LoadJobs';
import ListJobs from './ListJobs';
import ManageJobs from './ManageJob';

const JobsMain = () => {

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

  const fetchJobsList = async ()  =>  {

      // going to creat call to canister
      console.log ("1- fetchJobsList - before await");
      
      const fetchData = await icpmDapp.getListOfJobs(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      //await sleep(500);
      console.log ("2- fetchJobsList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
        
        console.log (fetchData);
        console.log ("3- fetchJobsList - after logging return");
        // set the appContext which should redraw the component

        
        myContext.setListOfJobs (fetchData);
        setWhereTo ("list");
        console.log ("4-  fetchJobsList - after setstateListData");
      } // end if error 
      
  } // end fetchJobsList

    

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
      <JobsNav  fetchJobsList={fetchJobsList} whereTo={whereTo} changeStateAgent={setWhereTo}/> 
      
    </>
  );
}// end EnviromentsMain

const JobsNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="new") {
    
    return (
        <>
          <ManageJobs whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageJobs whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchJobsList = props.fetchJobsList;
    fetchJobsList();


    return (
        <>
        <LoadJobs whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListJobs whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end JobsMain

export default JobsMain;
