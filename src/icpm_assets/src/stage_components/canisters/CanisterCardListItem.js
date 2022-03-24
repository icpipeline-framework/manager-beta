import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import CanisterCard from './CanisterCard';

const CanisterCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const canister = props.canister;
    console.log ("ListOfCanisters - Inside my ListOfCanisters");
 

    const handleClick =  (thisWhereTo) => {
    
      console.log ("CanisterCard:" + canister.id);
      myContext.setActiveCanister(canister);
      props.changeStateAgent("manage");
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{m:1, border: '1px solid #9f9f9f', borderRadius:2}} onClick={() => { handleClick("new")}}>
        <CardActionArea>
        <CanisterCard canister={canister}/>
        </CardActionArea>
        </Card>
    )// end return
} // end function CanisterCardListItem



export default CanisterCardListItem;
