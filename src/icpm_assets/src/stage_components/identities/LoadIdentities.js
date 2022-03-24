import React, { useState,useContext } from 'react';

import 'regenerator-runtime/runtime';
import KeyIcon from '@mui/icons-material/Key';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import IdentityCardListItem from './IdentityCardListItem';


const LoadIdentities = (props) => {


 
  
  return ( 
    <>
    <Title><KeyIcon sx={{mr:1}}/>Identities</Title>
    <PleaseWait waitType="query"><KeyIcon sx={{mr:1}}/>Loading Identities</PleaseWait>
    </>
  ); // end return    

} // end of LoadIdentities

export default LoadIdentities;
