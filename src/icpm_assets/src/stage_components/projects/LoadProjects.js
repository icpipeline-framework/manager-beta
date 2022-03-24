import React, { useState,useContext } from 'react';
import AccountTreeIcon   from '@mui/icons-material/AccountTree';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';


const LoadProjects = (props) => {



 
  
  return ( 
    <>
    <Title><AccountTreeIcon sx={{mr:1}}/>Projects</Title>
    <PleaseWait waitType="query"><AccountTreeIcon sx={{mr:1}}/>Loading Projects</PleaseWait>
    </>
  ); // end return    

} // end of LoadProjects

export default LoadProjects;
