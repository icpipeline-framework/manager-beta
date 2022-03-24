import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import WorkspacesIcon from '@mui/icons-material/Workspaces';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import WorkerCard from './WorkerCard';
import WorkerUplink from './WorkerUplink';

const ManageWorker = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeWorker = myContext.activeWorkerName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeWorker.id = " + activeWorker.id);
    
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [workerNameText, setWorkerNameValue] = useState(activeWorker.name);
  const [workerStatusText, setWorkerStatusValue] = useState(activeWorker.status);
  const [workerCategoryText, setWorkerCategoryValue] = useState(activeWorker.category);
  const [workerDescriptionText, setWorkerDescriptionValue ] = useState(activeWorker.description);




  const onWorkerNameChange = (e) => setWorkerNameValue(e.target.value);
  const onWorkerStatusChange = (e) => setWorkerStatusValue(e.target.value);
  const onWorkerCategoryChange = (e) => setWorkerCategoryValue(e.target.value);
  const onWorkerDescriptionChange= (e) => setWorkerDescriptionValue(e.target.value);
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

      e.preventDefault();

      if (pending) return;

      setwhereTo ("pleaseWait");
      setPending(true);

      // first we submit to the updatWorker 
      // (eventually this will be add or update)


      const theWorkerObject = {
        id: activeWorker.id,
        name: workerNameText,
        status: workerStatusText,
        category: workerCategoryText,
        description: workerDescriptionText,
        lastDeploymentId: activeWorker.lastDeploymentId,
        uniqueId: activeWorker.uniqueId,
        publicIp: activeWorker.publicIp,
        privateIp: activeWorker.privateIp,
        privateIp: activeWorker.privateIp,
        dnsName: activeWorker.dnsName,
        dfxReplicaType: activeWorker.dfxReplicaType,
        ttydHttpsEnabled: activeWorker.ttydHttpsEnabled,
        ttydHttpsCount: activeWorker.ttydHttpsCount,
        lastTouch: activeWorker.lastTouch,
        creatorId: activeWorker.creatorId,
        dateCreated: activeWorker.dateCreated,
        lastUpdated: activeWorker.lastUpdated,
      } // end theWorkerObject


      
      let newIcUpdateResponse = await icpmDapp.manageWorkerMain(apiToken,theWorkerObject).catch(e => { return "ICPM Error: " + e });

      setIcUpdateRresponse(icUpdateResponse);
      console.log(icUpdateResponse);
      if (newIcUpdateResponse != "done") {

          alert ("there was an issue" );
          alert (newIcUpdateResponse);

      } else {
          myContext.setActiveWorker (theWorkerObject);
          let listOfWorkers = await icpmDapp.getListOfWorkers(apiToken,"").catch(e => { return "ICPM Error: " + e });
          myContext.setListOfWorkers (listOfWorkers);
          console.log(listOfWorkers);
          //props.changeStateAgent ("list ");

            setwhereTo ("returnToList");
      } 
      

      setPending(false);
      console.log(workerNameText);
      
      return false;

      
  }// end handleSubmit

    const handleReset = () => {
        setWorkerNameValue("");
        setWorkerStatusValue("");
        setWorkerCategoryValue("");
        setWorkerDescriptionValue("");
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handle reset 
    const handleCancel = () => {
        console.log("cancel");
        props.changeStateAgent ("load");
    }// end handleCancel 

  
  return (
      <>
        <Title>
        <WorkspacesIcon sx={{mr:1}}/>Manage Worker 
          </Title>
          
          <ManageWorkerNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onWorkerNameChange={onWorkerNameChange} 
                workerNameText={workerNameText}
                onWorkerStatusChange={onWorkerStatusChange}
                workerStatusText={workerStatusText}
                onWorkerCategoryChange={onWorkerCategoryChange}
                workerCategoryText={workerCategoryText}
                onWorkerDescriptionChange={onWorkerDescriptionChange}
                workerDescriptionText={workerDescriptionText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeWorker={activeWorker}/>
          
          

      </>
      
    )
} // end of ManageWorker

export default ManageWorker;

const ManageWorkerNav = (props) => {
    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageWorkerForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeWorker.id != 0) ? "updated this": "created a new"} Worker.
            </Typography>
            <Button onClick={() => { props.parentchangeStateAgent ("list")}}  variant="contained" disabled={props.pending} sx={{ml:2, mr:2}}>Return to List of Workers</Button>
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <WorkerCard key={props.activeWorker.id.toString()} worker={props.activeWorker}/>
            </Box>

            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><WorkspacesIcon sx={{mr:1}}/>{(props.activeWorker.id != 0) ? "Updating": "Creating New"} Worker</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageWorkerNav


const ManageWorkerForm = (props) => {


    return (
      <>



      <Typography variant="body" >
      {(props.theProps.activeWorker.id != 0) ? "Update Worker: ": "Create Worker: "}Please fill out this form
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <FormTextField 
          onChange={props.theProps.onWorkerNameChange}
          value={props.theProps.workerNameText}
          label={"Worker Name"} //optional
          helperText="This is the name"
      />  
      <FormTextField
          onChange={props.theProps.onWorkerStatusChange}
          value={props.theProps.workerStatusText}
          label={"Status"} //optional
          helperText="Set the Status"
      />
      <FormTextField
          onChange={props.theProps.onWorkerCategoryChange}
          value={props.theProps.workerCategoryText}
          label={"Category"} //optional
          helperText="This is the Category"
      />
      <FormTextField
          onChange={props.theProps.onWorkerDescriptionChange}
          value={props.theProps.workerDescriptionText}
          label={"Description"} //optional
          helperText="This is the description"
          multiline={true}
          rows={2}
      />
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeWorker.id != 0) ? "("+props.theProps.activeWorker.id +")": "(New)"}
      {(props.theProps.activeWorker.id != 0) ? <WorkerUplink worker={props.theProps.activeWorker}/> : ""}

      
      </>
    ) // end return


} // end ManageWorkerForm

