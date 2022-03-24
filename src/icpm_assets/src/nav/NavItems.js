import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import BarChartIcon from '@mui/icons-material/BarChart';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ConstructionIcon from '@mui/icons-material/Construction';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import CodeIcon from '@mui/icons-material/Code';

import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime} from '@mui/material/colors';





/// ****** CUSTOM IMPORTS 
import AppContext from './AppContext';
import InternetIdentityLogin from './InternetIdentityLogin';
import GetImage from '../components/GetImage';


const MainNavList = (props) => {
    
  
  // now we get the global context 
  const myContext = useContext(AppContext);

  let history = useHistory();
  let stageBox = (document).querySelector(
    '#stage-box',
  );

  const handleClick =  (whereTo) => {
        
    console.log ("NavItems-handleClick - start handleClick");
    console.log (whereTo);
    history.push (whereTo);
    if ( whereTo == "/dashboard") 
      myContext.setNavSection ("Dashboard")
    else if ( whereTo == "/environments") 
      myContext.setNavSection ("Environments")
    else if ( whereTo == "/workers") 
      myContext.setNavSection ("Workers")
    else if ( whereTo == "/projects") 
      myContext.setNavSection ("Projects")
    else if ( whereTo == "/deployments") 
      myContext.setNavSection ("Deployments")
    else if ( whereTo == "/events") {
      myContext.setNavSection ("Events") 
      myContext.setEventsType ("")
    } else if ( whereTo == "/jobs") {
      myContext.setNavSection ("Jobs") 
    } else if ( whereTo == "/settings") {
      myContext.setNavSection ("Settings")
    } else if ( whereTo == "/identities") {
      myContext.setNavSection ("Identities")
    } else if ( whereTo == "/help") 
      myContext.setNavSection ("Help")

      

    myContext.setWhereTo ("load") ;

    stageBox = (document).querySelector(
      '#stage-box',
    );
    if (stageBox) {
    stageBox.scrollTop="0";
    } else {
      console.log ("stageBox: "+stageBox)
    }
  

    console.log ("NavItems-handleClick - end handleClick");

  } // end handle click

  return (
  <>
  
    <Tooltip title={props.open != true ? "Dashboard" : ""} placement="right" enterNextDelay={300}>
      <ListItem button onClick={() => { handleClick("/dashboard")}}>
      <ListItemIcon>
        <BarChartIcon   sx={{ color:  (myContext.navSectionName == "Dashboard") ? "#008cff":""}} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Tooltip>
    
    <Tooltip title={props.open != true ? "Environments" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => { handleClick("/environments")}}>
      <ListItemIcon>
        <SettingsSystemDaydreamIcon  sx={{ color:  (myContext.navSectionName == "Environments") ? green[700]:""}}/>
      </ListItemIcon>
      <ListItemText primary="Environments"/>
    </ListItem>
    </Tooltip>

    <Tooltip title={props.open != true ? "Projects" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => { handleClick("/projects")}}>
      <ListItemIcon>
        <AccountTreeIcon  sx={{ color:  (myContext.navSectionName == "Projects") ? purple[700]:""}} />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItem>
    </Tooltip>

    <Tooltip title={props.open != true ? "Deployments" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => { handleClick("/deployments")}}>
      <ListItemIcon>
        <AltRouteIcon  sx={{ color:  (myContext.navSectionName == "Deployments") ? teal[700]:""}} />
      </ListItemIcon>
      <ListItemText primary="Deployments" />
    </ListItem>
    </Tooltip>

    <Tooltip title={props.open != true ? "Workers" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => { handleClick("/workers")}}>
      <ListItemIcon>
        <WorkspacesIcon  sx={{ color:  (myContext.navSectionName == "Workers") ? deepPurple[700]:""}}/>
      </ListItemIcon>
      <ListItemText primary="Workers" />
    </ListItem>
    </Tooltip>

<Tooltip title={props.open != true ? "Jobs" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/jobs")}}>
  <ListItemIcon>
    <ConstructionIcon  sx={{ color:  (myContext.navSectionName == "Jobs") ? lime[700]:""}} />
  </ListItemIcon>
  <ListItemText primary="Jobs" />
</ListItem> 
</Tooltip>

<Tooltip title={props.open != true ? "Events" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/events")}}>
  <ListItemIcon>
    <FormatListBulletedIcon  sx={{ color:  (myContext.navSectionName == "Events") ? cyan[700]:""}} />
  </ListItemIcon>
  <ListItemText primary="Events" />
</ListItem> 
</Tooltip>

<Tooltip title={props.open != true ? "Identities" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/identities")}}>
  <ListItemIcon>
    <KeyIcon  sx={{ color:  (myContext.navSectionName == "Identities") ?  green[700] :""}}/>
  </ListItemIcon>
  <ListItemText primary="Identities" />
</ListItem> 
</Tooltip>

<Tooltip title={props.open != true ? "Canisters" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/canisters")}}>
  <ListItemIcon>
    <CodeIcon  sx={{ color:  (myContext.navSectionName == "Canisters") ?  teal[700] :""}}/>
  </ListItemIcon>
  <ListItemText primary="Canisters" />
</ListItem> 
</Tooltip>

<Tooltip title={props.open != true ? "Settings" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/settings")}}>
  <ListItemIcon>
    <SettingsIcon  sx={{ color:  (myContext.navSectionName == "Settings") ?  brown[700] :""}}/>
  </ListItemIcon>
  <ListItemText primary="Settings" />
</ListItem> 
</Tooltip>


<Divider />
{/* now for the secondary list*/}

<Tooltip title={props.open != true ? "Help" : ""} placement="right" enterNextDelay={300}>
<ListItem button onClick={() => { handleClick("/help")}}>
  <ListItemIcon>
    <HelpOutlineIcon  sx={{ color:  (myContext.navSectionName == "Help") ?  brown[700] :""}}/>
  </ListItemIcon>
  <ListItemText primary="Help" />
</ListItem> 
</Tooltip>

{/*
<Tooltip title={"click to learn more about the Internet Computer"} placement="bottom" enterNextDelay={300}>
    <ListItem button onClick={() => {  
        window.open ("https://internetcomputer.org", "_blank") ;
        }}>
        <ListItemIcon>

<Box sx={{}}
>

<Box
component="img"
sx={{  backgroundColor:"transparent", width:"30px"}}
src="dinfinity.png"
alt="Dfinity"
/>
</Box>
        </ListItemIcon>
      <ListItemText primary={
            <React.Fragment>
              
               <GetImage imgSrc="ic-badge.svg" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
            </React.Fragment>
          } />
    </ListItem>
    </Tooltip>

<SecondaryNavItems myContext={myContext} handleClick={handleClick}/>
*/}

  </>
  )
} // end of MainNavList


const SecondaryNavItems = (props) => {

    return (
    <>
    <ListSubheader inset>Saved Views</ListSubheader>

    <Tooltip title={props.open != true ? "QA-3 Events" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => { 
      props.handleClick("/events");
      props.myContext.setEventsType("environments");
      }}>
      
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="QA-3 Events" />
    </ListItem>
    </Tooltip>

    <Tooltip title={props.open != true ? "Worker 1 Events" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => {  
        props.handleClick("/events");
        props.myContext.setEventsType("workers");
        }}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Worker 1 Events" />
    </ListItem>
    </Tooltip>
    
    <Tooltip title={props.open != true ? "Project X Events" : ""} placement="right" enterNextDelay={300}>
    <ListItem button onClick={() => {  
        props.handleClick("/events");
        props.myContext.setEventsType("projects");
        }}>
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Project X Events" />
    </ListItem>
    </Tooltip>
    

    </>
    )
  }; //end of SecondaryNavItems


export default MainNavList;
