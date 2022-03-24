import React, { useState,useContext } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import JobCardListItem from './JobCardListItem';


const LoadJobs = (props) => {


 
  
  return ( 
    <>
    <Title><ConstructionIcon sx={{mr:1}}/>Jobs</Title>
    <PleaseWait waitType="query"><ConstructionIcon sx={{mr:1}}/>Loading Jobs</PleaseWait>
    </>
  ); // end return    

} // end of LoadJobs

export default LoadJobs;
