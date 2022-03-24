import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import Tooltip from '@mui/material/Tooltip';

/// ****** CUSTOM IMPORTS 

import AppContext from '../nav/AppContext';


const EventRefButton = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const refId = props.refId;
    const refWhereTo = props.whereTo;
    const displayLocation = props.displayLocation ;
    
    var thisWidth = 100 ;
    if (displayLocation == "job") {

        var thisWidth = 600 ;

    } // end if display location 

    var theTheme = props.theTheme ;
    var thisButton = [];
    var tooltipText = "" ;


    if (refWhereTo == "environment") {
    tooltipText = "Environment Dashboard" ;
    theTheme = myContext.environmentsThemeName ;
    thisButton.push (
        <Box key={1} sx={{display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        float: 'right'}}>
        <SettingsSystemDaydreamIcon sx={{mr:1}}/> e: {refId.toString()}
        </Box>
    );

    } else if (refWhereTo == "deployment") {
    tooltipText = "Deployment Dashboard" ;
    theTheme = myContext.deploymentsThemeName ;
    thisButton.push (
        <Box key={2} sx={{display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        float: 'right'}}>
        <AltRouteIcon sx={{mr:1}}/> d: {refId.toString()}
        </Box>
    );
    
    } else if (refWhereTo == "project") {
    tooltipText = "Project Dashboard" ;
    theTheme = myContext.projectsThemeName ;
    thisButton.push (
        <Box key={3} sx={{display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        float: 'right'}}>
        <AccountTreeIcon sx={{mr:1}}/> p: {refId.toString()}
        </Box>
    );
    
    } 
    

    console.log ("Ref Buttons - Inside my EventRefButton");
 

    let history = useHistory();
    const handleClick =  () => {
    
      console.log ("refWhereTo:" + refWhereTo);
        if (refWhereTo == "environment") {
    
          myContext.setNavSection ("Environments")
          history.push ("/environments");
          myContext.setWhereTo ("dashboard") ;
          myContext.setJumpId (refId) ;

        } if (refWhereTo == "deployment") {
      
            myContext.setNavSection ("Deployments")
            history.push ("/deployments");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (refId) ;

        } if (refWhereTo == "project") {
      
            myContext.setNavSection ("Projects")
            history.push ("/projects");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (refId) ;
        } // end if refWhereTo
  
    } // end handle click
    
    return (
        <>
        <ThemeProvider theme={theTheme}>
        <Tooltip title={tooltipText} placement="top" enterNextDelay={300}>
        <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1, flexGrow:1}}>
        {thisButton}
        </Button>
        </Tooltip>
        </ThemeProvider>
        </>
    )// end return
} // end function EventRefButton



export default EventRefButton;
