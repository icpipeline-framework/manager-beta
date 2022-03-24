import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter,MemoryRouter,useLocation} from 'react-router-dom';
import { green, purple, blue, teal, cyan, deepPurple, brown, deepOrange,lime } from '@mui/material/colors';
import { AuthClient } from "@dfinity/auth-client";
import { DelegationIdentity } from "@dfinity/identity";
import { Actor, HttpAgent } from '@dfinity/agent';

/// ****** CUSTOM IMPORTS 
import { icpm, idlFactory as icpmDappIdl, canisterId as icpmDappCanisterId} from "../../declarations/icpm";


import Stage from './Stage';
import Login from './nav/Login';
import SplashScreen from './components/SplashScreen';


import AppContext from './nav/AppContext';



  // now we create the theme
  const theAppTheme = createTheme({
    palette: {
      primary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
  });

const App = () => {
  console.log ("______APP RENDERED______")

  
  
  let navSectionLoaded = "Dashboard";
  let checkingAuth = false ;
  
  let identity;
  let agent;
  let thePrincipal;
  
  // if (location.pathname == "/projects")
  //   navSectionLoaded = "Projects";
    
  // now we define our state variables
  // first if we have checked the status of the data canister
  
  const [errorMsg, setErrorMsg] = useState("");
  const [statusChecked, setStatusChecked] = useState(false);
  const [everLoggedIn, setEverLoggedIn] = useState("N");
  /*Auth*/
  const [isAuthed, setIsAuthed] = useState(false);
  const [managerAuthed, setManagerAuthed] = useState(false);
  let [authClient, setAuthClient] = useState("");
  let [icpmDapp, setIcpmDapp] = useState("");
  let [testPrincipal, setTestPrincipal] = useState("");
  let [apiToken, setApiToken] = useState("");
  
  let [nextExpirationII, setNextExpirationII] = useState(0);
  
  /*List Objects*/
  const [listOfEnvironments, setListOfEnvironments] = useState([]);
  const [listOfProjects, setListOfProjects] = useState([]);
  const [listOfDeployments, setListOfDeployments] = useState([]);
  const [listOfWorkers, setListOfWorkers] = useState([]);
  const [listOfEvents, setListOfEvents] = useState([]);
  const [listOfJobs, setListOfJobs] = useState([]);
  const [listOfIdentities, setListOfIdentities] = useState([]);
  const [listOfCanisters, setListOfCanisters] = useState([]);

  /*Active Objects*/
  const [activeEnvironment, setActiveEnvironment] = useState([]);
  const [activeProject, setActiveProject] = useState([]);
  const [activeDeployment, setActiveDeployment] = useState([]);
  const [activeWorker, setActiveWorker] = useState([]);
  const [activeWorkerUplink, setActiveWorkerUplink] = useState([]);
  const [activeEvent, setActiveEvent] = useState([]);
  const [activeJob, setActiveJob] = useState([]);
  const [activeIdentity, setActiveIdentity] = useState([]);
  const [activeCanister, setActiveCanister] = useState([]);
  

  /*Active Settings*/
  const [activeSettings, setActiveSettings] = useState([]);
  /*Nav*/
  const [whereTo, setWhereTo] = useState('load');
  const [jumpId, setJumpId] = useState(0);
  const [navSection, setNavSection] = useState(navSectionLoaded);
  const [eventsType, setEventsType] = useState("");
  const [loading, setLoading] = useState(false);
  const [helpSection, setHelpSection] = useState("");
  const [latestVersion, setLatestVersion] = useState("");
  const [showNewVersion, setShowNewVersion] = useState(false);
  
  /*Additional*/
  const [appTheme, setAppTheme] = useState(theAppTheme);
  
  console.log ("______whereTo:",whereTo)

  //const [stateChangeCounter, setStateChangeCounter] = useState(1);
  
  
  const setSetListOfEnvironments = (listData) => {
    console.log ("....got a list of environments");
    setListOfEnvironments (listData);
  };// end setSetListOfEnvironments
  const setSetListOfProjects = (listData) => {
    console.log ("....got a list of projects");
    setListOfProjects (listData);
  };// end setSetListOfProjects

  const displayError = (thisError) => {
    console.log (".... got an alert: "+thisError);
    //setAlertError (thisError);
    alert (thisError);
  };// end displayError

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const getCanisterStatus = async ()  =>  {

    // going to creat call to canister
    console.log ("1- getCanisterStatus - before await");
    
    
    if (icpmDapp) {
        
      const fetchData = await icpmDapp.getCanisterStatus().catch(e => { return "ICPM Error: " + e })
      await sleep(2000);
      console.log ("2- getCanisterStatus - after await");
      
      console.log ("fetchData: ", fetchData) ;

      if ( typeof fetchData == "string") {
          
          
        
        setIsLoading(false);
        setErrorMsg("" +fetchData);
        
        

      } else {
        let thisMsg = fetchData.msg ;
        let responseStatus = fetchData.responseStatus ;
        let thisEverLoggedIn = fetchData.everLoggedIn ;

        

        console.log ("3- getCanisterStatus - after logging return");
        if (responseStatus == "Red") {

          
          setIsLoading(false);
          setErrorMsg("" +thisMsg);
          
        } else {
          // now we set the setEverLoggedIn status for the display of a splash or not 
          setEverLoggedIn (thisEverLoggedIn)
          setStatusChecked(true);
        }
          
        
          

        console.log ("4- getCanisterStatus - end");

        
      }// end if error
    } // end if there is a icpmDapp
    
} // end getCanisterStatus


  const createAuthClient = () => {
    
    identity = authClient.getIdentity(); 

    let thePrincipalNew = identity.getPrincipal();

    if (thePrincipalNew != thePrincipal ) {
      // then we need to reset the authClient and icpmDapp
      thePrincipal = thePrincipalNew;
        
      console.log ("setting the Auth for this identity: ",thePrincipal.toString());

      agent = new HttpAgent({ identity });
      //agent.fetchRootKey();
          // Fetch root key for certificate validation during development
      if(process.env.NODE_ENV !== "production") {
        agent.fetchRootKey().catch(err=>{
          console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
          console.error(err);
        });
      }// end if production 
      icpmDapp = Actor.createActor(icpmDappIdl, { agent, canisterId: icpmDappCanisterId });

      setAuthClient (authClient) ;
      setIcpmDapp (icpmDapp) ;
      // nowe we can get the canister status
      getCanisterStatus ();
      
      
    } else {

      console.log ("principals are the same "); 

    }// end if the principal has changed 

  } // end set AuthClient

  // now we get the II authClient Cooking
  if (identity) {
      createAuthClient ();
  } // end if identity 

  const init = async () => {
    authClient = await AuthClient.create();

    createAuthClient();
    console.log ("init - thePrincipal - ",thePrincipal.toString());
    
  } // end init


  const checkPrincipal = async (testPrincipal)  =>  {

        
      // identity = authClient.getIdentity(); 
      // agent = new HttpAgent({ identity });
      // icpmDapp = Actor.createActor(icpmDappIdl, { agent, canisterId: icpmDappCanisterId });
      // going to creat call to canister
      console.log ("1- checkPrincipal - before await");
      if (icpmDapp) {
      const fetchData = await icpmDapp.checkPrincipalMain().catch(e => { return "ICPM Error: " + e })
      //let fetchData = "";

      console.log ("22- checkPrincipal - after await");

      if ( typeof fetchData == "string") {
          
          
        authClient.logout();
        displayError("" +fetchData);
        
        
      } else {

        console.log (fetchData.toString());
        console.log ("33- checkPrincipal - after logging return");
        if (fetchData > 0 ) {
          setIsAuthed(true);
          console.log ("You have successfully logged into the ICPM with II");

        } else {
          setIsAuthed(false);

          setWhereTo("");
          setTestPrincipal(testPrincipal);

          //authClient.logout();
          console.log ("Your Principal is not valid for this ICPM");
        }
        // set the appContext which should redraw the component
      } // end if there was a problem talking to the ICPM 
    } else {


      console.log (" ---- not initiatlized yet ----");
    }
      console.log ("4- checkPrincipal - end");
      
      
      
  } // end checkPrincipal

  const checkIIStatus =() => {

    const identity = authClient.getIdentity();
    
    let thePrincipal = identity.getPrincipal();
    console.log ("checkIIStatus NOW",thePrincipal.toString());
    
    if (identity instanceof DelegationIdentity) {
      let theDelegationJSON = JSON.stringify(identity.getDelegation().toJSON(), undefined, 2);
      //console.log ("theDelegationJSON",theDelegationJSON);
      // cannot use Math.min, as we deal with bigint here
      const nextExpiration =
        identity.getDelegation().delegations
        .map(d => d.delegation.expiration)
        .reduce((current, next) => next < current ? next : current);
      var thisExpirationNs = nextExpiration - BigInt(Date.now()) * BigInt(1000_000);
      //console.log ("checkIIStatus - nextExpiration: "+nextExpiration) ;
      //console.log ("checkIIStatus - Date.now(): "+Date.now()) ;
      let thisExpirationMin = thisExpirationNs/BigInt(60)/BigInt(1_000)/BigInt(1000_000);
      if (thisExpirationMin > 0 ) {
        if (!isAuthed && authClient) {
        // we need to check to see if this principal is in the data canister
          checkPrincipal (thePrincipal);
          
        } else {
          console.log ("You are still logged in " );
        }
        console.log ("thisExpirationMin: "+thisExpirationMin) ;
        
      } else if (isAuthed)  {
        setIsAuthed(false);
      }
     
    } else {
      if (isAuthed && !managerAuthed)  {
        setIsAuthed(false);
      }
    } // end if there is a delegation
  } // end checkIIStatus


  if (!authClient) {
    console.log ("no authClient - will init");
    checkingAuth = true;
    init();
    
  } else {

    // want to check if they have been logged out
    if (!checkingAuth) {
      checkIIStatus();
    } 

  } // end if autheClient


  const fetchProjectsList = async ()  =>  {

        
      // going to creat call to canister
      console.log ("1- fetchProjectsList - before await");
      await sleep(500);
      const fetchData = await icpmDapp.getListOfProjects(apiToken,"").catch(e => { return "ICPM Error: " + e })
      
      console.log ("2- fetchProjectsList - after await");
      console.log (fetchData);
      console.log ("3- fetchProjectsList - after logging return");
      // set the appContext which should redraw the component

      //setWhereTo ("list");
      setSetListOfProjects (fetchData);
      console.log ("4- fetchProjectsList - after setstateListData");
      
      
      
  } // end fetchProjectsList

  /*
  const incStateChangeCounter = () => {
    let newCounter = stateChangeCounter +1;
    console.log (newCounter);
    setStateChangeCounter (newCounter);
  };// end incStateChangeCounter
  */

  // now for themes

  // const environmentsTheme = createTheme({
  //   palette: {
  //       primary: {
  //       light: green[500],
  //       main: green[700],
  //       dark: green[900],
  //       }
  //     },
  //   });

  var environmentsTheme = createTheme({
    palette: {
        primary: {
        superlight: "#ebfbff",
        light: "#ebfbff",
        main: "#138daa",
        dark: "#215e6d",
        }
      },
    });
    
    // const projectsTheme = createTheme({
    //   palette: {
    //     primary: {
    //     light: purple[500],
    //     main: purple[700],
    //     dark: purple[900],
    //     }
    //   },
    // });    
    
    var projectsTheme = createTheme({
      palette: {
        primary: {
          superlight: purple[50],
          light: purple[500],
          main: purple[700],
          dark: purple[900],  
        }
      },
    });
  
    var deploymentsTheme = createTheme({
      palette: {
        primary: {
        superlight: teal[50],
        light: teal[500],
        main: teal[700],
        dark: teal[900],  
        }
      },
    });
    var workersTheme = createTheme({
      palette: {
        primary: {
        superlight: deepPurple[50],
        light: deepPurple[500],
        main: deepPurple[700],
        dark: deepPurple[900],
        }
      },
    });
    var jobsTheme = createTheme({
      palette: {
        primary: {
        superlight: lime[50],
        light: lime[500],
        main: lime[700],
        dark: lime[900],
        }
      },
    });
    var eventsTheme = createTheme({
      palette: {
        primary: {
        superlight: cyan[50],
        light: cyan[500],
        main: cyan[700],
        dark: cyan[900],
        }
      },
    });
    var settingsTheme = createTheme({
      palette: {
        primary: {
        superlight: blue[50],
        light: blue[500],
        main: blue[700],
        dark: blue[900],
        }
      },
    });
    var helpTheme = createTheme({
      palette: {
        primary: {
        superlight: blue[50],
        light: blue[500],
        main: blue[700],
        dark: blue[900],
        }
      },
    });
     // and then the default
    var defaultTheme= createTheme({
        palette: {
          primary: {
            superlight: blue[50],
            light: blue[500],
            main: '#0066CC',
            dark: blue[900],
          },
          secondary: {
            light: purple[500],
            main: purple[700],
            dark: purple[900],
          },
        },
      });// end default theme 
  /// create the object that we will store our application variables and functions
  // defaultTheme = environmentsTheme
  // environmentsTheme = defaultTheme ;
  // projectsTheme = defaultTheme ;
  // deploymentsTheme = defaultTheme ;
  // workersTheme = defaultTheme ;
  // jobsTheme = defaultTheme ;
  // eventsTheme = defaultTheme ;
  // settingsTheme = defaultTheme ;
  // helpTheme = defaultTheme ;
  


  const userSettings = {
    /*Auth*/
    isAuthedName:isAuthed,
    managerAuthedName:managerAuthed,
    authClientName:authClient,
    testPrincipalName:testPrincipal,
    apiTokenName:apiToken,
    icpmDappName:icpmDapp,
    nextExpirationIIName:nextExpirationII,
    /*List Objects*/
    listOfEnvironmentsName: listOfEnvironments,
    listOfProjectsName: listOfProjects,
    listOfDeploymentsName: listOfDeployments,
    listOfWorkersName: listOfWorkers,
    listOfEventsName: listOfEvents,
    listOfJobsName: listOfJobs,
    listOfIdentitiesName: listOfIdentities,
    listOfCanistersName: listOfCanisters,
    /*Active Objects*/
    activeEnvironmentName: activeEnvironment,
    activeProjectName: activeProject,
    activeDeploymentName: activeDeployment,
    activeWorkerName: activeWorker,
    activeWorkerUplinkName: activeWorkerUplink,
    activeEventName: activeEvent,
    activeJobName: activeJob,
    activeIdentityName: activeIdentity,
    activeCanisterName: activeCanister,
    /*Active Settings*/
    activeSettingsName: activeSettings,
    /*Nav*/
    whereToName: whereTo,
    jumpIdName: jumpId,
    eventsTypeName: eventsType,
    navSectionName: navSection,
    loadingName: loading,
    helpSectionName: helpSection,
    latestVersionName: latestVersion,
    showNewVersionName: showNewVersion,
    /*Additional*/
    appThemeName: appTheme,
    /*CanisterStatus*/
    setStatusChecked,
    getCanisterStatus,
    /*Auth*/
    setIsAuthed,
    setManagerAuthed,
    setAuthClient,
    setTestPrincipal,
    setApiToken,
    setIcpmDapp,
    setNextExpirationII,
    checkIIStatus,
    createAuthClient,
    /*List Objects*/
    setListOfEnvironments,
    setListOfProjects,
    setListOfDeployments,
    setListOfWorkers,
    setListOfEvents,
    setListOfJobs,
    setListOfIdentities,
    setListOfCanisters,
    /*Active Objects*/
    setActiveEnvironment,
    setActiveProject,
    setActiveDeployment,
    setActiveWorker,
    setActiveWorkerUplink,
    setActiveEvent,
    setActiveJob,
    setActiveIdentity,
    setActiveCanister,
    /*Active Settings*/
    setActiveSettings,
    /*Nav*/
    setWhereTo,
    setJumpId,
    setEventsType,
    setNavSection,
    setLoading,
    setHelpSection,
    setLatestVersion,
    setShowNewVersion,
    /*Fetching*/
    fetchProjectsList,
    /*Additional*/
    setAppTheme,
    setSetListOfProjects,
    setSetListOfEnvironments,
    displayError,
    sleep,
    /*Themes*/
    environmentsThemeName: environmentsTheme,
    projectsThemeName: projectsTheme,
    deploymentsThemeName: deploymentsTheme,
    workersThemeName: workersTheme,
    jobsThemeName: jobsTheme,
    eventsThemeName: eventsTheme,
    settingsThemeName: settingsTheme,
    helpThemeName: helpTheme,
    defaultThemeName: defaultTheme,
  };



  if (checkingAuth) {

    return (  
      <>
      waiting for auth client
      </>
    ); // end return

  } else {
    return (
      <AppContext.Provider value={userSettings}>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter initialEntries={['/dashboard']} initialIndex={0}>   
          
          <AppMainNav isAuthed={isAuthed} getCanisterStatus={getCanisterStatus} authClient={authClient} statusChecked={statusChecked} everLoggedIn={everLoggedIn} errorMsg={errorMsg} />
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    ); // end return
  } // end if checking auth 
} // end App 

const AppMainNav = (props) => {

  const errorMsg = props.errorMsg;
  const statusChecked = props.statusChecked;
  const everLoggedIn = props.everLoggedIn;

    if (statusChecked) {
      if (props.isAuthed ){ 
        return (  
          <Stage />
        ); // end return

      } else {
        return (  
          <Login statusChecked={statusChecked} everLoggedIn={everLoggedIn} />
        ); // end return
      } // end if logged in
    } else {
      if (props.authClient ){ 
        props.getCanisterStatus ()
      }

      return (
        <SplashScreen />
      )

    }

} // end AppMainNav

export default App;
