import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StayPrimaryLandscape } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


/// ****** CUSTOM IMPORTS 
import AppContext from '../nav/AppContext';

const ThemeDisplay = (props) => {

  const myContext = useContext(AppContext);

  return (
    <Box sx={{m:2, border:"1px solid #000000"}}>
    <ThemeProvider theme={myContext.defaultThemeName}>
      <ThemeBox themeName="default" />
    </ThemeProvider>
    <ThemeProvider theme={myContext.environmentsThemeName}>
      <ThemeBox themeName="environments" />
    </ThemeProvider>
    <ThemeProvider theme={myContext.projectsThemeName}>
      <ThemeBox themeName="projects"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.eventsThemeName}>
      <ThemeBox themeName="events"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.deploymentsThemeName}>
      <ThemeBox themeName="deployments"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.workersThemeName}>
      <ThemeBox themeName="workers"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.jobsThemeName}>
      <ThemeBox themeName="jobs"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.settingsThemeName}>
      <ThemeBox themeName="settings"/>
    </ThemeProvider>
    <ThemeProvider theme={myContext.helpThemeName}>
      <ThemeBox themeName="help"/>
    </ThemeProvider>
    </Box>
  );
} // end ThemeDisplay

ThemeDisplay.propTypes = {
  children: PropTypes.node,
};


const ThemeBox = (props) => {

  return ( 
    <Grid container>
      <Grid item xs={4}>
      <Box   sx={{ bgcolor: '#ffffff' }}>

        <Typography ref={scrollTo} color="#000000" align="center" component="h1" variant="h6"  gutterBottom>
        {props.themeName} - primary.
        </Typography>
      </Box>
      </Grid>
      <Grid item xs={2}>
        
      <Box   sx={{ bgcolor: 'primary.superlight' }}>

        <Typography ref={scrollTo} color="primary.text" align="center" component="h1" variant="h6"  gutterBottom>
        superlight   
        </Typography>
      </Box>
      </Grid>
      <Grid item xs={2}>
        
      <Box   sx={{ bgcolor: 'primary.light' }}>

        <Typography ref={scrollTo} color="primary.text" align="center" component="h1" variant="h6"  gutterBottom>
        light   
        </Typography>
      </Box>
      </Grid>
      <Grid item xs={2}>
        
      <Box   sx={{ bgcolor: 'primary.main' }}>

        <Typography ref={scrollTo} color="primary.contrastText" align="center" component="h1" variant="h6"  gutterBottom>
            main   
        </Typography>
      </Box>
      </Grid>
      <Grid item xs={2}>
        
      <Box   sx={{ bgcolor: 'primary.dark' }}>

        <Typography ref={scrollTo} color="primary.contrastText" align="center" component="h1" variant="h6"  gutterBottom>
            dark   
        </Typography>
      </Box>
      </Grid>
    </Grid>
  );


} // end ThemeBox

export default ThemeDisplay;
