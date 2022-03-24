import React, { useState,useContext } from 'react';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import EnvironmentCardListItem from './EnvironmentCardListItem';


const LoadEnvironments = React.memo((props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);


 
  
  return ( 
    <>
    <Title><SettingsSystemDaydreamIcon sx={{mr:1}}/>All Environments</Title>
    <PleaseWait waitType="query"><SettingsSystemDaydreamIcon sx={{mr:1}}/>Loading Environments</PleaseWait>
    </>
  ); // end return    

}); // end of LoadEnvironments

export default LoadEnvironments;
