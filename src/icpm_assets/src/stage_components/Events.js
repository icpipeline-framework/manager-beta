import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

/// ****** CUSTOM IMPORTS 
import EventsMain from './events/EventsMain';
import Copyright from '../nav/Copyright';
import AppContext from '../nav/AppContext';

const Events = (props) => {

  // now we get the global context 
  const myContext = useContext(AppContext);

  const eventsType = myContext.eventsTypeName;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <EventsMain/>
        </Paper>
          <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}// end Events

export default Events;