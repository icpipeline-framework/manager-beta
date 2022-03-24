import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

/// ****** CUSTOM IMPORTS 
import ProjectsMain from './projects/ProjectsMain';
import Copyright from '../nav/Copyright';

const Projects = () => {

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Deployments */}
            <Grid item xs={12} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ProjectsMain />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}// end Projects

export default Projects;