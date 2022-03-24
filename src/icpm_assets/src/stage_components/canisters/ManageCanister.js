import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import CanisterCard from './CanisterCard';

const ManageCanister = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeCanister = myContext.activeCanisterName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeCanister.id = " + activeCanister.id);
  var displayCanisterOrProfile = "Canister";
  if (activeCanister.lastDeploymentId == 0 ) {
    displayCanisterOrProfile = "Canister Profile";
  }
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [nameText, setNameValue] = useState(activeCanister.name);
  const [categoryText, setCategoryValue] = useState(activeCanister.category);
  const [descriptionText, setDescriptionValue] = useState(activeCanister.description);
  const [dfxJsonText, setDfxJsonValue] = useState(activeCanister.dfxJson);
  const [canisterNameText, setCanisterNameValue] = useState(activeCanister.canisterName);
  const [canisterTypeText, setCanisterTypeValue] = useState(activeCanister.canisterType);
  const [canisterNetworkText, setCanisterNetworkValue] = useState(activeCanister.canisterNetwork);
  const [canisterIdText, setCanisterIdValue] = useState(activeCanister.canisterId);
  
  
  


  const onNameChange = (e) => setNameValue(e.target.value);
  const onCategoryChange = (e) => setCategoryValue(e.target.value);
  const onDescriptionChange = (e) => setDescriptionValue(e.target.value);
  const onDfxJsonChange = (e) => setDfxJsonValue(e.target.value);
  const onCanisterNameChange = (e) => setCanisterNameValue(e.target.value);
  const onCanisterTypeChange = (e) => setCanisterTypeValue(e.target.value);
  const onCanisterNetworkChange = (e) => setCanisterNetworkValue(e.target.value);
  const onCanisterIdChange = (e) => setCanisterIdValue(e.target.value);
  
  
  const [errorMsgNam, setErrorMsgNam ] = useState("");
  
  let stageBox = (document).querySelector(
    '#stage-box',
  );
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

    e.preventDefault();

    var anyErr= false;

    if ( canisterNameText == "" ) {
      setErrorMsgNam (`Canister Name is required.`)
      anyErr=true;
      
    } // end name check
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

      // first we submit to the updatCanister 
      // (canisterually this will be add or update)

    const theCanisterObject = {
      id: activeCanister.id,
      name:nameText,
      category:categoryText,
      description: descriptionText,
      dfxJson: dfxJsonText,
      canisterName: canisterNameText,
      canisterType: canisterTypeText,
      canisterNetwork: canisterNetworkText,
      canisterId: canisterIdText,
      identityId:activeCanister.identityId ,
      projectId: activeCanister.projectId,
      environmentId: activeCanister.environmentId,
      lastDeploymentId: activeCanister.lastDeploymentId,
      creatorId: 0,
      dateCreated: 0,
      lastUpdated: 0,
    } // end theCanisterObject




      
      let newIcUpdateResponse = await icpmDapp.manageCanisterMain(apiToken,theCanisterObject);

      setIcUpdateRresponse(icUpdateResponse);
      console.log(icUpdateResponse);

      if (newIcUpdateResponse.msg != "") {

          alert ("there was an issue"+ newIcUpdateResponse.msg);
          console.log (newIcUpdateResponse);

      } else {
          myContext.setActiveCanister (newIcUpdateResponse.canisterObject);
          let listOfCanisters = await icpmDapp.getListOfCanisters(apiToken,"");
          myContext.setListOfCanisters (listOfCanisters);
          console.log(listOfCanisters);
          //props.changeStateAgent ("list ");

            setwhereTo ("returnToList");
      } 
      

      setPending(false);
      console.log(newIcUpdateResponse.canisterObject.name);
      
      return false;

      
  }// end handleSubmit


    const handleReset = () => {
        setStatusValue("");
        setCanisterTypeValue("");
        setRefTypeValue("");
        
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
        <CodeIcon sx={{mr:1}}/>Manage {displayCanisterOrProfile} 
          </Title>
          
      
  
  


          <ManageCanisterNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onNameChange={onNameChange}
                nameText={nameText}
                onCategoryChange={onCategoryChange}
                categoryText={categoryText}
                onDescriptionChange={onDescriptionChange}
                descriptionText={descriptionText}
                onDfxJsonChange={onDfxJsonChange}
                dfxJsonText={dfxJsonText}
                onCanisterNameChange={onCanisterNameChange}
                canisterNameText={canisterNameText}
                onCanisterTypeChange={onCanisterTypeChange}
                canisterTypeText={canisterTypeText}
                onCanisterNetworkChange={onCanisterNetworkChange}
                canisterNetworkText={canisterNetworkText}
                onCanisterIdChange={onCanisterIdChange}
                canisterIdText={canisterIdText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeCanister={activeCanister}
                displayCanisterOrProfile={displayCanisterOrProfile}
                errorMsgNam={errorMsgNam}
                myContext={myContext}/>
          
          

      </>
      
    )
} // end of ManageCanister

export default ManageCanister;

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

const ManageCanisterNav = (props) => {
    const myContext = props.myContext;

    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageCanisterForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {


      let history = useHistory();
        
      const jumpToDash =  (refWhereTo) => {
      
        console.log ("refWhereTo:" + refWhereTo);
        if (refWhereTo == "environment" && props.activeCanister.environmentId > 0) {
      
            myContext.setNavSection ("Environments")
            history.push ("/environments");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (props.activeCanister.environmentId) ;

        } if (refWhereTo == "project" && props.activeCanister.projectId > 0) {
      
            myContext.setNavSection ("Projects")
            history.push ("/projects");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (props.activeCanister.projectId) ;
        } // end if refWhereTo
    
      } // end jumpToDash


    
        var displayEnvironmentButton = [];



        if (props.activeCanister.environmentId > 0 ) {
          
          displayEnvironmentButton.push (
            <ThemeProvider key={2} theme={myContext.environmentsThemeName}>
            
            <Tooltip title="Environment Dashboard" placement="top" enterNextDelay={300}>
            <Button onClick={() => { jumpToDash("environment")}}  variant="contained" sx={{  }}>
            Go to Environment
            </Button>
            </Tooltip>
            </ThemeProvider>
          );

        }
        return (  
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeCanister.id != 0) ? "updated this": "created a new"} {props.displayCanisterOrProfile}.
            </Typography>
            <Button onClick={() => { props.parentchangeStateAgent ("list")}}  variant="contained" disabled={props.pending} sx={{ml:2, mr:2}}>Return to List of Canisters</Button>
            {displayEnvironmentButton}
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <CanisterCard key={props.activeCanister.id.toString()} canister={props.activeCanister} displayLocation="manage"/>
            </Box>

            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><CodeIcon sx={{mr:1}}/>{(props.activeCanister.id != 0) ? "Updating": "Creating New"} {props.displayCanisterOrProfile}</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageCanisterNav


const ManageCanisterForm = (props) => {


    return (
      <>


      <Typography variant="body" >
      {(props.theProps.activeCanister.id != 0) ? `Update ${props.theProps.displayCanisterOrProfile} : `: `Create ${props.theProps.displayCanisterOrProfile} : `}
      </Typography>
      <Typography variant="body2" sx={{fontSize:".8rem"}} >
      These fields should match your actual canister info 
      (refer to dfx.json and canister_ids.json)
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <ShowError errorMsg={props.theProps.errorMsgNam}/>
      {/*
      <FormTextField
          onChange={props.theProps.onNameChange}
          value={props.theProps.nameText}
          label={`${props.theProps.displayCanisterOrProfile} Label`} //optional
          helperText={`Label for the ${props.theProps.displayCanisterOrProfile} to be used internally.`}
      />
      
      
      <FormTextField
          onChange={props.theProps.onDescriptionChange}
          value={props.theProps.descriptionText}
          label={"Description"} //optional
          helperText={`The description of this ${props.theProps.displayCanisterOrProfile}.`}
          multiline={true}
          rows={3}
      />
      <FormTextField
          onChange={props.theProps.onDfxJsonChange}
          value={props.theProps.dfxJsonText}
          label={"DfxJson"} //optional
          helperText="The canister Definition to inject in dfx.json for this canister."
          multiline={true}
          rows={3}
      />
      */}
      <FormTextField 
          onChange={props.theProps.onCanisterNameChange}
          value={props.theProps.canisterNameText}
          label={`Canister Name`} //optional
          helperText="Actual canister name"
      />  
      
      <FormControl sx={{mb:2, minWidth: 120 }}>
        <InputLabel id="canisterType-label">{`${props.theProps.displayCanisterOrProfile} Type`}</InputLabel>
        <Select
          labelId="canisterType-label"
          id="canisterType-id"
          value={props.theProps.canisterTypeText}
          label={`${props.theProps.displayCanisterOrProfile} Type`}
          onChange={props.theProps.onCanisterTypeChange}
        >
          
          <MenuItem value={"motoko"}>motoko</MenuItem>
          <MenuItem value={"asset"}>asset</MenuItem>
         {/* <MenuItem value={"custom"}>custom</MenuItem>*/}
        </Select>
        <FormHelperText>Actual canister type (motoko, rust, asset, etc.)</FormHelperText>
      </FormControl>
      
      <FormControl sx={{mb:2, minWidth: 120 }}>
        <InputLabel id="network-label">Network</InputLabel>
        <Select
          labelId="network-label"
          id="network-id"
          value={props.theProps.canisterNetworkText}
          label="Network"
          onChange={props.theProps.onCanisterNetworkChange}
        >
          
          <MenuItem value={"ic"}>ic</MenuItem>
        </Select>
        <FormHelperText>Always "ic" for STAGE/PROD environments</FormHelperText>
      </FormControl>
      <FormTextField 
          onChange={props.theProps.onCanisterIdChange}
          value={props.theProps.canisterIdText}
          label={"Canister Id"} //optional
          helperText="Actual Internet Computer Canister Id (e.g. aaaaa-bbbbb-ccccc-ddddd-eee) "
      />  
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeCanister.id != 0) ? "("+props.theProps.activeCanister.id +")": "(New)"}
      </>
    ) // end return


} // end ManageCanisterForm

