
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';  
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {
//   BrowserProperties,
//   BrowserType,
//   WebClientInfo
// } from "react-client-info";

/// ****** CUSTOM IMPORTS 


import FormTextField from '../components/FormTextField';
import GetImage from '../components/GetImage';
import PleaseWait from './PleaseWait';
import AppContext from './AppContext';
import InternetIdentityLogin from './InternetIdentityLogin';
import Copyright from './Copyright';
import { TryRounded } from '@mui/icons-material';
import ChangeManagerPassCode from '../stage_components/settings/ChangeManagerPassCode';
import {currentICPMVersion} from '../env/CurrentICPMVersion';






const Login = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const authClient = myContext.authClientName;
    const apiToken = myContext.apiTokenName;
    const icpmDapp = myContext.icpmDappName;
    const testPrincipal = myContext.testPrincipalName;
    const isAuthed = myContext.isAuthedName;
    console.log ("***********!!!!!!!!!!! LOGIN");
    

    let history = useHistory();
    if (isAuthed) {
      //history.push("/");
      console.log ("***********!!!!!!!!!!! AUTHED");
    } else {
      console.log ("***********!!!!!!!!!!! NOT AUTHED? "+isAuthed);
    }
    
    var sha512 = require('js-sha512');
    //alert (theLoginCode);
    

    const [loginCode, setLoginCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    
    var [isLoading, setIsLoading] = useState(false);
    
    const [everLoggedIn, setEverLoggedIn] = useState(props.everLoggedIn);
    
    const onLoginCodeChange = (e) => {
      //setErrorMsg ( "" ) ;
      setLoginCode(e.target.value);
      if (e.key === 'Enter') {
        handleClick(e);
      } 
    } // end onLoginCodeChange

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    

  const waitForCanisterClient = async () => {
    
    //setIsLoading(true);
    // sleep for a few and check again
    //await sleep(4000);
    //setIsLoading(false);

  }

    const addManagerPrincipal = async ()  =>  {

      
      // going to creat call to canister
      console.log ("1- addManagerPrincipal - before await");
      
      
      const fetchData = await icpmDapp.addManagerPrincipalMain(apiToken,sha512(loginCode), testPrincipal).catch(e => { return "ICPM Error: " + e })
      //await sleep(500);
      console.log ("2- addManagerPrincipal - after await");

      if ( typeof fetchData == "string") {
          
          
        setIsLoading(false);
        setErrorMsg("" +fetchData);
        
        

      } else {
        let thisMsg = fetchData.msg ;
        let responseStatus = fetchData.responseStatus ;
        

        console.log ("3- addManagerPrincipal - after logging return");
        if (responseStatus == "Red") {

          setIsLoading(false);
          setErrorMsg("" +fetchData.msg);
          
        } else {
          // now we loggout of the II to force them to login again 
          // TODO: discuss if this should let them right in
          
          setIsLoading(false);
          
          setSuccessMsg ("Your principal is now in the whitelist for this ICPipeline Manager. Click the button below to continue.") ;
          
         
        }
          
          //myContext.setTestPrincipal("");
          

        console.log ("4- addManagerPrincipal - end");

        
      }// end if error
      
  } // end addManagerPrincipal
    

  const authenticateICPM = async (thisHashPass)  =>  {

      
    // going to creat call to canister
    console.log ("1- authenticateMain - before await");
    
    

    const loginAttempt = {
      timestamp: 0,
      loginHash: thisHashPass ,
      loginIp: "1.2.3.4",
      loginClient: "a browser",
    }

    const fetchData = await icpmDapp.authenticateMain(loginAttempt,"").catch(e => { return "ICPM Error: " + e })
    //await sleep(500);
    console.log ("2- authenticateMain - after await");

    //console.log (fetchData);

    if (typeof fetchData == "string") {
      
      myContext.displayError("" +fetchData);

    } else {
      let loginResponse = fetchData ;
      
      

      console.log ("3- authenticateMain - after logging in return");

      if (loginResponse.responseStatus == "Green") {
        // then we have authenticated
        //myContext.displayError("Successful login!! Mission Accomplished. ") ;

        myContext.setStatusChecked (false);
        myContext.setApiToken (loginResponse.msg);
        myContext.setManagerAuthed (true);
        myContext.setIsAuthed (true);
        console.log ("good login");

        //setErrorMsg ("success");



      } else {

        //myContext.displayError("Your login code is not valid.") ;
        setErrorMsg ("Your Manager Code is not correct.");
        setIsLoading (false);

      }
        
        
        

      console.log ("4- authenticateMain - main");

      
    }// end if error
    
} // end authenticateICPM

const handleClick =  (e) => {
  //console.log ("clickin'" + sha512(loginCode) );
  console.log ("clickin' ");
  
    if (loginCode) {
    // now we check to see if there is a new Principal we need manage
    if (testPrincipal) {
      // if we got this far with a testPrincipal then we need to add it
      // this action does not result in someone being logged in
      // so we call the ICPM canister, pass the principal and the hash of the passcode

      addManagerPrincipal();
      setLoginCode("");
      setIsLoading (true);
      setErrorMsg ( "" ) ;

    } else {
      // otherwise we send the hashpass to the ICPM for auth
      
      authenticateICPM (sha512(loginCode));
      setErrorMsg ( "" ) ;
      setIsLoading (true);
      
      
    } // end if test principal
  } else {
    setErrorMsg ( "You have not provided a Manager Code." ) ;
  }
  

  }// end handleClick
  const resetLogin =  (e) => {
    //console.log ("clickin'" + sha512(loginCode) );
    console.log ("resetLogin");
    

        setSuccessMsg ("");
        myContext.setTestPrincipal("");
        myContext.setStatusChecked(false);
        
        
        

    }// end resetLogin
    
    const resetAuth = () => {
      authClient.logout();
      myContext.setTestPrincipal("");
    }// end resetAuth


    const handleKeyPress = (ev) => {
      //console.log(`Pressed keyCode ${ev.key}`);
      if (ev.key === 'Enter') {
        // Do code here
        handleClick();
      }
    }// end handleKeyPress


      //now we check version the latest was grabbed at login

    //myContext.setShowNewVersion (true);
    const checkICPMVersion = async ()  =>  {

      // now we fetch the version from icpipeline.com
        const versionURL = "https://www.icpipeline.com/framework/icpm_version.json";

        const response = await fetch(versionURL);
        const jsonData = await response.json();
        
      console.log ("************jsonDat: ", jsonData );
      var latestVersion  = jsonData.version;


      var currentArray = currentICPMVersion.split('.');
      var latestArray = latestVersion.split('.');
      
      console.log ("currentArray: ", currentArray);
      console.log ("latestArray: ", latestArray);

      if ((Number(currentArray[0]) < Number(latestArray[0])) 
                  || (Number(currentArray[0]) == Number(latestArray[0]) && Number(currentArray[1]) < Number(latestArray[1]) )
                  || (Number(currentArray[0]) == Number(latestArray[0]) && Number(currentArray[1]) == Number(latestArray[1]) && Number(currentArray[2]) < Number(latestArray[2])) ) {
        // then the current version is less than the new one
        myContext.setLatestVersion (latestVersion);
        myContext.setShowNewVersion (true);

      }

    } // end checkICPMVersion
    
    if ((myContext.latestVersionName == "")) {
      checkICPMVersion ();

    }

    var newVersionDisplay = [];
    const showNewVersion = myContext.showNewVersionName;
    console.log (" ****  showNewVersion: ", showNewVersion);

    if (showNewVersion) {
      newVersionDisplay = [
        <ThemeProvider key={1} theme={myContext.environmentsThemeName}>
            <Button variant="outlined" sx={{ flexGrow:1, m:2 }} target="_blank" href="https://github.com/icpipeline-framework">
            
            New ICPM Version Available
            </Button>
        </ThemeProvider>
      ];
    } // end if new version
      
    if (isLoading) { 

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
          <PleaseWait>Processing ...</PleaseWait>
          </Paper>
          
          <Copyright sx={{ pt: 4 }} />
        </Container>

      );
      } else if (everLoggedIn == "N") {
        
        authClient.logout();

              return (
        
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 500 }}>
                    <Paper elevation={4}
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                          
                    
                
                    <ChangeManagerPassCode displayLocation="firstLogin" authenticateICPM={authenticateICPM} />
                    
                  </Paper>
                  <Copyright sx={{ pt: 4 }} />
                </Container>
        
              );
      } else if (successMsg) {

        return( 
          
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 500 }}>
                <Paper elevation={4}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                <Box sx={{width:"250px", justifyContent:"center", margin:"auto", mb:4}} >
                  <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
                </Box>
  
                  <Paper elevation={4}
                    sx={{
                      p: 2,
                      m:2,                  
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                  <Paper elevation={4}
                  sx={{
                    p: 2,
                    m:2,                  
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: "success.light"
                  }}
                >
                    <Typography variant="h5" color="#FFFFFF" align="center" sx={{m:1}}>
                      Success!
                    </Typography>
                  </Paper>
                    <Typography variant="h9" align="left" sx={{m:1}}>
                      {successMsg}
                    </Typography>
                  </Paper>
                <Button onClick={resetLogin} variant="contained" sx={{m:4}}>Continue to the ICPM</Button>
              </Paper>

            
            </Container>
        ); // end return on success
    

    } else if (authClient && testPrincipal == "") {
      return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 500 }}>
            <Paper elevation={4}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
                  
            
          <Box sx={{width:"250px", justifyContent:"center", margin:"auto", mb:4}} >
            <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
          </Box>
          <InternetIdentityLogin  testPrincipal={testPrincipal}/>
            <Typography variant="h6" color="text.secondary" align="center" sx={{m:4,mt:1}}>
            Or Login
            </Typography>
            <ShowError errorMsg={errorMsg}/>
            <FormTextField 
                onChange={onLoginCodeChange}
                value={loginCode}
                label={"Manager Code"} //optional
                type="password"
                helperText="Please provide the code, then press return on your dumb terminal."
                onKeyPress={handleKeyPress}

            />  
            <Button onClick={handleClick} variant="contained" sx={{ml:2, mr:2}}>Go</Button>
            {newVersionDisplay}
            
          </Paper>
          <Copyright sx={{ pt: 4 }} />
        </Container>

      );

  
    } else if (testPrincipal) {


      return (
        <>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: 500 }}>
            <Paper elevation={4}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
                  
            
          <Box sx={{width:"250px", justifyContent:"center", margin:"auto", mb:4}} >
            <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
          </Box> 
          <Paper elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              width: "350px",
              justifyContent:"center", 
              margin:"auto",
              mb:4,
            }}
          >
          <Box sx={{width:"100px", justifyContent:"center", margin:"auto", mb:4}} >
          <GetImage imgSrc="dinfinity.png" imgWidth="200px" imgAlt="Internet Identity" />
          </Box>
          <PrincipalDisplay resetAuth={resetAuth} isLoading={isLoading} testPrincipal={testPrincipal}/>
          </Paper>
            <ShowError errorMsg={errorMsg}/>
            <FormTextField 
                onChange={onLoginCodeChange}
                value={loginCode}
                label={"Manager Code"} //optional
                type="password"
                helperText="Please provide the code, then press return on your dumb terminal."
                onKeyPress={handleKeyPress}

            />  
            <Button onClick={handleClick} variant="contained" sx={{ml:2, mr:2}}>Go</Button>
              
            <Typography variant="h6" align="center" sx={{m:2}}>
            Or
            </Typography>
            <Button onClick={resetAuth} variant="outlined" sx={{ml:2, mr:2, mt:0}}>Reset Auth Session</Button>

            
          </Paper>
          <Copyright sx={{ pt: 4 }} />
        </Container>
        </>
      );// end return

    } else {
      return (
        <>
        loading authClient
        </>
      );// end return
      
    }// end what to display

  }// end Login

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

  const PrincipalDisplay = (props) => {
    
    const isLoading = props.isLoading;
    const testPrincipal = props.testPrincipal;
    const resetAuth = props.resetAuth;

    if (isLoading) {
      return (
        <>
        <Paper sx={{ mb:2, mt:0}} elevation={0}>
          

          <LinearProgress sx={{m:4}}/>
        
        </Paper>
        </>

      )
    }
    return (
      <Box sx={{ justifyContent:"center", margin:"auto", mb:4, display: "flex", flexDirection:"column"}} >
        <Typography variant="body2" color="text.secondary" align="left">
        This Internet Identity Principal is not a valid Principal for this particular ICPipeline Manager.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left" sx={{ m:2, p:1, backgroundColor: "#EFEFEF", whiteSpace: 'pre-wrap', border: "1px solid #9f9f9f", borderRadius:2}}>
          PRINCIPAL: {testPrincipal.toString()} 
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
        Provide the Manager Code below to add it to the ICPM canister. 
        Or, send the Principal to your DevOps team for them to do it for you.
        </Typography>
        
        
        
      </Box>
    )
  }// end PrincipalDisplay
  export default Login;
  