import React, { useState,useContext } from 'react';
import AltRouteIcon from '@mui/icons-material/AltRoute';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';


const LoadDeployments = (props) => {

  
  return ( 
    <>
    <Title><AltRouteIcon sx={{mr:1}}/>List of Deployments</Title>
    <PleaseWait waitType="query"><AltRouteIcon sx={{mr:1}}/>Loading Deployments</PleaseWait>
    </>
  ); // end return    

} // end of LoadDeployments

export default LoadDeployments;
