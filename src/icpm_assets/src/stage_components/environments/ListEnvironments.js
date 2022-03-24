import React, { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';


/// ****** CUSTOM IMPORTS 
import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import EnvironmentCardListItem from './EnvironmentCardListItem';

import ShowPipeline from '../../components/ShowPipeline';

const ListEnvironments = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);
  var listOfEnvironments = myContext.listOfEnvironmentsName ;
  let displayLocation = props.displayLocation ;
  let envEnvironmentType = props.envEnvironmentType;

    const [sortTitle, setSortTitle] = useState("(by creation)");
    const [creationVariant, setCreationVariant] = useState("contained");
    const [environmentTypeVariant, setenvironmentTypeVariant] = useState("outlined");
    const [nameVariant, setNameVariant] = useState("outlined");
    
  
  if (props.listOfEnvironments) {
    listOfEnvironments = props.listOfEnvironments;

  } // end if passed in props
  console.log ("listOfEnvironments:",listOfEnvironments);


  console.log ("ListOfEnvironments - Inside my ListOfEnvironments");
  let environmentsLength  = listOfEnvironments.length ;
  console.log ("environmentsLength:",environmentsLength);

  const handleClick =  () => {

    /// create a blank object 

      const theEnvironmentObject = {
        id: 0,
        name: "",
        environmentType: "",
        description: "",
        projectId: 0,
        projectRepoBranch: "",
        identityId: 0,
        deploymentNetwork: "",
        workerId: 0,
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
    }

    
        
    console.log ("ListOfEnvironments-handleClick - start handleClick");
    console.log ("New Environment ID:" + theEnvironmentObject.id);
    myContext.setActiveEnvironment(theEnvironmentObject);
    props.changeStateAgent ("manage");

  } // end handle click

  let history = useHistory();

  const showFAQ = () => {


        
    myContext.setWhereTo ("load") ;
    myContext.setNavSection ("Help");
    history.push ("/help");

  

    console.log ("handleClick - to Help");


  } // show FAQ 

  const createDemoEnvironment =  () => {

    /// create a blank object 

      const theEnvironmentObject = {
        id: 0,
        name: "QA 1 - Demo",
        environmentType: "QA",
        description: "This is a demo Environment template created by the ICPipeline team.",
        projectId: 0,
        projectRepoBranch: "main",
        identityId: 0,
        deploymentNetwork: "local",
        workerId: 0,
        creatorId: 0,
        dateCreated: 0,
        lastUpdated: 0,
    }
    
    console.log ("ListOfEnvironments-createDemoEnvironment - start createDemoEnvironment");
    console.log ("New Environment ID:" + theEnvironmentObject.id);
    myContext.setActiveEnvironment(theEnvironmentObject);
    props.changeStateAgent ("manage");

  } // end createDemoEnvironment

  const sortList =  (sortType) => {

        // now we sort environments based on name
        var theNewList = [...listOfEnvironments] ;
        var thisSortTitle = "";
        var thisenvironmentTypeVariant = "outlined";
        var thisNameVariant = "outlined";
        var thisCreationVariant = "outlined";
        
        if (sortType =="name") {

          thisNameVariant = "contained";

          if (nameVariant =="outlined") {

            thisSortTitle = "(by name)";

            theNewList = theNewList.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
            });

          } else {
            if (sortTitle == "(by name-reverse)" ) {
              thisSortTitle = "(by name)";
            } else {
              thisSortTitle = "(by name-reverse)";
            }
            theNewList  = theNewList.reverse();

          }// end if outlined

          
        } else if (sortType =="type") {

          thisenvironmentTypeVariant = "contained";

          if (environmentTypeVariant =="outlined") {

            thisSortTitle = "(by type)";
            theNewList = theNewList.sort(function (a, b) {
                let x = a.environmentType.toLowerCase();
                let y = b.environmentType.toLowerCase();
                if (x > y) {return -1;}
                if (x < y) {return 1;}
                return 0;
            });

          } else {

            if (sortTitle == "(by type-reverse)" ) {
              thisSortTitle = "(by type)";
            } else {
              thisSortTitle = "(by type-reverse)";
            }
            theNewList  = theNewList.reverse();


          } // end if outlined 
        } else {

          //console.log ("BEFORE sortedEventObjectsByLocalTime:", sortedEventObjectsByLocalTime)

          thisCreationVariant = "contained";

          if (creationVariant =="outlined") {

          theNewList = theNewList.sort(function (a, b) {
              //console.log ("Number(a.localTime): ", Number(a.localTime))
              //console.log ("Number(b.localTime): ", Number(b.localTime))
              if (Number(a.id) > Number(b.id)) return  1;
              if (Number(a.id) < Number(b.id)) {
              return  -1;
              }
              return 0;
          });
          thisSortTitle = "(by creation)";
          } else {

            if (sortTitle == "(by creation-reverse)" ) {
              thisSortTitle = "(by creation)";
            } else {
              thisSortTitle = "(by creation-reverse)";
            }
            theNewList  = theNewList.reverse();
          } 

        } // end if sortType

        setSortTitle (thisSortTitle);
        setCreationVariant (thisCreationVariant);
        setNameVariant (thisNameVariant);
        setenvironmentTypeVariant (thisenvironmentTypeVariant);

        myContext.setSetListOfEnvironments (theNewList);
        

  } // end sortList
  if (environmentsLength > 0) {
    console.log ("listOfEnvironments - this is the stateListData:")
    console.log (listOfEnvironments)
    let theEnvironmentList = [];
    let theButton = [
      <Button key={1} onClick={() => { handleClick()}}  variant="outlined" sx={{ml:1, mr:1, mb:2 }}>
        <SettingsSystemDaydreamIcon sx={{mr:1}}/>
        Create New Environment
        </Button>
    ];

    if (displayLocation == "projectDashboard" ) {
        if (environmentsLength == 0 ) { 
          theButton = [
            <Button key={1} onClick={() => { handleClick()}}  variant="outlined" sx={{ml:1, mr:1, mb:2 }}>
              <SettingsSystemDaydreamIcon sx={{mr:1}}/>
              Create New Environment
              </Button>
          ];
        } else {
          theButton = [];
        }
    }
    
    for (let i = 0; i < environmentsLength; i++) {
        
      theEnvironmentList.push (
            <EnvironmentCardListItem displayLocation={displayLocation} changeStateAgent={props.changeStateAgent} key={listOfEnvironments[i].id.toString()} environment={listOfEnvironments[i]}/>
        )

    } // end for 
    // most recent on top by reversing
    theEnvironmentList.reverse();



    if (displayLocation == "projectDashboard" ) {

      return (
          <>
          
            <Box key={1} sx={{bgcolor:"primary.superlight",
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center'}} >
                <SettingsSystemDaydreamIcon  sx={{mr:1}}/>{envEnvironmentType} Environments With This Project:
            </Box>
          {theButton}


          {theEnvironmentList}
          
           </>
      ) /// end return
    } else {

      const environmentsSort = (environmentTypeSort) => {

        console.log ("environmentsSort", environmentTypeSort);
        let thisListOfEnvironments = listOfEnvironments.filter(e => e.environmentType == environmentTypeSort)
        
        myContext.setSetListOfEnvironments (thisListOfEnvironments);
        setenvEnvironmentType (environmentTypeSort );

      }// end environmentsSort 
      

      return (
        <>
        <Title>

        <Grid container justify="space-between">
          <Grid item style={{ flex: 1 }}>
            
            <Box key={1} sx={{ display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  float: 'center'}} >
              <SettingsSystemDaydreamIcon  sx={{mr:1}}/>All Environments {sortTitle}


            <Tooltip  key={1} title="What is an Environment? ... click to find out ..." placement="top" enterNextDelay={300}>
            <IconButton sx={{mb:0}} color="inherit" onClick={() => { showFAQ()}}>              
            <HelpOutlineIcon />
            </IconButton>
            </Tooltip>
            </Box>
          </Grid>
          <Grid item sx={{ flex: 1}}>
            <Grid container sx={{ flex: 1, justifyContent:"right" }}>
              <Grid item >
                <Button variant={creationVariant}  size="small" sx={{ height:25, mb:1, mr: 1}}
                  onClick={()=> sortList("")}
                >
                  List By Creation
                </Button>
              </Grid>
              <Grid item >
                <Button variant={environmentTypeVariant} size="small" sx={{ height:25, mb:1, mr: 1}}
                  onClick={()=> sortList("type")}
                >
                  List By Type
                </Button>
              </Grid>
              <Grid item >
                <Button variant={nameVariant}  size="small" sx={{ height:25, mb:1, mr: 1}}
                  onClick={()=> sortList("name")}
                >
                  List By Name
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Title>
        {theButton}

        {/*
        <ShowPipeline environmentObjects={listOfEnvironments} environmentsSort={environmentsSort} />
        */}

        {theEnvironmentList}
        
         </>
    ) /// end return

    }
  } else  {
        if (displayLocation == "projectDashboard" ) {
          var thisNoEnvironments = "No Environments";
          var thisTitle = "Environments for this Project";
          
          if (envEnvironmentType != "All") {
            thisNoEnvironments = `No ${envEnvironmentType} Environments`;
            thisTitle =  `${envEnvironmentType} Environments for this Project`;

          }

          return (
            <>
          
            <Box key={1} sx={{bgcolor:"primary.superlight",
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center'}} >
                <SettingsSystemDaydreamIcon  sx={{mr:1}}/>{thisTitle}
            </Box>

            <Box sx={{ borderBottom: 0,  borderRadius:2, backgroundColor: 'white', mt:4 }}>
              <Typography variant="h6" color="text.secondary" align="center" >
              {thisNoEnvironments}
              </Typography>

            </Box>
            
            </>
          )// end return
        } else {
          return (
            <>
            <Title><SettingsSystemDaydreamIcon sx={{mr:1}}/>All Environments
            
          
            
            </Title>
            <Button onClick={() => { handleClick()}}  variant="outlined" sx={{ml:1, mr:1 }}>
            <SettingsSystemDaydreamIcon sx={{mr:1}}/>Create New Environment
            </Button>

            <Box sx={{ borderBottom: 0, bgcolor:"background.paper", borderColor: 'divider', mt:4 }}>
              <Typography variant="h5" color="text.secondary" align="center" >
              No Environments.   
              </Typography>
            
            
            <Box  sx={{borderRadius:2, border:"1px solid #9f9f9f", m:3, mt:3, p:1, display:"flex"}}>
              <Grid container >
                <Grid item xs={12}>
                  <Typography variant="h" color="text.secondary" align="left" sx={{display:"block", flexGrow:1}} >
                  ICPipeline provides an example QA environment configuration for your use.
                  Use this button if you want a quick-start example on the ICPipeline framework.          
                  </Typography>
                  
                </Grid>
                <Grid item xs={12} sx={{display:"flex"}}>
                  <Tooltip title={`Click to create a new environment from  the example`} placement="top" enterNextDelay={300}>
                  <Button onClick={() => { createDemoEnvironment()}}  variant="contained" sx={{m:2, flexGrow:1}}>Auto-Configure Demo Environment</Button>
                  </Tooltip>
                  
                </Grid>
              </Grid>
            </Box>
              

            </Box>
            
            </>
          )// end return
        } // end if location 

      
  }// end if there is any Environments  

} // end of ListEnvironments

export default ListEnvironments;
