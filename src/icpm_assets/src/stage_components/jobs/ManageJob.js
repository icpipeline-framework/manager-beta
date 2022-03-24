import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ConstructionIcon from '@mui/icons-material/Construction';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import { icpm } from "../../../../declarations/icpm";

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import JobCard from './JobCard';

const ManageJob = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeJob = myContext.activeJobName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeJob.id = " + activeJob.id);
    
  
  const [icUpdateResponse, setIcUpdateRresponse] = React.useState("");
  const [pending, setPending] = React.useState(false);
  
  const [statusText, setStatusValue] = useState(activeJob.status);
  const [jobTypeText, setJobTypeValue] = useState(activeJob.jobType);
  const [refTypeText, setRefTypeValue] = useState(activeJob.refType);
  
  


  const onStatusChange = (e) => setStatusValue(e.target.value);
  const onJobTypeChange = (e) => setJobTypeValue(e.target.value);
  const onRefTypeChange = (e) => setRefTypeValue(e.target.value);
  
  
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

    e.preventDefault();

      if (pending) return;

      setwhereTo ("pleaseWait");
      setPending(true);

      // first we submit to the updatJob 
      // (jobually this will be add or update)


      const theJobObject = {
        id: activeJob.id,
        status:statusText,
        jobType:jobTypeText,
        refType: refTypeText,
        refId: 0,
        workerId: 0,
        environmentId:0,
        dateCreated: 0,
        lastUpdated: 0,
      } // end theJobObject



      
      let newIcUpdateResponse = await icpmDapp.manageJobMain(apiToken,theJobObject);

      setIcUpdateRresponse(icUpdateResponse);
      console.log(icUpdateResponse);
      if (newIcUpdateResponse != "done") {

          alert ("there was an issue" );
          alert (newIcUpdateResponse);

      } else {
          myContext.setActiveJob (theJobObject);
          let listOfJobs = await icpmDapp.getListOfJobs(apiToken,"");
          myContext.setListOfJobs (listOfJobs);
          console.log(listOfJobs);
          //props.changeStateAgent ("list ");

            setwhereTo ("returnToList");
      } 
      

      setPending(false);
      console.log(jobTypeText);
      
      return false;

      
  }// end handleSubmit


    const handleReset = () => {
        setStatusValue("");
        setJobTypeValue("");
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
        <ConstructionIcon sx={{mr:1}}/>Manage Job 
          </Title>
          
          <ManageJobNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onStatusChange={onStatusChange}
                statusText={statusText}
                onJobTypeChange={onJobTypeChange} 
                jobTypeText={jobTypeText}
                onRefTypeChange={onRefTypeChange}
                refTypeText={refTypeText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeJob={activeJob}/>
          
          

      </>
      
    )
} // end of ManageJob

export default ManageJob;

const ManageJobNav = (props) => {
    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageJobForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeJob.id != 0) ? "updated this": "created a new"} Job.
            </Typography>
            <Button onClick={() => { props.parentchangeStateAgent ("list")}}  variant="contained" disabled={props.pending} sx={{ml:2, mr:2}}>Return to List of Jobs</Button>
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <JobCard key={props.activeJob.id.toString()} job={props.activeJob}/>
            </Box>

            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><ConstructionIcon sx={{mr:1}}/>{(props.activeJob.id != 0) ? "Updating": "Creating New"} Job</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageJobNav


const ManageJobForm = (props) => {


    return (
      <>



      <Typography variant="body" >
      {(props.theProps.activeJob.id != 0) ? "Update Job: ": "Create Job: "}Please fill out this form
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <FormTextField
          onChange={props.theProps.onStatusChange}
          value={props.theProps.statusText}
          label={"Job Status"} //optional
          helperText="This is the status in the Job (Created, Assigned, Completed, Terminated)"
          multiline={true}
          rows={2}
      />
      <FormTextField 
          onChange={props.theProps.onJobTypeChange}
          value={props.theProps.jobTypeText}
          label={"Job Type"} //optional
          helperText="This is the job type (Deploy, Launch Worker, Shutdown Worker, Image Worker) "
      />  
      <FormTextField
          onChange={props.theProps.onRefTypeChange}
          value={props.theProps.refTypeText}
          label={"Ref Type"} //optional
          helperText="Main reference category for this job (Deployment)"
      />
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeJob.id != 0) ? "("+props.theProps.activeJob.id +")": "(New)"}
      </>
    ) // end return


} // end ManageJobForm

