import React, { useContext } from 'react';

import Box from '@mui/material/Box';
import { Route, Switch,Redirect} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
import AppContext from '../nav/AppContext';







const NavTitle = () => {

  
    // now we get the global context 
    const myContext = useContext(AppContext);
    
  return (
          <>
            <Switch>
                <Route exact path="/">
                  <ThemeProvider theme={myContext.defaultThemeName}>
                          
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    <PiplineManagerNavTitle>
                      
                      
                      <BarChartIcon sx={{ml:0, mr:1}} />  Dashboard
                      </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/dashboard">
                  <ThemeProvider theme={myContext.defaultThemeName}>
                 
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    <PiplineManagerNavTitle>
                      
                      
                      <BarChartIcon sx={{ml:0, mr:1}} />  Dashboard
                      </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/environments">
                  <ThemeProvider theme={myContext.environmentsThemeName}>
                            
                      <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'nowrap',
                          float: 'left'
                      }}>
                          <PiplineManagerNavTitle>

                          <SettingsSystemDaydreamIcon sx={{ml:0, mr:1}} /> Environments
                          </PiplineManagerNavTitle>
                        
                      </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/projects">
                  <ThemeProvider theme={myContext.projectsThemeName}>
                  
            
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                      <PiplineManagerNavTitle> 
                      
                        <AccountTreeIcon sx={{ml:0, mr:1}} /> Projects
                        </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/deployments">
                  <ThemeProvider theme={myContext.deploymentsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                      <PiplineManagerNavTitle> 
                        <AltRouteIcon sx={{ml:0, mr:1}} /> Deployments
                        </PiplineManagerNavTitle>
                      
                    </Box>
                    
                  </ThemeProvider>
                </Route>
                <Route path="/workers">
                  <ThemeProvider theme={myContext.workersThemeName}>
                          
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                        <PiplineManagerNavTitle> 
                        <WorkspacesIcon sx={{ml:0, mr:1}} /> Workers
                        </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/jobs">
                  <ThemeProvider theme={myContext.jobsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                        <PiplineManagerNavTitle> 
                        <ConstructionIcon sx={{ml:0, mr:1}} /> Jobs
                        </PiplineManagerNavTitle>
                      
                    </Box>
                    
                  </ThemeProvider>
                </Route>
                <Route path="/events">
                  <ThemeProvider theme={myContext.eventsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                      <PiplineManagerNavTitle>
                        <FormatListBulletedIcon sx={{ml:0, mr:1}} /> Events
                        </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/settings">
                  <ThemeProvider theme={myContext.settingsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    
                    <PiplineManagerNavTitle>
                      <SettingsIcon sx={{ml:0, mr:1}} /> Settings
                      </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/identities">
                  <ThemeProvider theme={myContext.settingsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    
                    <PiplineManagerNavTitle>
                      <SettingsIcon sx={{ml:0, mr:1}} /> Identities
                      </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/canisters">
                  <ThemeProvider theme={myContext.settingsThemeName}>
                  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    
                    <PiplineManagerNavTitle>
                      <SettingsIcon sx={{ml:0, mr:1}} /> Canisters
                      </PiplineManagerNavTitle>
                      
                    </Box>
                  </ThemeProvider>
                </Route>
                <Route path="/help">
                  <ThemeProvider theme={myContext.helpThemeName}>
                          
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        float: 'left'
                    }}>
                    <PiplineManagerNavTitle>
                      
                      
                        <HelpOutlineIcon sx={{ml:0, mr:1}} /> Help
                        </PiplineManagerNavTitle>
                      
                    </Box>
                    
                  </ThemeProvider>
                </Route>
                <Redirect to="/" />
            </Switch>
       

        </>
  );
} // end NavTitle

export default NavTitle;


