
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';  
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';

/// ****** CUSTOM IMPORTS 
import FormTextField from '../../components/FormTextField';
import GetImage from '../../components/GetImage';
import AppContext from '../../nav/AppContext';
import PleaseWait from '../../nav/PleaseWait';

const ChangeManagerPassCode = (props) => {

    // now we get the global context 
    const myContext = useContext(AppContext);
    const authClient = myContext.authClientName;
    const apiToken = myContext.apiTokenName;
    const icpmDapp = myContext.icpmDappName;
    
    const isAuthed = myContext.isAuthedName;
    const managerAuthed = myContext.managerAuthedName;
    console.log ("***********!!!!!!!!!!! ChangeManagerPassCode");

    const displayLocation = props.displayLocation ;

    
    let history = useHistory();
    
    
    var sha512 = require('js-sha512');
    //alert (theLoginCode);
    

    const [loginCode, setLoginCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [sameCodeMsg, setSameCodeMsg] = useState(false);
    const [newCode1, setNewCode1] = useState("");
    const [newCode2, setNewCode2] = useState("");
    const [code1RegPass, setCode1RegPass] = useState(false);
    const [code2RegPass, setCode2RegPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);

    
    
    const testPassReg = new RegExp('(?=.*[A-Z])(?=.*[()!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}');
    var paperElevation = 4;
    var paperPadding = 2;

  const checkNewCodes = () => {
    if (newCode1 != "" && newCode1 == newCode2 && !sameCodeMsg) {
      
      if (!sameCodeMsg)
        setSameCodeMsg (true);
        setSubmitDisable (false);

    } else if (newCode1 != "" && newCode1 != newCode2 && sameCodeMsg) {
      
        setSameCodeMsg (false);
        setSubmitDisable (true);
    }
  }
  checkNewCodes();

    const onLoginCodeChange = (e) => {

      setLoginCode(e.target.value);
      
      if (e.key === 'Enter') {
        handleClick(e);
      } 
    } // end onLoginCodeChange
    const onNewCode1 = (e) => {

      if (testPassReg.test(e.target.value)) {
        setCode1RegPass (true) ;

      } else {
        setCode1RegPass (false) ;

      }
      setNewCode1(e.target.value);

    } // end onNewCode1
    const onNewCode2 = (e) => {

      if (testPassReg.test(e.target.value)) {
        setCode2RegPass (true) ;

      } else {
        setCode2RegPass (false) ;

      }
      setNewCode2(e.target.value);


    } // end onNewCode2


  const authenticateICPM = async (thisHashPass, thisNewHashPass)  =>  {

      
    // going to creat call to canister
    console.log ("1- authenticateMain - before await");
    
    

    const loginAttempt = {
      timestamp: 0,
      loginHash: thisHashPass ,
      loginIp: "1.2.3.4",
      loginClient: "a browser",
    }

    const fetchData = await icpmDapp.authenticateMain(loginAttempt, thisNewHashPass).catch(e => { return "ICPM Error: " + e })
    //await sleep(500);
    console.log ("2- authenticateMain - after await");

    console.log (fetchData);

    if (typeof fetchData == "string") {
      
      myContext.displayError("" +fetchData);

    } else {
      let loginResponse = fetchData ;
      
      

      console.log ("3- authenticateMain - after logging in return");

      if (loginResponse.responseStatus == "Green") {
        // then we have authenticated
        //myContext.displayError("Successful login!! Mission Accomplished. ") ;
        if (managerAuthed){
            setSuccessMsg("You are logged in at the moment using the Manager Code, so you might want to loggout and then log back in, you don't have to, but after this session you will need to use the newly set passcode.");
        } else {
          if (displayLocation == "firstLogin") {
            setSuccessMsg(" You can proceed directly to the main ICPM Dashboard, or you can go the Login screen and configure your Internet Identity as a manager of the ICPM.");
          } else {
            setSuccessMsg("Since you are logged in using Internet Identity, you do not need to do anything further, just make sure you don't forget the new Manager Code.");
          }
          
        }
        console.log ("good login and update occurred");
        //setErrorMsg ("success");



      } else {

        
        setErrorMsg ("Your Manager Code is not correct. " +loginResponse.msg );
        

      }
        
      setIsLoading (false);

        

      console.log ("4- authenticateMain - main");

      
    }// end if error
    
} // end authenticateICPM

  const handleClick =  (e) => {
    //console.log ("clickin'" + sha512(loginCode) );
    if (loginCode != "" ) {

    console.log ("now we check the passcodes ");
    if(newCode1 == newCode2) {

        // now we check for length and complexity
        
        
        // (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
        // (?=.*[!@#$&*])            Ensure string has one special case letter.
        // (?=.*[0-9])                Ensure string has one digit
        // (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
        // .{8}                      Ensure string is of length 8.
        
        
        
        console.log ("testPassReg: ", testPassReg);
        console.log ("testPassReg.test(newCode1 ) : ", testPassReg.test(loginCode ) );

        if (testPassReg.test(newCode1 ) ) { 
          // then we have a good match to the password criterial
          // otherwise we send the hashpass to the ICPM for auth and pass along the new code hash
          // if the manager passcode matches it will do the update

          authenticateICPM (sha512(loginCode), sha512(newCode1));
          setIsLoading(true);
          

        } else {


          setErrorMsg ( "Your new manager code is not compliant with our password specifications. See the code requirements below." ) ;
        }

        
      
    } else {
      

      setErrorMsg ( "Your New Codes do not match" ) ;
    }

    } else {
        

      setErrorMsg ( "You need to supply the Current Manager Code." ) ;
  
    }// end if the login code is blank

    }// end handleClick

    
  const proceedToLogin =  () => {
    console.log ("clicked proceedToLogin ")
    // setIsLoading(true);
    myContext.setStatusChecked (false);

  }


    const handleKeyPress = (ev) => {
      //console.log(`Pressed keyCode ${ev.key}`);
      if (ev.key === 'Enter') {
        // Do code here
        handleClick();

      }
    }// end handleKeyPress

    var displayHeader = [
              <Paper elevation={1} key={1}
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
              <SettingsIcon fontSize="small" sx={{mr:1}}/>Change Manager Code
              </Typography>
              </Paper>
            ];

    var displayFooter = [];
    var displayFirstLoginHeader = [];


    if (displayLocation == "firstLogin") {

      paperElevation = 0;
      paperPadding = 0;


      
      displayHeader = [

        <Paper elevation={0} key={1}
          sx={{
            p: 0,
            flexGrow:1 ,
            mb:4,
            
          }} >
            
            <Box sx={{width:"250px", justifyContent:"center", margin:"auto", mb:4}} >
            <GetImage imgSrc="icpipeline-forwbg.png" imgWidth="200px" imgAlt="could not have happened without help from the Dfinity Foundation!" />
            </Box>
          </Paper>
      ];

      displayFirstLoginHeader = [
        <Box key={1}>
          <Typography variant="h6" color="text.secondary" align="center" sx={{m:4,mb:0,mt:1, borderBottom:1}}>
          Welcome to the ICPipeline Manager
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ fontWeight: 'bold',m:0,mb:2}}>
          ICPM
          </Typography>
          <Typography variant="h7" color="text.secondary" align="left" sx={{m:1,mt:1, display:"block"}}>
          This is the console for managing deployments 
          and other aspects of your CI/CD pipeline on the Internet Computer.
          </Typography>
          <Typography variant="h7" color="text.secondary" align="left" sx={{m:1,mt:1, display:"block"}}>
          You should create a new Manager Code now.

          The default Manager Code is posted in GitHub so we can change that now. 

          This code will be necessary for certain <b>superuser</b> capabilities within the ICPM.
          </Typography>
        </Box>
        ];

      displayFooter = [
        <Typography key={1} variant="h7" color="text.secondary" align="left" sx={{m:1,mt:2,display:"block"}}>
        Once you choose a new manager code, you will have the option to go to the login screen. 
        There you can configure the ICPM 
        to authenticate with your Internet Identity. Or, you can proceed directly to the ICPM dashboard.
        </Typography>
      ];

      

    }


    // first we check if they are logged in as Manager
    if (isLoading) {

      if (displayLocation == "firstLogin") {

          return ( 
   
            <Box sx={{p:0, pb:14}}>
              {displayHeader}
              <Box sx={{pt:1}}>
              <PleaseWait>Processing ...</PleaseWait>
              </Box>
              </Box>

        ); // end return 
      } else {

        return ( 

          <Paper elevation={paperElevation}
          sx={{
            p: paperPadding,
            pb:20,
            flexGrow:1 ,
            display: 'flex',
            flexDirection:"column"
          }}
        >
                    
        {displayHeader}
        <PleaseWait>Processing ...</PleaseWait>
        </Paper>
        
          
          

      ); // end return 

      }

    } else if (successMsg) {

      var firstLoginDisplay = [];

      if (displayLocation == "firstLogin") {
        firstLoginDisplay = [
          <Box key={1} sx={{display:"flex"  }}>
            <Grid container>
              <Grid item xs={12} sx={{display:"flex"}} >
                <Button onClick={() => { setIsLoading(true); props.authenticateICPM (sha512(newCode1));}}   variant="contained" sx={{m:4, flexGrow:1}}>Continue to ICPM</Button> 
              </Grid>
              <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}} >
                <Typography variant="h5" align="center" sx={{m:1}}>
                  Or
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display:"flex"}} >

                <Button onClick={() => { proceedToLogin()}}   variant="contained" sx={{m:4, flexGrow:1}}>Use Internet Identity instead</Button> 

              </Grid>
            </Grid>
          </Box>
        ];
      
      }

      return( 
              
              <Paper elevation={paperElevation}
              sx={{
                p: paperPadding,
                flexGrow:1 ,
                display: 'flex',
                flexDirection:"column"
              }}
            >

              {displayHeader}
            
        
              <Paper elevation={4}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "success.light",
                minheight:300
              }} >
                <Typography variant="h5" color="#FFFFFF" align="center" sx={{m:1}}>
                Success!
                </Typography>
              </Paper>
              <Typography variant="h7" align="left" sx={{m:1}}>
              You have successfully changed the Manager Code for this ICPM Canister Instance.
              </Typography>
              <Typography variant="body" align="left" sx={{m:1}}>
              {successMsg}
              {firstLoginDisplay}
              </Typography>
          </Paper>
          
      ); // end return 

    } else {
      return (

            <Paper elevation={paperElevation}
              sx={{
                p: paperPadding,
                flexGrow:1 ,
                display: 'flex',
                flexDirection:"column"
              }}
            >

            {displayHeader}
            {displayFirstLoginHeader}
            
            <Typography variant="body2" color="text.secondary" align="center" sx={{m:1, mb:2}}>
            ... choose wisely ...
            </Typography>
            <ShowError errorMsg={errorMsg}/>
            <FormTextField 
                onChange={onLoginCodeChange}
                value={loginCode}
                label={"Current Manager Code"} //optional
                type="password"
                helperText="Please provide the current Manager Code."
                

            /> 
            <CodePassReg codeRegPass={code1RegPass} />
            <FormTextField 
                onChange={onNewCode1}
                value={newCode1}
                label={"New Code"} //optional
                type="password"
                helperText="Please Enter a new Manager Code."
                

            />  
            <CodePassReg codeRegPass={code2RegPass} />
            <FormTextField 
                onChange={onNewCode2}
                value={newCode2}
                label={"New Code Again"} //optional
                type="password"
                helperText="Enter the same Code, it must match to continue."
                

            />  
            <Typography variant="body" color="text.primary" align="center" sx={{m:1}}>
            {sameCodeMsg ? "New Manager Codes Match" : "Please enter the new code twice."}
            </Typography>
            <Button onClick={handleClick} variant="contained" sx={{ml:2, mr:2}} disabled={submitDisable} >Submit New Manager Code</Button>
            

            <Typography variant="body2" color="text.secondary" align="left" sx={{m:0, mt:3,p:2, border:"1px solid #9f9f9f", borderRadius:2}}>
            Code Requirements: min length 8, one each upper/lower/digit and one of (!@#$&*)
            </Typography>

            {displayFooter}
            
          </Paper>
      );
    } // end successMsg
  }// end ChangeManagerPassCode

  const ShowError = (props) => {
    
    const errorMsg = props.errorMsg;

    if (errorMsg) {
      return (
        <>
        <Paper sx={{bgcolor: "#B00020", mb:2, mt:2, p:2, justifyContent:"center"}} elevation={5}>
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

  const CodePassReg = (props) => {
    
    const codeRegPass = props.codeRegPass;
    console.log ("codeRegPass: ", codeRegPass);

    if (codeRegPass ) {
      return (
        <>
        <Paper sx={{bgcolor: "success.main", mb:1, mt:-2, p:1, justifyContent:"center", height:20} } elevation={1}>
          <Typography variant="body2" color="#FFFFFF" align="center"  sx={{ fontSize:".8rem", m:0, mt:-.9}} >
          New Manager Code is Valid
          </Typography>
        
        </Paper>
        </>

      )
    
  } else {

    return (
      <>
      <Paper sx={{ mb:1, mt:-2, p:1, justifyContent:"center", height:20} } elevation={0}>
        <Typography variant="body2" color="#FFFFFF" align="center"   >
        
        </Typography>
      
      </Paper>
      </>
      
    );
  } // end if there it was agood pass 
  } //end ShowError

  export default ChangeManagerPassCode;
  