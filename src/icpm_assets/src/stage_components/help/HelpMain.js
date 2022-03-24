import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';
import GettingStartedAllSteps from './GettingStarted';
import FAQAll from './FAQ';
import GetImage from '../../components/GetImage';

function preventDefault(event) {
  event.preventDefault();
}

const HelpMain = () => {


  // now we get the global context 
  const myContext = useContext(AppContext);
  const helpSection = myContext.helpSectionName

  var displayHelpSections = [];

  if (helpSection == "GettingStarted" ) {
  } else if (helpSection == "" ) { 
    displayHelpSections.push (
      <GettingStartedAllSteps />
    );
    displayHelpSections.push (
      <FAQAll />
    );

  }
  return (
    <>
      <Title>Help</Title>
      <Box sx={{width: "100%", 
                justifyContent: "center",
                display: 'flex', }}>
      <Box sx={{width: "80%" }}>
      <GetImage imgSrc="icpipeline-overview-help.png"  imgAlt="ICPipelineManager allows you to manager multiple environments and projects for n number of nodes to facilitate the highest level of output your team can produce."/>
      </Box>
      </Box>
      {/*  
      <Typography  variant="h6" sx={{m:2}}>
        Please Choose the section from the following menu:
        
      </Typography>
      */}
      {displayHelpSections}

    </>
  );
}// end HelpMain
export default HelpMain;