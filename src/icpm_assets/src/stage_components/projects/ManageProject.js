import React, { useState,useContext } from 'react';
import {
  Link
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AccountTreeIcon from '@mui/icons-material/AccountTree';


// this is suggesiton to deal with await and async compiler issues
import 'regenerator-runtime/runtime';


/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import PleaseWait from '../../nav/PleaseWait';
import ProjectCard from './ProjectCard';

const ManageProject = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  const icpmDapp = myContext.icpmDappName;
  const apiToken = myContext.apiTokenName;
  const activeProject = myContext.activeProjectName;

  const [whereTo, setwhereTo] = React.useState("form");

  console.log ("activeProject.id = " + activeProject.id);
  console.log ("ManageProject - activeProject.id = " + activeProject.id);
    
  
  const [fetchData, setFetchData] = React.useState("");
  const [pending, setPending] = React.useState(false);
  

  const [projectNameText, setProjectNameValue] = useState(activeProject.name);
  const [projectCategoryText, setProjectCategoryValue] = useState(activeProject.category);
  const [projectDescriptionText, setProjectDescriptionValue ] = useState(activeProject.description);
  const [projectProjectRepoText, setProjectRepoValue ] = useState(activeProject.projectRepo);


  const [errorMsgNam, setErrorMsgNam ] = useState("");


  const onProjectNameChange = (e) => setProjectNameValue(e.target.value);
  const onProjectCategoryChange = (e) => setProjectCategoryValue(e.target.value);
  const onProjectDescriptionChange= (e) => setProjectDescriptionValue(e.target.value);
  const onProjectRepoChange = (e) => setProjectRepoValue(e.target.value);
  
  let stageBox = (document).querySelector(
    '#stage-box',
  );
  
  
      // this is where we talk to dfxManager canister

  const handleSubmit = async (e) => {

      e.preventDefault();
      var anyErr= false;

      if ( projectNameText == "" ) {
        setErrorMsgNam ("Project Name is required.")
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

      // first we submit to the updatProject 
      // (eventually this will be add or update)
 

      const theProjectObject = {
          id: activeProject.id,
          name: projectNameText,
          category: projectCategoryText,
          description: projectDescriptionText,
          projectRepo: projectProjectRepoText,
          dfxIdentities: [],
          creatorId: activeProject.creatorId,
          dateCreated: activeProject.dateCreated,
          lastUpdated:activeProject.lastUpdated,
      }

      
    
        var theError = "";
        console.log ("1- manageProjectMain - before await");
    
        let fetchData = await icpmDapp.manageProjectMain(apiToken,theProjectObject).catch(e => { theError = e });


            console.log ("2- manageProjectMain - after await");

        
        console.log(fetchData);

        if (theError) { 

            myContext.displayError("" +theError);


        } else if (fetchData.msg ) {


            myContext.displayError("There was a ICPM error: " +fetchData.msg);


        } else {

            myContext.setActiveProject (fetchData.projectObject);

            setwhereTo ("returnToList");

            console.log ("3- manageProjectMain - after logging return");
        } 
      
        console.log ("4- manageProjectMain - after setstateListData");

      setPending(false);
      setFetchData(fetchData);
      
      
      return false;

      
  }// end handleSubmit

    const handleReset = () => {
        setProjectNameValue("");
        setProjectDescriptionValue("");
        setProjectCategoryValue("");        
        setProjectRepoValue("");
        console.log("cancel");
        props.changeStateAgent ("list");
    }// end handle reset 
    const handleCancel = () => {
        console.log("cancel");
        console.log("cancel");
        if (activeProject.id==0 )
          props.changeStateAgent ("load");
        else 
          props.changeStateAgent ("dashboard");
    }// end handleCancel 

  
  return (
      <>
        <Title>
        <AccountTreeIcon sx={{mr:1}}/>{(activeProject.id != 0) ? "Manage Project: "+activeProject.id.toString() : "Create New Project"}
          </Title>
          
          <ManageProjectNav whereTo={whereTo} changeStateAgent={setwhereTo} parentchangeStateAgent={props.changeStateAgent} 
                onProjectNameChange={onProjectNameChange} 
                projectNameText={projectNameText}
                onProjectCategoryChange={onProjectCategoryChange}
                projectCategoryText={projectCategoryText}
                onProjectDescriptionChange={onProjectDescriptionChange}
                projectDescriptionText={projectDescriptionText}
                onProjectRepoChange={onProjectRepoChange}
                projectProjectRepoText={projectProjectRepoText}
                pending={pending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                activeProject={activeProject}
                errorMsgNam={errorMsgNam}/>
          
          

      </>
      
    )
} // end of ManageProject

export default ManageProject;


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

const ManageProjectNav = (props) => {
    const whereTo = props.whereTo ;
    console.log("whereTo ="+whereTo);
  
    if (whereTo == "form") {
      
      
    return (
          <>
            <ManageProjectForm 
            theProps={props}
            />
        </>

      ) // end return 
      
    } else if (whereTo == "returnToList") {
        
        return (
            <>
            
            <Box  component="span" sx={{m:0, p:4, border: '0px solid #9f9f9f',display:"flex", justifyContent: "center", alignItems: "", borderRadius:2 }}>
          
            <Typography variant="h5" align="center">
                You have successfully {(props.activeProject.id != 0) ? "updated this": "created a new"} Project.
            </Typography>
            
            </Box>
            <Box  component="span" sx={{m:0, p:1, border: '1px solid #9f9f9f',
                bgcolor: '#ffffff',
                display:"flex", 
                justifyContent: "center", 
                alignItems: "", 
                borderRadius:2 }}>
            <ProjectCard key={props.activeProject.id.toString()} project={props.activeProject} changeStateAgent={props.parentchangeStateAgent}/>
            </Box>
            <Button onClick={() => { props.parentchangeStateAgent ("load")}}  variant="outlined" disabled={props.pending} sx={{ml:2, mr:2,  mt:2}}>Return to List of Projects</Button>
            </>
        )
    }// end whereTo if
    return (
        <>
        <PleaseWait><AccountTreeIcon sx={{mr:1}}/>{(props.activeProject.id != 0) ? "Updating": "Creating New"} Project</PleaseWait>
        </>
  
    ) // end default return 
    
  
  }// end ManageProjectNav


const ManageProjectForm = (props) => {


    return (
      <>



      <Typography variant="body" >
      {(props.theProps.activeProject.id != 0) ? "Update Project: ": ""}
      </Typography>
      <FormControl  sx={{ m:0,mt:2, p:0 }}>
      <ShowError errorMsg={props.theProps.errorMsgNam}/>
      <FormTextField 
          onChange={props.theProps.onProjectNameChange}
          value={props.theProps.projectNameText}
          label={"Project Name"} //optional
          helperText=""

      />  
      <FormTextField
          onChange={props.theProps.onProjectCategoryChange}
          value={props.theProps.projectCategoryText}
          label={"Project Category"} //optional
          helperText="(this field is optional)"
      />
      <FormTextField
          onChange={props.theProps.onProjectDescriptionChange}
          value={props.theProps.projectDescriptionText}
          label={"Project Description"} //optional
          helperText="(this field is optional)"
          multiline={true}
          rows={2}
      />
      <FormTextField
          onChange={props.theProps.onProjectRepoChange}
          value={props.theProps.projectProjectRepoText}
          label={"Project GitHUB Repo Address"} //optional
          helperText="Copy URL from GitHub and paste here directly, including the “https://” prefix”"
          
      />
      </FormControl>
        
      <Box  component="span" sx={{m:0, p:0, border: '0px solid #9f9f9f',display:"flex", justifyContent: "flex-end", alignItems: "flex-end", borderRadius:2 }}>
          
          <Button onClick={props.theProps.handleCancel}  variant="outlined" disabled={props.theProps.pending} sx={{ml:2, mr:2}}>Cancel</Button>
          <Button onClick={props.theProps.handleSubmit} variant="contained" disabled={props.theProps.pending} sx={{ml:2}}>Submit</Button>
      </Box>
      {(props.theProps.activeProject.id != 0) ? "("+props.theProps.activeProject.id +")": "(New)"}
      </>
    ) // end return


} // end ManageProjectForm

