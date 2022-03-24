import React, { useState,useContext } from 'react';
import {
  Link, useHistory
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import KeyIcon from '@mui/icons-material/Key';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { green, purple, blue} from '@mui/material/colors';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import EnvironmentCardListItem from './EnvironmentCardListItem';
import { ContentPasteGoTwoTone } from '@mui/icons-material';
import GridCardListItem from '../../components/GridCardListItem'

const ManageEnvironment = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeEnvironment = myContext.activeEnvironmentName;
  
  let history = useHistory();

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeEnvironment.id = " + activeEnvironment.id);
  console.log ("activeEnvironment.projectId = " + activeEnvironment.projectId);
    
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [environmentNameText, setEnvironmentNameValue] = useState(activeEnvironment.name);
  const [environmentEnvironmentTypeText, setEnvironmentEnvironmentTypeValue] = useState(activeEnvironment.environmentType);
  const [environmentDescriptionText, setEnvironmentDescriptionValue ] = useState(activeEnvironment.description);
  const [environmentProjectId, setEnvironmentProjectIdValue ] = useState(activeEnvironment.projectId);
  
  const [environmentProjectRepoBranchText, setEnvironmentProjectRepoBranchValue ] = useState(activeEnvironment.projectRepoBranch);
  const [environmentIdentityId, setEnvironmentIdentityId] = useState(activeEnvironment.identityId);
  const [environmentDeploymentNetworkText, setEnvironmentDeploymentNetwork] = useState(activeEnvironment.deploymentNetwork);
  const [environmentWorkerId, setEnvironmentWorkerIdValue ] = useState(activeEnvironment.workerId);

  const [errorMsgNam, setErrorMsgNam ] = useState("");
  const [errorMsgCat, setErrorMsgCat ] = useState("");
  
  console.log ("activeEnvironment: ", activeEnvironment);


  const onEnvironmentNameChange = (e) => setEnvironmentNameValue(e.target.value);
  const onEnvironmentEnvironmentTypeChange = (e) => setEnvironmentEnvironmentTypeValue(e.target.value);
  const onEnvironmentDescriptionChange= (e) => setEnvironmentDescriptionValue(e.target.value);
  const onEnvironmentProjectIdChange = (e) => setEnvironmentProjectIdValue(e.target.value);
  const onEnvironmentProjectRepoBranchChange = (e) => setEnvironmentProjectRepoBranchValue(e.target.value);
  const onEnvironmentIdentityIdChange = (e) => setEnvironmentIdentityId(e.target.value);
  const onEnvironmentDeploymentNetworkChange = (e) => setEnvironmentDeploymentNetwork(e.target.value);
  const onEnvironmentWorkerIdChange= (e) => setEnvironmentWorkerIdValue(e.target.value);
  
  let stageBox = (document).querySelector(
    '#stage-box',
  );
  
      // this is where we talk to manager canister

  const handleSubmit = async (e) => {

      e.preventDefault();
      var anyErr= false;

      if ( environmentNameText == "" ) {
        setErrorMsgNam ("Environment Name is required.")
        anyErr=true;
        
      } // end name check
      if ( environmentEnvironmentTypeText == "" ) {
        setErrorMsgCat ("Environment Type is required.")
        anyErr=true;
        
      } // end name check
      if ( environmentEnvironmentTypeText == "STAGE" &&  !environmentIdentityId) {
        setErrorMsgCat ("STAGE Environments require an Identity")
        anyErr=true;
        
      } // end STAGE Identity check
      if ( environmentEnvironmentTypeText == "PROD" &&  !environmentIdentityId) {
        setErrorMsgCat ("PROD Environments require an Identity")
        anyErr=true;
        
      } // end PROD Identity check
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

      // first we submit to the updatEnvironment 
      // (eventually this will be add or update)


      const theEnvironmentObject = {
          id: activeEnvironment.id,
          name: environmentNameText,
          environmentType: environmentEnvironmentTypeText,
          description: environmentDescriptionText,
          projectId: parseInt(environmentProjectId),
          projectRepoBranch: environmentProjectRepoBranchText,
          identityId: parseInt(environmentIdentityId),
          deploymentNetwork: environmentDeploymentNetworkText,
          workerId: environmentWorkerId,
          creatorId: activeEnvironment.creatorId,
          dateCreated: activeEnvironment.dateCreated,
          lastUpdated:activeEnvironment.lastUpdated,
      }

      
      let newIcUpdateResponse = await icpmDapp.manageEnvironmentMain(apiToken,theEnvironmentObject).catch(e => { return "ICPM Error: " + e });

      if (typeof newIcUpdateResponse == "string") {

        console.log (newIcUpdateResponse);
        myContext.displayError("" +newIcUpdateResponse);
      
      } else {

        setIcUpdateRresponse(newIcUpdateResponse);
        console.log(newIcUpdateResponse);
        if (newIcUpdateResponse.msg != "") {

            alert ("there was an issue"+ newIcUpdateResponse.msg);
            console.log (newIcUpdateResponse);

        } else {
            
            let listOfEnvironments = await icpmDapp.getListOfEnvironments(apiToken,"");
            myContext.setListOfEnvironments (listOfEnvironments);
            myContext.setActiveEnvironment (newIcUpdateResponse.environmentObject) ;
            console.log(listOfEnvironments);
            

              setwhereTo ("returnToList");
        } 
      } // end if ICPM error


      setPending(false);
      console.log(environmentNameText);
      
      return false;

      
  }// end handleSubmit

    const handleRemoveWorker = async (e) => {
      if (confirm('Are you sure you want to remove Worker (id: ' +activeEnvironment.workerId+') from this Environment?')) {
        // remove worker by sending new update with workerId = 0;

        e.preventDefault();

        if (pending) return;
  
        setwhereTo ("pleaseWait");
        setPending(true);
  
        // first we submit to the updatEnvironment 
        // (eventually this will be add or update)
  
        const thisEnviromentObject = {
            id: activeEnvironment.id,
            name: activeEnvironment.name,
            environmentType: activeEnvironment.environmentType,
            description: activeEnvironment.description,
            projectId: activeEnvironment.projectId,
            projectRepoBranch: activeEnvironment.projectRepoBranch,
            identityId: activeEnvironment.identityId,
            deploymentNetwork: activeEnvironment.deploymentNetwork,
            workerId: 0,
            creatorId: activeEnvironment.creatorId,
            dateCreated: activeEnvironment.dateCreated,
            lastUpdated:activeEnvironment.lastUpdated,
        }
  
        
        let newIcUpdateResponse2 = await icpmDapp.manageEnvironmentMain(apiToken,thisEnviromentObject);
  
        setIcUpdateRresponse(newIcUpdateResponse2);
        console.log(newIcUpdateResponse2);
        if (newIcUpdateResponse2.msg != "") {
  
            alert ("there was an issue"+ newIcUpdateResponse2.msg);
            console.log (newIcUpdateResponse2);
  
        } else {
            
            // let listOfEnvironments = await icpmDapp.getListOfEnvironments(apiToken,"");
            // myContext.setListOfEnvironments (listOfEnvironments);
            myContext.setActiveEnvironment (newIcUpdateResponse2.environmentObject) ;
            // console.log(listOfEnvironments);
            
  
              setwhereTo ("returnToList");
        } 
        
  
        setPending(false);
        
        
        console.log('Removed');

        return false;
        
      } else {
        // Do nothing!
        console.log('Operation Canceled');
      }
    } // end handleRemoveWorker

    const handleReset = () => {
        setEnvironmentNameValue("");
        setEnvironmentDescriptionValue("");
        setEnvironmentEnvironmentTypeValue("");
        setEnvironmentProjectIdValue("");
        setEnvironmentProjectRepoBranchValue("");
        setEnvironmentIdentityId(0);
        setEnvironmentDeploymentNetwork("");
        setEnvironmentWorkerIdValue("");
        console.log("cancel");
        props.changeStateAgent ("dashboard");
    }// end handle reset 
    const handleCancel = () => {
        console.log("cancel");
        if (activeEnvironment.id==0 )
          props.changeStateAgent ("load");
        else 
          props.changeStateAgent ("dashboard");
    }// end handleCancel 

  
  return (
      <>
        <Title>
        <SettingsSystemDaydreamIcon sx={{mr:1}}/> {(activeEnvironment.id != 0) ? "Manage Environment: "+activeEnvironment.id +"": "Create New Environment"}
          </Title>
          
          <ManageEnvironmentNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onEnvironmentNameChange={onEnvironmentNameChange} 
                environmentNameText={environmentNameText}
                onEnvironmentEnvironmentTypeChange={onEnvironmentEnvironmentTypeChange}
                environmentEnvironmentTypeText={environmentEnvironmentTypeText}
                onEnvironmentDescriptionChange={onEnvironmentDescriptionChange}
                environmentDescriptionText={environmentDescriptionText}
                onEnvironmentProjectIdChange={onEnvironmentProjectIdChange} 
                environmentProjectId={environmentProjectId}
                onEnvironmentProjectRepoBranchChange={onEnvironmentProjectRepoBranchChange}
                environmentProjectRepoBranchText={environmentProjectRepoBranchText}
                onEnvironmentIdentityIdChange={onEnvironmentIdentityIdChange}
                environmentIdentityId={environmentIdentityId}
                onEnvironmentDeploymentNetworkChange={onEnvironmentDeploymentNetworkChange}
                environmentDeploymentNetworkText={environmentDeploymentNetworkText}
                onEnvironmentWorkerIdChange={onEnvironmentWorkerIdChange}
                environmentWorkerId={environmentWorkerId}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                handleRemoveWorker={handleRemoveWorker}
                activeEnvironment={activeEnvironment}
                icpmDapp={icpmDapp}
                apiToken={apiToken}
                myContext={myContext}
                history={history}
                errorMsgNam={errorMsgNam}
                errorMsgCat={errorMsgCat}/>
          
          

      </>
      
    )
} // end of ManageEnvironment

export default ManageEnvironment;

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

const ManageEnvironmentNav = (props) => {
    const whereTo = props.whereTo ;
    

    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageEnvironmentForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
      console.log ("EnvironmentDeployment-activeEnvironment.id = " + props.activeEnvironment.id);
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeEnvironment.id != 0) ? "updated this": "created a new"} Environment.
            </Typography>
            {/*
            <Button onClick={() => { props.parentchangeStateAgent ("dashboard")}}  variant="contained"  sx={{ width:200, height: 100, ml:2, mr:2}}><SettingsSystemDaydreamIcon sx={{mr:1}}/>{props.activeEnvironment.name} Dashboard</Button>
            */}
            
            </Box>
            
            <EnvironmentCardListItem key={props.activeEnvironment.id.toString()} changeStateAgent={props.parentchangeStateAgent} environment={props.activeEnvironment}/>
           
            
            <Button onClick={() => { props.parentchangeStateAgent ("load")}}  variant="outlined"  sx={{ml:2, mr:2}}>Return to List of Environments</Button>
            
            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><SettingsSystemDaydreamIcon sx={{mr:1}}/>{(props.activeEnvironment.id != 0) ? "Updating": "Creating New"} Environment</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageEnvironmentNav


const ManageEnvironmentForm = (props) => {
    let displayEnvironmentType = [

        <Box key={1}  component="span" sx={{mb:2, p:1, border: '1px solid #9f9f9f',display:"flex", justifyContent: "left", alignItems: "", borderRadius:1, backgroundColor:"primary.superlight" }}>
            
        <Typography variant="h7" align="left">
            Environment Type: {props.theProps.environmentEnvironmentTypeText}
            
        </Typography>
        
        </Box>

    ];


    if (props.theProps.activeEnvironment.id == 0) {

        displayEnvironmentType = [
            <Box key={1}>
              <ShowError errorMsg={props.theProps.errorMsgCat}/>
              <FormControl sx={{mb:2, minWidth: 120 }}>
                <InputLabel id="environmentType-label">Environment Type</InputLabel>
                <Select
                  labelId="environmentType-label"
                  id="environmentType-id"
                  value={props.theProps.environmentEnvironmentTypeText}
                  label="Environment Type"
                  onChange={props.theProps.onEnvironmentEnvironmentTypeChange}
                >
                  
                  <MenuItem value={"DEV"}>DEV (deploys locally on worker)</MenuItem>
                  <MenuItem value={"QA"}>QA (deploys locally on worker)</MenuItem>
                  <MenuItem value={"STAGE"}>STAGE (network=ic) - Requires Identity Profile</MenuItem>
                  <MenuItem value={"PROD"}>PROD (network=ic) - Requires Identity Profile</MenuItem>
                </Select>
                <FormHelperText>Note that an Environment’s type is a one-time setting.  
                  This basically enforces best practices on the IC, particularly with respect to 
                  “local” vs “ic” deployment.
                  </FormHelperText>
              </FormControl>
              </Box>
        ];



    }
    const age = 0;

    return (
      <>



      
      <FormControl  sx={{ m:0,mt:1, p:0 }}>
      {displayEnvironmentType}

      <ShowError errorMsg={props.theProps.errorMsgNam}/>
      <FormTextField 
          onChange={props.theProps.onEnvironmentNameChange}
          value={props.theProps.environmentNameText}
          label={"Name"} //optional
          helperText=""

      />  
      <IdentityListForm theProps={props.theProps}/>

      <FormTextField
          onChange={props.theProps.onEnvironmentDescriptionChange}
          value={props.theProps.environmentDescriptionText}
          label={"Description"} //optional
          helperText="(this field is optional)"
          multiline={true}
          rows={2}
      />
      <ProjectListForm theProps={props.theProps}/>

      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>

      <RemoveWorker theProps={props.theProps} />
      
      </>
    ) // end return


} // end ManageEnvironmentForm


const ProjectListForm = (props) => {
  // now we need to get the projects
  const icpmDapp = props.theProps.icpmDapp;
  const apiToken = props.theProps.apiToken;
  const myContext= props.theProps.myContext;
  const history= props.theProps.history;
  
  // we are going to get a list of projects

  
  const [loadedProjects, setLoadedProjects] = useState(false);
  const [listOfProjects, setListOfProjects] = useState([]);
  let activeProjectRepo = "Choose Project before setting the Repo Branch";

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchProjectsList = async ()  =>  {

        
      // going to creat call to canister
      console.log ("1- fetchProjectsList - before await");
      //await sleep(500);
      const fetchData = await icpmDapp.getListOfProjects(apiToken,"")
      
      console.log ("2- fetchProjectsList - after await");
      console.log (fetchData);
      console.log ("3- fetchProjectsList - after logging return");
      // set the appContext which should redraw the component

      //setWhereTo ("list");
      setLoadedProjects (true);
      setListOfProjects(fetchData);
      console.log ("4- fetchProjectsList - after setstateListData");
      
      
  } // end fetchWorkersList

  if (!loadedProjects) {
    fetchProjectsList();
    return (
        <>
        
        <PleaseWait waitType="query"><SettingsSystemDaydreamIcon sx={{mr:1}}/>Loading Projects</PleaseWait>
        </>
    )// end return
    } else {

      let theProjectList = [];
      

      for (let i = 0; i < listOfProjects.length; i++) {
        if (listOfProjects[i].id.toString()== props.theProps.environmentProjectId.toString() ) {
          activeProjectRepo = listOfProjects[i].projectRepo;
         
        }
        theProjectList.push (
              <MenuItem key={listOfProjects[i].id}  value={listOfProjects[i].id}>{listOfProjects[i].name}</MenuItem>
          )
  
      } // end for 
      if (theProjectList.length == 0 ) {

        const handleClick  = async (e) => {
                      
                const theProjectObject = {
                  id: 0,
                  name: "",
                  category: "",
                  description: "",
                  projectRepo: "",
                  creatorId: 0,
                  dateCreated: 0,
                  lastUpdated: 0,
                }


                    
                console.log ("GettingStarted-handleClick - start handleClick");
                myContext.setActiveProject(theProjectObject);

                myContext.setWhereTo ("load") ;
                myContext.setNavSection ("Projects");
                history.push ("/projects");


                console.log ("GettingStarted-handleClick - end handleClick");
                
        }
        return (
          <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
              bgcolor:"primary.light", 
              display:"flex", 
              justifyContent: "center", 
              alignItems: "", 
              borderRadius:2,
              mb:3,
              pt:2}}> 
              
                <Typography variant="h6" sx={{mb:2}}  >
                  Create a Project first and then attach it to this Environment.
                </Typography>

                <ThemeProvider theme={myContext.projectsThemeName}>
               <Button onClick={() => { handleClick("/projects")}}variant="contained"  sx={{ml:2}}>Create New Project</Button>
                </ThemeProvider>
            </Box>

        )
      } else {


        var displayRepo = [] ;
        console.log ("props.theProps.environmentIdentityId: ", props.theProps.environmentIdentityId );
        

        if (props.theProps.environmentProjectId !=  0)  {

            displayRepo = [

              <Box  key={1} component="span" sx={{m:0, p:2, border: '1px solid #9f9f9f',
                    bgcolor: "#ffffff", 
                    display:"block", 
                    justifyContent: "center", 
                    alignItems: "", 
                    borderRadius:2}}> 
                <FormControl fullWidth  >
                <FormTextField sx={{bgcolor: "#ffffff"}}
                    onChange={props.theProps.onEnvironmentProjectRepoBranchChange}
                    value={props.theProps.environmentProjectRepoBranchText}
                    label={"Environment Repo Branch"} //optional
                    helperText="This is branch that we want to deploy from the project Repo"
                    
                />
                
                {/*
                <GridCardListItem title="Network (read only)" value={props.theProps.environmentDeploymentNetworkText}/>
                */}

                </FormControl>
              <Box key={1} sx={{ p:1, overflow:"auto", 
                    borderRadius:2, border: '1px solid #9f9f9f',
                    backgroundColor:"primary.superlight", mb:2}}>

              <Typography variant="h7" sx={{mb:1, mr:2}} >
              Repo from Project:
              </Typography>
              <Typography variant="h7" sx={{mb:1, mr:2}} >
              {activeProjectRepo} 
              </Typography>
              <Typography variant="h7" >
                <Link  target="_blank"  style={{ textDecoration: 'none' }}  to={{ pathname: activeProjectRepo}}>
                 (view on GitHub)
                </Link>
              </Typography>

              </Box>
            </Box>
                

            ];
        } else {

          displayRepo = [
                <Box  key={1} component="span" sx={{m:0, p:2, border: '1px solid #9f9f9f',
                      bgcolor: "#ffffff", 
                      display:"block", 
                      justifyContent: "center", 
                      alignItems: "", 
                      borderRadius:2}}> 
                  <Typography variant="h7" >
                  {activeProjectRepo} 
                  </Typography>
                </Box>
          ];

        } // end if there is a project chosen


        return (
          <>

          
          <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
              bgcolor: "primary.superlight", 
              display:"flex", 
              justifyContent: "center", 
              alignItems: "", 
              borderRadius:2,
              mb:3,
              pt:2}}> 
            <Grid container spacing={3}>            
              <Grid item xs={12} sm={12}  lg={12}>
                {/*Select Project*/}
                <Typography variant="body" sx={{mb:2}}  >
                  Select a Project from the dropdown:
                </Typography>

              </Grid> 
              <Grid item xs={12} sm={12}  lg={12}>
                <FormControl fullWidth  >
                
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={(props.theProps.environmentProjectId !=  0)   ? props.theProps.environmentProjectId : ""}
                  label="Project"
                  sx={{bgcolor: '#ffffff'}}
                  onChange={props.theProps.onEnvironmentProjectIdChange}
                >
                  {theProjectList}
                </Select>
                <FormHelperText>Choose a Project from the list</FormHelperText>
                </FormControl>
              </Grid> 
          <ThemeProvider theme={myContext.projectsThemeName}>
              <Grid item xs={12} sm={12} lg={12}>
                {/*Repo Information*/}       

                <Box sx={{mb:2}}>
                <Typography variant="h7" >
                Repo Branch: 
                </Typography>
                </Box>

                {displayRepo}



              </Grid>
            </ThemeProvider>
            </Grid>
            </Box>
          </>
        )
      } // end if there were any projects

    }// end if we loaded the canister data yet
} // end ProjectListForm

const RemoveWorker = (props) => {
  let activeEnvironment = props.theProps.activeEnvironment;

  // check if worker exists otherwise print no worker


  if (activeEnvironment.workerId > 0 )  {

    return (
      <> 
      <Box  component="span" sx={{m:0, mt:4, p:2, border: '1px solid #9f9f9f', borderRadius:2 , bgcolor: "primary.light"}}>
          
      <Typography variant="h6" sx={{borderBottom: '1px solid #9f9f9f'}} >
        Manage Assigned Worker:
      </Typography>
         
        <Button onClick={props.theProps.handleRemoveWorker} variant="contained" sx={{ml:0, mt:1, mr:0, width:"100%"}}>Remove Worker ({activeEnvironment.workerId.toString()})</Button>
      </Box>
      </>
    )

  } else {

    return (
      <> 
      
      <Typography variant="body2" >
      No Worker Assigned
      </Typography> 
      </>
    )
  }
  
} // end RemoveWorker


const IdentityListForm = (props) => {
  let environmentEnvironmentTypeText = props.theProps.environmentEnvironmentTypeText;

  // check if worker exists otherwise print no worker


  if (environmentEnvironmentTypeText == "PROD" || environmentEnvironmentTypeText == "STAGE" )  {
    ////  BEGIN IDENTITY SELECT 

    const icpmDapp = props.theProps.icpmDapp;
    const apiToken = props.theProps.apiToken;
    const myContext= props.theProps.myContext;
    const history= props.theProps.history;
    
    // we are going to get a list of Identities
  
    
    const [loadedIdentities, setLoadedIdentities] = useState(false);
    const [listOfIdentities, setListOfIdentities] = useState([]);
    let activePrincipal = "Choose Identity";
  
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
  
    const fetchIdentitiesList = async ()  =>  {
  
          
        // going to creat call to canister
        console.log ("1- fetchIdentitiesList - before await");
        //await sleep(500);
        const fetchData = await icpmDapp.getListOfIdentities(apiToken,"")
        
        console.log ("2- fetchIdentitiesList - after await");
        console.log (fetchData);
        console.log ("3- fetchIdentitiesList - after logging return");
        // set the appContext which should redraw the component
  
        //setWhereTo ("list");
        setLoadedIdentities (true);
        setListOfIdentities(fetchData);
        console.log ("4- fetchIdentitiesList - after setstateListData");
        
        
    } // end fetchWorkersList
  
    if (!loadedIdentities) {
      fetchIdentitiesList();
      return (
          <>
          
          <PleaseWait waitType="query"><KeyIcon sx={{mr:1}}/>Loading Identities</PleaseWait>
          </>
      )// end return
      } else {
  
        let theIdentityList = [];
        
  
        for (let i = 0; i < listOfIdentities.length; i++) {
          if (listOfIdentities[i].id.toString()== props.theProps.environmentIdentityId.toString() ) {
            activePrincipal = listOfIdentities[i].principal;
           
          }
          theIdentityList.push (
                <MenuItem key={listOfIdentities[i].id}  value={listOfIdentities[i].id}>{listOfIdentities[i].name}</MenuItem>
            )
    
        } // end for 
        if (theIdentityList.length == 0 ) {
  
          const handleClick  = async (e) => {
                        
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
  
                      
                  console.log ("GettingStarted-handleClick - start handleClick");
                  myContext.setActiveIdentity(theIdentityObject);
  
                  myContext.setWhereTo ("manage") ;
                  myContext.setNavSection ("Identities");
                  history.push ("/identities");
  
  
                  console.log ("GettingStarted-handleClick - end handleClick");
                  
          }
          return (
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor:"primary.light", 
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2,
                mb:3,
                pt:2}}> 
                
                  <Typography variant="h6" sx={{mb:2}}  >
                    Create a Identity first and then attach it to this Environment.
                  </Typography>
  
                  <ThemeProvider theme={myContext.environmentsThemeName}>
                 <Button onClick={() => { handleClick("/identities")}}variant="contained"  sx={{ml:2}}>Create New Identity</Button>
                  </ThemeProvider>
              </Box>
  
          )
        } else {
  
  
          var displayPrincipal = [] ;
          console.log ("props.theProps.identityId: ", props.theProps.environmentIdentityId );
          
  
          if (props.theProps.environmentIdentityId !=  0)  {
  
            displayPrincipal = [
  
                  <Box  key={1} component="span" sx={{m:0, p:2, border: '1px solid #9f9f9f',
                        bgcolor: "#ffffff", 
                        display:"block", 
                        justifyContent: "center", 
                        alignItems: "", 
                        borderRadius:2}}> 

                    <Typography variant="h7" sx={{mb:1, mr:2}} >
                    Principal from Identity:
                    </Typography>
                    <Typography variant="h7" >
                    {activePrincipal} 
                    </Typography>
                  </Box>
                  
  
              ];
          } else {
  
            displayPrincipal = [
                  <Box  key={1} component="span" sx={{m:0, p:2, border: '1px solid #9f9f9f',
                        bgcolor: "#ffffff", 
                        display:"block", 
                        justifyContent: "center", 
                        alignItems: "", 
                        borderRadius:2}}> 
                    <Typography variant="h7" >
                    {activePrincipal} 
                    </Typography>
                  </Box>
            ];
  
          } // end if there is a Identity chosen
  
  
          return (
            <>
  
            
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: "primary.superlight", 
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2,
                mb:3,
                pt:2}}> 
              <Grid container spacing={3}>            
                <Grid item xs={12} sm={12}  lg={12}>
                  {/*Select Identity*/}
                  <Typography variant="body" sx={{mb:2}}  >
                    Select a Identity for this Environment:
                  </Typography>
  
                </Grid> 
                <Grid item xs={12} sm={12}  lg={12}>
                  <FormControl fullWidth  >
                  
                  <InputLabel id="demo-simple-select-label">Identity</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={(props.theProps.environmentIdentityId !=  0)   ? props.theProps.environmentIdentityId : ""}
                    label="Identity"
                    sx={{bgcolor: '#ffffff'}}
                    onChange={props.theProps.onEnvironmentIdentityIdChange}
                  >
                    {theIdentityList}
                  </Select>
                  <FormHelperText>Choose a Identity from the list</FormHelperText>
                  </FormControl>
                </Grid> 
            <ThemeProvider theme={myContext.environmentsThemeName}>
                <Grid item xs={12} sm={12} lg={12}>
                  {/*Identity Information*/}       
  
                  <Box sx={{mb:2, backgroundColor:"primary.superlight"}}>
                  <Typography variant="h7" >
                  Principal: 
                  </Typography>
                  </Box>
  
                  {displayPrincipal}
  
  
  
                </Grid>
              </ThemeProvider>
              </Grid>
              </Box>
            </>
          )
        } // end if there were any Identities
  
      }// end if we loaded the canister data yet


    //// END IDENTITY SELECT 


  } else {

    if (props.theProps.environmentEnvironmentTypeText == "DEV" || props.theProps.environmentEnvironmentTypeText == "QA" ) {
    return (
      
      
      <Box  component="span" sx={{m:0,  border: '1px solid #9f9f9f',
              bgcolor:"primary.light", 
              display:"flex", 
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              borderRadius:2,
              mb:3,
              p:2}}> 
        <Typography variant="h7" >
        <KeyIcon sx={{mr:1}}/> Will use Identity "default" for local deployment.
        </Typography> 
      </Box>
    )
  } else {
    return (
      
      
      <Box  component="span" sx={{m:0,  border: '1px solid #9f9f9f',
              bgcolor:"primary.light", 
              display:"flex", 
              alignItems: 'center',
              flexWrap: 'wrap',
              float: 'center',
              borderRadius:2,
              mb:3,
              p:2}}> 
        <Typography variant="h7" >
        <KeyIcon sx={{mr:1}}/> Choose environment type for identity choices
        </Typography> 
      </Box>
    )
  }
  }
  
} // end RemoveWorker