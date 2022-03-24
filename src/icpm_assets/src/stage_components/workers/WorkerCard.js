import React, { useContext, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ConstructionIcon from '@mui/icons-material/Construction';

import 'regenerator-runtime/runtime';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import Title from '../../components/Title';
import DateDisplay from "../../components/DateDisplay"
import GridCardListItem from '../../components/GridCardListItem';
import WorkerActiveConnect from './WorkerActiveConnect';
import GetImage from '../../components/GetImage';


const WorkerCard = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const icpmDapp = myContext.icpmDappName;
    const apiToken = myContext.apiTokenName;

    const worker = props.worker;
    var [completeWorker, setCompleteWorker] = useState("");
    var [isFetching, setIsFetching] = useState(false);
    var [isIiJobCreated, setIiIsJobCreated] = useState(false);
    var [creatingIiJob, setCreatingIiJob] = useState(false);
    var [isTtyJobCreated, setTtyIsJobCreated] = useState(false);
    var [creatingTtyJob, setCreatingTtyJob] = useState(false);
    
    const [pendingWorkerUpdateDnsPrivate, setPendingWorkerUpdateDnsPrivate] = React.useState(false);
    const [pendingWorkerUpdateReplicaType, setPendingWorkerUpdateReplicaType] = React.useState(false);

    let history = useHistory();
    var location = useLocation();

    const fetchCompleteWorker = async ()  =>  {
      if (!isFetching) {
        // going to creat call to canister
        console.log ("1- fetchCompleteWorker - before await");
        
        
        const fetchData = await icpmDapp.getCompleteWorkerMain(apiToken,worker.id)
        
        console.log ("2- fetchCompleteWorker - after await");
        console.log (fetchData);
        console.log ("3- fetchCompleteWorker - after logging return");
        // set the state which should redraw the component
        
        checkWhereIAm ();
        setCompleteWorker (fetchData);
        
        console.log  ("THE Msg  = " + fetchData.msg);
        console.log ("4- fetchCompleteWorker - after setstateListData");
        setPendingWorkerUpdateDnsPrivate(false);
        setPendingWorkerUpdateReplicaType(false);

      } else {

       console.log ("**** ACTIVELY FETCHING *****");
      }
    } // end fetchCompleteWorker
    
    console.log ("WorkerCard - Inside my WorkerCard");
    
    const checkWhereIAm = () => {

      if (location.pathname == "/workers") {
        console.log ("****** I am in workers: ",location.pathname  );
        //setCompleteWorker (fetchData);
      } else {
        console.log ("****** I am NOT in workers: ", location.pathname );
      }

    }
    const viewActiveJob =  () => {
      console.log ("View Job: ", completeWorker.latestJobObject.id) ;

      myContext.setNavSection ("Jobs")
      history.push ("/jobs");
      myContext.setWhereTo ("load") ;
      myContext.setJumpId (completeWorker.latestJobObject.id) ;
    
  
    } // end handle click

      const displayLocation  = props.displayLocation ;
      
    if (!completeWorker.responseStatus) {
      fetchCompleteWorker();

      return (
        <CardContent sx={{  borderRadius:2, width:"100%"
          ,  border: '0px solid #9f9f9f'
          , borderRadius:2
          , mb:2
          , height:"400px"
          }}>
            
              <Typography variant="h6" color="text.primary" align="center" sx={{m:1, mt:6}}>
              
              </Typography>
          </CardContent>
      );


    } else {
      
      var today = new Date();
      var lastTouchValueMilliseconds = Number(completeWorker.workerObject.lastTouch)/1000000;
      console.log ("lastTouchValueMilliseconds: "+ lastTouchValueMilliseconds.toString());
      var lastTouchDate = new Date(lastTouchValueMilliseconds);
      var diffMs = (today - lastTouchDate);
      console.log ("diffMs: "+ diffMs.toString());
      var lastTouchSecondsValue = Math.round(diffMs/1000);
      console.log ("lastTouchSecondsValue: "+ lastTouchSecondsValue.toString());
      
      var lastTouchDisplay = lastTouchSecondsValue.toString() + " seconds ago";
      if (lastTouchSecondsValue > 60  && lastTouchSecondsValue < 300) {
        lastTouchDisplay = "Over a Minute ago"
      } else if (lastTouchSecondsValue > 299 &&  lastTouchSecondsValue < (15*60)) {
        lastTouchDisplay = "Over Five Minute ago"
      } else if (lastTouchSecondsValue > ((15*60)-1) &&  lastTouchSecondsValue < (30*60)) {
        lastTouchDisplay = "Over Fifteen Minutes ago"
      } else if (lastTouchSecondsValue > ((30*60)-1)) {
        lastTouchDisplay = "A long time ago"
      }// end if for human readable
      let buttonContent =[];

      if (displayLocation == "environmentList") {

        return ( 
            
            

            <Grid container spacing={0}>
                <Grid item xs >
                  <Box sx={{ mb:2,p:0}}>
                  <WorkerActiveConnect worker={worker} displayLocation={displayLocation}/>
                  </Box>
                </Grid>
              </Grid>
        );

      } else if (displayLocation == "environment") {

        return (
          <CardContent sx={{  borderRadius:2, width:"100%"
            ,  border: '1px solid #9f9f9f'
            , borderRadius:2
            , mb: 0}}>
            <Grid container spacing={0}>
                  
            
                <GridCardListItem title="Last Touch" value={lastTouchDisplay}  />
                <GridCardListItem title="Status" value={completeWorker.workerObject.status}/>
                <GridCardListItem title="lastDeploymentId" value={completeWorker.workerObject.lastDeploymentId.toString()}/>
                <GridCardListItem title="uniqueId" value={completeWorker.workerObject.uniqueId}/>
                <GridCardListItem title="publicIp" value={completeWorker.workerObject.publicIp}/>
                <GridCardListItem title="privateIp" value={completeWorker.workerObject.privateIp}/>
                <GridCardListItem title="dnsName" value={completeWorker.workerObject.dnsName}/>
                <GridCardListItem title="iiEnabled" value={completeWorker.workerObject.iiEnabled}/> 
                <GridCardListItem title="dfxReplicaType" value={completeWorker.workerObject.dfxReplicaType}/> 
                <GridCardListItem title="ttydHttpsEnabled" value={completeWorker.workerObject.ttydHttpsEnabled}/> 
                <GridCardListItem title="ttydHttpsCount" value={completeWorker.workerObject.ttydHttpsCount.toString()}/> 
              </Grid>

              ({(completeWorker.workerObject.id != 0) ? completeWorker.workerObject.id.toString() : "New"})
              
              
          </CardContent>
        )// end return

      } else if (displayLocation == "deployment") {

        return (
          <CardContent sx={{  borderRadius:2, width:"100%"
            ,  border: '1px solid #9f9f9f'
            , borderRadius:2
            , backgroundColor: "#ffffff"
            , mb: 2}}>
            <Grid container spacing={0}>
                  
            
                <GridCardListItem title="Last Touch" value={lastTouchDisplay}  />
                <GridCardListItem title="Status" value={completeWorker.workerObject.status}/>
                <GridCardListItem title="lastDeploymentId" value={completeWorker.workerObject.lastDeploymentId.toString()}/>
                <GridCardListItem title="uniqueId" value={completeWorker.workerObject.uniqueId}/>
                <GridCardListItem title="publicIp" value={completeWorker.workerObject.publicIp}/>
                <GridCardListItem title="privateIp" value={completeWorker.workerObject.privateIp}/>
                <GridCardListItem title="dnsName" value={completeWorker.workerObject.dnsName}/>
                <GridCardListItem title="iiEnabled" value={completeWorker.workerObject.iiEnabled}/> 
                <GridCardListItem title="dfxReplicaType" value={completeWorker.workerObject.dfxReplicaType}/> 
                <GridCardListItem title="ttydHttpsEnabled" value={completeWorker.workerObject.ttydHttpsEnabled}/> 
                <GridCardListItem title="ttydHttpsCount" value={completeWorker.workerObject.ttydHttpsCount.toString()}/> 
              </Grid>

              ({(completeWorker.workerObject.id != 0) ? completeWorker.workerObject.id.toString() : "New"})
              
              
          </CardContent>
        )// end return

      } else {


      

      let iiDisplay = [];
      let ttydDisplay = [] ;


      if (completeWorker.responseStatus) {

                
        if (completeWorker.workerObject.ttydHttpsEnabled == "N" ) {
                      
          ttydDisplay.push (
            <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2}}>
              <Grid container>
              <Grid item xs={12} sx={{pb:2}}>
                        
                  <Box sx={{
                      p: 0,
                      width:50,
                      margin:"auto",
                      float:'left',
                      height:20,
                      borderRadius:5,
                      m:0,
                    }}
                    >
                    <GetImage imgSrc="bash_logo.png"  imgAlt="Boure-again shell" />
                </Box>
                <Typography color="text.primary" variant="h6" sx={{pt:2}}  >
                Enable ttyd over HTTPS on this Worker:
                </Typography>
              </Grid>
  
  
  
              <Grid item xs={12} sx={{display:"flex"}}>
                      
                      <Button onClick={() => { ttydHttpsEnableDisable()}}  variant="outlined" size="small" sx={{ ml:2, flexGrow:1, float:"right"  }}>
                        <SettingsSystemDaydreamIcon fontSize="small" sx={{mr:1 }}/> Enable HTTPS: $_
                      </Button>
                    </Grid>
                <Grid item xs={12} sx={{display:"flex"}}>
                      
                <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:1}}>
                  
                  NOTE: be aware that enabling this convenient feature has security implications.  Please review our documentation prior to use.

                </Typography>
                </Grid>
  
              </Grid>
  
            </Box>
            );
            
      
        } else {
    
          ttydDisplay.push (
            <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
              <Grid container>
                
                <Grid item xs={6}>
                      
                  <Paper key={1} elevation={4} sx={{bgcolor:"#ffffff", 
                  border: '1px solid #9f9f9f',
                  mt:0, 
                  borderRadius:2,
                  mr:2
                  }}>  
                  <Grid container>
                    
                    <Grid item xs={1}>
                      <Box sx={{
                            p: 0,
                            width:40,
                            margin:"auto",
                            borderRadius:5,
                            m:0,
                          }}
                          >
                        <GetImage imgSrc="bash_logo.png"  imgAlt="Boure-again shell" />
                      </Box>
                    </Grid>
      
                    <Grid item xs={11} sx={{display:"flex", pt:1}}>
                        <Typography variant="subtitle1" align="left" sx={{ml:1,}}>
                        HTTPS: $_ Enabled 
                        </Typography>
                    </Grid>
                    </Grid>
                  </Paper>
                </Grid>
  
                <Grid item xs={6} sx={{display:"flex"}}>
                      
                  <Button onClick={() => { ttydHttpsEnableDisable()}}  color="warning" variant="outlined" size="small" sx={{ ml:2, flexGrow:1, float:"right"  }}>
                    <SettingsSystemDaydreamIcon fontSize="small" sx={{mr:1 }}/> Disable HTTPS: $_ service
                  </Button>
                </Grid>
  
              </Grid>
  
            </Box>
            );
    
        } // end if tty dash HTTPS enabled

        
        if (completeWorker.environmentObject.id > 0) {
          buttonContent.push (
              <Grid item xs key={1} sx={{display:"flex"}} >
    
              <ThemeProvider theme={myContext.environmentsThemeName}>
              <Button onClick={() => { jumpToDash("environment")}}  variant="contained" sx={{ ml:1, mr:1, flexGrow:1 }}>
              <SettingsSystemDaydreamIcon sx={{mr:1}}/> E: {(completeWorker.environmentObject.name) ? completeWorker.environmentObject.name : "Blank"}
              </Button>
              </ThemeProvider>
              </Grid>
          );
        }// end if environment
        if (completeWorker.projectObject.id > 0) {
          buttonContent.push (
              <Grid item xs  key={2} sx={{display:"flex"}}>
              <ThemeProvider theme={myContext.projectsThemeName}>
              <Button onClick={() => { jumpToDash("project")}}  variant="contained" sx={{ ml:1, mr:1, flexGrow:1 }}>
              <AccountTreeIcon sx={{mr:1}}/>P: {(completeWorker.projectObject.name) ? ""+completeWorker.projectObject.name : "Blank"}  
              </Button>
              </ThemeProvider>
              </Grid>
          );
        } //end if project
        if (completeWorker.latestDeploymentObject.id > 0) {
          buttonContent.push (
              <Grid item xs  key={3} sx={{display:"flex"}}>
              <ThemeProvider theme={myContext.deploymentsThemeName}>
              <Button onClick={() => { jumpToDash("deployment")}}  variant="contained" sx={{ ml:1, mr:1, flexGrow:1}}>
              <AltRouteIcon sx={{mr:1}}/>D: {(completeWorker.latestDeploymentObject.id) ? ""+completeWorker.latestDeploymentObject.id : "Blank"}  
              </Button>
              </ThemeProvider>
              </Grid>
          );
        } //end if project

        // can only install II once a worker is assigned to an Environment ... otherwise what's the point ;)
        // also the worker needs to have touched in the last few minute

        if (completeWorker.environmentObject.id > 0 && lastTouchSecondsValue < 300 ) { 


          //// **************** BEING IiEnabled 

          
            if (isIiJobCreated || (completeWorker.latestJobObject.id > 0 && completeWorker.latestJobObject.jobType == "Install II" && completeWorker.latestJobObject.status != "Complete" )) {
            
                if (creatingIiJob) {

                  iiDisplay.push (
                    <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
                      
                      <Box sx={{
                                p: 0,
                                width:40,
                                margin:"auto",
                                float:'left',
                                height:20,
                                borderRadius:5,
                                m:0,
                              }}
                              >
                            <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                          </Box>
                        <Typography color="text.primary" variant="h6"  >
                        Enabling Internet Identity ...
                        </Typography>

                    </Box>
                    );
                    
                } else {
                  iiDisplay.push (
                    <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
                      <Grid container>
                        

                      <Grid item xs={6} sx={{}}>
                                
                          <Box sx={{
                              p: 0,
                              width:48,
                              margin:"auto",
                              float:'left',
                              height:20,
                              borderRadius:5,
                              m:0,
                            }}
                            >
                          <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                        </Box>
                        <Typography color="text.primary" variant="h6"  >
                          II-enablement is in progress.
                        </Typography>
                      </Grid>

                        <Grid item xs={6} sx={{display:"flex"}}>
                              
                          <Button onClick={() => { viewActiveJob()}}  variant="outlined" size="small" sx={{ ml:2, flexGrow:1,float:"right"  }}>
                            <ConstructionIcon fontSize="small" sx={{mr:1 }}/> View Job
                          </Button>
                        </Grid>

                      </Grid>

                    </Box>
                    );
                  }// end if we are currently creating

            }  else {
                
              if (completeWorker.workerObject.iiEnabled == "N" ) {
                      
                iiDisplay.push (
                  <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
                    <Grid container>
                    <Grid item xs={12} sx={{pb:2}}>
                              
                        <Box sx={{
                            p: 0,
                            width:50,
                            margin:"auto",
                            float:'left',
                            height:20,
                            borderRadius:5,
                            m:0,
                          }}
                          >
                        <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                      </Box>
                      <Typography color="text.primary" variant="h6"  >
                        Install Internet Identity Canister on this Worker:
                      </Typography>
                    </Grid>



                      <Grid item xs={12} sx={{display:"flex"}}>
                            
                        <Button onClick={() => { createIiJob()}}  variant="outlined" size="small" sx={{ ml:2, flexGrow:1, float:"right"  }}>
                          <SettingsSystemDaydreamIcon fontSize="small" sx={{mr:1 }}/> Install Internet Identity
                        </Button>
                      </Grid>

                    </Grid>

                  </Box>
                  );
                  
            
              } else {
          
                iiDisplay.push (
                  <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
                    <Grid container>
                      
                      <Grid item xs={6}>
                            
                        <Paper key={1} elevation={4} sx={{bgcolor:"#ffffff", 
                        border: '1px solid #9f9f9f',
                        mt:0, 
                        borderRadius:2,
                        height:28,
                        mr:2
                        }}>  
                          <Typography variant="subtitle1" align="left" sx={{ml:1, float:'left',}}>
                          Internet Identity Enabled 
                          </Typography>
                          <Box sx={{
                                p: 0,
                                width:40,
                                margin:"auto",
                                float:'right',
                                height:20,
                                borderRadius:5,
                                m:0,
                              }}
                              >
                            <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                          </Box>
                        </Paper>
                      </Grid>

                      <Grid item xs={6} sx={{display:"flex"}}>
                      
                      
                    <Grid container>

                    <Grid item xs={12} >      
                        <Button onClick={() => { createIiJob()}}  variant="outlined" size="small" sx={{ ml:2, flexGrow:1, float:"right"  }}>
                          <SettingsSystemDaydreamIcon fontSize="small" sx={{mr:1 }}/> Update Internet Identity
                        </Button>
                      
                      </Grid>

                    <Grid item xs={12} >

                      <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:0}}>
                      
                      NOTE: You’ll generally use this button when new II versions are released.


                      </Typography>
                      
                      </Grid>

                    </Grid>
                      
                      </Grid>

                    </Grid>

                  </Box>
                  );
          
              } // end if enabled



          } // end if we just clicked 
          if (isTtyJobCreated || (completeWorker.latestJobObject.id > 0 && (completeWorker.latestJobObject.jobType == "Enable ttyd Bash HTTPS" || completeWorker.latestJobObject.jobType == "Disable ttyd Bash HTTPS") && completeWorker.latestJobObject.status != "Complete" )) {
            
  

            if (creatingTtyJob) {

              var jobTextDisplay =  "Enabling ttyd ... ";
              if (completeWorker.workerObject.ttydHttpsEnabled == "Y" ) {

                jobTextDisplay =  "Disabling ttyd ... ";
              }

              ttydDisplay =  [
                <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2}}>
                            
                      <Box sx={{
                          p: 0,
                          width:48,
                          margin:"auto",
                          float:'left',
                          height:20,
                          borderRadius:5,
                          m:0,
                        }}
                        >
                        <GetImage imgSrc="bash_logo.png"  imgAlt="Boure-again shell" />
                    </Box>
                  
                    <Typography color="text.primary" variant="h6" sx={{pt:2}}>
                      {jobTextDisplay}
                      
                    </Typography>

                </Box>
              ];
                
            } else {
              
              var jobTextDisplay =  "ttyd enablement in progress ... ";
              if (completeWorker.workerObject.ttydHttpsEnabled == "Y" ) {

                jobTextDisplay =  "ttyd disablement in progress ... ";
              }
              ttydDisplay =  [

                <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2}}>
                  <Grid container>
                    

                  <Grid item xs={6} sx={{}}>
                            
                      <Box sx={{
                          p: 0,
                          width:48,
                          margin:"auto",
                          float:'left',
                          height:20,
                          borderRadius:5,
                          m:0,
                        }}
                        >
                        <GetImage imgSrc="bash_logo.png"  imgAlt="Boure-again shell" />
                    </Box>
                    <Typography color="text.primary" variant="h6"  sx={{pt:2}} >
                      {jobTextDisplay}
                    </Typography>
                  </Grid>

                    <Grid item xs={6} sx={{pt:2, display:"flex"}}>
                          
                      <Button onClick={() => { viewActiveJob()}}  variant="outlined" size="small" sx={{ ml:2,flexGrow:1,float:"right"  }}>
                        <ConstructionIcon fontSize="small" sx={{mr:1 }}/> View Job
                      </Button>
                    </Grid>

                  </Grid>

                </Box>
              ];


              }// end if we are currently creating

          } // end if just clicked for ttyd 




        } else if (lastTouchSecondsValue > 300 ) {
        
          iiDisplay.push (
            <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
              <Grid container>
                <Grid item xs={12} sx={{pb:2}}>
                          
                    <Box sx={{
                        p: 0,
                        width:50,
                        margin:"auto",
                        float:'left',
                        height:20,
                        borderRadius:5,
                        m:0,
                      }}
                      >
                    <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                  </Box>
                  <Typography color="text.secondary" variant="h6"  >
                    Install Internet Identity Canister on this Worker:
                  </Typography>
                </Grid>


                <Grid item xs={12} sx={{display:"flex"}}>
                    
                  <Typography color="text.primary" variant="body2" sx={{pt:1}} >
                    The Worker must be actively touching to manage II
                  </Typography>
                </Grid>

              </Grid>

            </Box>
            );          

        } else {

        
          iiDisplay.push (
            <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, mt:2, mb:2, borderRadius:2}}>
              <Grid container>
                <Grid item xs={12} sx={{pb:2}}>
                          
                    <Box sx={{
                        p: 0,
                        width:50,
                        margin:"auto",
                        float:'left',
                        height:20,
                        borderRadius:5,
                        m:0,
                      }}
                      >
                    <GetImage imgSrc="dinfinity.png"  imgAlt="Internet Identity" />
                  </Box>
                  <Typography color="text.secondary" variant="h6"  >
                    Install Internet Identity Canister on this Worker:
                  </Typography>
                </Grid>


                <Grid item xs={12} sx={{display:"flex"}}>
                    
                  <Typography color="text.primary" variant="body2" sx={{pt:1}} >
                    You can enable II on this Worker once it has automagically paired with an Environment.
                  </Typography>
                </Grid>

              </Grid>

            </Box>
            );     

            ttydDisplay =  [

          
              <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2}}>
                <Grid container>
                <Grid item xs={12} sx={{pb:2}}>
                          
                    <Box sx={{
                        p: 0,
                        width:50,
                        margin:"auto",
                        float:'left',
                        height:20,
                        borderRadius:5,
                        m:0,
                      }}
                      >
                      <GetImage imgSrc="bash_logo.png"  imgAlt="Boure-again shell" />
                  </Box>
                  <Typography color="text.secondary" variant="h6" sx={{pt:2}}  >
                  Enable ttyd over HTTPS on this Worker:
                  </Typography>
                </Grid>
    
    
    
                  <Grid item xs={12} sx={{display:"flex"}}>
                        
                  <Typography color="text.primary" variant="body2" sx={{pt:1}} >
                  Once this Worker has paired with an Environment, this will enable browser-based terminal access directly from your ICPM console.
                  </Typography>
                <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:0}}>
                  
                  NOTE: be aware that enabling this convenience feature has security implications.  Please review our documentation prior to use.

                </Typography>
                  </Grid>
    
                </Grid>
    
              </Box>
            ];
              
      
          
        } // end if environment

        //// ******************** END IF IiEnabled 

      } // end if complete Worker Response

      const jumpToDash =  (refWhereTo) => {
      
        console.log ("refWhereTo:" + refWhereTo);
        if (refWhereTo == "environment" && completeWorker.environmentObject.id > 0) {
      
            myContext.setNavSection ("Environments")
            history.push ("/environments");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId (completeWorker.environmentObject.id) ;

        } else  if (refWhereTo == "project" && completeWorker.projectObject.id > 0) {
      
            myContext.setNavSection ("Projects")
            history.push ("/projects");
            myContext.setWhereTo ("dashboard") ;
            myContext.setJumpId ( completeWorker.projectObject.id) ;
        } else if (refWhereTo == "deployment" && completeWorker.latestDeploymentObject.id > 0) {
        
          myContext.setNavSection ("Deployments")
          history.push ("/deployments");
          myContext.setWhereTo ("dashboard") ;
          myContext.setJumpId (completeWorker.latestDeploymentObject.id) ;
        } // end if refWhereTo

      } // end jumpToDash
      const createIiJob = async ()  =>  {

          // going to creat call to canister
          console.log ("1- createIiJob - before await");
          setIiIsJobCreated(true);
          setCreatingIiJob(true);
          let thisError = "";
          const fetchData = await icpmDapp.createIiEnableJob(apiToken,worker.id).catch(e => { thisError= "ICPM Error: " + e });
          
          if (thisError) {

            console.log ("fetchdata: ", fetchData);
            myContext.displayError("" +thisError);
          } else {
              console.log ("2- createIiJob - after await");
              console.log (fetchData);
              console.log ("3- createIiJob - after logging return");
              // set the state which should redraw the component
              if (fetchData.responseStatus == "Green") {
                fetchCompleteWorker();
              } else {

                myContext.displayError("" +fetchData.msg);

              }
              
              
              console.log ("4- createIiJob - after setstateListData");
        
          } // end if there was an issue 
          setCreatingIiJob(false);
        

      
      } // end createIiJob
      const ttydHttpsEnableDisable = async ()  =>  {

          // going to creat call to canister
          console.log ("1- ttydHttpsEnableDisable - before await");
          setTtyIsJobCreated(true);
          setCreatingTtyJob(true);
          let thisError = "";
          const fetchData = await icpmDapp.ttydHttpsEnableDisable (apiToken,completeWorker.workerObject.id).catch(e => { thisError= "ICPM Error: " + e });
          
          if (thisError) {

            console.log ("fetchdata: ", fetchData);
            myContext.displayError("" +thisError);
          } else {
              console.log ("2- ttydHttpsEnableDisable - after await");
              console.log (fetchData);
              console.log ("3- ttydHttpsEnableDisable - after logging return");
              // set the state which should redraw the component
              if (fetchData.responseStatus == "Green") {
                fetchCompleteWorker();
              } else {

                myContext.displayError("" +fetchData.msg);

              }
              
              
              console.log ("4- ttydHttpsEnableDisable - after setstateListData");
        
          } // end if there was an issue 
          setCreatingTtyJob(false);
        

      
      } // end ttydHttpsEnableDisable
      

      // now we create a function to handle the dns submit
      //handleDnsSubmit

  const handleWorkerSubmit = async (name, value) => {


    console.log ("value: ", name );
    console.log ("value: ", value );
    //return
    

    // first we submit to the updatWorker 
    // (eventually this will be add or update)
    // first create vars for the ones we can change

    let thisDnsName = completeWorker.workerObject.dnsName ;
    let thisDfxReplicaType = completeWorker.workerObject.dfxReplicaType ;
    if (name == "dnsName") {
      thisDnsName = value;
      setPendingWorkerUpdateDnsPrivate(true);
      
    }
    if (name == "dfxReplicaType") {
      thisDfxReplicaType = value;
      setPendingWorkerUpdateReplicaType(true)
    }
    const theWorkerObject = {
      id: completeWorker.workerObject.id,
      name: completeWorker.workerObject.name,
      status: completeWorker.workerObject.status,
      category: completeWorker.workerObject.category,
      description: completeWorker.workerObject.description,
      lastDeploymentId: completeWorker.workerObject.lastDeploymentId,
      uniqueId: completeWorker.workerObject.uniqueId,
      publicIp: completeWorker.workerObject.publicIp,
      privateIp: completeWorker.workerObject.privateIp,
      dnsName: thisDnsName,
      iiEnabled: completeWorker.workerObject.iiEnabled,
      dfxReplicaType: thisDfxReplicaType,
      ttydHttpsEnabled: completeWorker.workerObject.ttydHttpsEnabled,
      ttydHttpsCount: completeWorker.workerObject.ttydHttpsCount,
      lastTouch: completeWorker.workerObject.lastTouch,
      creatorId: completeWorker.workerObject.creatorId,
      dateCreated: completeWorker.workerObject.dateCreated,
      lastUpdated: completeWorker.workerObject.lastUpdated,
    } // end theWorkerObject


    
    let icUpdateResponse = await icpmDapp.manageWorkerMain(apiToken,theWorkerObject).catch(e => { return "ICPM Error: " + e });

    
    console.log(icUpdateResponse);

    if (icUpdateResponse != "done") {

        alert ("there was an issue" );
        alert (icUpdateResponse);

    } else {
      
      setCompleteWorker("");

    } 
    

    setPendingWorkerUpdateDnsPrivate(true);
    setPendingWorkerUpdateReplicaType(false);
    fetchCompleteWorker();

    console.log("COMPLETED handleWorkerSubmit ");
    
    return false;

    
  }// end handleWorkerSubmit
    


        var workerUpdateDnsPrivateDisplay =[
              <GridCardListItem key={1} title="dnsName" value={completeWorker.workerObject.dnsName} itemType="form-text" itemFormHandler={handleWorkerSubmit} itemNote="This is especially useful if you enable Internet Identity on this Worker.  WebAuthn requires an assigned hostname.  If unable to add a DNS record, an /etc/hosts file entry will do the trick.Either way, your entry in this form input should match your assigned hostname."/>
              
        ];


        var workerUpdateReplicaTypeDisplay =[
          <GridCardListItem key={1} title="dfxReplicaType" value={completeWorker.workerObject.dfxReplicaType} itemType="form-text" itemFormHandler={handleWorkerSubmit} itemNote="This should be either 'emulator' or 'replica', and will default to 'emulator'"/> 
          
        ];

        if (pendingWorkerUpdateDnsPrivate) {

          workerUpdateDnsPrivateDisplay =[
            <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2, height:"80px", flexGrow:1,pt:3, textAlign:"center"}}>
              Updating ...
            </Box>
          ];
        } // end if pending

          if (pendingWorkerUpdateReplicaType) {
  
            workerUpdateReplicaTypeDisplay =[
              <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2, height:"80px", flexGrow:1,pt:3, textAlign:"center"}}>
                Updating ...
              </Box>
            ];
          

        } // end if pending

          return (
            <CardContent sx={{  borderRadius:2, width:"100%"
              ,  border: '1px solid #9f9f9f'
              , borderRadius:2
              , mb:2
              }}>
              <Title>
              <WorkspacesIcon sx={{mr:1}}/> {completeWorker.workerObject.name} 
              </Title>

              <Grid container spacing={0}>
                  <Grid item xs >
                    <Grid key={1} container spacing={0} sx={{mb:2, display:"flex"}}>
                      {buttonContent}
                    </Grid>

                    <Box sx={{ mb:2,p:0}}>
                    <WorkerActiveConnect worker={completeWorker.workerObject} />
                    </Box>


                  </Grid>
                  <GridCardListItem title="Last Touch" value={lastTouchDisplay} />
                  <GridCardListItem title="Status" value={completeWorker.workerObject.status} />
                  <GridCardListItem title="Category" value={completeWorker.workerObject.category} />
                  <GridCardListItem title="Description" value={completeWorker.workerObject.description} />
                  <GridCardListItem title="lastDeploymentId" value={completeWorker.workerObject.lastDeploymentId.toString()} />
                  <GridCardListItem title="uniqueId" value={completeWorker.workerObject.uniqueId} />
                  <GridCardListItem title="publicIp" value={completeWorker.workerObject.publicIp} />
                  <GridCardListItem title="privateIp" value={completeWorker.workerObject.privateIp} />
                  <GridCardListItem title="iiEnabled" value={completeWorker.workerObject.iiEnabled} /> 
                  <GridCardListItem title="ttydHttpsEnabled" value={completeWorker.workerObject.ttydHttpsEnabled}/> 
                  <GridCardListItem title="ttydHttpsCount" value={completeWorker.workerObject.ttydHttpsCount.toString()}/> 
                  <GridCardListItem title="Create Date" value={completeWorker.workerObject.dateCreated}  itemType="date-icNano" />
                  <GridCardListItem title="Last Updated" value={completeWorker.workerObject.dateCreated}  itemType="date-icNano" />
                  </Grid>
                  <Box key={1} sx={{border:"1px solid #9f9f9f", p:2, pt:0, mt:2, mb:2, borderRadius:2}}>
                    <Grid container spacing={0}>
                      
                    {workerUpdateDnsPrivateDisplay}

                    {workerUpdateReplicaTypeDisplay}
                      
                    </Grid>
                  </Box>
                {ttydDisplay}
                {iiDisplay}

                ({(worker.id != 0) ? completeWorker.workerObject.id.toString() : "New"})
                
                
            </CardContent>
          )// end return
        
      } // edn if displayLocation
    
    } // end if we have fetched the worker
} // end function WorkerCard



export default WorkerCard;
