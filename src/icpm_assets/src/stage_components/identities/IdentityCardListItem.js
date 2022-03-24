import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';

import IdentityCard from './IdentityCard';

const IdentityCardListItem = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const identity = props.identity;
    console.log ("ListOfIdentities - Inside my ListOfIdentities");
 

    const handleClick =  (thisWhereTo) => {
    
      console.log ("IdentityCard:" + identity.id);
      myContext.setActiveIdentity(identity);
      props.changeStateAgent("manage");
  
    } // end handle click
    
    return (
      <Card elevation={0} sx={{m:1, border: '1px solid #9f9f9f', borderRadius:2}} onClick={() => { handleClick("new")}}>
        <CardActionArea>
        <IdentityCard identity={identity}/>
        </CardActionArea>
        </Card>
    )// end return
} // end function IdentityCardListItem



export default IdentityCardListItem;
