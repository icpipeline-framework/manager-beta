import React, { useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import KeyIcon from '@mui/icons-material/Key';
import 'regenerator-runtime/runtime';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';

/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import RefButton from '../../components/RefButton';
import GridCardListItem from '../../components/GridCardListItem';

const IdentityCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const displayLocation  = props.displayLocation ;
    

    const identity = props.identity;
    console.log ("IdentityCard - Inside my IdentityCard");


    var cardTitle = [
      <Title key={1}>
         
         <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1, mb:2, flexGrow:1 , justifyContent: "flex-start"}}>
          <KeyIcon sx={{mr:1}}/>  Identity: {identity.name} ({identity.id.toString()})
         </Button>
        </Title>
    ];
  
    if ( displayLocation == "manage" )  {
      cardTitle = [
        <Title key={1}> 
           
           
            <KeyIcon sx={{mr:1}}/>  Identity: {identity.name} ({identity.id.toString()})
           
          </Title>
      ];
    
    } else if (displayLocation == "deployment")  {
  
      cardTitle = [
        
      ];
      
    }

    const handleClick =  (thisWhereTo) => {
    
      console.log ("IdentityCard:" + identity.id);
      myContext.setActiveIdentity(identity);
      props.changeStateAgent("manage");
  
    } // end handle click
    


    return (
      <CardContent sx={{bgcolor:"#ffffff", mb:2,  border: '1px solid #9f9f9f', borderRadius:2, width:"100%"}}>
        {cardTitle}
        
        <Grid container spacing={0}>
          
            <GridCardListItem title="Name" value={identity.name}/>
            <GridCardListItem title="Last Updated" value={identity.lastUpdated}  itemType="date-icNano"/>
            {/*
            <GridCardListItem title="Category" value={identity.category}/>
            */}
            <GridCardListItem title="Description" value={identity.description}/>
            <GridCardListItem title="Principal" value={identity.principal}/>
            {/*
            <GridCardListItem title="identity.pem" value={identity.identityPem}/>
            <GridCardListItem title="wallets.json" value={identity.profileWalletId}/>
            */}
            
          </Grid>
          ({(identity.id != 0) ? identity.id.toString() : "New"})
      </CardContent>
    )// end return
} // end function IdentityCard



export default IdentityCard;
