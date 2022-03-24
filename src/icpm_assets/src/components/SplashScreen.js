import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

/// ****** CUSTOM IMPORTS 

import GetImage from './GetImage';
import PleaseWait from '../nav/PleaseWait';
import Copyright from '../nav/Copyright';

const SplashScreen = (props) => {
  const errorMsg = props.errorMsg;

  return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 500 }}>
        <Paper elevation={4}
          sx={{
            p: 2,
            pb:15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <Box sx={{width:"250px", justifyContent:"center", margin:"auto", mb:4}} >
          <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
        </Box>

        <Box align="center">

        <PleaseWait>Checking pipeline status ...</PleaseWait>
            
        
        <ShowError errorMsg={errorMsg} />
        </Box>
      </Paper>
      <Copyright sx={{ pt: 4 }} />
    </Container>


  );
}// end SplashScreen

export default SplashScreen;

const ShowError = (props) => {
    
  const errorMsg = props.errorMsg;

  if (errorMsg) {
    return (
      <>
      <Paper sx={{bgcolor: "#B00020", mb:3, mt:2}} elevation={5}>
        <Typography variant="h6" color="primary.contrastText" align="center" >
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
