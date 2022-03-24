import React, { useState,useContext } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import CanisterCardListItem from './CanisterCardListItem';


const LoadCanisters = (props) => {


 
  
  return ( 
    <>
    <Title><CodeIcon sx={{mr:1}}/>Canisters</Title>
    <PleaseWait waitType="query"><CodeIcon sx={{mr:1}}/>Loading Canisters</PleaseWait>
    </>
  ); // end return    

} // end of LoadCanisters

export default LoadCanisters;
