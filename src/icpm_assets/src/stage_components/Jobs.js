import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

/// ****** CUSTOM IMPORTS 
import JobsMain from './jobs/JobsMain';
import Copyright from '../nav/Copyright';

const Jobs = () => {


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Jobs */}
            <Grid item xs={12} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <JobsMain />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}// end Jobs

export default Jobs;