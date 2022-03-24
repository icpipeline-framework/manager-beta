import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';


/// ****** CUSTOM IMPORTS 
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';
import ChangeManagerPassCode from './ChangeManagerPassCode';
import AddPrincipal from './AddPrincipal';
import ManagePrincipal from './ManagePrincipal';
import ManageDFXPrincipal from './ManageDFXPrincipal';
import DownloadConfigurationData from './DownloadConfigurationData';
import DownloadLogData from './DownloadLogData';

function preventDefault(event) {
  event.preventDefault();
}

const SettingsMain = () => {


  // now we get the global context 
  const myContext = useContext(AppContext);

  // this resets the scroll inside of the stage box on every render
    // this resets the scroll inside of the stage box on every render
  const stageBox = (document).querySelector(
    '#stage-box',
  );
  if (stageBox) {
  stageBox.scrollTop="0";
  }

  return (
    <React.Fragment>
      <Title><SettingsIcon sx={{mr:1}}/>Settings</Title>
      
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <ChangeManagerPassCode />
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <AddPrincipal />
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <ManagePrincipal />
            </Grid>
            {/*
            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <ManageDFXPrincipal />
            </Grid>
            */}

            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <DownloadConfigurationData />
            </Grid>
            <Grid item xs={12} md={12} lg={12} sx={{
              display: 'flex',
              flexDirection: 'column',}}>
              <DownloadLogData />
            </Grid>
            
          </Grid>
            
    </React.Fragment>
  );
} // end SettingsMain

export default  SettingsMain;