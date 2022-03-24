import React, { useState,useContext } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import IdentityCard from './IdentityCard';


const ListIdentities = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const listOfIdentities = myContext.listOfIdentitiesName ;

    
  console.log ("ListOfIdentities - Inside my ListOfIdentities");
  let identitiesLength  = listOfIdentities.length ;
  

  const handleClick =  () => {

    /// create a blank object 



    const theIdentityObject = {
      id: 0,
      name:"",
      category: "",
      description: "",
      principal: "",
      identityPem: "",
      profileWalletId: "",
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theIdentityObject
    
        
    console.log ("ListOfIdentities-handleClick - start handleClick");
    console.log ("New Identity ID:" + theIdentityObject.id);
    myContext.setActiveIdentity(theIdentityObject);
    props.changeStateAgent ("manage");

  } // end handle click

  if (identitiesLength > 0) {
    console.log ("listOfIdentities - this is the stateListData:")
    console.log (listOfIdentities)
    let theIdentityList = [];

    for (let i = 0; i < identitiesLength; i++) {
        
      theIdentityList.push (
            
            <IdentityCard changeStateAgent={props.changeStateAgent} key={listOfIdentities[i].id.toString()} identity={listOfIdentities[i]}/>
            
        )

    } // end for 
    // most recent on top by reversing
    theIdentityList.reverse();

      


      return (
          <>
          <Title><KeyIcon sx={{mr:1}}/>Identities
          
         
          
          </Title>
          <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1, mb:2 }}>Create New Identity</Button>


           {theIdentityList}
          
           </>
      ) /// end return
  } else  {
        return (
          <>
          <Title><KeyIcon sx={{mr:1}}/>Identities
          
         
          
          </Title>
         <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:1, mr:1, mb:2 }}>Create New Identity</Button>

         <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
            <Typography variant="h5" color="text.secondary" align="center" >
            No Identities.   
            </Typography>

          </Box>
          
           </>
        )// end return
      
  }// end if there is any Identities  

} // end of ListIdentities

export default ListIdentities;
