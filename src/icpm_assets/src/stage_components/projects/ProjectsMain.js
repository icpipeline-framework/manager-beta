import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';




/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import LoadProjects from './LoadProjects';
import ListProjects from './ListProjects';
import ManageProjects from './ManageProject';
import ProjectDashboard from './ProjectDashboard';

const ProjectsMain = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;

  var whereTo = myContext.whereToName;
  const setWhereTo = myContext.setWhereTo;
  if (whereTo == "" ) {
    //setWhereTo ("load");
    whereTo = "load";
  }  


  let history = useHistory();
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }



  const fetchProjectsList = async ()  =>  {

        
      // going to creat call to canister
      console.log ("1- fetchProjectsList - before await");
      //await sleep(500);
      const fetchData = await icpmDapp.getListOfProjects(apiToken,"").catch(e => { return "ICPM Error: " + e })
    
      console.log ("2- fetchProjectsList - after await");

      if (fetchData.includes('ICPM Error')) {

        console.log (fetchData);
        myContext.displayError("" +fetchData);
        
      } else {
      
        console.log (fetchData);
        console.log ("3- fetchProjectsList - after logging return");
        // set the appContext which should redraw the component

        setWhereTo ("list");
        myContext.setSetListOfProjects (fetchData);
        console.log ("4- fetchProjectsList - after setstateListData");
      } // end if error

      
      
  } // end fetchProjectsList


  const handleClick =  (thisWhereTo) => {
        
    console.log ("ProjectsMain-handleClick - start handleClick");

    console.log (whereTo);
    
    setWhereTo (thisWhereTo);

    console.log ("ProjectsMain-handleClick - end handleClick");

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
      <ProjectsNav fetchProjectsList={fetchProjectsList} whereTo={whereTo} changeStateAgent={handleClick}/> 
      
    </>
    
  );
}// end EnviromentsMain

const ProjectsNav = (props) => {
  const whereTo = props.whereTo ;

  if (whereTo =="dashboard") {
    return (
        <>
         <ProjectDashboard whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    } else if (whereTo =="new") {
    
    return (
        <>
          <ManageProjects whereTo={whereTo} changeStateAgent={props.changeStateAgent} />
         </>
    ) // end return

  } else if (whereTo =="manage") {
    return (
        <>
         <ManageProjects whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
  } else if (whereTo =="load") {
    const fetchProjectsList = props.fetchProjectsList;
    fetchProjectsList();

    return (
        <>
        <LoadProjects whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
         </>
    ) // end return
    
    
  }// end whereTo if
  return (
      <>
         <ListProjects whereTo={whereTo} changeStateAgent={props.changeStateAgent}/>
      </>

  ) // end default return 
  

}// end ProjectsMain

export default ProjectsMain;
