
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';  
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
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




const ManageDFXPrincipal = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const authClient = myContext.authClientName;
    const apiToken = myContext.apiTokenName;
    const icpmDapp = myContext.icpmDappName;
    
    const isAuthed = myContext.isAuthedName;
    const managerAuthed = myContext.managerAuthedName;
    console.log ("***********!!!!!!!!!!! DFX Identities");
    
    
    
    var sha512 = require('js-sha512');
    //alert (theLoginCode);
    

    const [loginCode, setLoginCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    const [listOfPrincipals, setListOfPrincipals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var removePrincipalText = "";    

    const onLoginCodeChange = (e) => {

      setLoginCode(e.target.value);
      
      if (e.key === 'Enter') {
        managePrincipal();
      } 
    } // end onLoginCodeChange
    const onClickPrincipal = (e) => {

      console.log ("clicked on this principal: " , e.target.value);

    } // end onNewCode1

    const managePrincipal = async (removePrincipalText)  =>  {

      
      // going to creat call to canister
      console.log ("1- managePrincipal - before await");
      console.log ("removePrincipalText: ",removePrincipalText);
      let thisListOfPrincipals;
      let error="";

      if (!removePrincipalText) {
        removePrincipalText = "";
      }
      if (error) {
        setIsLoading(false);
        setErrorMsg(error.toString()) ;
        console.log ("error: ", error.toString())

      } else {
        
        //console.log ("1.5- addManagerPrincipal - newPrincipal", thisNewPrincipal.toString());
        const fetchData = await icpmDapp.managePrincipalsMain(apiToken,sha512(loginCode), removePrincipalText).catch(e => { return "ICPM Error: " + e });
        //await sleep(500);
        console.log ("2- managePrincipal - after await");

        console.log (fetchData);

        
        if ( typeof fetchData == "string") {
          
          
          setIsLoading(false);
          setErrorMsg("" +fetchData);
          
          

        } else {
          let thisMsg = fetchData.msg ;
          let responseStatus = fetchData.responseStatus ;
          

          console.log ("3- managePrincipal - after logging return");
          if (responseStatus == "Red") {

            setIsLoading(false);
            setErrorMsg("" +fetchData.msg);
            
          } else {
            setIsLoading(false);
            // now we can display the list of principals 
            thisListOfPrincipals = fetchData.listOfManagerPrincipals;

            setListOfPrincipals (thisListOfPrincipals) ;
            if (thisListOfPrincipals.length == 0 ) { 
              setErrorMsg ("WARNING: There were no principals returned") ;
            } else {
              setErrorMsg ("");
            }
          }
            
            

          console.log ("4- managePrincipal - end");

          
        }// end if error
      
      } //end if valid Principal
        
  } // end managePrincipal
    

  const handleClick =  (removePrincipalText) => {
    //console.log ("clickin'" + sha512(loginCode) );
    console.log ("now we remove the principal: ", removePrincipalText);
      
        // otherwise we send the hashpass to the ICPM for auth and pass along the new code hash
        // if the manager passcode matches it will do the update

        setIsLoading(true);
        managePrincipal (removePrincipalText);
        
        
      

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
        <Container maxWidth="lg" sx={{ mt: 1, mb: 1}}>
        <Paper elevation={4}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height:320
          }} >

            
          <Typography variant="h6" color="text.primary" align="center" sx={{m:1, mt:10}}>
          Processing ...
          </Typography>
          <LinearProgress sx={{m:4}}/>

          </Paper>
        </Container>

      ); // end return 
    } else if (successMsg) {

      return( 
          <Container maxWidth="lg" sx={{ mt: 1, mb: 1}}>
            <Paper elevation={4}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "success.light",
                height:320
              }} >

            
              <Typography variant="h5" color="#FFFFFF" align="center" sx={{m:1}}>
              Success!
              </Typography>
              <Typography variant="h7" color="#FFFFFF" align="left" sx={{m:1}}>
              You have successfully Removed the Principal ({removePrincipalText}) from the ICPM Canister Instance.
              </Typography>
              <Typography variant="body" color="#FFFFFF" align="left" sx={{m:1}}>
              {successMsg}
              </Typography>
          </Paper>
        </Container>
      ); // end return 

    } else {
        if (listOfPrincipals.length > 0 ) {

          let thePrincipalList = [];
      
          for (let i = 0; i < listOfPrincipals.length ; i++) {
              
            thePrincipalList.push (
                <Paper key={(i+1)} elevation={4}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      margin:"auto",
                      mb:1,
                      border:"1px solid #9f9f9f",
                      borderRadius: 2,
                    }}
                    >
                    
                  <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
                  {listOfPrincipals[i].toString()}
                  </Typography>
                    <Button onClick={() => { handleClick(listOfPrincipals[i].toString())}}  variant="contained" color="error" sx={{ml:2, mr:2}}>Remove</Button>
                </Paper>
              ); // end push
      
          } // end for 

          return (

            <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
                <Paper elevation={4}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Paper elevation={0}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width:160,
                    margin:"auto",
                    mb:1,
                  }}
                  >
                    
                    <Typography variant="h5" color="text.primary" align="left" sx={{m:1}}>
                    > dfx
                    </Typography>
                  </Paper>
                <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
                Manage DFX Identities:
                </Typography>
                <ShowError errorMsg={errorMsg}/>
                {thePrincipalList}
                
                
                
              </Paper>
            </Container>

          );


        } else {
          return (

            <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
                <Paper elevation={4}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Paper elevation={1}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    width:300,
                    margin:"auto",
                    mb:1,
                    border: "1px solid #9f9f9f"
                  }}
                  >
                    
                  <Typography variant="h5" color="text.primary" align="left" sx={{m:1}}>
                  # dfx identity use
                  </Typography>

                  </Paper>
                <Typography variant="h6" color="text.primary" align="left" sx={{m:1}}>
                Manage DFX Identities:
                </Typography>
                <ShowError errorMsg={errorMsg}/>
                <FormTextField 
                    onChange={onLoginCodeChange}
                    value={loginCode}
                    label={"Manager Code"} //optional
                    type="password"
                    helperText="Please provide the current Manager Code."
                />  
                <Typography variant="bod2" color="text.secondary" align="left" sx={{mb:2}}>
                Enter the manager code to get a list of the existing DFX Identities available for deployments.
                </Typography>
                
                <Button onClick={() => { handleClick()}}  variant="contained" sx={{ml:2, mr:2}}>Get List of DFX Identities</Button>
                
              </Paper>
            </Container>

          );
        } // end if there are any principals
    } // end successMsg
  }// end ManageDFXPrincipal

  export default ManageDFXPrincipal;

  
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

  