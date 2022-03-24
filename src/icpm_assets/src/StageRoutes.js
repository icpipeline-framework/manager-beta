import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';
import { Route, Switch,Redirect, useLocation} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/// ****** CUSTOM IMPORTS 

import AppContext from './nav/AppContext';
import Dashboard from './stage_components/Dashboard';
import Environments from './stage_components/Environments';
import Workers from './stage_components/Workers';


import Projects from './stage_components/Projects';
import Deployments from './stage_components/Deployments';
import Events from './stage_components/Events';
import Jobs from './stage_components/Jobs';
import Settings from './stage_components/Settings';
import Identities from './stage_components/Identities';
import Canisters from './stage_components/Canisters';
import Help from './stage_components/Help';


const StageRoutes = () => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const location = useLocation();
    console.log ("- STAGEROUTES - location.pathname: ", location.pathname) ;

    
  return (
          <>
            <Switch>
                <Route exact path="/" >
                  <ThemeProvider theme={myContext.defaultThemeName}>
                  <Dashboard />
                  </ThemeProvider>
                </Route>
                <Route path="/dashboard">
                  <ThemeProvider theme={myContext.defaultThemeName}>
                  <Dashboard />
                  </ThemeProvider>
                </Route>
                <Route path="/environments">
                  <ThemeProvider theme={myContext.environmentsThemeName}>
                  <Environments />
                  </ThemeProvider>
                </Route>
                <Route path="/workers">
                  <ThemeProvider theme={myContext.workersThemeName}>
                  <Workers />
                  </ThemeProvider>
                </Route>
                <Route path="/projects">
                  <ThemeProvider theme={myContext.projectsThemeName}>
                  <Projects />
                  </ThemeProvider>
                </Route>
                <Route path="/deployments">
                  <ThemeProvider theme={myContext.deploymentsThemeName}>
                  <Deployments />
                  </ThemeProvider>
                </Route>
                <Route path="/events">
                  <ThemeProvider theme={myContext.eventsThemeName}>
                  <Events />
                  </ThemeProvider>
                </Route>
                <Route path="/jobs">
                  <ThemeProvider theme={myContext.jobsThemeName}>
                  <Jobs />
                  </ThemeProvider>
                </Route>
                <Route path="/settings">
                  <ThemeProvider theme={myContext.settingsThemeName}>
                  <Settings />
                  </ThemeProvider>
                </Route>
                <Route path="/identities">
                  <ThemeProvider theme={myContext.environmentsThemeName}>
                    <Identities />
                  </ThemeProvider>
                </Route>
                <Route path="/canisters">
                  <ThemeProvider theme={myContext.deploymentsThemeName}>
                  <Canisters />
                  </ThemeProvider>
                </Route>
                <Route path="/help">
                  <ThemeProvider theme={myContext.helpThemeName}>
                  <Help />
                  </ThemeProvider>
                </Route>
                <Redirect to="/projects" />
            </Switch>
        {/*
        <Route>
          {({ location }) => (
            <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary" className="currentPath">
              Current route: {location.pathname}
            </Typography>
          )}
        </Route>
        */}

        </>
  );
} // end stage routes

export default StageRoutes;


