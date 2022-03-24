import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Principal } from '@dfinity/principal';

// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import IdentityCard from './IdentityCard';

const ManageIdentity = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeIdentity = myContext.activeIdentityName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeIdentity.id = " + activeIdentity.id);
    
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [nameText, setNameValue] = useState(activeIdentity.name);
  const [categoryText, setCategoryValue] = useState(activeIdentity.category);
  const [descriptionText, setDescriptionValue] = useState(activeIdentity.description);
  const [principalText, setPrincipalValue] = useState(activeIdentity.principal);
  const [identityPemText, setIdentityPemValue] = useState(activeIdentity.identityPem);
  const [profileWalletIdText, setProfileWalletIdValue] = useState(activeIdentity.profileWalletId);
  
  
  const [errorMsgName, setErrorMsgName ] = useState("");
  const [errorMsgCategory, setErrorMsgCategory ] = useState("");
  const [errorMsgPrincipal, setErrorMsgPrincipal ] = useState("");
  const [errorMsgIdentityPem, setErrorMsgIdentityPem ] = useState("");
  const [errorMsgProfileWalletId, setErrorMsgProfileWalletId ] = useState("");


  const onNameChange = (e) => setNameValue(e.target.value);
  const onCategoryChange = (e) => setCategoryValue(e.target.value);
  const onDescriptionChange = (e) => setDescriptionValue(e.target.value);
  const onPrincipalChange = (e) => setPrincipalValue(e.target.value);
  const onIdentityPemChange = (e) => setIdentityPemValue(e.target.value);
  const onProfileWalletIdChange = (e) => setProfileWalletIdValue(e.target.value);
  
  
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

    e.preventDefault();

    var anyErr= false;

    if ( nameText == "" ) {
      setErrorMsgName ("Name is required.")
      anyErr=true;
      
    } // end name check

    // have not a use for category yet.
    // if ( categoryText == "" ) {
    //   setErrorMsgCategory ("Category is required.")
    //   anyErr=true;
      
    // } // end categoryText check

    if ( principalText == "" ) {
      setErrorMsgPrincipal ("Principal is required.")
      anyErr=true;
    } else {

      // we want to check if it is a valid principal
      let thisNewPrincipal;
      let error="";

      
      try {
        thisNewPrincipal = Principal.fromText(principalText);
      } catch (e) {
        error = e;
        console.log("catch error from principal",e);
      }
      
        setErrorMsgPrincipal(error.toString()) ;
    
    } // end principalText check

    if ( identityPemText == "" ) {
      setErrorMsgIdentityPem ("Identity Pem is required.")
      anyErr=true;
      
    } // end identityPemText check

    if ( profileWalletIdText == "" ) {
      setErrorMsgProfileWalletId ("Wallets Json is required.")
      anyErr=true;
      
    } // end profileWalletIdText check

    if (anyErr) {

      if (stageBox) {
      stageBox.scrollTop="0";
      } else {
        console.log ("stageBox: "+stageBox)
      }
      return

    } // end if any error

      if (pending) return;

      setwhereTo ("pleaseWait");
      setPending(true);

      // first we submit to the updatIdentity 
      // (identityually this will be add or update)


    const theIdentityObject = {
      id: activeIdentity.id,
      name: nameText,
      category: categoryText,
      description: descriptionText,
      principal: principalText,
      identityPem: identityPemText,
      profileWalletId: profileWalletIdText,
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theIdentityObject



      
      let newIcUpdateResponse = await icpmDapp.manageIdentityMain(apiToken,theIdentityObject);

      setIcUpdateRresponse(icUpdateResponse);
      console.log(icUpdateResponse);

      if (newIcUpdateResponse.msg != "") {

          alert ("there was an issue"+ newIcUpdateResponse.msg);
          console.log (newIcUpdateResponse);


      } else {
          myContext.setActiveIdentity (newIcUpdateResponse.identityObject);
          let listOfIdentities = await icpmDapp.getListOfIdentities(apiToken,"");
          myContext.setListOfIdentities (listOfIdentities);
          console.log(listOfIdentities);
          //props.changeStateAgent ("list ");

            setwhereTo ("returnToList");
      } 
      

      setPending(false);
      console.log(categoryText);
      
      return false;

      
  }// end handleSubmit


    const handleReset = () => {
        setNameValue("");
        setCategoryValue("");
        setDescriptionValue("");
        setPrincipalValue("");
        setIdentityPemValue("");
        setProfileWalletIdValue("");
        
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handle reset 
    const handleCancel = () => {
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handleCancel 

  
  return (
      <>
        <Title>
        <KeyIcon sx={{mr:1}}/>Manage Identity 
          </Title>
          
          <ManageIdentityNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onNameChange={onNameChange}
                nameText={nameText}
                onCategoryChange={onCategoryChange} 
                categoryText={categoryText}
                onDescriptionChange={onDescriptionChange} 
                descriptionText={descriptionText}
                onPrincipalChange={onPrincipalChange}
                principalText={principalText}
                onIdentityPemChange={onIdentityPemChange}
                identityPemText={identityPemText}
                onProfileWalletIdChange={onProfileWalletIdChange}
                profileWalletIdText={profileWalletIdText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeIdentity={activeIdentity}
                errorMsgName={errorMsgName}
                errorMsgCategory={errorMsgCategory}
                errorMsgPrincipal={errorMsgPrincipal}
                errorMsgIdentityPem={errorMsgIdentityPem}
                errorMsgProfileWalletId={errorMsgProfileWalletId}/>
          
          

      </>
      
    )
} // end of ManageIdentity

export default ManageIdentity;


const ShowError = (props) => {
    
  const errorMsg = props.errorMsg;

  if (errorMsg) {
    return (
      <>
      <Paper sx={{bgcolor: "#B00020", p:1, mb:1}} elevation={2}>
        <Typography variant="body2" color="primary.contrastText" align="left" >
        {errorMsg}
        </Typography>
      
      </Paper>
      </>

    )
  }
  return (
    <></>
  )
} //end ShowError

const ManageIdentityNav = (props) => {
    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageIdentityForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeIdentity.id != 0) ? "updated this": "created a new"} Identity.
            </Typography>
            <Button onClick={() => { props.parentchangeStateAgent ("list")}}  variant="contained" disabled={props.pending} sx={{ml:2, mr:2}}>Return to List of Identities</Button>
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <IdentityCard key={props.activeIdentity.id.toString()} identity={props.activeIdentity} displayLocation="manage"/>
            </Box>

            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><KeyIcon sx={{mr:1}}/>{(props.activeIdentity.id != 0) ? "Updating": "Creating New"} Identity</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageIdentityNav


const ManageIdentityForm = (props) => {


    return (
      <>



      <Typography variant="body" >
      {(props.theProps.activeIdentity.id != 0) ? "Update Identity: ": "Create Identity: "}Please fill out this form
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <ShowError errorMsg={props.theProps.errorMsgName}/>
      <FormTextField
          onChange={props.theProps.onNameChange}
          value={props.theProps.nameText}
          label={"Identity Name"} //optional
          helperText="How to reference this Identity to the Team in the ICPM"
          multiline={true}
          rows={2}
      />
      {/*
      <ShowError errorMsg={props.theProps.errorMsgCategory}/>
      <FormControl sx={{mb:2, minWidth: 120 }}>
        <InputLabel id="environmentType-label">Category</InputLabel>
        <Select
          labelId="environmentType-label"
          id="environmentType-id"
          value={props.theProps.categoryText}
          label="Category"
          onChange={props.theProps.onCategoryChange}
        >
          <MenuItem value={"Production"}>Production</MenuItem>
          <MenuItem value={"Staging"}>Staging</MenuItem>
          
        </Select>
        <FormHelperText>The type of environment you want this to be (STAGE and PROD assume an IC deployment)</FormHelperText>
      </FormControl>
      */}

      <FormTextField 
          onChange={props.theProps.onDescriptionChange}
          value={props.theProps.descriptionText}
          label={"Description"} //optional
          helperText=""
          multiline={true}
          rows={2}
      />  
      <ShowError errorMsg={props.theProps.errorMsgPrincipal}/>
      <FormTextField
          onChange={props.theProps.onPrincipalChange}
          value={props.theProps.principalText}
          label={"Principal Id"} //optional
          helperText="The dfx cli principal."
      />
      <ShowError errorMsg={props.theProps.errorMsgIdentityPem}/>
      <FormTextField
          onChange={props.theProps.onIdentityPemChange}
          value={props.theProps.identityPemText}
          label={"identity.pem"} //optional
          helperText="The contents of the identity.pem file"
          multiline={true}
          rows={3}
      />
      <ShowError errorMsg={props.theProps.errorMsgProfileWalletId}/>
      <FormTextField
          onChange={props.theProps.onProfileWalletIdChange}
          value={props.theProps.profileWalletIdText}
          label={"Profile Wallet Id"} //optional
          helperText="The wallet that you want to use for deployments with this profile."
      />
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeIdentity.id != 0) ? "("+props.theProps.activeIdentity.id +")": "(New)"}
      </>
    ) // end return


} // end ManageIdentityForm

