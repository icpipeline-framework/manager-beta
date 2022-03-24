import React, { useState,useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';
import 'regenerator-runtime/runtime';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

import { createTheme, ThemeProvider } from '@mui/material/styles';


/// ****** CUSTOM IMPORTS 

import AppContext from '../../nav/AppContext';
import XtermJSPop from '../../components/XtermJSPop'

const WorkerActiveConnect = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);

    const worker = props.worker;
    const displayLocation = props.displayLocation;

    console.log ("ListOfWorkers - Inside my ListOfWorkers");
    

    const handleClick =  (thisWhereTo) => {
    
  
    } // end handle click

    const copyTextToClipboard = async (ev,text)  =>  {
      
        return await ev.navigator.clipboard.writeText(text);
      
    }
    const copySSH =  (ev, pubpri) => {
      var thisText = "";

      if (pubpri == "public" ) {
        
        thisText = `ssh icpipeline@${worker.publicIp}`;

      } else {
        thisText = `ssh icpipeline@${worker.privateIp}`;
        
        
      }
      //var thisExec = copyTextToClipboard(ev, "what is going on").catch(e => { alert("agghhh:"+ e )});
      navigator.clipboard.writeText(thisText)
      alert (thisText +" - copied to clipboard");

    }// end copySSH

    var displayPublic = [];


    if (worker.publicIp && worker.category == "docker-public") {
      displayPublic = [
        <Paper key={1} elevation={2} sx={{bgcolor:"primary.superlight", p:2, mt:1, mb:1, border:"1px solid #9f9f9f"}} >
        <WorkerIpButtons key={1} thisIp={worker.publicIp} thisTitle="Public IP" workerName={props.worker.name} displayLocation={displayLocation} iiEnabled={worker.iiEnabled} dnsName={worker.dnsName} ttydHttpsEnabled={worker.ttydHttpsEnabled} myContext={myContext} />
        </Paper>
      ] ;// end of display public
    } // end if publicIp


    var displayPrivate = [];


    if (worker.privateIp && worker.privateIp  != worker.publicIp) {
      displayPrivate = [
        <Paper key={1} elevation={2} sx={{bgcolor:"primary.superlight", p:2, mt:1, mb:1, border:"1px solid #9f9f9f"}} >
        <WorkerIpButtons thisIp={worker.privateIp} thisTitle="Private IP" workerName={worker.name} displayLocation={displayLocation} iiEnabled={worker.iiEnabled} dnsName={worker.dnsName} ttydHttpsEnabled={worker.ttydHttpsEnabled} myContext={myContext} />
        </Paper>
      ] ;// end of display public
    } // end if publicIp

    if (displayPublic.length == 0 && displayPrivate.length == 0 ) {
      return (

        <ThemeProvider theme={myContext.workersThemeName}>
        <Paper key={1} elevation={2} sx={{bgcolor:"primary.superlight", p:2, m:1, border:"1px solid #9f9f9f"}} >
          
        Awaiting Worker ... may be defunct ...
        </Paper>
        </ThemeProvider>      
        
      )// end return


    } else {
      return (

        <ThemeProvider theme={myContext.workersThemeName}>
        {displayPublic}
        {displayPrivate}
        </ThemeProvider>      
        
      )// end return
    } // end if there is any Ips
} // end function WorkerActiveConnect



export default WorkerActiveConnect;


const WorkerIpButtons = (props) => {

  let myContext = props.myContext ;
  let displayLocation = props.displayLocation ;
  let ttydHttpsEnabled = props.ttydHttpsEnabled;
  let iiEnabled = props.iiEnabled;

  var [sshCopyText, setSshCopyText] = useState("Copy to Clipboard");
  var [sshCopyPortsText, setSshCopyPortsText] = useState("w/ Port Forwarding");
  
  var workerHostName = props.thisIp ;
  //if (props.dnsName != "" && props.thisTitle == "Private IP") {
  if (props.dnsName != "" ) {
    workerHostName = props.dnsName;
  }

  // TODO - need to have a setting for whether the user is using a key or not
  // but if the user puts the key into the .ssh/config
  //let sshWPortsText = `ssh  -i ~/.ssh/id_ed25519_icpipeline -L 127.0.0.1:9000:localhost:8000 -L 127.0.0.1:8080:localhost:8080 -L// 127.0.0.1:8090:localhost:8090 icpipeline@${workerHostName}`;
  let sshWPortsText = `ssh  -i ~/.ssh/id_ed25519_icpipeline -L 127.0.0.1:9000:localhost:8000 icpipeline@${workerHostName}`;
  let sshText = `ssh -i ~/.ssh/id_ed25519_icpipeline icpipeline@${workerHostName}`;


  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

    if (displayLocation == "environmentList") {

      return (
        <Grid container spacing={0} >
        <Grid item xs={12}  >
          <Box sx={{p:0}}>
            
        
          <Typography variant="h6" sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center',
                borderBottom: "1px solid #9f9f9f",
                mb:1 }}>
            <WorkspacesIcon sx={{mr:1}}/>
            {props.thisTitle} 
            - 
            {workerHostName} {workerHostName != props.thisIp ? ` (${props.thisIp})` : ``} 
            - 
            ({props.workerName})
            </Typography>
          </Box>
          <Box sx={{pl:2, pr:2}}>
  
          <Button target="_blank" href={`ssh://icpipeline@${workerHostName}`}  size="small" variant="outlined" sx={{width:"100%",mb:1}} >
          
          <WorkspacesIcon sx={{mr:1}}/>SSH to Worker
          </Button>
          <Button variant="outlined"  size="small" sx={{width:"100%",mb:1}}
            onClick={async()=> {
                            let thisText = `ssh icpipeline@${workerHostName}`;
                            await navigator.clipboard.writeText(thisText);
                            //alert("copied the following command to the clipboard:\n"+thisText) ;
                            setSshCopyText ("copied")
                            await sleep (1000) ;
                            setSshCopyText ("Copy to Clipboard");
  
                          }}
          >
           {sshCopyText} 
          </Button>
          <Button variant="outlined"  size="small" sx={{width:"100%",mb:1}}
            onClick={async()=> {
                            //let thisText = `ssh  -i ~/.ssh/id_ed25519_icpipeline -L 127.0.0.1:9000:localhost:8000 -L 127.0.0.1:9080:localhost:8080 -L 127.0.0.1:9090:localhost:8090 icpipeline@${workerHostName}`;
                            let thisText = `ssh  -i ~/.ssh/id_ed25519_icpipeline -L 127.0.0.1:9000:localhost:8000 icpipeline@${workerHostName}`;
                            await navigator.clipboard.writeText(thisText);
                            //alert("copied the following command to the clipboard:\n"+thisText) ;
                            setSshCopyPortsText ("copied")
                            await myContext.sleep (1000) ;
                            setSshCopyPortsText ("w/ Port Forwarding")
                          }}
          >
            {sshCopyPortsText}
          </Button>
          </Box>
          <Box sx={{pl:2, pr:2}}>
  
          <Button target="_blank" href={`http://${workerHostName}:8080`} size="small" variant="outlined" sx={{ width:"100%",mb:1}}>
          <WorkspacesIcon sx={{mr:1}}/>HTTP:8080
          </Button>
          
          <Button target="_blank" href={`http://${workerHostName}:8000`} size="small" variant="outlined" sx={{ width:"100%",mb:1}}>
          <WorkspacesIcon sx={{mr:1}}/>HTTP:8000
          </Button>
          </Box>
          
        </Grid>
        </Grid>
      ); // end return

    } else {
    
    var connectDisabled = true;
    var connectText = [
                   <Typography key={1} variant="body2" sx={{fontSize: '.7rem', mb:0, mt:0}}>
                    NOTE: For browser-based SSH access, just enable the feature on this Worker.
                  </Typography>
                  ];

    // now we check if we have enabled workerTtydHttps on this worker 
    if (ttydHttpsEnabled == "Y")   {
      connectDisabled = false;
      connectText = [
        <Typography key={1} variant="body2" sx={{fontSize: '.7rem', mb:0, mt:0}}>
          NOTE: This feature requires port 65000 to be accessible on the Worker, which will present a self-signed certificate, so you’ll see the standard browser warnings.
        </Typography>
        ]; 
    
    }

    var ttydClickDisplay = [
        <Box key={1} >
        <Tooltip title={`connect to bash shell browser using https`} placement="left" enterNextDelay={300}>
        <Button target="_blank" href={`https://${workerHostName}:65000`} size="small" variant="outlined" disabled={connectDisabled} sx={{ width:"100%",mb:1}}>
        Connect HTTPS: $_
        </Button>
        </Tooltip>
        {connectText}
        </Box>
      ] ;
      
    // SSH Section
    var sshSectionDisplay = [] ;


      sshSectionDisplay = [
              <Box key={1} sx={{pl:2, pr:2, border:"1px solid #9f9f9f", borderRadius:2, backgroundColor:"#ffffff"}}>
                <Typography variant="h8" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    float: 'center',
                    borderBottom: "1px solid #9f9f9f",
                    mb:1 }}>
                      <WorkspacesIcon sx={{mr:1}}/>SSH
                    </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12} >
                  {/* <XtermJSPop /> */}
                  {ttydClickDisplay}
                  </Grid>
                  <Grid item xs={12}>
                  <Grid container>
                      <Grid item xs={12}>
                      <Tooltip title={sshText} placement="left" enterNextDelay={300}>
                        <Button variant="outlined"  size="small" sx={{width:"100%",mb:1, fontSize: '10px'}}
                          onClick={async()=> {
                                          
                                          await navigator.clipboard.writeText(sshText);
                                          //alert("copied the following command to the clipboard:\n"+thisText) ;
                                          setSshCopyText ("copied")
                                          await sleep (1000) ;
                                          setSshCopyText ("Copy to Clipboard");

                                        }}
                        >
                        {sshCopyText} <ContentCopyIcon fontSize="small" sx={{ml:1}}/>
                        </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}  >

                      <Tooltip title={sshWPortsText} placement="left" enterNextDelay={300}>
                        <Button variant="outlined"  size="small" sx={{width:"100%",mb:1, fontSize: '10px'}}
                          onClick={async()=> {
                                          
                                          await navigator.clipboard.writeText(sshWPortsText);
                                          //alert("copied the following command to the clipboard:\n"+thisText) ;
                                          setSshCopyPortsText ("copied")
                                          await myContext.sleep (1000) ;
                                          setSshCopyPortsText ("/w Port Forwarding")
                                        }}
                        >
                          {sshCopyPortsText}<ContentCopyIcon fontSize="small" sx={{ml:1}}/>
                        </Button>
                        </Tooltip>
                        </Grid>
                    </Grid>
                    </Grid>
                  </Grid>
                </Box>
                
                    ];
                    

    // HTTP Section
    var httpSectionDisplay = [] ;
    var iiEnabledDisplay = [];

      if (iiEnabled == "Y") {

        iiEnabledDisplay = [
                  <Box key={1}>
                  <Tooltip title={`access ii enabled webpack @ HTTPS://${workerHostName}:8090 in another window`} placement="top" enterNextDelay={300}>
                                  
                  <Button target="_blank" href={`https://${workerHostName}:8090`} size="small" variant="outlined" sx={{ width:"100%",mb:1}}>
                  II DEV-SERVER HTTPS:8090
                  </Button>
                  </Tooltip>
                  
                  {/* TODO - this should be dynamic based on whether we are forcing webpack to https */ }
                  <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:0}}>
                  
                  NOTE: your Internet Identity replica requires an assigned host name resolving to its IP address.  If unable to add a DNS record, an /etc/hosts file entry will do the trick.

                  </Typography>
                  </Box>
                ];

      }
      httpSectionDisplay = [
                      <Box key={1} sx={{pl:2, pr:2, border:"1px solid #9f9f9f", borderRadius:2, backgroundColor:"#ffffff"}}>
                        <Typography variant="h8" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            float: 'center',
                            borderBottom: "1px solid #9f9f9f",
                            mb:1 }}>
                        <WorkspacesIcon sx={{mr:1}}/> HTTPS
                        </Typography>

                        <Tooltip title={`access devserver @ HTTPS://${workerHostName}:8080 in another window`} placement="top" enterNextDelay={300}>
                        
                        <Button target="_blank" href={`https://${workerHostName}:8080`} size="small" variant="outlined" sx={{ width:"100%",mb:1}}>
                        DEV-SERVER HTTPS:8080
                        </Button>
                        </Tooltip>
                        
                        {/* TODO - this should be dynamic based on whether we are forcing webpack to https */ }
                        <Typography variant="body2" sx={{fontSize: '.7rem', mb:2, mt:0}}>
                        NOTE: Webpack presents a self-signed certificate, so you should expect the standard browser warnings.
                        </Typography>
                        {iiEnabledDisplay}
                        {/*
                        <Tooltip title={`access replica @ HTTP://${workerHostName}:8000 in another window`} placement="top" enterNextDelay={300}>
                        
                        <Button target="_blank" href={`http://${workerHostName}:8000`} size="small" variant="outlined" sx={{ width:"100%",mb:1}}>
                        port:8000
                        </Button>
                        </Tooltip>
                        */}
                    </Box> 
                    ];

    var displayNote = [];
    //NOTE: for replica access, use "OPEN" buttons where available for asset canisters or SSH into the worker.

    if (props.thisTitle == "Public IP" ) { 

      displayNote = [
        <Typography variant="body2" key={1} sx={{fontSize: '.7rem', mb:1, mt:1, p:1,
              border: "1px solid #9f9f9f",
              borderRadius:2, 
              flexGrow:1}}>

        NOTE: SSH uses standard port 22. HTTPS uses port 8080 to access your Worker's webpack dev server.
        </Typography>
      ] ; // end display Note
                  
    } else {

      displayNote = [
        <Typography variant="body2" key={1} sx={{fontSize: '.7rem', mb:1, mt:1, p:1,
              border: "1px solid #9f9f9f",
              borderRadius:2, 
              flexGrow:1}}>

        NOTE: Access to this Worker on the private network requires a VPN connection.
        
        </Typography>
      ] ; // end display Note
      if ( workerHostName != props.thisIp ) {


          displayNote.push (
            <Typography variant="body2" key={2} sx={{fontSize: '.7rem', mb:1, mt:1, p:1,
                  border: "1px solid #9f9f9f",
                  borderRadius:2, 
                  flexGrow:1}}>

            NOTE: A dnsName is configured on this worker. Links and buttons will only work if the appropriate DNS/hosts configurations are made to resolve to {props.thisIp}. 
            
            </Typography>
          ) ; // end display Note
      } // end if there is a dnsname in play 

    }// end if pub or pri
    return (
      <Grid container spacing={1} >
      <Grid item xs={12}  md={4} >
        <Box sx={{p:0, display: 'flex', flexDirection:'column'}}>
          
          
          <Typography variant="h4" sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center'}}>
          <WorkspacesIcon sx={{mr:1}} fontSize="large" /> {props.thisTitle}
          </Typography>

          <Typography variant="h8">
            {workerHostName} {workerHostName != props.thisIp ? ` (${props.thisIp})` : ``}
          </Typography>
          <Typography variant="body2">
          ({props.workerName})
          </Typography>
          {displayNote}
        </Box>
      </Grid>
      {/*
      <Grid item xs={12}  md={4}>
        <Box sx={{pl:2, pr:2}}>
          <Typography variant="h8" sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                float: 'center',
                borderBottom: "1px solid #9f9f9f",
                mb:1 }}>
              SSH:
            </Typography>

        <Button target="_blank" href={`ssh://icpipeline@${workerHostName}`}  size="small" variant="outlined" sx={{width:"100%",mb:1}} >
        
        <WorkspacesIcon sx={{mr:1}}/>Click to Connect
        </Button>
        <Button target="_blank" href={`ssh://icpipeline@${workerHostName}`}  size="small" variant="outlined" sx={{width:"100%",mb:1}} >
        
        <WorkspacesIcon sx={{mr:1}}/>Connect w/ Port Forwarding
        </Button>
        
        </Box>
      </Grid>
      */}
      <Grid item xs={12}  md={4} sx={{display:'flex'}}>
        {sshSectionDisplay}
      </Grid>
      <Grid item  xs={12}  md={4} sx={{display:'flex'}}>
        {httpSectionDisplay}
      </Grid> 
      </Grid>
    ); // end return
  } // end displayLocation
} // end WorkerIpButtons