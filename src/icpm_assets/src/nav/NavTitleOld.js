
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


// nav Section Icons

import BarChartIcon from '@mui/icons-material/BarChart';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionIcon from '@mui/icons-material/Construction';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

/// ****** CUSTOM IMPORTS 
import PiplineManagerNavTitle from './PiplineManagerNavTitle';


const NavTitle = (props) => {
    const navSectionName = props.navSectionName ;

    if (navSectionName == "Dashboard") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
             <PiplineManagerNavTitle>
              
              
              <BarChartIcon sx={{ml:0, mr:1}} />  Dashboard
              </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Environments") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
                <PiplineManagerNavTitle>

                <SettingsSystemDaydreamIcon sx={{ml:0, mr:1}} /> Environments
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Projects") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
              <PiplineManagerNavTitle> 
              
                <AccountTreeIcon sx={{ml:0, mr:1}} /> Projects
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Deployments") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
              <PiplineManagerNavTitle> 
                <AltRouteIcon sx={{ml:0, mr:1}} /> Deployments
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Workers") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
                <PiplineManagerNavTitle> 
                <WorkspacesIcon sx={{ml:0, mr:1}} /> Workers
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Jobs") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
                <PiplineManagerNavTitle> 
                <ConstructionIcon sx={{ml:0, mr:1}} /> Jobs
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Events") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
              <PiplineManagerNavTitle>
                <FormatListBulletedIcon sx={{ml:0, mr:1}} /> Events
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Settings") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
             
             <PiplineManagerNavTitle>
              <SettingsIcon sx={{ml:0, mr:1}} /> Settings
              </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    } else if (navSectionName == "Help") {
        return (
            
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'left'
            }}>
            <PiplineManagerNavTitle>
              
              
                <HelpOutlineIcon sx={{ml:0, mr:1}} /> Help
                </PiplineManagerNavTitle>
              
            </Box>
            
        
        )// end return
    }// end if 
    return (
        <></>
    )
  }// end NavTitle

  export default NavTitle ;
  