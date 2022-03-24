import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/// ****** CUSTOM IMPORTS 
import AppContext from '../nav/AppContext';
import SettingsMain from './settings/SettingsMain';
import Copyright from '../nav/Copyright';
import ThemeDisplay from '../components/ThemeDisplay';


const Settings = () => {

  // now we get the global context 
  const myContext = useContext(AppContext);

  const identity = myContext.authClientName.getIdentity();
  
  let thePrincipal = identity.getPrincipal();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <SettingsMain />
          </Paper>
          {/*
          <ThemeDisplay/>

          <Typography 
              variant="body2"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            user principal: {thePrincipal.toString()}
            </Typography>
          */}

          <Copyright sx={{ pt: 4 }} />

        </Container>
    )
}

export default Settings;