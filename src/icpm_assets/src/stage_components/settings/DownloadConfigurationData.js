
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';  
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import SettingsIcon from '@mui/icons-material/Settings';
// import {
//   BrowserProperties,
//   BrowserType,
//   WebClientInfo
// } from "react-client-info";

/// ****** CUSTOM IMPORTS 


import FormTextField from '../../components/FormTextField';
import GetImage from '../../components/GetImage';
import Title from '../../components/Title';
import AppContext from '../../nav/AppContext';
import InternetIdentityLogin from '../../nav/InternetIdentityLogin';
import Copyright from '../../nav/Copyright';
import { Principal } from '@dfinity/principal';




const DownloadConfigurationData = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const authClient = myContext.authClientName;
    const apiToken = myContext.apiTokenName;
    const icpmDapp = myContext.icpmDappName;
    
    const isAuthed = myContext.isAuthedName;
    const managerAuthed = myContext.managerAuthedName;
    console.log ("***********!!!!!!!!!!! Download Data");
    

    
    var sha512 = require('js-sha512');
    //alert (theLoginCode);
    

    const [loginCode, setLoginCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    const [dataFilesResponse, setDataFilesResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var removePrincipalText = "";    

    const onLoginCodeChange = (e) => {

      setLoginCode(e.target.value);
      
      if (e.key === 'Enter') {
        handleClick();
      } 
    } // end onLoginCodeChange

    const onClickPrincipal = (e) => {

      console.log ("clicked on this principal: " , e.target.value);

    } // end onNewCode1

    const getICPMConfigDownload = async ()  =>  {

      
      // going to creat call to canister
      console.log ("1- getICPMConfigDownload - before await");
      
      let thisConfigData;
      let error="";

      
        
        //console.log ("1.5- addManagerPrincipal - newPrincipal", thisNewPrincipal.toString());
        const fetchData = await icpmDapp.getICPMConfigDownload(apiToken,sha512(loginCode)).catch(e => { return "ICPM Error: " + e });
        //await sleep(500);
        console.log ("2- getICPMConfigDownload - after await");

        console.log (fetchData);

        
        if ( typeof fetchData == "string") {
          
          
          setIsLoading(false);
          setErrorMsg("" +fetchData);
          
          

        } else {
          let thisMsg = fetchData.msg ;
          let responseStatus = fetchData.responseStatus ;
          

          console.log ("3- getICPMConfigDownload - after logging return");
          if (responseStatus == "Red") {

            setIsLoading(false);
            setErrorMsg("" +fetchData.msg);
            
          } else {
            setIsLoading(false);
            // now we can display the list of principals 
            setDataFilesResponse ( fetchData );

            
            setErrorMsg ("");
          } // end if red response

            
            

          console.log ("4- getICPMConfigDownload - end");

          
      
      } //end if valid icpm call
        
  } // end getICPMConfigDownload
    

  const handleClick =  (removePrincipalText) => {
    //console.log ("clickin'" + sha512(loginCode) );
    console.log ("now wecall the pull for data");
      
        // otherwise we send the hashpass to the ICPM for auth and pass along the new code hash
        // if the manager passcode matches it will do the update

        setIsLoading(true);
        getICPMConfigDownload ();
        
        
      

    }// end handleClick

    

    const startDownload =  () => {
      //console.log ("clickin'" + sha512(loginCode) );
      console.log ("now create the blob for download");
        
          // otherwise we send the hashpass to the ICPM for auth and pass along the new code hash
          // if the manager passcode matches it will do the update
          
      var localTime = Date.now();
      console.log ("localTime: ",localTime) ;
              
        let dataFilesResponseString = JSON.stringify (dataFilesResponse, (key, value) =>
                  typeof value === 'bigint'
                      ? Number(value)
                      : value // return everything else unchanged
                  , 2);

        const element = document.createElement("a");
        const file = new Blob([dataFilesResponseString], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = `icpm-config-${localTime}.json`;
        document.body.appendChild(element);
        element.click();
      

    }// end startDownload


    const handleKeyPress = (ev) => {
      //console.log(`Pressed keyCode ${ev.key}`);
      if (ev.key === 'Enter') {
        // Do code here
        handleClick();
      }
    }// end handleKeyPress



    if (isLoading) {

      return ( 
    
            <Paper elevation={4}
            sx={{
              p: 2,
              flexGrow:1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
              <Paper elevation={1}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                m:1,
                mb:2,
                border: "1px solid #9f9f9f",
                borderRadius:2 ,
                backgroundColor:"primary.superlight"
              }}
              >
              
                  
                <Typography variant="h5" color="text.primary" align="left" sx={{m:1}}>
                <SettingsIcon fontSize="small" sx={{mr:1}}/> Save Configuration
                </Typography>
                <Typography variant="body2" color="text.primary" align="left" sx={{m:1}}>
                (Environments, Projects, Identities, Canister Profiles, Users)
                </Typography>
              </Paper>

            
          <Typography variant="h6" color="text.primary" align="center" sx={{m:1, mt:6}}>
          Processing ...
          </Typography>
          <LinearProgress sx={{m:4}}/>

          </Paper>
          

      ); // end return 
    } else if (successMsg) {

      return( 
        
            <Paper elevation={4}
              sx={{
                p: 2,
                flexGrow:1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "success.light",
                height:320
              }} >

            
              <Typography variant="h5" color="#FFFFFF" align="center" sx={{m:1}}>
              Success!
              </Typography>
              <Typography variant="h7" color="#FFFFFF" align="left" sx={{m:1}}>
              You have downloaded the Blob.
              </Typography>
              <Typography variant="body" color="#FFFFFF" align="left" sx={{m:1}}>
              {successMsg}
              </Typography>
          </Paper>
          
      ); // end return 

    } else {
     
        if (dataFilesResponse.responseStatus == "Green" ) {
   
            var displayDataButtons = [ 
                <Paper key={1} elevation={4}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexGrow: 1 ,
                      margin:"auto",
                      mb:1,
                      border:"1px solid #9f9f9f",
                      borderRadius: 2,
                    }}
                    >
                    
                    <Button onClick={() => { startDownload()}}  variant="contained" color="success" sx={{ml:2, mr:2}}>Download JSON File</Button>
                </Paper>
            ]; // end push
      
          return (

            
                <Paper elevation={4}
                  sx={{
                    p: 2,
                    flexGrow:1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                <Paper elevation={1}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  m:1,
                  mb:2,
                  border: "1px solid #9f9f9f",
                  borderRadius:2 ,
                }}
                >
                  
                <Typography variant="h5" color="text.primary" align="center" sx={{m:1}}>
                <SettingsIcon fontSize="small" sx={{mr:1}}/>Save Configuration
                </Typography>
                <Typography variant="body2" color="text.primary" align="center" sx={{m:1}}>
                (Environments, Projects, Identities, Canister Profiles, Users)
                </Typography>

                </Paper>
                <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
                Data File Created:
                </Typography>
                <ShowError errorMsg={errorMsg}/>
                {displayDataButtons}
                
                
                
              </Paper>
              

          );


        } else {
          return (
            
                <Paper elevation={4}
                  sx={{
                    p: 2,
                    flexGrow:1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                <Paper elevation={1}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  m:1,
                  mb:2,
                  border: "1px solid #9f9f9f",
                  borderRadius:2 ,
                  backgroundColor:"primary.superlight"
                }}
                >
                
                    
                  <Typography variant="h5" color="text.primary" align="center" sx={{m:1}}>
                  <SettingsIcon fontSize="small" sx={{mr:1}}/> Save Configuration
                  </Typography>
                  <Typography variant="body2" color="text.primary" align="center" sx={{m:1}}>
                  (Environments, Projects, Identities, Canister Profiles, Users)
                  </Typography>
                </Paper>

                  
                <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
                Authenticate for Download:
                </Typography>
                  
                <ShowError errorMsg={errorMsg}/>
                <FormTextField 
                    onChange={onLoginCodeChange}
                    value={loginCode}
                    label={"Manager Code"} //optional
                    type="password"
                    helperText="Please provide the current Manager Code."
                />  
                <Typography variant="body2" color="text.secondary" align="left" sx={{mb:2}}>
                Enter the manager code to create a file with all of the stable var configuration data in this ICPM.
                </Typography>
                
                <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:2, mr:2}}>Download ICPM Config</Button>
                
              </Paper>
              

          );
        } // end if there are any principals
    } // end successMsg
  }// end DownloadConfigurationData

  export default DownloadConfigurationData;

  
  const ShowError = (props) => {
    
    const errorMsg = props.errorMsg;

    if (errorMsg) {
      return (
        <>
        <Paper sx={{bgcolor: "#B00020", mb:3, mt:2, p:2, justifyContent:"center"}} elevation={5}>
          <Typography variant="h10" color="primary.contrastText" align="center"  >
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

  