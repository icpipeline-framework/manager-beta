import React, { useState,useContext } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import EventCardListItem from './EventCardListItem';


const LoadEvents = (props) => {


 
  
  return ( 
    <>
    <Title><FormatListBulletedIcon sx={{mr:1}}/>Events</Title>
    <PleaseWait waitType="query"><FormatListBulletedIcon sx={{mr:1}}/>Loading Events</PleaseWait>
    </>
  ); // end return    

} // end of LoadEvents

export default LoadEvents;
