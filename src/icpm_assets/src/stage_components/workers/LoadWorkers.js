import React, { useState,useContext } from 'react';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';


const LoadWorkers = (props) => {


 
  
  return ( 
    <>
    <Title><WorkspacesIcon sx={{mr:1}}/>Workers</Title>
    <PleaseWait waitType="query"><WorkspacesIcon sx={{mr:1}}/>Loading Workers</PleaseWait>
    </>
  ); // end return    

} // end of LoadWorkers

export default LoadWorkers;
