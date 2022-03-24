
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




const AddPrincipal = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const authClient = myContext.authClientName;
    const apiToken = myContext.apiTokenName;
    const icpmDapp = myContext.icpmDappName;
    
    const isAuthed = myContext.isAuthedName;
    const managerAuthed = myContext.managerAuthedName;
    console.log ("***********!!!!!!!!!!! AddPrincipal");
    
    
    
    var sha512 = require('js-sha512');
    //alert (theLoginCode);
    

    const [loginCode, setLoginCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    const [newPrincipal, setNewPrincipal] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const onLoginCodeChange = (e) => {

      setLoginCode(e.target.value);
      
      if (e.key === 'Enter') {
        handleClick(e);
      } 
    } // end onLoginCodeChange
    const onNewPrincipal = (e) => {

      setNewPrincipal(e.target.value);

    } // end onNewCode1

    const addManagerPrincipal = async ()  =>  {

      
      // going to creat call to canister
      console.log ("1- addManagerPrincipal - before await");
      let thisNewPrincipal;
      let error="";

      
      try {
        thisNewPrincipal = Principal.fromText(newPrincipal);
      } catch (e) {
        error = e;
        console.log("catch error from principal",e);
        
      }
      
      
      if (error) {
        setIsLoading(false);
        setErrorMsg(error.toString()) ;
        console.log ("what is up now?")

      } else {
        
        //console.log ("1.5- addManagerPrincipal - newPrincipal", thisNewPrincipal.toString());
        const fetchData = await icpmDapp.addManagerPrincipalMain(apiToken,sha512(loginCode), thisNewPrincipal).catch(e => { return "ICPM Error: " + e });
        //await sleep(500);
        console.log ("2- addManagerPrincipal - after await");

        console.log (fetchData);

        
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
            setIsLoading(false);
            setSuccessMsg ("The User can now authenticate with their Internet Identity at this ICPM canister") ;
          }
            
            

          console.log ("4- addManagerPrincipal - end");

          
        }// end if error
      
      } //end if valid Principal
        
  } // end addManagerPrincipal
    

  const handleClick =  (e) => {
    //console.log ("clickin'" + sha512(loginCode) );
    console.log ("now we add the principal");
      
        // otherwise we send the hashpass to the ICPM for auth and pass along the new code hash
        // if the manager passcode matches it will do the update

        setIsLoading(true);
        addManagerPrincipal ();
        
        
      

    }// end handleClick

    



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
            display: 'flex',
            flexDirection: 'column',
            flexGrow:1 ,
            minHeight:320,
          }} >
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
            <Paper elevation={0}
            sx={{
              
              width:100,
              margin:"auto",
              mb:1,
            }}
            >
              <GetImage imgSrc="dinfinity.png" imgWidth="200px" imgAlt="Internet Identity" />
            </Paper>
          <Typography variant="h5" color="text.primary" align="center" sx={{m:1}}>
          <SettingsIcon fontSize="small" sx={{mr:1}}/>Whitelist II Principal
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
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "success.light",
                flexGrow:1 ,
              }} >

            
              <Typography variant="h5" color="#FFFFFF" align="center" sx={{m:1}}>
              Success!
              </Typography>
              <Typography variant="h7" color="#FFFFFF" align="left" sx={{m:1}}>
              You have successfully added a new Principal ({newPrincipal}) to the ICPM Canister Instance.
              </Typography>
              <Typography variant="body" color="#FFFFFF" align="left" sx={{m:1}}>
              {successMsg}
              </Typography>
          </Paper>
          
      ); // end return 

    } else {
      return (

        
            <Paper elevation={4}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                flexGrow:1 ,
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
            <Paper elevation={4}
            sx={{
              
              width:100,
              margin:"auto",
              mb:1,
            }}
            >
              <GetImage imgSrc="dinfinity.png" imgWidth="200px" imgAlt="Internet Identity" />
            </Paper>
            <Typography variant="h5" color="text.primary" align="center" sx={{m:1}}>
            <SettingsIcon fontSize="small" sx={{mr:1}}/>Whitelist II Principal
            </Typography>
            </Paper>
            <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
            Authenticate to Submit Principal:
            </Typography>
            <ShowError errorMsg={errorMsg}/>
            <FormTextField 
                onChange={onLoginCodeChange}
                value={loginCode}
                label={"Manager Code"} //optional
                type="password"
                helperText="Please provide the current Manager Code."
                

            />  
            <FormTextField 
                onChange={onNewPrincipal}
                value={newPrincipal}
                multiline={true}
                label={"New Manager Principal"} //optional
                helperText="Principal to be added to this ICPM as a User."
            />  
            <Button onClick={handleClick} variant="contained" sx={{ml:2, mr:2}}>Submit New Principal</Button>
            
          </Paper>
          

      );
    } // end successMsg
  }// end AddPrincipal

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

  export default AddPrincipal;
  