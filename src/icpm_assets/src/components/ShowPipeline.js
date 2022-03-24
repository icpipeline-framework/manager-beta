import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

import 'regenerator-runtime/runtime';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GetImage from './GetImage';


/// ****** CUSTOM IMPORTS 

import AppContext from '../nav/AppContext';


const ProjectPipeline = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    var environmentObjects = props.environmentObjects;
    //environmentObjects = [];
    console.log ("ProjectPipeline - Inside my ProjectPipeline");
 
    var displayQA = [];

    // now we get the counts
    var thisEnvironmentsArray = [...environmentObjects] ;
    var devEnvironmments = thisEnvironmentsArray.filter(e => e.environmentType == "DEV")
    var qaEnvironmments = thisEnvironmentsArray.filter(e => e.environmentType == "QA")
    var stageEnvironmments = thisEnvironmentsArray.filter(e => e.environmentType == "STAGE")
    var prodEnvironmments = thisEnvironmentsArray.filter(e => e.environmentType == "PROD")


    return (


      <Paper elevation={4} sx={{mb:2, border:"1px solid #9f9f9f", borderRadius:2, p:2}}>
      
      <Grid container >

        <Grid item xs={12}  >
          <Box sx={{ justifyContent:"left", margin:"auto", mb:2, borderBottom: "1px solid #9f9f9f"}} >
              <Typography align="left" variant="body2">
                Project Environment Pipeline:
              </Typography>

          </Box>
        </Grid>
        <Grid item xs={12}  md={1} >
        <Box sx={{width:"50px", justifyContent:"left", margin:"auto", mb:1,}} >
            <GetImage imgSrc="deploymentArrow.png" imgWidth="50px" imgAlt="Movin' down the Pipeline" />
          </Box>
        </Grid>
        <Grid item xs={12}  md={2} >
        <CardActionArea onClick={() => {props.environmentsSort("DEV")}}> 
          <Card sx={{bgcolor: "primary.superlight", height:90, mb:1, border:"1px solid #9f9f9f",}} elevation={3}>
            <Typography variant="h6" color="primary.main" align="center" >
            DEV
            </Typography>
            <Typography variant="h3" color="primary.main" align="center" >
            {devEnvironmments.length}
            </Typography>

          </Card>
        </CardActionArea>
        </Grid>
        <Grid item xs={12}  md={1} >
        <Box sx={{width:"50px", justifyContent:"center", margin:"auto", mb:1,}} >
            <GetImage imgSrc="deploymentArrow.png" imgWidth="50px" imgAlt="Movin' down the Pipeline" />
          </Box>
        </Grid>

        <Grid item xs={12}  md={2} >
        <CardActionArea onClick={() => {props.environmentsSort("QA")}}> 
        <Card sx={{bgcolor: "primary.superlight", height:90, mb:1, border:"1px solid #9f9f9f",}} elevation={3}>
          <Typography variant="h6" color="primary.main" align="center" >
            QA
            </Typography>
            <Typography variant="h3" color="primary.main" align="center" >
            {qaEnvironmments.length}
            </Typography>

            </Card>
        </CardActionArea>
        </Grid>
        <Grid item xs={12}  md={1} >
        <Box sx={{width:"50px", justifyContent:"center", margin:"auto", mb:1,}} >
            <GetImage imgSrc="deploymentArrow.png" imgWidth="50px" imgAlt="Movin' down the Pipeline" />
          </Box>
        </Grid>

        <Grid item xs={12}  md={2} >
        <CardActionArea onClick={() => {props.environmentsSort("STAGE")}}> 
        <Card sx={{bgcolor: "primary.superlight", height:90, mb:1, border:"1px solid #9f9f9f",}} elevation={3}>
          <Typography variant="h6" color="primary.main" align="center" >
            STAGE
            </Typography>
            <Typography variant="h3" color="primary.main" align="center" >
            {stageEnvironmments.length}
            </Typography>
            
            </Card>
        </CardActionArea>
        </Grid>
        <Grid item xs={12}  md={1} >
        <Box sx={{width:"50px", justifyContent:"center", margin:"auto", mb:1,}} >
            <GetImage imgSrc="deploymentArrow.png" imgWidth="50px" imgAlt="Movin' down the Pipeline" />
          </Box>
        </Grid>

        <Grid item xs={12}  md={2} >
        <CardActionArea onClick={() => {props.environmentsSort("PROD")}}> 
        <Card sx={{bgcolor: "primary.superlight", height:90, mb:1, border:"1px solid #9f9f9f",}} elevation={3}>
          <Typography variant="h6" color="primary.main" align="center" >
            PROD
            </Typography>
            <Typography variant="h3" color="primary.main" align="center" >
            {prodEnvironmments.length}
            </Typography>

            </Card>
        </CardActionArea>
        </Grid>


      </Grid>
      
      </Paper>
      
      
    )// end return
} // end function ProjectPipeline



export default ProjectPipeline;

